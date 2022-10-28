import logo from './logo.svg';
import './App.css';
import {useReducer, useEffect} from "react"
import axios  from "axios"
import Koulu from './Koulu';

let oppilas1 = { nimi: "Olli Oppilas" }

let oppilas2 = { nimi: "Mikko Mallikas" }
let oppilas3 = { nimi: "Kalle Kolmonen" }


let luokka1 = {
  nimi: "3A",
  opplaidenMäärä: 27,
  oppilaat: [oppilas1, oppilas3]
}

let luokka2 = {
  nimi: "2B",
  opplaidenMäärä: 24,
  oppilaat: [oppilas2]
}

let servonData = {
  koulut: [{
    oppilaidenMäärä: 100,
    luokat: [luokka1, luokka2]
  }],
  tallennetaanko: false,
  tietoAlustettu: false
}

function reducer (state, action) {
  switch (action.type) {
    case 'ALUSTA_DATA': {
      return { ...action.payload, tietoAlustettu: true }
    }
    case 'PÄIVITÄ_TALLENNUSTILA': {
      return {...state, tallennetaanko:  action.payload}
    }
    default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
}


function App() {

  const [appData, dispatch] = useReducer (reducer, servonData);

  useEffect(() => {
    const getData = async () => {
      const result = await axios ('http://localhost:8080');
      console.log ('result ', result);
      dispatch({type: "ALUSTA_DATA",  payload: result.data.data});
    }
    getData();
  }, []);

  useEffect(() =>{
    const saveData = async () => {
      try {
      
        const result = await axios.post('http://localhost:8080', {
          data: appData
        })
        dispatch({ type: "PÄIVITÄ_TALLENNUSTILA", payload: false })
      } catch (error) {
        console.log("virhetilanne",error)
      }
    }
    if (appData.tallennetaanko == true) {
      saveData()
    }
  
  }, [appData.tallennetaanko]);


  return (
    <div>

    {appData.tietoAlustettu && appData.koulut.map((koulu, index) => <Koulu kouluIndex={index} koulu={koulu} dispatch={dispatch} />)}
    <button onClick={() => dispatch({ type: 'LISÄÄ_KOULU' })}>Lisää uus koulu</button>
  </div>
  );
}

export default App;
