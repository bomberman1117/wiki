import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getColor } from "../util/commonFunctions";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../css/table.css";
import "../css/style.css";

const HumanDex = () => {
  const [humans, setHumans] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get("http://localhost:3030/humans");
        setHumans(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, []);
  const itemRender = (_: any, type: string, originalElement: any) => {
    if (type === "prev") {
      return (
        <div className="pagination">
          <LeftOutlined />
        </div>
      );
    }
    if (type === "next") {
      return (
        <div className="pagination">
          <RightOutlined />
        </div>
      );
    }
    return originalElement;
  };
  const data = humans.map((human: any) => {
    return {
      key: human.human_id,
      name: human.name,
      type_1: human.type_1,
      type_2: human.type_2,
      file: human.file_name,
    };
  });
  const columns = [
    {
      title: "Img",
      dataIndex: "file",
      render: (text: string) => {
        return (
          <img
            className="pokedex-image"
            src={`/images/Humans/Headshots/${text}`}
            alt={text}
            onError={(e) => {
              e.currentTarget.src = "/images/error.png";
            }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type(s)",
      dataIndex: ["type_1", "type_2"],
      render: (text: any, record: any) => {
        let values: any = getColor(record.type_1);
        let values_2: any = getColor(record.type_2);
        return (
          <div className="tags">
            <Tag color={values.color}>{values.name}</Tag>
            {values_2 && <Tag color={values_2.color}>{values_2.name}</Tag>}
          </div>
        );
      },
    },
  ];
  const pagination = {
    total: humans.length,
    defaultCurrent: 1,
    defaultPageSize: 25,
    itemRender: itemRender,
  };

  return (
    <div className="pokedex">
      <h1>Human Characters</h1>
      <div className="content">
        <Table
          dataSource={data}
          columns={columns}
          pagination={pagination}
          rowKey={"key"}
          onRow={(record: any) => ({
            onClick: () => navigate(`/humans/${record.name}`),
          })}
        />
      </div>
    </div>
  );
};

export default HumanDex;
