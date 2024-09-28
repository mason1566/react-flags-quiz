import Game from './Game.jsx';
import { fetchFlagData } from './api.js';

const flagData = await fetchFlagData();

export default function App() {
  return (
    <>
      <Game model={flagData} />
    </>
  );
}