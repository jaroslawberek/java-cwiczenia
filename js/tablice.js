import { p, deleteDoubleLetter } from '/functions.js';
export function spliceTab() {
    let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    p("Przed splice: " + tab);
    p("Usunąlem: " + tab.splice(2, 3));  //  usuwa z tablicy od 2 indexu trzy pozycje i zwraca je
    p("Po splice: " + tab);
    tab.splice(0, 0, "ff", "gg", "yy"); //w pozycji o ind 0 wstawia 
    p("Po splice: " + tab);
}

export function sliceTab() {
    const tab = ["Marcin", "Ania", "Agnieszka", "Monika", "Magda"];
    const tab2 = [...tab];
    p(tab2.slice(2, 4)); // wycina od 2 indexu d 3 bez trzeciego i zwraca
}

export function formTab() {
    const obj = {
        0: 1,
        1: "ff",
        3: "bb",
        length: 9
    }

    //  const tab = Array.from(o);
    console.log(Array.from(obj))
}

export function concatTab(a, b) {
    p([...a, ...b]);
    const s = {
        id: 1,
        nazwa: "jakas"
    }

    p(Array.isArray(Object.values(s)));


}

export function sort1() {
    const tab = [1, 2, 4, 89, 99, 900, 6, 4];

    const tab2 = [...tab];
    p(tab2.sort());
}
export function sort2() {
    const tab = [{ id: 8, nazwa: "jakas" }, { id: 111, nazwa: "jakas2" }, { id: 88, nazwa: "jakas3" }];

    const tab2 = [...tab];
    p("sort z funnkcją");
    const t = (tab2.sort((a, b) => {
        return a.id - b.id;
    }));

    for (const elem of t) {
        p("id:" + elem.id + " nazwa: " + elem.nazwa);
    }
}

export function funparam(...arg) {
    p(arg);
    p(`Pierwszy parametr : ${arg[1]}`);
    p("", "-")
}

export function filterTab(what) {
    p("-");
    const tab = [-2, 1, 22, 777, 45, 3, 7, 890, 1001, 678, 6666, 6116];
    const d = tab.filter((elem) => {
        return (elem > what);
    });
    p(d);
    p(tab);
}

export function filterTabWords(tab, query) {
    p(`Szukamy w tablic: ${tab} frazy: ${query}`);
    const found = tab.filter((elem) =>
        elem.toUpperCase().indexOf(query.toUpperCase()) >= 0);
    p(`znaleziono: ${found}`, "-");
}

export function fileInfo(file) {
    const t = file.split(".");
    if (t.length != 2)
        return false;
    else {
        const o = {
            name: t[0], extension: t[1]
        }
        return o;
    }
}

export function fixName(name) {

    name = [...name.trim()];
    if (name && name.length > 0 && name[0] != " ") {
        name[0] = name[0].toUpperCase();
        //lub name = name.charAt(0).toUpperCase() + name.slice(1);
        console.log(`Imie ${name.join("")} rozpoczyna sie od litery ${name[0]}!`);
    }
    else
        console.log("Nic nie wpisano");
}

export function countWord(text) {

    if (text && text.length > 0) {
        text = text.trim();
        text = deleteDoubleLetter(text, "  ", " ");
        const how = text.split(" ").length;
        console.log(`Tekst ${text} skłąda sie z ${how} wyrazów`);
    }
    else console.log("Nie ma co liczyć");
}

export function generateID(how) {
    if (!how || !Number.isInteger(how))
        return console.log("Nie podałes liczby!");
    let id = "";
    let t = "";
    //  for (let y = 0; y < 20; y++)
    while (id.length < how) {
        t = Math.floor(Math.random() * 125);
        if ((t >= 48)) id += String.fromCharCode(t);
    }
    console.log(id);
}

export function printNumbers(nr) {
    if (!nr || !Number.isInteger(nr))
        return console.log("Nie podałes liczby!");
    let ret = "";
    for (let i = 1; i <= nr; i++)
        //ret += i + "";
        // ret += String(i);
        ret += i.toString();
    console.log(ret);

}

export function WhaAlaDoing(month) {


    const spring = ['marzec', 'kwiecien', 'maj'];
    const winter = ['styczen', 'luty', 'grudzien'];
    const summer = ['czerwiec', 'lipiec', 'sierpien']
    const attrum = ['wrzesien', 'pazdziernik', 'listopad']
    if (![...attrum, ...winter, ...summer, ...spring]
        .includes(month.toLowerCase()))
        return console.log("Ala daje dupy!");

    if (spring.includes(month.toLowerCase()))
        return console.log("Ala chodzi po kaluzach");
    if (winter.includes(month.toLowerCase()))
        return console.log("Ala jezdzi na sankach");
    if (summer.includes(month.toLowerCase()))
        return console.log("Ala sie opala");
    if (attrum.includes(month.toLowerCase()))
        return console.log("Ala zbiera liscie");
}