import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: {storeId: string, categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard ID is required!", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required!", { status: 400 });
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,

      },
      data: {
        name,
        billboardId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required!", { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const GET = async (
  _req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required!", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};