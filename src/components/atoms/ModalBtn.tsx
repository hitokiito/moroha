import React from "react";

type Props = {
  title: string;
  onClick: any;
};
export const ModalBtn: React.VFC<Props> = (props) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};
export default ModalBtn;
