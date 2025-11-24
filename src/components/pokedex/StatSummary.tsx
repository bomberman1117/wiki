import React from "react";
import "../../css/summary.css";
import StatBlock from "./StatBlock";
import { getStatNames } from "../../util/commonFunctions";

const StatSummary = ({ stats = {} }: { stats: any }) => {
  const names = getStatNames()
  return (
    <div className="container title">
      <div className="row">
        <StatBlock value={stats.stamina} name={names[0]} />
        <StatBlock value={stats.top_atk} name={names[1]} />
        <StatBlock value={stats.top_def} name={names[2]} />
      </div>
      <div className="row">
        <StatBlock value={stats.speed} name={names[3]} />
        <StatBlock value={stats.bot_atk} name={names[4]} />
        <StatBlock value={stats.bot_def} name={names[5]} />
      </div>
    </div>
  );
};

export default StatSummary;
