import { useState } from "react";
import { shuffleArray } from "./utils";

// model is an array containing flag objects in the form: {code: 'xx', src: 'flag_url', names: ["name"], revealed: bool}
export default function Game({model}) {
    console.log(model);
    const [flagsLeft, setFlagsLeft] = useState(model.length);

    return (
        <>
            <h1>HEllo!</h1>
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