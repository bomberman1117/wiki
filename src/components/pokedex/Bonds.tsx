import React from 'react'
import "../../css/summary.css";
import "../../css/style.css";
import { Bond } from './Bond';


const Bonds = ({entry = []}: {entry: any}) => {

    const mapBonds = () => {
        const result = []

        for(const bond in entry) {
            result.push(<Bond entry={entry[bond]} />)
        }

        return result
    }
    return (
        <div className="title">
            {mapBonds()}
        </div>
    )
}

export default Bonds