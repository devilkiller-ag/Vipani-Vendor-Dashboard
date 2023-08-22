import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: {storeId: string, billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("Label is required!", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required!", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billlboard ID is required!", { status: 400 });
    }

    // Find if this store actually belongs to the logged-in user or not.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,

      },
      data: {
        label,
        imageUrl,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required!", { status: 400 });
    }

    // Find if this store actually belongs to the logged-in user or not.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const GET = async (
  _req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required!", { status: 400 });
    }

    const billboard = await prismadb.store.findUnique({
      where: {
        id: params.billboardId,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};