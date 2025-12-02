import React from "react";
import "../../css/summary.css";
import "../../css/style.css";
import { getColor } from "../../util/commonFunctions";
import View from "../View";
import StatSummary from "./StatSummary";
//a general overview of a selected pokemon's typing and stats
const Summary = ({ entry = {} }: { entry: any }) => {
  //attempt to create the image path of the pokemon
  const imgURL = `/images/Pokedex/${entry.name}.png`;
  //create a display string for the pokemon's pokedex ID
  const pokedex_id = `#${String(entry.pokedex_id).padStart(3, "0")}`;
  //get the type information of the pokemon
  const type_1 = getColor(entry.type_1);
  const type_2 = getColor(entry.type_2);
  //create an object to hold all stat information
  const stats = {
    top_atk: entry.main_atk,
    bot_atk: entry.alt_atk,
    top_def: entry.main_def,
    bot_def: entry.alt_def,
    speed: entry.speed,
    stamina: entry.stamina,
  };
  //create an object to hold all seen data
  const seeData = [
    entry.seen_by_cerise,
    entry.seen_by_hunter,
    entry.seen_by_indigo,
  ];
  //create an object to hold all battle data
  const battleData = [
    entry.battled_cerise,
    entry.battled_hunter,
    entry.battled_indigo,
  ];
  //create an object to hold all capture data
  const captureData = [
    entry.caught_by_cerise,
    entry.caught_by_hunter,
    entry.caught_by_indigo,
  ];
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
          {/* display the pokemon's name */}
          <div className="col-9 name">{entry.name}</div>
          {/* display the pokemon's dokedex entry */}
          <div className="col id">{pokedex_id}</div>
        </div>
        {/* display the full image of the pokemon */}
        <img src={imgURL} alt={entry.name} />
        <div className="title">
          {/* display the various types of the pokemon */}
          <div>Type(s)</div>
          <div className="body">
            {/* all pokemon have at least one type, so we can always display type_1 */}
            <img
              className="icon-small"
              src={`/images/Types/TYPE_${type_1.name}.png`}
              alt={type_1.name}
              onError={(e) => {
                e.currentTarget.src = "/images/Unknown.png";
              }}
            />
            {/* we need to conditionally display the value of type_2 since not all pokemon are dual typed */}
            {type_2 && (
              <img
                className="icon-small"
                src={`/images/Types/TYPE_${type_2.name}.png`}
                alt={type_2.name}
              />
            )}
          </div>
        </div>
        {/* display the stat block data of the pokemon */}
        <StatSummary stats={stats} />
        {/* display the name of the evolved form of this pokemomn (if it exists) */}
        {entry.evolution && section("Evolution", entry.evolution)}
        {/* display the seen data of the pokemon */}
        <View title="Seen By" data={seeData} />
        {/* display the battle data of the pokemon */}
        <View title="Battled" data={battleData} />
        {/* display the capture data of the pokemon */}
        <View title="Caught By" data={captureData} />
      </div>
    </div>
  );
};

export default Summary;
