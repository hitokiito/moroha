import React from "react";

type Props = {
    event: any;
};

const calculateDuration = (duration: any) => {
    const [hh,mm] = duration.split(':');
    const HH = Number(hh);
    const MM = Number(mm);
    const totalduration = (HH * 60) + MM ;
  
    if(totalduration <= 30) {
      return 'h-6'; 
    } else if(totalduration <= 60 ) {
      return 'h-8'; 
    } else if(totalduration <= 90 ) {
      return 'h-12';
    } else if(totalduration <= 120 ) {
      return 'h-16';
    } else {
      return 'h-28';
    }
}

export const DragArea: React.VFC<Props> = (props) => {
  const { event } = props;
  const css = calculateDuration(event.duration)
  return (
    <div className={`${css} w-52 bg-blue-500
      rounded transition-all duration-500 ease-out hover:font-bold hover:bg-blue-300 cursor-grabbing text-white font-medium m-1 p-1
      flex justify-center
      `}>
        <p>{event.title}</p>
    </div>
  );
};
export default DragArea;