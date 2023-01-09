const isCompleteTask = (svgPath) =>
  svgPath === "sm1/notification_completed.svg";

const getItemScore = (name, regex) => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return scoreText ? parseInt(scoreText) : undefined;
};

const getItemsScores = (items, getItemScore, regexForScoreAndPoints) => {
  return items.map((item) => {
    const childNodes = [...item.childNodes];
    return childNodes
      .map((itemChildNode) => {
        const svgPathOfItemChildNode =
          itemChildNode.childNodes[0].childNodes[1].childNodes[0].dataset
            .svgsPath;

        if (isCompleteTask(svgPathOfItemChildNode)) {
          const itemScore = getItemScore(
            itemChildNode.innerText,
            regexForScoreAndPoints
          );

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

const postCounterToPage = (points, numForId, parent) => {
  const scoreBlock = document.createElement("div");
  const scoreText = document.createElement("span");
  const scoreSum = document.createElement("span");

  const scoreBlockParent = parent[numForId].childNodes[0].childNodes[1];

  scoreBlock.append(scoreText, scoreSum);

  setStylesForScores(scoreSum, scoreText, scoreBlockParent, points);

  if (
    scoreBlockParent.id === "counter" &&
    +scoreBlockParent?.childNodes[1]?.childNodes[1].textContent !== points
  ) {
    scoreBlockParent.childNodes[1].childNodes[1].textContent = points;
  } else if (scoreBlockParent.id === "counter") {
    return;
  } else {
    scoreBlockParent.append(scoreBlock);
    scoreBlockParent.id = `counter`;
  }
};

const checkIsTaskCorrect = (regexForScoreAndPoints) => {
  const taskIcons = document.getElementsByClassName("avatar_event_icon");

  Array.from(taskIcons).map((element) => {
    const elementParent = element.parentElement.parentElement;

    if (!isCompleteTask(element.childNodes[0].dataset.svgsPath)) {
      return;
    }

    const listItem = elementParent.childNodes;

    const span = elementParent.childNodes[1].childNodes[1];

    const taskName =
      elementParent.childNodes[1].childNodes[0].childNodes[2].childNodes[0]
        .childNodes[0].textContent;

    const score = getItemScore(taskName, regexForScoreAndPoints);

    if (score === undefined) {
      elementParent.style.backgroundColor = "rgba(246, 193, 4, 0.11)";
      if (span.id === "noPoints") {
        return;
      }

      const noPoints = document.createElement("span");
      noPoints.innerHTML = "No points entered for this task";
      span.id = "noPoints";
      noPoints.style.fontSize = "11px";
      noPoints.style.fontWeight = 500;
      noPoints.style.fontFamily = "Inter";
      noPoints.style.color = "#BC760D";
      noPoints.style.position = "relative";
      noPoints.style.top = "0px";
      noPoints.style.left = "0px";
      if (taskName.length >= 86) {
        noPoints.style.left = "64px";
      }
      listItem[1].after(noPoints);
    }
  });
};

const activityModule = () => {
  const sectionElement = document.getElementsByClassName("section");
  const items = document.querySelectorAll("ul.items");
  const itemsArray = Array.from(items);
  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  getItemsScores(itemsArray, getItemScore, regexForScoreAndPoints).map(
    (item, index) => {
      return postCounterToPage(item, index, sectionElement);
    }
  );

  checkIsTaskCorrect(regexForScoreAndPoints);
};

export default activityModule;
