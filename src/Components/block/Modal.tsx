import { EventClickArg } from "@fullcalendar/core";
import React from "react";

import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import ModalContent from "../modules/ModalContent";

type Props = {
  modalStatus: boolean;
  content: EventClickArg | undefined;
  modalClose: () => void;
};

export const Modal: React.VFC<Props> = (props) => {
  const { content, modalClose } = props;
  
  return (
    <div className={props.modalStatus ? "modal is-active" : "modal"}>
      <div className="modal-inner">
        <div className="modal-close" onClick={modalClose}>
          <IconContext.Provider value={{ size: "40px" }}>
            <MdClose />
          </IconContext.Provider>
        </div>
        <div className="modal-content">
          <ModalContent
            content={content}
            modalClose={modalClose}
          />
        </div>
      </div>
    </div>
  );
};
export default Modal;
