// 한국시간으로 변환하고 시간 표기
export const formatTime = (isoDateString: string) => {
  const now = new Date();
  const date = new Date(isoDateString);

  // UTC 시간을 한국 시간으로 변환
  date.setHours(date.getUTCHours() + 9);

  // 시간 차이 계산
  const timeDifference = now.getTime() - date.getTime();

  // 1초 단위로 표시
  if (timeDifference < 60000) {
    return "방금 전";
  }

  // 1분 단위로 표시
  if (timeDifference < 3600000) {
    const minutesAgo = Math.floor(timeDifference / 60000);
    return `${minutesAgo}분 전`;
  }

  // 1시간 단위로 표시
  if (timeDifference < 86400000) {
    const hoursAgo = Math.floor(timeDifference / 3600000);
    return `${hoursAgo}시간 전`;
  }

  // yyyy.mm.dd 형식으로 표시
  const formattedDate = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

// 날짜만 출력하기
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
}
