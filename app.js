import PersonModule from "./js/objects/person.js";
// import Handlebars from "https://esm.sh/handlebars";
import { spliceTab, sliceTab, fileInfo, formTab, concatTab, sort1, sort2, filterTabWords, funparam, filterTab, fixName, WhaAlaDoing, countWord, generateID, printNumbers } from "./js/tablice.js";
import { InitToDo } from "./js/todo.js";
/* console.log("z app.js");
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
//WhaAlaDoing("mrzec"); */
//dom1();

// InitToDo();




// const obj = {
//     id: 1,
//     name: "Janek",
//     show: function show(a) {
//         console.log(this);
//     }
// }

// Object.defineProperty(obj, "name", {
//     writable: false,
//     enumerable: false
// })

// //obj.name = "Zofia"; //Cannot assign to read only property 'name' of object '#<Object>'
// for (const key in obj) {
//     if (!Object.hasOwn(obj, key)) continue; // nie wyswietli name
//     console.log(`${key} : ${obj[key]}`);

// }
// console.log(Object.getOwnPropertyDescriptor(obj, "id"));  //jakie ustawienia ma włąsciwosc obiektu obj
// console.log(Object.getOwnPropertyDescriptor(obj, "name"));
// Object.preventExtensions(obj); //nie dodany nowych własciwosci ale mozemy usuwac własiwosci lub zmieniac mu ustawinia
// console.log("Czy obiekt jest rozszerzalny - " + Object.isExtensible(obj)); //sprawdzamy rozszerzalnosc

//Object.freeze(obj);
// obj.id = 453;
// obj.nowa = "nowy"; //Cannot add property nowa, object is not extensible
// delete obj.id;          //Cannot delete property 'id' of #<Object>


//console.log(Object.hasOwn(obj, "name") || "nie ma");


/*********************************** */

