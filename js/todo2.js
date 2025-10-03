import Handlebars from "https://esm.sh/handlebars";
import { faker } from "/node_modules/@faker-js/faker/dist/locale/pl.js"

/**
 * Model
 * @param {*} param 
 */
function Model(param) {

    /* Prywatne zmienne i funkcje*/
    this.table = [];
    // console.log("Model construktor");
    /* Publiczne */
    this.load = function () {
        //  console.log(this);
    }
    this.getTask = function (pos) {
        if (!pos) throw ("Nie podano pozycji");
        return {
            task_id: Date.now(),
            pos: pos,
            task_text: faker.word.words({ count: { min: 5, max: 20 } }),
            task_create: faker.date.between({ from: '2025-01-01', to: '2025-09-30' }).toISOString().split('T')[0], // '2026-05-16T02:22:53.002Z',
            deadline: faker.date.between({ from: '2025-09-30', to: '2025-12-30' }).toLocaleDateString("pl-PL"),
            priority: faker.helpers.arrayElement(['hight', 'middle', 'normal']),
            status: faker.helpers.arrayElement(['new', 'close']),
        }
    }
    this.onLoadData = () => null;
    this.onLoadedData = () => null;
}

/** Prototypy */
Model.prototype.load = function () {
    console.log("Model--load()");
}

Model.prototype.loadFromFaker = function (count, callback) {
    this.onLoadData();
    setTimeout(() => {
        this.table = [];
        let pos = 1;
        for (let i = 0; i < count; i++)
            this.table.push(this.getTask(pos++));
        this.onLoadedData();
        callback();
    }, 1000)
}

Model.prototype.refresh = function () {
    console.log("Model--refresh()");
    return [...this.table];
}

Model.prototype.sort = function (order) {
    console.log("Model--sort()");
}

Model.prototype.search = function (frase) {
    console.log("Model--searchByStatus()");
    const searchTable = this.table.filter(task => task.task_text.indexOf(frase) > -1);
    return searchTable;
}

Model.prototype.close = function (findId) {
    if (!findId || String(findId) === "")
        throw new Error("Niepoprawny identyfikator");

    console.log("Model--close()");
    const task = this.table.find(task => String(task.task_id) === String(findId));
    task.status = "close";
    return this.table;
}
Model.prototype.insert = function (task) {
    console.log("Model--insert()");
    return this.table;
}
Model.prototype.update = function (task) {
    console.log("Model--update()");
    return this.table;
}
Model.prototype.delete = function (findId) {
    if (!findId || String(findId) === "")
        throw new Error("Niepoprawny identyfikator lub go brak");
    const index = this.table.findIndex(task => String(task.task_id) === String(findId));
    this.table.splice(index, 1); /// nie SLICE co kopiuje fragent tabeli
    return this.table;
}


/**
 * ToDoView
 * @param {*} initObj 
 * @returns 
 */
function ToDoView() {
    //console.log("ToDoView--Controller");
    function registerHelpers(Handlebars) {
        // 🔸 Porównania
        Handlebars.registerHelper("eq", (a, b) => a === b);
        Handlebars.registerHelper("ne", (a, b) => a !== b);
        Handlebars.registerHelper("gt", (a, b) => a > b);
        Handlebars.registerHelper("lt", (a, b) => a < b);
        Handlebars.registerHelper("gte", (a, b) => a >= b);
        Handlebars.registerHelper("lte", (a, b) => a <= b);

        // 🔸 Logika
        Handlebars.registerHelper("and", (a, b) => a && b);
        Handlebars.registerHelper("or", (a, b) => a || b);

        // 🔸 Tekst
        Handlebars.registerHelper("upper", str => String(str).toUpperCase());
        Handlebars.registerHelper("lower", str => String(str).toLowerCase());
        Handlebars.registerHelper("capitalize", str => {
            if (!str) return "";
            str = String(str);
            return str.charAt(0).toUpperCase() + str.slice(1);
        });

        // 🔸 JSON (debug)
        Handlebars.registerHelper("json", context => JSON.stringify(context, null, 2));

        // 🔸 Iteracja z indeksem
        Handlebars.registerHelper("eachWithIndex", function (array, options) {
            let result = "";
            array.forEach((item, i) => {
                result += options.fn({ ...item, index: i });
            });
            return result;
        });

        // 🔸 Daty
        Handlebars.registerHelper("formatDate", function (dateStr, locale = "pl-PL") {
            const d = new Date(dateStr);
            return d.toLocaleDateString(locale);
        });

        // 🔸 Switch/Case
        Handlebars.registerHelper("switch", function (value, options) {
            this._switch_value_ = value;
            const html = options.fn(this);
            delete this._switch_value_;
            return html;
        });

        Handlebars.registerHelper("case", function (value, options) {
            if (value == this._switch_value_) {
                return options.fn(this);
            }
        });
        // console.log("ToDoView--registerHelpers");
    }
    const task_template = `<tr id="{{task_id}}" class="todo__task  {{#if (eq status "close")}} task-close {{/if}}">
                <th scope="row">{{pos}}</th>
                <td class="todo__task-text">
                 {{task_text}}
                </td>
                <td>{{task_create}}</td>
                <td>{{deadline}}</td>
                <td>
                {{#switch priority}}
                  {{#case "hight"}}
                    <span class="todo__task-priority bg-danger">Wysoki</span>{{/case}}
                  {{#case "middle"}}
                    <span class="todo__task-priority bg-warning">Średni</span>{{/case}}
                  {{#case "normal"}}
                    <span class="todo__task-priority bg-info">Normalny</span>{{/case}}
                {{/switch}}
                </td>
                <td class="todo__task-options">
                 {{#if (eq status "new")}} 
                  <a href="#" class="text-secondary close-task me-2"><i class="bi bi-x-circle"></i></a>
                  <a href="#" class="text-primary edit-task me-2"><i class="bi bi-pencil-square"></i></a>
                  <a href="#" class="text-danger delete-task"><i class="bi bi-trash"></i></a>
                 {{/if}}
                </td>
              </tr>`;

    this.todoTaskTemplate = Handlebars.compile(task_template);
    registerHelpers(Handlebars);
}


ToDoView.prototype.render = function (table, view) {
    if (view === "table") {
        let tasksHtml = "";
        for (const task of table) {
            tasksHtml += this.todoTaskTemplate(task);
        }
        console.log(`ToDoView--render(${view})`);
        return tasksHtml;
    }
}




/**
 * ToDo
 * @param {*} initObj 
 * @returns 
 */
export default function ToDo(initObj = null) {
    /**
     * Prywatne włąsciwosci
     */
    let toDoContent;
    let toDoHeader;
    let toDoTaskAction;
    let toDoTable
    let model = new Model();
    let _initObj
    const view = new ToDoView();

    /**
     * KONSTRUKTOR
     */
    if (!(this instanceof ToDo))
        return new ToDo(initObj);
    else {
        checkInitObj(initObj);
        /**
         * Eventy
         */
        model.onLoadData = () => _initObj.onLoad && _initObj.onLoad() || null;
        model.onLoadedData = () => _initObj.onLoaded && _initObj.onLoaded() || null;

        toDoContent = initObj.content;
        toDoHeader = document.querySelector(toDoContent + " .todo__header");
        toDoTaskAction = document.querySelector(toDoContent + " .task-action");
        toDoTable = document.querySelector(toDoContent + " .todo__table tbody");


        // Dla testu pobieramy dane testowe z Facker.js
        model.loadFromFaker(5, () => {
            //this.onLoaded();
            toDoTable.innerHTML = view.render(model.refresh(), "table");
            events();
        });

    }

    /**
     * Prywatne funkcje
     */
    function events() {
        //console.log("events");

        toDoTable.addEventListener("click", function (e) {
            e.stopPropagation();
            if (e.target.closest(".delete-task")) {
                const btnDelete = e.target.closest(".delete-task");
                const task = btnDelete.closest(".todo__task");
                let r = view.render(model.delete(task.id), "table");
                toDoTable.innerHTML = r;
            }
            else if (e.target.closest(".edit-task")) {
                console.log("ToDo--event--edit task");
                let r = view.render(model.update(task.id), "table");
                toDoTable.innerHTML = r;
            }
            else if (e.target.closest(".close-task")) {
                const btnClose = e.target.closest(".close-task");
                const task = btnClose.closest(".todo__task");
                let r = view.render(model.close(task.id), "table");
                toDoTable.innerHTML = r;
            }
        });

        /**
         * Wyszukiwanie
         */
        toDoHeader.addEventListener("submit", function (e) {
            e.preventDefault(); // zatrzymuje domyślne wysłanie formularza
            const todoForm = toDoHeader.querySelector(".todo__navbar-form");
            const formData = new FormData(todoForm);
            formData.set("jebadełko", "ruchara");
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }

            let r = view.render(model.search(formData.get("search-frase")), "table");
            toDoTable.innerHTML = r;
        });

        /**
         * Klikniecia w: zamkniete i nowe zadania
         */
        toDoHeader.addEventListener("click", function (e) {

        });

        toDoTaskAction.addEventListener("click", function (e) {
            if (e.target.closest(".add-task")) {
                e.stopPropagation();
                model.insert();
                let r = view.render(model.table, "table");

            }
            else if (e.target.closest(".refresh-task")) {
                console.log("refresh-task");
                toDoTable.innerHTML = view.render(model.refresh(), "table");
            }
        })

    }
    function checkInitObj(aInitObj) {
        let errors = "";
        if (!aInitObj)
            errors += "Brak obiektu inicjalizacjyjnego!\n";
        if (typeof (initObj) !== "object")
            errors += "Parametr inicjujący nie jest obiektem!\n";
        if (!initObj.content)
            errors += "Nie podałes parametru content!"
        if (errors != "")
            throw (errors);
        _initObj = aInitObj;
    }


}





