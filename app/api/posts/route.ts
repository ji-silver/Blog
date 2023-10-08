// url: http://localhost:3000/api/posts
import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

// POST
export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "회원 정보가 없습니다." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const newPost = await prisma.post.create({
      data: { ...body, userEmail: session.user?.email },
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
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { message: "회원 정보가 없습니다." },
      { status: 401 }
    );
  }
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

export const DELETE = async (req: Request) => {
  try {
    await prisma.post.deleteMany();
    return NextResponse.json({ message: "모든 데이터 삭제 완료" });
  } catch (err) {
    return NextResponse.json(
      { message: "데이터를 삭제하지 못했습니다.", err },
      { status: 500 }
    );
  }
};
