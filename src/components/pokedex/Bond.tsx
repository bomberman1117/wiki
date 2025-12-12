import React from 'react'

export const Bond = ({entry = {}}: {entry: any}) => {
    console.log(entry)
    const bondBar = () => {
        const result = []
        for(let i = 0; i < 6; i++){
            if(i < entry.bond){
                result.push(<img className="icon-small" src="/images/Icons/bond.png" alt="bond" />)
            }
            else {
                result.push(<img className="icon-small" src="/images/Icons/dark_bond.png" alt="dark_bond" />)
            }
        }
        return result
    }
  return (
    <div>
        <img className="icon-small" src={`/images/Icons/${entry.name}Icon.png`} alt={entry.name} /> {" | "}
        {bondBar()}

    </div>
  )
}
