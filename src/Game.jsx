import { shuffleArray } from "./utils";


export default function Game({model}) {
    console.log(model);

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