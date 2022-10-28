import logo from './logo.svg';
import './App.css';
function Nappain(props) {

  console.log ("props",props)
  return (

      <button onClick={()=>props.nappainPainettu(props.nappain)}>{props.nappain}</button>
  );
}

export default Nappain;