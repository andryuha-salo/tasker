var taskPrefix = "";
var people;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function parseTasks(input) {
  input = input
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/Task/g, "")
    .replace(/Bug/g, "");
  let tasksNumbers = [...input.matchAll("[A-Z]+-[0-9]+")];
  return tasksNumbers.map(function (value, index) {
    let taskNumber = value[0];
    console.log(taskNumber);
    let next = tasksNumbers[index + 1];
    let startIndex = input.indexOf(taskNumber) + taskNumber.length;
    let endIndex = input.length;
    if (next != undefined) {
      endIndex = input.indexOf(next);
    }
    return [taskNumber, input.substring(startIndex, endIndex).trim()];
  });
}

function formatTasks(textbox) {
  let tasks = parseTasks(textbox.value);
  textbox.value = tasks.reduce((cV, pV) => cV + pV[0] + " " + pV[1] + "\n", "");
}

function shuffle() {
  let tasksBox = document.getElementById("tasks");
  let tasks = parseTasks(tasksBox.value);

  let peopleBox = document.getElementById("people");
  let people = peopleBox.value.split("\n");
  shuffleArray(people);

  let humanIdx = 0;
  let output = "";
  for (const task of tasks) {
    output +=
      "https://aviasales.atlassian.net/browse/" +
      task[0] +
      ": " +
      task[1] +
      " - " +
      people[humanIdx] +
      "\n";
    humanIdx += 1;
    if (humanIdx > people.length - 1) {
      humanIdx = 0;
    }
  }

  navigator.clipboard.writeText(output).then(
    () => {},
    () => {},
  );
}

function loadPeople() {
  let output = "";
  for (const human of people) {
    if (output != "") {
      output += "\n";
    }
    output += human;
  }
  let outputBox = document.getElementById("people");
  outputBox.value = output;
}

function loadParams() {
  const urlParams = new URLSearchParams(window.location.search);
  let p = [];
  for (const key of urlParams.keys()) {
    if (key.startsWith("people")) {
      p.push(urlParams.get(key));
    }
  }
  people = p;
  taskPrefix = urlParams.get("prefix");
}
loadParams();
loadPeople();
