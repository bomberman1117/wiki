import React from "react";
import "../../css/summary.css";
import "../../css/style.css";
import { getColor } from "../../util/commonFunctions";
import StatSummary from "./StatSummary";
import Bonds from "./Bonds";

const HumanSummary = ({ entry = {} }: { entry: any }) => {
  const bio = entry.bio
  const bonds = entry.bonds
  const imgURL = `/images/Humans/Full/${bio.file_name}`;
  const type_1 = getColor(bio.type_1);
  const type_2 = getColor(bio.type_2);
  const stats = {
    top_atk: bio.main_atk,
    bot_atk: bio.alt_atk,
    top_def: bio.main_def,
    bot_def: bio.alt_def,
    speed: bio.speed,
    stamina: bio.stamina,
  };
  const section = (input: string, data: any) => {
    return (
      <div className="title">
        <div>{input}</div>
        <div className="body">{data}</div>
      </div>
    );
  };

  return (
    <div className="summary">
      <div className="container">
        <div className="row name-id">
          <div className="name">{bio.name}</div>
        </div>
        <img src={imgURL} alt={bio.name} />
        {section("Pronouns", bio.pronouns)}
        
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
        {bonds[0].name && <Bonds entry={bonds} />}
      </div>
    </div>
  );
};

export default HumanSummary;
