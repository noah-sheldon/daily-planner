var today = dayjs().format("D, MMMM YYYY");
var container = $(".container");
let tasksMap = getTasks();

$("#currentDay").text(today);

for (let i = 9; i < 24; i++) {
  // Current hour
  let hour = dayjs().hour(i).format("hA");

  let row = $("<div>").addClass("row time-block");
  container.append(row);

  let hourDiv = $("<div>").addClass("col-md-2 hour").text(hour);

  let textArea = $("<textarea>").addClass("col-md-9 description").attr("id", i);
  if (tasksMap[hour]) {
    textArea.val(tasksMap[hour]);
  }

  let saveBtn = $("<button>").addClass("col-md-1 saveBtn").text("Save");

  row.append(hourDiv, textArea, saveBtn, $('<br>'));
  
  if (+dayjs().hour(i).format("H") < dayjs().hour()) {
    $("#"+i).css("background", "red");
  } else if (+dayjs().hour(i).format("H") === dayjs().hour()) {
    $("#"+i).css("background", "grey");
  } else {
    $("#"+i).css("background", "green");
  }
}

$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  let task = $(this).siblings(".description").val();
  let hour = $(this).siblings(".hour").text();

  task = task.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  } else {
    tasksMap[hour] = task;
    localStorage.setItem("tasksMap", JSON.stringify(tasksMap));
  }
});

function getTasks() {
  if ("tasksMap" in localStorage) {
    return JSON.parse(localStorage.getItem("tasksMap"));
  } else {
    return {};
  }
}
