import { EventClickArg } from "@fullcalendar/core";
import React from "react";

import { GetModalContents } from "../../hooks/useModalContents";

type Props = {
  // modalId: string;
  content?: EventClickArg;
  // content: EventClickArg;
};

//モーダルの中身
export const ModalContent: React.VFC<Props> = (props) => {
  // const modalContent = GetModalContents(props.modalId);
  const clickInfo = props.content;
  console.log(clickInfo);

  // TODO エラー回避のため一時的な処理
  if (!clickInfo) {
    return (
      <></>
    )
  }

  // 初期値を持たせる処理をする。
  // TODO undifined だった場合処理させない良い方法ある？

  const title = clickInfo?.event._def.title;
  const allDay = clickInfo?.event.allDay;
  const start = clickInfo!.event._instance!.range.start.toISOString();
  const end = clickInfo!.event._instance!.range.end.toISOString();
  const [startDate, startTime] = start!.replaceAll('-', '/').replace(/\.\d{1,3}Z$/, '').split('T');
  const [endDate, endTime] = end!.replaceAll('-', '/').replace(/\.\d{1,3}Z$/, '').split('T');
  
  return (
    <>
      {clickInfo ? (
        <>
          <div>タイトル:{title}</div>
          <div>allDay:{allDay.toString()}</div>
          <div>開始日: {startDate}</div>
          <div>開始時間: {startTime}</div>
          <div>終了日: {endDate}</div>
          <div>終了時間: {endTime}</div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalContent;
