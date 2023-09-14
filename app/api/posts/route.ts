import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { title, desc } = await req.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
      },
    });

    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "POST 에러", err }, { status: 500 });
  }
};
