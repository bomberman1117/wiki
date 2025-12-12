import PokemonCard from './PokemonCard';

const Party = ({party =[]}: {party: any[]}) => {

  const CardifyParty = () => {
    const Cards = []

    for(let i = 0; i < party.length; i++){
      if(party[i].in_party) 
        Cards.push(
          <div className='col-4'>
            <PokemonCard pokemon={party[i]} />
          </div>)
    }
    if(Cards[0])
      return (
        <div>
        <h3>Current Party</h3>
          <div className='row party'>
            {Cards}
          </div>
      </div>
      )
    else
      return
  }
  const CardifyBox = () => {
    const Cards = []

    for(let i = 0; i < party.length; i++){
      if(!party[i].in_party) 
        Cards.push(
          <div className='col-4'>
            <PokemonCard pokemon={party[i]} />
          </div>)
    }
    if(Cards[0])
      return (
        <div>
        <h3>Boxed Party</h3>
          <div id="party" className='row party'>
            {Cards}
          </div>
      </div>
      )
    else
      return
  }

  return (
    <div>
      {CardifyParty()}
      {CardifyBox()}
    </div>
  )
}

export default Party