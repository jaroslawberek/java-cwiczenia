function Person(id, imie, nazwisko, wiek) {
    this.id = id;
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.wiek = wiek;
    this.getString = function () {
        return `${this} - id=${this.id} imie=${this.imie} nazwisko=${this.nazwisko} wiek=${this.wiek}`;
    }
    this.getString2 = () => {
        console.log(this);
        return `${this} - id=${this.id} imie=${this.imie} nazwisko=${this.nazwisko} wiek=${this.wiek}`;
    }


}

function $(name) {
    this.i = name;
    this.on = function (param) {
        console.log("wywolana on");
    }
    return this;
}

function jakas1() {
    return "funkcja jakas 1";
}

function jakas2() {
    return "funkcja jakas 2";
}

/**
 * Returns the string "Strzłkowa T".
 * @returns {string} The string "Strzłkowa T".
 */
const strzalkowa1 = () => {
    return "Funkcja Strzłkowa T"
}
/**
 * Returns a string indicating the use of an arrow function with a parameter.
 *
 * @param {any} val - The value to include in the returned string.
 * @returns {string} A string describing the arrow function and the provided parameter.
 */
const strzalkowa_parametr = (val) => {
    return "Funkcja Strzalkowa  z parametrem: " + val;
}

function nowa(d = 1) {
    d += 8;
    let r = [1, 2, 3, 4];

}

export default {
    Person,
    $,
    jakas1,
    jakas2,
    strzalkowa1,
    strzalkowa_parametr
}
