import React from "react";
import { Tabs } from "antd";
import { useState } from "react";
import StoryCard from "./StoryCard";
import TabHeader from "../components/TabHeader";
import "../css/tabs.css";

//a small componenet for the user to switch between the different versions of the story
const NewUpdate = () => {
  //create a use state to keep track of which tab is selected
  const [activeTab, setActiveTab] = useState(1);
  //create an empty array to store the header values of the tabs
  const items = [];

  //run a short loop to create the header values of the tabs
  for (let i: number = 0; i < 3; i++) {
    let result: string;
    //check which version the loop should create
    switch (i) {
      case 0:
        result = "Blue";
        break;
      case 1:
        result = "Red";
        break;
      case 2:
        result = "Green";
        break;
      default:
        result = "Yellow";
    }
    //push the data to the headers array
    items.push({
      //
      key: i.toString(),
      label: <TabHeader name={result} />,
      children: <StoryCard version={result} />,
    });
  }
  //a small function that sets the active tab of the page
  const updatePage = (key: number): void => {
    setActiveTab(key);
  };
  return (
    <div>
      <h1>Check Out the Latest Update!</h1>
      {/* display the tabs */}
      <Tabs
        className="tab-selection"
        centered
        items={items}
        defaultActiveKey={"1"}
        onChange={(key) => updatePage(parseInt(key))}
      />
    </div>
  );
};

export default NewUpdate;
