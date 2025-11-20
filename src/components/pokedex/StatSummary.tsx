import React from "react";
import "../../css/summary.css";
import StatBlock from "./StatBlock";

const StatSummary = ({ stats = {} }: { stats: any }) => {
  return (
    <div className="container title">
      <div className="row">
        <StatBlock value={stats.stamina} name="Stamina" />
        <StatBlock value={stats.top_atk} name="Top ATK" />
        <StatBlock value={stats.top_def} name="Top DEF" />
      </div>
      <div className="row">
        <StatBlock value={stats.speed} name="Stamina" />
        <StatBlock value={stats.bot_atk} name="Bot ATK" />
        <StatBlock value={stats.bot_def} name="Bot DEF" />
      </div>
    </div>
  );
};

export default StatSummary;
