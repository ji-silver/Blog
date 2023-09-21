// 한국시간으로 변환하고 시간 표기
export const formatTime = (isoDateString: string) => {
  const now = new Date();
  const date = new Date(isoDateString);

  // 시간 차이 계산
  const timeDifference: number = now.getTime() - date.getTime();

  // 1초 ~ 59초: 방금 전
  if (timeDifference >= 0 && timeDifference < 60000) {
    return "방금 전";
  }

  // 분 표시
  if (timeDifference >= 60000 && timeDifference < 3600000) {
    const minutesAgo = Math.floor(timeDifference / 60000);
    return `${minutesAgo}분 전`;
  }

  // 시간 표시
  if (timeDifference >= 3600000 && timeDifference < 82800000) {
    const hoursAgo = Math.floor(timeDifference / 3600000);
    return `${hoursAgo}시간 전`;
  }

  // yyyy. mm. dd 표시
  const formattedDate = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

// 날짜만 출력하기
export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
}

// 오늘날짜 출력하기
export function formatTodayDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
}
