import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;
    if(!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }

    if(!params.storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE PATCH]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}

export const DELETE = async (
  _req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if(!params.storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE DELETE]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}