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
    const { label, labelColor, imageUrl } = body;

    // Store Label Is Mandatory
    if (!label) {
      return new NextResponse("Label is required!", { status: 400 });
    }

    // Store Label Is Mandatory
    if (!labelColor) {
      return new NextResponse("Label Color is required!", { status: 400 });
    }

    // Store Image URL Is Mandatory
    if (!imageUrl) {
      return new NextResponse("Image URL is required!", { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        labelColor,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard);

  } catch (error) {
    console.log('[BILLBOARDS_POST] ', error);
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
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboards);

  } catch (error) {
    console.log('[BILLBOARDS_GET] ', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}