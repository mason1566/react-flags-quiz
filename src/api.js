// This file is responsible for fetching our flag/country data
import { FlagObject } from './flag.js';

export const fetchFlagData = async () => {
    try {
        const response = await fetch('/country_data.json');
        const data = await response.json();

        // Format flagData into an array of FlagObject objects
        const flagObjects = [];
        for (const code in data) {
            let names = data[code]["names"];
            let src = data[code]["flag"];
            flagObjects.push(new FlagObject(code, names, src));
        }

        return flagObjects;
    } catch(error) {
        console.log("Error fetching flag data:", error);
    }
} 