var today = dayjs().format("D, MMMM YYYY");
var time = dayjs().format("HH:mm:ss");
var container = $(".container");
let tasksMap = getTasks();

$("#currentDay").text("Date: " + today);
$("#currentTime").text("Time: " + time);

startApp();

function startApp() {
  createHourBlocks();
}

// SaveBtn click event
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

//Get tasksMap from localStorage
function getTasks() {
  if ("tasksMap" in localStorage) {
    return JSON.parse(localStorage.getItem("tasksMap"));
  } else {
    return {};
  }
}

function createHourBlocks() {
  for (let i = 9; i < 18; i++) {
    // Current hour in format: 9AM
    let hour = dayjs().hour(i).format("hA");

    //Create row for every hour
    let row = $("<div>").addClass("row time-block");
    container.append(row);

    //Create div for hour
    let hourDiv = $("<div>")
      .addClass(
        "col-md-2 hour text-center fw-bold d-flex align-items-center justify-content-center"
      )
      .text(hour);

    //Create textArea for every hour
    let textArea = $("<textarea>")
      .addClass("col-md-8 description")
      .attr("id", i);

    //If task present, append value to textArea
    if (tasksMap[hour]) {
      textArea.val(tasksMap[hour]);
    }

    //Create saveButton
    let saveBtn = $("<button>")
      .addClass(
        "col-md-2 saveBtn fw-bold text-center d-flex align-items-center justify-content-center"
      )
      .text("Save");

    // Append hour, textArea, and SaveBtn to row parent
    row.append(hourDiv, textArea, saveBtn, $("<br>"));

    //Apply background conditionally
    applyBackground(i);
  }
}

function applyBackground(hour) {
  //Background colour by hour logic
  if (+dayjs().hour(hour).format("H") < dayjs().hour()) {
    $("#" + hour).css("background", "#ff9999");
  } else if (+dayjs().hour(hour).format("H") === dayjs().hour()) {
    $("#" + hour).css("background", "#c2c2d6");
  } else {
    $("#" + hour).css("background", "#b3ffe0");
  }
}
