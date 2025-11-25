import React from "react";

//a small componenet to remove repetitive code for displaying data for a single stat of a pokemon
//takes in two parameters, the stat name and the value
const StatBlock = ({ value = -1, name = "name" }: { value: number; name: string; }) => {
  return (
    <div className="col box">
      {/* if value is 0 then the information is unknown */}
      <div>{value ? value : "?"}</div>
      {/* display the user's label under the  the value */}
      <div className="label">{name}</div>
    </div>
  );
};

export default StatBlock;
