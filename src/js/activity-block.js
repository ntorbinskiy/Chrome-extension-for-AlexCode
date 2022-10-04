const isCompleteTask = (taskElement) =>
  taskElement.childNodes[0].childNodes[1].childNodes[0].dataset.svgsPath ===
  "sm1/notification_completed.svg";

const isIconCompleted = (element) =>
  element.children[0].dataset.svgsPath !== "sm1/notification_completed.svg";

const connectFonts = () => {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
  );
  document.head.appendChild(link);
};

const getItemScore = (name, regex) => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return scoreText ? parseInt(scoreText) : undefined;
};

const getItemsScores = (items, getItemScore, regexForScoreAndPoints) => {
  return items.map((item) => {
    const childNodes = [...item.childNodes];
    return childNodes
      .map((i) => {
        if (isCompleteTask(i)) {
          const itemScore = getItemScore(i.innerText, regexForScoreAndPoints);
          return itemScore ?? 0;
        } else {
          return 0;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  });
};

const setStylesForScores = (sumOfScores, textForScore, counterNum, points) => {
  sumOfScores.innerHTML = points;
  sumOfScores.style.fontSize = "12px";
  sumOfScores.style.fontWeight = 700;
  sumOfScores.style.fontFamily = "Inter";
  sumOfScores.style.position = "relative";

  textForScore.innerHTML = `Total Score For This Day: `;
  textForScore.style.fontSize = "12px";
  textForScore.style.fontWeight = 400;
  textForScore.style.fontFamily = "Inter";
  textForScore.style.position = "relative";

  counterNum.style.display = "flex";
  counterNum.style.justifyContent = "space-between";
};

const pastDivToPage = (points, numForId, parent) => {
  const scoreBlock = document.createElement("div");
  const textForScore = document.createElement("span");
  const sumOfScores = document.createElement("span");

  const counterNum = parent[numForId].childNodes[0].childNodes[1];

  scoreBlock.append(textForScore, sumOfScores);

  setStylesForScores(sumOfScores, textForScore, counterNum, points);
  if (
    counterNum.id === "counter" &&
    +counterNum?.childNodes[1]?.childNodes[1].textContent !== points
  ) {
    counterNum.childNodes[1].childNodes[1].textContent = points;
  } else if (counterNum.id === "counter") {
    return;
  } else {
    counterNum.append(scoreBlock);
    counterNum.id = `counter`;
  }
};

const checkIsTaskCorrect = (regexForScoreAndPoints) => {
  const icons = document.getElementsByClassName("avatar_event_icon");

  Array.from(icons).map((element) => {
    const elementParent = element.parentElement.parentElement;

    if (isIconCompleted(element)) {
      return;
    }

    const textOfDiv = elementParent.childNodes[1].childNodes[0];
    //div > task name
    const span = elementParent.childNodes[1].childNodes[1];
    //time of task
    const taskName =
      textOfDiv.childNodes[2].childNodes[0].childNodes[0].textContent;

    const score = getItemScore(taskName, regexForScoreAndPoints);
    if (score === undefined) {
      elementParent.style.backgroundColor = "rgba(246, 193, 4, 0.11)";
      if (span.id === "nopoints") {
        return;
      }
      const noPoints = document.createElement("div");
      noPoints.innerHTML = "No points entered for this task";
      span.id = "nopoints";
      noPoints.fontSize = "11px";
      noPoints.fontWeight = 500;
      noPoints.fontFamily = "Inter";
      noPoints.style.color = "#BC760D";
      span.after(noPoints);
    }
  });
};

const activityBlock = () => {
  if (window.location.href.includes("https://todoist.com/app/activity")) {
    connectFonts();

    const sectionElem = document.getElementsByClassName("section");
    const items = document.querySelectorAll("ul.items");
    const itemsArray = Array.from(items);
    const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

    getItemsScores(itemsArray, getItemScore, regexForScoreAndPoints).map(
      (item, index) => {
        return pastDivToPage(item, index, sectionElem);
      }
    );

    checkIsTaskCorrect(regexForScoreAndPoints);
  }
};
export default activityBlock;
