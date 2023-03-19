import { VFC,} from "react"


type Props = {
  toggleWeekEnds: () => void;
  weekendsVisible: boolean;
};


export const Sidebar: VFC<Props> = ({
  toggleWeekEnds,  weekendsVisible
}) => (
  <>
  <div className="app-sidebar">
    <div className="sidebar-section">
      <h2>捜査方法</h2>
      <ul>
        <li>日付を選んでイベント作成</li>
        <li>クリックでイベント削除</li>
      </ul>
      </div>
      <div className="sidebar-section">
      <label>
        <input
          type="checkbox"
          checked={weekendsVisible}
          onChange={toggleWeekEnds}
        />
         休日を表示
      </label>
    </div>
  </div>;
  </>
  )