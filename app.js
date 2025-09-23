import PersonModule from './js/objects/person.js'

console.log("z app.js");
const p = new PersonModule.Person(12, "Jurek", "Imadełko", "21");
PersonModule.$("#link").on("fun");
console.log(p.getString());
console.log(p.getString2());
console.log(p);
console.log(PersonModule.strzalkowa1());
console.log(PersonModule.strzalkowa_parametr(12));