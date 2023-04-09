import { Button } from "@material-tailwind/react";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  onClick: any;
};
export const SidebarBtn: React.VFC<Props> = (props) => {

  const {onClick, title} = props
  
  // return <button onClick={props.onClick}>{props.title}</button>;
  return (
    <Button className="flex justify-center w-52 bg-blue-500
    rounded transition-all duration-300 ease-out hover:bg-blue-300 cursor-grabbing text-white font-medium m-1 p-1
    flex justify-center">
      <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5 " onClick={onClick} /> {title}
    </Button>
  )
  
};
export default SidebarBtn;
