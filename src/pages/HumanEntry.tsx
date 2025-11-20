import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/style.css";
import HumanSummary from "../components/pokedex/HumanSummary";

const HumanEntry = () => {
  const params = useParams();
  const [pageData, setPageData] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3030/humans/${params.name}`
        );
        setPageData(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, [params.name]);
  return (
    <div className="pokedex-entry">
      <h1>{pageData.name}</h1>
      <div className="row">
        <div className="col-9">this is a human</div>
        <div className="col-3">
          <HumanSummary entry={pageData} />
        </div>
      </div>
      <button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        {" Back"}
      </button>
    </div>
  );
};

export default HumanEntry;
