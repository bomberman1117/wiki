import React from "react";
import "../../css/summary.css";
import "../../css/style.css";
import { getColor } from "../../util/commonFunctions";
import StatSummary from "./StatSummary";

const HumanSummary = ({ entry = {} }: { entry: any }) => {
  const imgURL = `/images/Humans/Full/${entry.file_name}`;
  const type_1 = getColor(entry.type_1);
  const type_2 = getColor(entry.type_2);
  const stats = {
    top_atk: entry.main_atk,
    bot_atk: entry.alt_atk,
    top_def: entry.main_def,
    bot_def: entry.alt_def,
    speed: entry.speed,
    stamina: entry.stamina,
  };
  return (
    <div className="summary">
      <div className="container">
        <div className="row name-id">
          <div className="name">{entry.name}</div>
        </div>
        <img src={imgURL} alt={entry.name} />
        <div className="title">
          <div>Type(s)</div>
          <div className="body">
            <img
              className="icon-small"
              src={`/images/Types/TYPE_${type_1.name}.png`}
              alt={type_1.name}
              onError={(e) => {
                e.currentTarget.src = "/images/Unknown.png";
              }}
            />
            {type_2 && (
              <img
                className="icon-small"
                src={`/images/Types/TYPE_${type_2.name}.png`}
                alt={type_2.name}
              />
            )}
          </div>
        </div>
        <StatSummary stats={stats} />
      </div>
    </div>
  );
};

export default HumanSummary;
