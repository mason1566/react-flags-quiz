// This file is responsible for fetching our flag/country data

export const fetchFlagData = async () => {
    try {
        const response = await fetch('/country_data.json');
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error fetching flag data:", error);
    }
} 