import React, { useState } from "react";
import { Collapse, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { titleize } from "../../util/commonFunctions";
import axios from "axios";

const Article = ({
  is_admin = false,
  article = {},
  title = "Error",
}: {
  is_admin?: boolean;
  article: any;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const display = (input: any) => {
    const snippets: any[] = [];
    let counter = 0;
    if (input.hasOwnProperty("summary")) {
      snippets.push({
        key: counter++,
        label: "Summary",
        children: input.summary,
        extra: is_admin ? editIcon("summary") : null,
        collapsible: "disabled",
      });
    }
    for (const key in input) {
      if (key !== "summary") {
        snippets.push({
          key: counter++,
          label: titleize(key),
          children: <div>{input[key]}</div>,
          collapsible: is_admin ? "icon" : null,
          extra: is_admin ? editIcon(key) : null,
        });
      }
    }
    return <Collapse items={snippets} defaultActiveKey={0} />;
  };
  const editIcon = (key: string) => {
    return (
      <div>
        {key === "summary" ? null : (
          <DeleteOutlined onClick={() => showModal()} />
        )}
        <EditOutlined
          onClick={() => {
            console.log("edit!");
          }}
        />
        {isOpen && (
          <Modal
            title="Delete"
            open={isOpen}
            okText="Delete"
            onOk={() => deleteSegment(key)}
            onCancel={() => setIsOpen(false)}
          >
            Are you sure you want to delete {key}.txt?
          </Modal>
        )}
      </div>
    );
  };
  const showModal = () => {
    console.log("showing Modal");
    setIsOpen(true);
  };
  const deleteSegment = async (fileName: string) => {
    const res = axios
      .post(`http://localhost:3030/delete/${title}`, {
        file: fileName,
      })
      .then(() => {
        console.log(res);
        setIsOpen(false);
        window.location.reload();
      });
  };
  return display(article);
};

export default Article;
