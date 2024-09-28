import { useState, useReducer } from "react";

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
    const [score, setScore] = useState(0);
    // const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
    const [flagsLeft, setFlagsLeft] = useState(model.length);
    const [state, dispatch] = useReducer(reducer, { currentFlagIndex: 0, flagsCount: model.length });

    function goPrevFlag() {
        dispatch({type: 'prev_flag'});
    }

    function goNextFlag() {
        dispatch({type: 'next_flag'});
    }

    return (
        <>
            <Flag src={model[state.currentFlagIndex].src} />
            <div>
                <button type="button" onClick={goPrevFlag}>Prev</button>
                <button type="button" onClick={goNextFlag}>Next</button>
            </div>
            <p>Score: {score}/{model.length}</p>
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
