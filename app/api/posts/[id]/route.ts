// url: http://localhost:3000/api/posts/:id
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// 특정 post GET
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // 고유한 post 검색 (특정 조건 검색 : id)
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(
      { message: "불러오지 못했습니다.", err },
      { status: 500 }
    );
  }
};

// 특정 post PATCH
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { title, desc } = await req.json();
    const updatePost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        desc,
      },
    });

    if (!updatePost) {
      return NextResponse.json(
        { message: "찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatePost);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "수정하지 못했습니다.", err },
      { status: 500 }
    );
  }
};

// 특정 post DELETE
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.post.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json("삭제되었습니다.");
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "삭제하지 못했습니다.", err },
      { status: 500 }
    );
  }
};
