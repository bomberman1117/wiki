import React from "react";

const View = ({
  title = "title",
  data = [],
}: {
  title: string;
  data: boolean[];
}) => {
  return (
    <div className="title">
      <div>{title}</div>
      <div className="body">
        {!!data[0] && (
          <img
            className="icon-small"
            src="/images/Icons/CeriseIcon.png"
            alt="Cerise"
          />
        )}
        {!!data[1] && (
          <img
            className="icon-small"
            src="/images/Icons/HunterIcon.png"
            alt="Hunter"
          />
        )}
        {!!data[2] && (
          <img
            className="icon-small"
            src="/images/Icons/IndigoIcon.png"
            alt="Indigo"
          />
        )}
      </div>
    </div>
  );
};

export default View;
