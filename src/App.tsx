import React, { useState } from "react";
import clsx from "clsx";
import SeeScore from "./components/SeeScore";
import CreateGame from "./components/CreateGame";

const App: React.FC = () => {
  const [activeTab, setactiveTab] = useState(1);

  const handleTabChange = (tab: number) => {
    setactiveTab(tab);
  };

  return (
    <div className="container mx-auto">
      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        <a
          href="#"
          role="tab"
          className={clsx("tab", {
            "tab-active": activeTab === 1,
          })}
          onClick={() => handleTabChange(1)}
        >
          See Scores
        </a>
        <a
          role="tab"
          className={clsx("tab", {
            "tab-active": activeTab === 2,
          })}
          onClick={() => handleTabChange(2)}
        >
          Manage Games
        </a>
      </div>
      {activeTab === 1 && <SeeScore />}
      {activeTab === 2 && <CreateGame />}
    </div>
  );
};

export default App;
