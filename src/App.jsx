import Game from './Game.jsx';
import { fetchFlagData } from './api.js';

// flagData is an object in form: { code: { names: ["name"], src: "img_src" }, ... }
const flagData = await fetchFlagData();


export default function App() {
  console.log(flagData);

  return (
    <>
      <Game model={flagData} />
    </>
  );
}