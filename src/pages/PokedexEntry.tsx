import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Summary from "../components/pokedex/Summary";
import "../css/style.css";
import "../css/collapse.css";
import { Collapse, Modal } from "antd";
import { titleize } from "../util/commonFunctions";

//The page format of a wiki entry for a single pokemon
const PokedexEntry = ({ is_admin = false }: { is_admin?: boolean }) => {
  //get the parameteres of the url
  const params = useParams();
  //set up use states for the different API calls
  const [pageData, setPageData] = useState<any>({});
  const [article, setArticle] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
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
  const showModal = () => {
    console.log("showing Modal");
    setIsOpen(true);
  };
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
  const deleteSegment = async (fileName: string) => {
    const res = axios
      .post(`http://localhost:3030/delete/${pageData.name}`, {
        file: fileName,
      })
      .then(() => {
        console.log(res);
        setIsOpen(false);
        window.location.reload();
      });
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
  return (
    <div className="pokedex-entry">
      {/*Display pokemon name at the top of the page*/}
      <h1>{pageData.name}</h1>
      <div className="row">
        {/* split the page the doisplay pokemon's data, filling the majority of the page with theh pokemon's articles */}
        <div className="col-9">{display(article)}</div>
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
