import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived
    } = body;

    // Store Name Is Mandatory
    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }

    // Store Price Is Mandatory
    if (!price) {
      return new NextResponse("Price is required!", { status: 400 });
    }

    // Store Images Is Mandatory
    if (!images || !images.length) {
      return new NextResponse("Images is required!", { status: 400 });
    }

    // Store Category ID Is Mandatory
    if (!categoryId) {
      return new NextResponse("Category ID is required!", { status: 400 });
    }

    // Store Size ID Is Mandatory
    if (!sizeId) {
      return new NextResponse("Size ID is required!", { status: 400 });
    }

    // Store Color ID Is Mandatory
    if (!colorId) {
      return new NextResponse("Color ID is required!", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Billlboard ID is required!", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,

      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {}
        }
      }
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,

      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { storeId: string, productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required!", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const GET = async (
  _req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required!", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};