import { p, deleteDoubleLetter } from "/functions.js";

export function dom1() {
  const items = document.querySelectorAll(".d-flex");
  //const f = document.querySelectorAll(".foother__items-item:nth-of-type(1)"); //tylko pierszy
  const f = document.querySelectorAll(".foother__items, .foother__items ul"); //tylko pierszy
  const f2 = document.querySelectorAll(".foother__items-item:nth-of-type(even)"); //parzyste
  const f3 = document.querySelectorAll(".foother__items-item:nth-of-type(odd)"); //nieparzyste
  //p(f);

  // w f jest kolekcja.
  // Żeby działac jak na tablicy musze uzyc
  // spread syntax [...obj]
  //
  [...items].map((e) => {
    //console.log(e);
  });

  //lub uzyc foreach
  f.forEach((element) => {
    // element.style.color = "blue";
    element.style.listStyle = "none";
    element.dataset.myJakisKutasJebanyPizdoliz = "moj";
  });

  const dd = document.querySelector(".foother__items-item[data-my-jakis-kutas-jebany-pizdoliz]:nth-of-type(2)");
  console.log(dd);
  const input = document.querySelector("[name=search]");

  input.addEventListener("input", (e) => {
    const links = document.querySelectorAll(".foother__link");
    links.forEach((el) => {
      let e = el.textContent.toUpperCase();
      let v = input.value.toUpperCase();
      if (v.length > 1 && e.indexOf(v) > -1) el.style.visibility = "hidden";
      else el.style.visibility = "visible";
    });
  });
}
