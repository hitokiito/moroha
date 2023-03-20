import { EventClickArg } from "@fullcalendar/core";
import React from "react";

import { GetModalContents } from "../../hooks/useModalContents";

type Props = {
  // modalId: string;
  content?: EventClickArg;
};

//モーダルの中身
export const ModalContent: React.VFC<Props> = (props) => {
  // const modalContent = GetModalContents(props.modalId);
  const info = props;
  console.log("モーダルの中身");
  console.log(info);

  return (
    <>
      <div>{info.content?.event._def.title}</div>
    </>

    // <>
    //   {0 < modalContent.length ? (
    //     <>
    //       <p className="modal-title">{modalContent[0].title}</p>
    //       <div className="modal-text">{modalContent[0].content}</div>
    //     </>
    //   ) : (
    //     <></>
    //   )}
    // </>
  );
};
export default ModalContent;
