import { useState, useReducer, useMemo } from "react";

function reducer(state, action) {
    if (action.type === 'next_flag') {
        const index = state.currentFlagIndex + 1;
        if (index < state.flagsCount) {
            return { ...state, currentFlagIndex: index};
        } else {
            return { ...state, currentFlagIndex: 0};
        }
    }
    else if (action.type === 'prev_flag') {
        const index = state.currentFlagIndex - 1;
        if (index >= 0) {
            return { ...state, currentFlagIndex: index};
        } else {
            return { ...state, currentFlagIndex: state.flagsCount-1};
        }
    }
    else if (action.type === 'remove_flag') {
        // Throw error if there are no flags to remove
        if (state.flagsLeft === 0) {
            throw new Error("Error in reducer - action 'remove_flag': No flags left to remove");
        }

        // Remove a flag from the count
        let flagsCount = state.flagsCount - 1;
        return { ...state, flagsCount: flagsCount };
    }

}

// model is an array containing flag objects in the form: {code: 'xx', src: 'flag_url', names: ["name"], revealed: bool}
export default function Game({model}) {
    const [modelOriginal, setModelOriginal] = useState(model);
    const [score, setScore] = useState(0);
    const [flagsLeft, setFlagsLeft] = useState(model.length);
    const [inputValue, setInputValue] = useState('');
    const [state, dispatch] = useReducer(reducer, { currentFlagIndex: 0, flagsCount: model.length });
    const [hintRevealed, setHintRevealed] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    function goPrevFlag() {
        dispatch({type: 'prev_flag'});
        setHintRevealed(false);
    }

    function goNextFlag() {
        dispatch({type: 'next_flag'});
        setHintRevealed(false);
    }

    function revealFlag() {
        if (model[state.currentFlagIndex].revealed) return; // do nothing if the flag is already revealed
        setFlagsLeft(flagsLeft - 1);
        model[state.currentFlagIndex].revealed = true;
    }
    
    function handleGuess(guess) {
        setInputValue(guess);
        if (model[state.currentFlagIndex].hasName(guess)) {
            console.log("Correct!")
        }
    }

    function removeFlag(index) {
        if (index >= model.length) {
            throw new Error("Error in removeFlag: index out of bounds");
        }
        // Remove the flag at the specified index
        model.splice(index, 1);
    }

    function endGame() {
        setGameOver(true);
    }

    return (
        <>
            {(!gameOver && <>
                <Flag src={model[state.currentFlagIndex].src} />
                <div>
                    <button type="button" onClick={goPrevFlag}>Prev</button>
                    <button type="button" onClick={goNextFlag}>Next</button>
                </div>
                <AnswerBox onChange={(event) => handleGuess(event.target.value)} inputValue={inputValue} disabled={model[state.currentFlagIndex].revealed} />
                <p>Score: {score}/{flagsLeft}</p>
                {/* Hint */}
                <button className='d-block' type="button" onClick={() => setHintRevealed(!hintRevealed)}>Hint</button>
                {hintRevealed && <p className='d-block'><strong>Country Code:</strong> {model[state.currentFlagIndex].code}</p>}
                {/* Answer */}
                <button className='d-block' type="button" onClick={revealFlag}>Answer</button>
                {model[state.currentFlagIndex].revealed && <p><strong>{model[state.currentFlagIndex].names[0]}</strong></p>}
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