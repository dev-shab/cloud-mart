import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant: string;
  children: JSX.Element;
}

const Message = ({ variant = "info", children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};
export default Message;
