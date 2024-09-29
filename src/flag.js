// A Flag object. Parameters are: code: "country_code", names: ["name"], src: "image_url"
export class FlagObject {
    constructor (code, names, src) {
        this.code = code;
        this.names = names;
        this.src = src;
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