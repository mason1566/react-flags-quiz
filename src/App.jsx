import Game from './Game.jsx';
import { fetchFlagData } from './api.js';

// flagData is an array in form: [  { code: "code", names: ["name"], src: "img_src", revealed: bool }, ... ]
const flagData = await fetchFlagData();


export default function App() {
  console.log(flagData);

  return (
    <>
      <Game model={flagData} />
    </>
  );
}