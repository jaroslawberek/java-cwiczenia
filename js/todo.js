import Handlebars from "https://esm.sh/handlebars";
import { faker } from "/node_modules/@faker-js/faker/dist/locale/pl.js"

const task_template = `<tr id="{{task_id}}" class="todo__task">
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
                  <a href="#" class="text-secondary close-task me-2"><i class="bi bi-x-circle"></i></a>
                  <a href="#" class="text-primary edit-task me-2"><i class="bi bi-pencil-square"></i></a>
                  <a href="#" class="text-danger delete-task"><i class="bi bi-trash"></i></a>
                </td>
              </tr>`;

const todoTaskTemplate = Handlebars.compile(task_template);
function getTask(pos) {
  if (!pos) throw ("Nie podano pozycji");
  return {
    task_id: Date.now,
    pos: pos,
    task_text: faker.word.words({ count: { min: 5, max: 20 } }),
    task_create: faker.date.between({ from: '2025-01-01', to: '2025-09-30' }).toISOString().split('T')[0], // '2026-05-16T02:22:53.002Z',
    deadline: faker.date.between({ from: '2025-09-30', to: '2025-12-30' }).toLocaleDateString("pl-PL"),
    priority: faker.helpers.arrayElement(['hight', 'middle', 'normal']) // 'dog',
  }
}

// helpers.js
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
}
function renderTasks(tasksArray, taskTable) {
  let taskHtml = "";
  for (const task of tasksArray) {
    taskHtml = todoTaskTemplate(task);
    taskTable.innerHTML += taskHtml;

  }
}
export function InitToDo() {
  registerHelpers(Handlebars); // rejestracja wszystkich helperów
  const tasksArray = [];
  let pos = 1;
  for (let i = 0; i < 10; i++)
    tasksArray.push(getTask(pos++));

  console.log(tasksArray);
  document.addEventListener("DOMContentLoaded", (event) => {

    const deleteTask = btn => {
      btn.remove();

    }
    const closeTask = btn => console.log("closeTask: " + btn.closest(".todo__task").getAttribute("id"));
    const editTask = btn => console.log("editTask: " + btn.closest(".todo__task").getAttribute("id"));

    const taskAdd = document.querySelector('.nav-link[data-task-nav="add"]');
    const todoTable = document.querySelector(".todo__table");

    renderTasks(tasksArray, todoTable);

    todoTable.addEventListener("click", function (e) {
      e.stopPropagation();
      const deleteBtn = e.target.closest(".delete-task");
      const editBtn = e.target.closest(".edit-task");
      const closeBtn = e.target.closest(".close-task");
      if (deleteBtn && todoTable.contains(deleteBtn)) {
        e.preventDefault(); // żeby # nie skakał do góry
        deleteTask(deleteBtn.closest(".todo__task"));
      }
      else if (editBtn && todoTable.contains(editBtn)) {
        e.preventDefault(); // żeby # nie skakał do góry
        editTask(editBtn.closest(".todo__task"));
      }
      else if (closeBtn && todoTable.contains(closeBtn)) {
        e.preventDefault(); // żeby # nie skakał do góry
        closeTask(closeBtn.closest(".todo__task"));
      }



    });

    taskAdd.addEventListener("click", function (e) {
      const taskTable = document.querySelector(".todo__table tbody");
      const task = getTask(taskTable.children.length + 1,);
      const taskHtml = todoTaskTemplate(task);
      taskTable.innerHTML += taskHtml;
    });

  });      //DOMContentLoaded

}
