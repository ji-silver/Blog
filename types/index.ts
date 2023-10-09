import { MouseEventHandler, ReactNode } from "react";

export interface PostFormData {
  title: string;
  desc: string;
  img?: string | null;
}

// 공지사항 api 데이터
export interface NoticeProps {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
}

// 공지사항 제목 타입
export interface NoticeTitleProps {
  onTextChange: (text: string) => void;
  placeholder?: string;
  value: string;
}

// 공지사항 내용 타입
export interface NoticeWriteProps {
  onTextChange: (text: string) => void;
  value: string;
  img?: string;
}

// 커스텀 버튼 타입
export interface CustomButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  containerStyles?: string;
  icon?: boolean;
  children?: ReactNode;
}

// 페이지네이션 타입
export interface PageNationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalPages: number;
}
