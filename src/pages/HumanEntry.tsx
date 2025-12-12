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
  let bio:any = {}
  let bonds = {}
  const [pageData, setPageData] = useState<any>({bio: {}, bonds: [{}]});
  const [article, setArticle] = useState<any>({})
  const [party, setParty] = useState<any>([])
  const navigate = useNavigate();
  useEffect(() => {
    const id = params.name
    const setFullParty = (first: any[], second: any[]) => {
      setParty(first.concat(second))
    }
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3030/humans/${id}`
        );
        const text = await axios.get(
          `http://localhost:3030/article/${id}`
        );
        const party = await axios.get(
          `http://localhost:3030/party/${id}`
        );
        const partyHumans = await axios.get(
          `http://localhost:3030/humanParty/${id}`
        )
        setPageData(res.data);
        setArticle(text.data);
        setFullParty(party.data, partyHumans.data)

      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, [params.name]);

  return (
    <div className="pokedex-entry">
      <h1>{pageData.bio.name}</h1>
      <div className="row">
        <div className="col-9">
          <Article is_admin={is_admin} article={article} title={pageData.bio.name} />
          <Party party={party}/>
        </div>
        <div className="col-3">
          <HumanSummary entry={pageData} />
        </div>
      </div>
    </div>
  );
};

export default HumanEntry;
