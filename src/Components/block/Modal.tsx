import { EventClickArg } from "@fullcalendar/core";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import ModalContent from "../modules/ModalContent";

type Props = {
  modalStatus: boolean;
  content: EventClickArg | undefined;
  modalOpen: () => void;
  modalClose: () => void;
};

export const Modal: React.VFC<Props> = (props) => {
  const { modalStatus, content, modalOpen, modalClose } = props;
  const insideRef = useRef<HTMLDivElement>(null);
  // const handleClickOutside = useCallback(
  //   (e: MouseEvent) => {
  //     // console.log("handleClickOutside");
  //     if (!insideRef.current?.contains(e.target as Node)) {
  //       console.log("hundleClickOutside")
  //       modalClose()
  //       //ここに外側をクリックしたときの処理
  //     } else {
  //       console.log("hundleClickinside")
  //       //ここに内側をクリックしたときの処理
  //     }
  //   },
  //   []
  // );
  
  // useEffect(() => {
  //   if (!modalStatus) return;
  //   console.log("moldalStatuがtrueできている。");
  //   //クリックイベントを設定
  //   document.addEventListener("click", handleClickOutside);

  //   //クリーンアップ関数
  //   return () => {
  //     console.log(modalStatus)
  //     //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
  //     document.removeEventListener("click", handleClickOutside);
  //     console.log("クリーンアップ関数");
  //   };
  // }, [modalStatus,handleClickOutside]);

  return (
    <div className={modalStatus ? "modal is-active" : "modal"}>
      <div id="overlay">
        <div id="content">
          <div className="modal-inner" ref={insideRef}>
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