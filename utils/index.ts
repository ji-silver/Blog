// 한국시간으로 변환하고 시간 표기
export const formatTime = (isoDateString: string) => {
  const now = new Date();
  const date = new Date(isoDateString);

  // UTC 시간을 한국 시간으로 변환
  date.setHours(date.getUTCHours() + 9);

  // 시간 차이 계산
  const timeDifference = now.getTime() - date.getTime();

  if (timeDifference < 60000) {
    return "방금 전";
  } else if (
    timeDifference >= 60000 &&
    timeDifference < 3600000 &&
    date.getDate() === now.getDate() && // 날짜가 동일한 경우
    date.getMonth() === now.getMonth() && // 월이 동일한 경우
    date.getFullYear() === now.getFullYear() // 년도가 동일한 경우
  ) {
    return `${Math.floor(timeDifference / 60000)}분 전`;
  } else if (
    timeDifference >= 3600000 &&
    date.getDate() === now.getDate() && // 날짜가 동일한 경우
    date.getMonth() === now.getMonth() && // 월이 동일한 경우
    date.getFullYear() === now.getFullYear() // 년도가 동일한 경우
  ) {
    return `${Math.floor(timeDifference / 3600000)}시간 전`;
  } else {
    const formattedDate = `${date.getFullYear()}. ${String(
      date.getMonth() + 1
    ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  }
};