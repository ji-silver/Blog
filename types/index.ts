import { MouseEventHandler } from "react";

export interface NoticeProps {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
}

export interface CustomButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  containerStyles?: string;
  textStyles?: string;
}
