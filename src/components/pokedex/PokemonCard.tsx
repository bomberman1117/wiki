import React from 'react'
import '../../css/card.css'
import { getColor } from '../../util/commonFunctions'

const PokemonCard = ({pokemon = {}}:{pokemon:any}) => {
  const isPokemon = pokemon.file_name == null
  const type_1 = getColor(pokemon.type_1)
  const type_2 = getColor(pokemon.type_2)

  const bond = () => {
    const bond = <img className="icon-bond col-4" src={`/images/Icons/bond.png`} />
    const empty = <img className="icon-bond col-4" src={`/images/Icons/dark_bond.png`} />
    const temp = []

    for(let i = 0; i < 6 ; i++)
      if(i < pokemon.bond)
        temp.push(bond)
      else
        temp.push(empty)

    return (
      <div className='exp'>
        <div className='row bond-row'>
          {temp}
        </div>
      </div>
    )
  }

  const exp = () => {
    const name = import.meta.env.VITE_SAFE_MODE == 1 ? 'bond' : 'exp'
    const exp = <img className="icon-small col" src={`/images/Icons/${name}.png`} />
    const empty = <img className="icon-small col" src={`/images/Icons/dark_${name}.png`} />
    const topRow = []
    const botRow = []

    for(let i = 0; i < 10; i++){
      if(i < 5){
        if(i < pokemon.exp)
          topRow.push(exp)
        else
          topRow.push(empty)
      }
      else {
        if(i < pokemon.exp)
          botRow.push (exp)
        else
          botRow.push(empty)
      }
      
    }

    return (
      <div className='exp'>
        <div className='row exp-row'>
          {topRow}
        </div>
        <div className='row exp-row'>
          {botRow}
        </div>
      </div>
    )
  }
  return (
    <div className="card">
      <div className='name'>
        {pokemon.name}
      </div>
      <div className='row'>
        <div className='col-8 name'>
          {pokemon.pronouns}
        </div>
        <div className='col types'>
          <img className="icon-card" src={`/images/Types/TYPE_${type_1.name}.png`} alt={type_1.name} onError={(e) => { e.currentTarget.src = "/images/Unknown.png"; }} />
          {type_2 && (
            <img
              className="icon-card"
              src={`/images/Types/TYPE_${type_2.name}.png`}
              alt={type_2.name}
            />
            )}
        </div>
      </div>
      {isPokemon? 
      <img className='party-image' src={`/images/Pokedex/${pokemon.pokemon_name}.png`} /> : 
      <img className='party-human' src={`/images/Humans/Headshots/${pokemon.file_name}`} />
      }
      
      {
      isPokemon? 
      pokemon.human_id < 4 && exp() :
      bond()
      }
    </div>
  )
}

export default PokemonCard