import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const POST = async (
    req: Request,
) => {
    try {
        const { userId } = auth();

        // User needs to be loggedIn to create a store
        if(!userId) {
            return new NextResponse("Unauthenticated!", { status: 401 });
        }

        const body = await req.json();
        const { name } = body;

        // Store Name Is Mandatory
        if(!name) {
            return new NextResponse("Name is required!", { status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_POST] ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}