import React, { useRef, useState } from "react";
import { Collapse, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { titleize } from "../../util/commonFunctions";
import axios from "axios";
import ReactQuill from "react-quill-new";
import parse from 'react-html-parser'
import "react-quill/dist/quill.snow.css";
import '../../css/article.css'

const Article = ({ is_admin = false, article = [], title = "Error"}: { is_admin?: boolean; article: any; title: string; }) => {
    const [canDelete, setCanDelete] = useState<number>(-1);
    const [isEditing, setIsEditing] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [value, setValue] = useState<any>({title: "Title", body: "text"})

    let snippets: any[] = [];
    let count: number[] = []

    const deleteSegment = async (fileName: string) => {
        const res = axios
        .post(`http://localhost:3030/delete/${title}`, {
            file: fileName,
        })
        .then(() => {
            console.log(res);
            setCanDelete(-1);
            window.location.reload();
        });
    };
    const addSegment = async () => {
        const res = axios
        .post(`http://localhost:3030/write/${title}`, {
            file: value.title,
            text: value.body
        })
        .then(() => {
            console.log(res);
            setIsOpen(false);
            window.location.reload();
        });
    }
    const handleArticleSave = async (e: any, index: number, body: string) => {
        value.title = e.srcElement.parentElement.parentElement.parentElement.children[1].children[0].children[0]?.value || "summary"
        if(value.title === '')
            value.title = e.srcElement.parentElement.parentElement.parentElement.children[1].children[0].placeholder
        if(value.body == 'text')
            value.body = body

        article[index] = value
        console.log(article)
        const res = axios
        .post(`http://localhost:3030/edit/${title}`, { snippets: article})
        .then(() => {
            setIsEditing(-1)
            window.location.reload()
        })        
    }
    const setTitle = (input: any) => {
        value.title = input.target.value
    }
    const setBody = (input: string) => {
        value.body = input;
    }
    
    const Snippet = ( key: number = -1, segment: any = {title: "TITLE", body: "BODY"}) => {
        return {
            key: key,
            label: titleize(segment.title),
            children: parse(segment.body),
            extra: is_admin ? (
                <div>
                    {segment.title === "summary" ? null : <DeleteOutlined onClick={() => setCanDelete(key)} /> }
                    <EditOutlined onClick={() => { setIsEditing(key) }} />
                    {canDelete == key && (
                        <Modal title="Delete" open={canDelete == key} okText="Delete" onOk={() => deleteSegment(segment.title)} onCancel={() => setCanDelete(-1)}>
                        Are you sure you want to delete {segment.title}?
                        </Modal>
                    )}
                    {isEditing == key &&
                            <Modal 
                                title={
                                    segment.title === "summary" ? 
                                    segment.title : 
                                    <input type="text" placeholder={segment.title} defaultValue={segment.title} onChange={setTitle}/>
                                }
                                open={isEditing == key}
                                okText="Save"
                                onOk={(e) => handleArticleSave(e.nativeEvent, key, segment.body)}
                                onCancel={() => setIsEditing(-1)}>
                                    <ReactQuill theme="snow" value={segment.body} onChange={setBody}/>
                            </Modal>
                    } 
                </div>
            ) : null,
            collapsible: segment.title === "summary" ? "disabled" : is_admin ? "icon" : null,
        };
    };
    for(let counter = 0; counter < article.length; counter++){
        snippets.push(Snippet(counter, article[counter]))
        count.push(counter)
    }
    return (
        <div>
            <Collapse items={snippets} activeKey={count} />
            <Modal title="Add New Segment" open={isOpen} okText="Confirm" onOk={() => addSegment()} onCancel={() => setIsOpen(false)}>
                <input type="text" placeholder={"File Name"} onChange={setTitle}/>
                <ReactQuill theme="snow" placeholder="New Article Segment" onChange={setBody}/>
            </Modal>
            <div className="new-button">
                {is_admin && <button onClick={() => {setIsOpen(true)}}>New Section</button>}
            </div>
        </div>
    )
};

export default Article;
