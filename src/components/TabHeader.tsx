import React from "react";

const TabHeader = ({ name = "Yellow" }: { name: string }) => {
  let url: string;
  switch (name) {
    case "Blue":
      url = "IndigoIcon.png";
      break;
    case "Red":
      url = "CeriseIcon.png";
      break;
    case "Green":
      url = "HunterIcon.png";
      break;
    default:
      url = name + "Icon.png";
  }

  return (
    <div>
      <img className="icon-header" src={`./images/Icons/${url}`} alt={url} />
      <div>{name} Version</div>
    </div>
  );
};

export default TabHeader;
