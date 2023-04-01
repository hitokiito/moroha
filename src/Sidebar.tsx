import { DragAndDropArea } from "./DragAndDropArea";

interface Props {
}

const Sidebar: React.VFC<Props> = () => (
  <div className="demo-app-sidebar">
    <DragAndDropArea/>
  </div>
);

export default Sidebar;