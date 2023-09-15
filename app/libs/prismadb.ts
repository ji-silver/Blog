import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
// 개발환경에서만 globalThis.prisma에 클라이언트를 할당
// production 환경에선 필요할 때 마다 새로운 클라이언트를 생성해서 DB 연결 유지
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
