// A Flag object. Parameters are: code: "country_code", names: ["name"], src: "image_url", continent: "continent"
export class FlagObject {
    constructor (code, names, src, continent) {
        this.code = code;
        this.names = names;
        this.src = src;
        this.continent = continent;
        this.revealed = false;
    }

    hasName(name) {
        for (const n of this.names) {
            if (n.toLowerCase().trim() === name.toLowerCase().trim()) {
                return true;
            }
        }
        return false;
    }
}