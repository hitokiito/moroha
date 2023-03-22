import { EventClickArg } from "@fullcalendar/core";
import React from "react";

import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import ModalContent from "../modules/ModalContent";

type Props = {
  modalStatus: boolean;
  modalContent: EventClickArg| undefined;
  onClick: any;
};

export const Modal: React.VFC<Props> = (props) => {
  //モダールを閉じる
  const modalClose = () => {
    props.onClick();
  };

  return (
    <div className={props.modalStatus ? "modal is-active" : "modal"}>
      <div className="modal-inner">
        <div className="modal-close" onClick={modalClose}>
          <IconContext.Provider value={{ size: "40px" }}>
            <MdClose />
          </IconContext.Provider>
        </div>
        <div className="modal-content">
          <ModalContent content={props.modalContent} />
        </div>
      </div>
    </div>
  );
};
export default Modal;
