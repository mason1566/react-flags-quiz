import FlagQuiz from './FlagQuiz.jsx';
import { fetchFlagData } from './api.js';
import { shuffleArray } from "./utils";

// flagData is an array in form: [  { code: "code", names: ["name"], src: "img_src", revealed: bool }, ... ]
const flagData = await fetchFlagData();
shuffleArray(flagData);
shuffleArray(flagData);


export default function App() {
  console.log(flagData);

  return (
    <>
      <FlagQuiz model={flagData} />
    </>
  );
}