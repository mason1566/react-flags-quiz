import { useState, useReducer, useMemo } from "react";

// model is an array containing FlagObjects in the form: {code: 'xx', src: 'flag_url', names: ["name"], continent: "continent", revealed: bool}
export default function Game({model}) {
    const [modelOriginal, setModelOriginal] = useState([...model]); // A backup of our countries array
    const [score, setScore] = useState(0);
    const [flagsLeft, setFlagsLeft] = useState(model.length); // This variable keeps track of how many flags are left to be guessed.
    const [inputValue, setInputValue] = useState('');
    const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
    const [viewableFlagsCount, setViewableFlagsCount] = useState(model.length);
    const [hintRevealed, setHintRevealed] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    function goPrevFlag() {
        const index = handleOverflow(currentFlagIndex - 1);
        goFlag(index);
    }

    function goNextFlag() {
        const index = handleOverflow(currentFlagIndex + 1);
        goFlag(index);
    }

    function goFlag(index) {
        if (index >= viewableFlagsCount || index < 0) {
            throw new Error("Error in goFlag() - Index out of bounds");
        }
        setCurrentFlagIndex(index);
        setHintRevealed(false);
        setInputValue('');
    }

    function handleOverflow(flagIndex) {
        if (flagIndex < 0) return viewableFlagsCount - 1;
        else if (flagIndex >= viewableFlagsCount) return 0;
        return flagIndex;
    }

    function revealCurrentFlag() {
        if (model[currentFlagIndex].revealed) return; // do nothing if the flag is already revealed
        
        setFlagsLeft(flagsLeft - 1);
        model[currentFlagIndex].revealed = true;
        checkEndGame();
    }
    
    function handleGuess(guess) {
        setInputValue(guess);
        if (model[currentFlagIndex].hasName(guess)) {
            handleCorrectGuess();
        }
    }

    function handleCorrectGuess() {
        removeFlag(currentFlagIndex); // Remove the current flag
        setInputValue('') // Reset our input value
        setScore(score+1);
        setHintRevealed(false);
        checkEndGame()
    }

    function removeCurrentFlag() {
        // Throw error if there are no flags to remove
        if (flagsLeft === 0) {
            throw new Error("Error in reducer - action 'remove_flag': No flags left to remove");
        }
        else {
            removeFlag(currentFlagIndex);
        }
    }

    function removeFlag(index) {
        if (index >= model.length) {
            throw new Error("Error in removeFlag: index out of bounds");
        }
        model.splice(index, 1); // Remove the flag at the specified index
        // setFlagsLeft(flagsLeft-1)

        if (model.length === 1) setCurrentFlagIndex(0);
        setViewableFlagsCount(viewableFlagsCount-1)
    }

    function checkEndGame() {
        if (score === flagsLeft-1) endGame();
    }

    function endGame() {
        setGameOver(true);
    }

    // If the game is not over -> we show the main game screen. Else we show the endscreen.
    return (
        <>
            {(!gameOver && <>
                <Flag src={model[currentFlagIndex].src} key={model[currentFlagIndex].src}/>
                <div>
                    <button type="button" onClick={goPrevFlag}>Prev</button>
                    <button type="button" onClick={goNextFlag}>Next</button>
                </div>
                <AnswerBox onChange={(event) => handleGuess(event.target.value)} inputValue={inputValue} disabled={model[currentFlagIndex].revealed} />
                <p>Score: {score}/{flagsLeft}</p>
                {/* Hint */}
                <button className='d-block' type="button" onClick={() => setHintRevealed(!hintRevealed)}>Hint</button>
                {hintRevealed && <p className='d-block'><strong> Continent:</strong> {model[currentFlagIndex].continent}</p>}
                {/* Answer */}
                <button className='d-block' type="button" onClick={revealCurrentFlag}>Answer</button>
                {model[currentFlagIndex].revealed && <p><strong>{model[currentFlagIndex].names[0]}</strong></p>}
                {/* Give up button */}
                <button className='d-block' type="button" onClick={endGame}>Give Up</button>
            </>) ||
                <EndScreen score={score} modelOriginal={modelOriginal} />
            }
        </>
    );
}

// The flag component
// Expects an object with image src, height in pixels, and any css classes.
function Flag({src, height="250px", className=""}) {
    return (
        <img src={src} className={className + ' flag'} key={src} height={height} />
    );
}

function AnswerBox({onChange, inputValue, disabled=false}) {
    return (
        <input type="text" className="mt-5px" onChange={onChange} value={inputValue} disabled={disabled} />
    );
}

function EndScreen({score, modelOriginal}) {
    let countries = [];

    function compareFunction(a, b) {
        if (a.names[0][0] >= b.names[0][0]) return 1;
        return -1;
    }

    modelOriginal = modelOriginal.sort(compareFunction);

    for (let country of modelOriginal) {
        countries.push(
            <tr key={country.code}>
                <th className="flex-row"><span>{country.names[0]}:</span></th>
                <td className="flex-row align-center"><Flag src={country.src} height='80px' className="mt-5px" /></td>
            </tr>
        );
    }

    return (
        <>
            <h1>You got {score}/{modelOriginal.length}!</h1>
            <table>
                <tbody>{countries}</tbody>
            </table>
        </>
    );
}