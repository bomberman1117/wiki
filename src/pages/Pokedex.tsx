import React, { useEffect, useState } from "react";
import "../css/table.css";
import "../css/style.css";
import { Table, Tag } from "antd";
import axios from "axios";
import { getColor } from "../util/commonFunctions";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

//the primary pokedex display, listing all known pokedex entries
const Pokedex = ({ is_admin = false }: { is_admin?: boolean }) => {
  //create a use state to hold the data recieved from an api call
  const [pokemon, setPokemon] = useState<any>([]);
  const navigate = useNavigate();
  //call the wiki api to return all data about any pokemon in the db
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get("http://localhost:3030/pokedex");
        setPokemon(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, []);
  //a function to display the pagination navigation icons
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
  //map the pokemon data to four primary json values per data entry
  const data = pokemon.map((pokemon: any) => {
    return {
      key: pokemon.pokedex_id,
      name: pokemon.name,
      type_1: pokemon.type_1,
      type_2: pokemon.type_2,
    };
  });
  //create table columns to display to the user
  const columns = [
    {
      //the pokedex entry number of the current pokemon
      title: "Pokedex #",
      dataIndex: "key",
    },
    {
      //a picture of the listed pokemon
      title: "Img",
      dataIndex: "name",
      render: (text: string) => {
        return (
          <img
            className="pokedex-image"
            src={`/images/Pokedex/${text}.png`}
            alt={text}
            onError={(e) => {
              e.currentTarget.src = "/images/error.png";
            }}
          />
        );
      },
    },
    {
      //the pokemon's name
      title: "Name",
      dataIndex: "name",
    },
    {
      //the pokemon's type(s) displayed by tag elements
      title: "Type(s)",
      dataIndex: ["type_1", "type_2"],
      render: (text: any, record: any) => {
        //types in the db are mapped to integer values so they should be converted back to readable text
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
  //the pagination element of the table displayed to the user
  const pagination = {
    total: pokemon.length,
    defaultCurrent: 1,
    defaultPageSize: 25,
    itemRender: itemRender,
  };
  return (
    <div className="pokedex">
      <h1>Pokédex</h1>
      <div className="content">
        {/* display the pokedex table to the user, including
        1. mapped pokedex data
        2. the column titles of the data
        3. the pagination element to navigate the table
        4. the key for each row
        5. and a link to each pokemon's individual entry page
        */}
        <Table
          dataSource={data}
          columns={columns}
          pagination={pagination}
          rowKey={"key"}
          onRow={(record: any) => ({
            onClick: () =>
              navigate(
                is_admin
                  ? `/admin/pokedex/${record.name}`
                  : `/pokedex/${record.name}`
              ),
          })}
        />
      </div>
    </div>
  );
};

export default Pokedex;
