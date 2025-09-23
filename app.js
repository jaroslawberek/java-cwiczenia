import PersonModule from './js/objects/person.js'
import {
    spliceTab, sliceTab, fileInfo,
    formTab, concatTab, sort1, sort2, filterTabWords,
    funparam, filterTab, fixName, WhaAlaDoing, countWord, generateID, printNumbers
} from './js/tablice.js';

console.log("z app.js");
const p = new PersonModule.Person(12, "Jurek", "Imadełko", "21");
PersonModule.$("#link").on("fun");
console.log(p.getString());
console.log(p.getString2());
console.log(p);
console.log(PersonModule.strzalkowa1());
console.log(PersonModule.strzalkowa_parametr(12));

spliceTab();
sliceTab();
formTab();
concatTab([1, 2, 3], [9, 8, 7]);
sort1();
sort2();
funparam(1, 22, 3, "ttt", { id: 9 }, [1, 9])
funparam(1, "dd")
funparam();
filterTab(1000);
filterTabWords(["Ania", "Tomek", "Jurek", "Jarek", "niania", "Lottoi"], "to");
console.log(fileInfo("dupa.pg"));
console.log(fileInfo("dupapg"));
//fixName(prompt());
//countWord(prompt("Podaj zdanie"));
// generateID("f");
// generateID("5");
generateID(15);
// generateID();
//printNumbers(12);
//WhaAlaDoing("mrzec");