import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    // User needs to be loggedIn to create a store
    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const { name, value } = body;

    // Store Label Is Mandatory
    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }

    // Store Image URL Is Mandatory
    if (!value) {
      return new NextResponse("Value is required!", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required!", { status: 400 });
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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(size);

  } catch (error) {
    console.log('[SIZES_POST] ', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required!", { status: 400 });
    }
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(sizes);

  } catch (error) {
    console.log('[SIZES_GET] ', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}