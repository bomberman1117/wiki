import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Select } from "antd";
import "../css/select.css";

const AddPartyPokemon = () => {
  const [humans, setHumans] = useState<any>([]);
  const [pokes, setPokemon] = useState<any>([]);
  const [selection, setSelection] = useState<any>({human: 0, pokemon: 0, name: "none", pronouns: "It/Its", in_party: false, exp: 0 })

  let humanData: any[] = [];
  let pokemonData: any[] = [];

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const hData = await axios.get("http://localhost:3030/humans");
        setHumans(hData.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const pData = await axios.get("http://localhost:3030/pokedex");
        setPokemon(pData.data);
      } catch (err) {}
    };
    fetchPokemon().finally(() => {});
  }, []);

  const selectHuman = (e: any) => {
    selection.human = e;
  };

  const selectPokemon = (e: any) => {
    selection.pokemon = e;
  };

  const setName = (e: any) => {
    selection.name = e.target.value;
  };

  const setPronouns = (e: any) => {
    selection.pronouns = e.target.value;

  };
  const setExp = (e: any) => {
    const value = e.target.value
    selection.exp = value
  }

  const onChange = (e: any) => {
    selection.in_party = e.target.checked;
  };

  const addPokemon = async () => {
    try {
      await axios.post("http://localhost:3030/addToParty",
        {
          pokemon_id: selection.pokemon,
          human_id: selection.human,
          name: selection.name,
          pronouns: selection.pronouns,
          in_party: selection.in_party,
          exp: selection.exp
        }).then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };
  for (const index in pokes) {
    pokemonData.push({
      value: pokes[index].pokedex_id,
      label: pokes[index].name,
    });
  }
  for (const index in humans) {
    humanData.push({
      value: humans[index].human_id,
      label: humans[index].name,
    });
  }
  return (
    <div className="pokemon-form">
      <div className="section">
        <div>
          <input id="name" type="text" placeholder="Name" onChange={setName} />
        </div>
        <div>
          <input id="pronouns" type="text" placeholder="Pronouns" onChange={setPronouns} />
        </div>
        <div>
          <input className="exp-input" id="exp" type="number" placeholder="EXP" onChange={setExp} min={0} max={10} />
        </div>
      </div>
      <div className="section">
        <Select 
          showSearch={true}
          optionFilterProp= {'label'}
          options={humanData} 
          placeholder="Trainer" 
          onSelect={selectHuman}
        />
      </div>
      <div className="section">
        <Select 
          showSearch={true}
          optionFilterProp= {'label'}
          options={pokemonData} 
          placeholder="Pokémon" 
          onSelect={selectPokemon} 
        />
        <Checkbox onChange={onChange}>In the party?</Checkbox>
      </div>
      <button onClick={() => {addPokemon()}}>Create</button>
    </div>
  );
};

export default AddPartyPokemon;
