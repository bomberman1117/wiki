import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Summary from "../components/pokedex/Summary";
import "../css/style.css";
import "../css/collapse.css";
import '../css/article.css'
import Article from "../components/pokedex/Article";

//The page format of a wiki entry for a single pokemon
const PokedexEntry = ({ is_admin = false }: { is_admin?: boolean }) => {
  const [article, setArticle] = useState<any>({});
  //get the parameteres of the url
  const params = useParams();
  //set up use states for the different API calls
  const [pageData, setPageData] = useState<any>({});
  //prepare navigation for the user
  const navigate = useNavigate();
  //call the wiki api to get the general information for the selected pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3030/pokedex/${params.name}`
        );
        const text = await axios.get(
          `http://localhost:3030/article/${params.name}`
        );
        setPageData(res.data[0]);
        setArticle(text.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, [params.name]);
  return (
    <div className="pokedex-entry">
      {/*Display pokemon name at the top of the page*/}
      <h1>{pageData.name}</h1>
      <div className="row">
        {/* split the page the doisplay pokemon's data, filling the majority of the page with theh pokemon's articles */}
        <div className="col-9">
          <Article is_admin={is_admin} article={article} title={pageData.name} />
        </div>
        <div className="col-3">
          {/* Fill the rest of the page with a stat summary filled with information from the earlier api call */}
          <Summary entry={pageData} />
        </div>
      </div>
      {/* Create a manual back button to take the user back to the page they came from (likely the pokedex) */}
      <button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        {" Back"}
      </button>
    </div>
  );
};

export default PokedexEntry;
