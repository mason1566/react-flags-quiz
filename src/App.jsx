import FlagQuiz from './FlagQuiz.jsx';
import { fetchFlagData } from './api.js';
import { shuffleArray } from "./utils";

// flagData is an array of FlagData objects in form: [  { code: "code", names: ["name"], src: "img_src", continent: "continent", revealed: bool }, ... ]
const flagData = await fetchFlagData();
shuffleArray(flagData);
shuffleArray(flagData);


export default function App() {
  return (
    <>
      <FlagQuiz model={flagData} />
    </>
  );
}