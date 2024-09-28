import { useState } from "react";
import { shuffleArray } from "./utils";

// model is an array containing flag objects in the form: {code: 'xx', src: 'flag_url', names: ["name"], revealed: bool}
export default function Game({model}) {
    console.log(model);
    const [flagsLeft, setFlagsLeft] = useState(model.length);
    const [currentFlagIndex, setCurrentFlagIndex] = useState(0);

    function goPrevFlag() {
        const index = currentFlagIndex - 1;
        if (index >= 0) {
            setCurrentFlagIndex(index);
        } else {
            setCurrentFlagIndex(model.length - 1);
        }
    }

    function goNextFlag() {
        const index = currentFlagIndex + 1;
        if (index < model.length) {
            setCurrentFlagIndex(index);
        } else {
            setCurrentFlagIndex(0);
        }
    }

    return (
        <>
            <Flag src={model[currentFlagIndex].src} />
            <div>
                <button type="button" onClick={goPrevFlag}>Prev</button>
                <button type="button" onClick={goNextFlag}>Next</button>
            </div>
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
