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

  // const input = document.querySelector("[name=search]");
  // input.addEventListener("input", (e) => {
  //   const links = document.querySelectorAll(".foother__link");
  //   links.forEach((el) => {
  //     let e = el.textContent.toUpperCase();
  //     let v = input.value.toUpperCase();
  //     if (v.length > 1 && e.indexOf(v) > -1)
  //       el.style.visibility = "hidden";
  //     else
  //       el.style.visibility = "visible";
  //   });
  // });

  const bt = document.querySelector("#bt");
  const d1 = document.querySelector("#jeden");
  const d2 = document.querySelector("#dwa");

  function eventClick(event) {
    {
      // event.stopPropagation();
      console.log(this.getAttribute("id"));
    }
  }

  //bt.addEventListener("click", eventClick,);


  d1.addEventListener("click", e => {
    if (e.target.name == "moj-btn") {

      console.log("e.target: ", e.target.getAttribute("id"));
      console.log("e.currentTarget: ", e.currentTarget, parent);
    }
  })
  const logBox = document.getElementById("log");

  function log(msg) {
    logBox.textContent += msg + "\n";
    logBox.scrollTop = logBox.scrollHeight; // autoscroll
  }

  // --- Klik myszą ---
  const btn = document.getElementById("btn");
  btn.addEventListener("click", e => {
    log("=== CLICK EVENT ===");
    log("type: " + e.type);
    log("target.id: " + e.target.id);
    log("currentTarget.id: " + e.currentTarget.id);
    log("clientX/clientY: " + e.clientX + " / " + e.clientY);
    log("pageX/pageY: " + e.pageX + " / " + e.pageY);
    log("detail (liczba kliknięć): " + e.detail);
    log("timeStamp: " + e.timeStamp.toFixed(2));
    log("--------------------");
  });

  // --- Klawiatura ---
  const input = document.getElementById("input");
  input.addEventListener("keydown", e => {
    log("=== KEYDOWN EVENT ===");
    log("type: " + e.type);
    log("key: " + e.key);
    log("code: " + e.code);
    log("ctrlKey: " + e.ctrlKey);
    log("shiftKey: " + e.shiftKey);
    log("altKey: " + e.altKey);
    log("metaKey (cmd/win): " + e.metaKey);
    log("timeStamp: " + e.timeStamp.toFixed(2));
    log("--------------------");
  });

  const overlay = document.getElementById("overlay");

  function openOverlay() {
    overlay.style.display = "flex";
    overlay.focus(); // 🚀 przekazujemy focus na div
  }

  function closeOverlay() {
    overlay.style.display = "none";
  }

  // nasłuch na klawisze tylko gdy overlay ma focus
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key.toLowerCase() === "q" && overlay.style.display === "flex") {
      e.preventDefault(); // blokujemy np. przypadkowe skróty systemowe
      closeOverlay();
      console.log("Ctrl+Q → overlay zamknięty");
    }
  });

  // otwórz overlay po 1s
  setTimeout(openOverlay, 1000);
}
