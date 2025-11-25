import React from 'react'

const PokemonCard = (pokemon:any = {}) => {
  return (
    <div>
        {pokemon.name}
    </div>
  )
}

export default PokemonCard