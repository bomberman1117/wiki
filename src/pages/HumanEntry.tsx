import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/style.css";
import HumanSummary from "../components/pokedex/HumanSummary";
import Article from "../components/pokedex/Article";
import Party from "../components/pokedex/Party";

const HumanEntry = ({is_admin = false}: {is_admin?: boolean}) => {
  const params = useParams();
  const [pageData, setPageData] = useState<any>({});
  const [article, setArticle] = useState<any>({})
  const [party, setParty] = useState<any>([])
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3030/humans/${params.name}`
        );
        const text = await axios.get(
          `http://localhost:3030/article/${params.name}`
        );
        const party = await axios.get(
          `http://localhost:3030/party/${params.name}`
        );
        setPageData(res.data[0]);
        setParty(party.data)
        setArticle(text.data);

        return text.data

      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon().then((res) => console.log(res));
    console.log()
  }, [params.name]);
  return (
    <div className="pokedex-entry">
      <h1>{pageData.name}</h1>
      <div className="row">
        <div className="col-9">
          <Article is_admin={is_admin} article={article} title={pageData.name} />
          <Party party={party}/>
        </div>
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
