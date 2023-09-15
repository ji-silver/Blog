// url: http://localhost:3000/api/posts
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// POST
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
    // NextResponse로 응답 객체 생성, 제어하기
    return NextResponse.json(
      { message: "추가하지 못했습니다.", err },
      { status: 500 }
    );
  }
};

// GET
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { message: "불러오지 못했습니다.", err },
      { status: 500 }
    );
  }
};
