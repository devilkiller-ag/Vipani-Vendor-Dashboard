import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const { name, value } = body;
    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required!", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required!", { status: 400 });
    }

    // Find if this store actually belongs to the logged-in user or not.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,

      },
      data: {
        name,
        value,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required!", { status: 400 });
    }

    // Find if this store actually belongs to the logged-in user or not.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const GET = async (
  _req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required!", { status: 400 });
    }

    const color = await prismadb.store.findUnique({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};