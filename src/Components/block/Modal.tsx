import { EventClickArg } from "@fullcalendar/core";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import ModalContent from "../modules/ModalContent";

type Props = {
  modalStatus: boolean;
  content: EventClickArg | undefined;
  modalOpen: (event:any) => void;
  modalClose: () => void;
};

export const Modal: React.VFC<Props> = (props) => {
  const { modalStatus, content, modalOpen, modalClose } = props;
  const insideRef = useRef<HTMLDivElement>(null);

  return (
    <div className={modalStatus ? "modal is-active" : "modal"}>
      <div id="overlay">
        <div id="content">
          <div className="modal-inner" ref={insideRef} onClick={(event)=>{event.stopPropagation()}}>
            <div className="modal-content">
              <div className="modal-header float-right ">
                <IconContext.Provider value={{ size: "40px" }}>
                  <MdClose onClick={modalClose}/>
                </IconContext.Provider>
              </div>
              <ModalContent
                content={content}
                modalClose={modalClose}
              /></div>
            </div>
        </div>
      </div>  
    </div>
  );
};
export default Modal;