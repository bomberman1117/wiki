import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';

const Party = ({party =[]}: {party: any[]}) => {
    
  return (
    <PokemonCard pokemon={party[0]} />
  )
}

export default Party