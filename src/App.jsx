import Game from './Game.jsx';
import { fetchFlagData } from './api.js';
import { FlagObject } from './flag.js';

const flagData = await fetchFlagData();

export default function App() {
  return (
    <>
      <Game model={flagData} />
    </>
  );
}