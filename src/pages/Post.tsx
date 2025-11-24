import { Collapse, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import "../css/style.css";
import "../css/collapse.css";
import axios from "axios";

const Post = () => {
  const [value, setValue] = useState<any>([{key: 0, label: "title"}])
  const [text, setText] = useState<any>("Type Something!")
  const [article, setArticle] = useState<any>([])
  const [title, setTitle] = useState<string>("Title")
  let counter = 2
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const text = await axios.get(
          `http://localhost:3030/article/Swablu`
        );
        setArticle(text.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, []);
  const addValue = (text: string) => {
    const temp = {
      title: title,
      body: text
    }
    counter += 1;
    setValue([...value, temp])
    setArticle([...article, temp])
    printArticle()
  }

  const printArticle = () => {
    article.forEach((snippet: any) => {
      console.log(snippet)
    })
  }
   return (
    <div>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button onClick={() => {addValue(text)}}>Write!</button>
      
    </div>
  );
};

export default Post;
