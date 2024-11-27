

/**
 * @function fetchData
 * @description funcion que obtiene el pokemon de la api de pokemon y lo muestra en pantalla
 * @param {any} pokemon id o nombre del pokemon al buscar
 * @returns el objeto json del pokemon
 */
async function fetchData(pokemon){

  try{
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(!response.ok){
      throw new Error('No pudimos obtener el recurso')
    }
    const data = await response.json();
    
    //carga lo datos del objeto json a variables para su mejor uso
    pokemonSprite = data.sprites.front_default
    pokemonName = data.name
    pokemonStats = data.stats
    pokemonTypes = data.types
    pokemonId = data.id

    //mostrar tipo de pokemon
    if(pokemonTypes.length > 1){
      typeTwoElement.style.display = 'block';
      typeTwoElement.innerHTML = pokemonTypes[1].type.name
    }else{
      typeTwoElement.style.display = 'none';
    }
    typeOneElement.innerHTML = pokemonTypes[0].type.name

    //modificar el html para mostrar el pokemon
    imgElement.src = pokemonSprite;
    nameElement.innerHTML = pokemonName
    idElement.innerHTML = pokemonId
    hpElement.innerHTML = pokemonStats[0].base_stat
    attackElement.innerHTML = pokemonStats[1].base_stat
    defenseElement.innerHTML = pokemonStats[2].base_stat
    spAElement.innerHTML = pokemonStats[3].base_stat
    spDElement.innerHTML = pokemonStats[4].base_stat
    speedElement.innerHTML = pokemonStats[5].base_stat
    
    return data
  }catch(error){
    console.error(error)
  }
  
}

//variables en donde se almacenara los datos del pokemon
let pokemonId;
let pokemonData;
let pokemonSprite;
let pokemonName;
let pokemonStats;
let pokemonTypes;


//elementos de html

const submit = document.getElementById('submitPokemon')
const randomButton = document.getElementById('radomButton')
const imgElement =document.getElementById('sprite')
const typeOneElement = document.getElementById('firstType')
const typeTwoElement = document.getElementById('secondType')
const nameElement = document.getElementById('pokemonName')
const idElement = document.getElementById('pokedexEntry')
const hpElement = document.getElementById('hp')
const attackElement = document.getElementById('attack')
const defenseElement = document.getElementById('defense')
const spAElement = document.getElementById('spAttack')
const spDElement = document.getElementById('spDef')
const speedElement = document.getElementById('speed')

//eventos de botones
submit.addEventListener('click', (e) =>{
  e.preventDefault()
  const search = document.getElementById('searchPokemon').value.toLowerCase()
  pokemonData = fetchData(search)
  console.log(pokemonData)
  
})

randomButton.addEventListener('click', () =>{
  pokemonId = Math.floor(Math.random() * (1025 - 1 + 1)) + 1
  pokemonData= fetchData(pokemonId);
  console.log(pokemonData)
})


