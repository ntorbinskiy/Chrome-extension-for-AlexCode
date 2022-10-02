const isCompleteTask = (taskElement) =>
  taskElement.childNodes[0].childNodes[1].childNodes[0].dataset.svgsPath ===
  "sm1/notification_completed.svg";

const activityBlock = () => {
  if (window.location.href.includes("https://todoist.com/app/activity")) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute(
      "href",
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
    );
    document.head.appendChild(link);
    const parent = document.getElementsByClassName("section");
    const items = document.querySelectorAll("ul.items");
    const itemsArray = Array.from(items);
    const regexForScoreAndPoints = /^.+\[(?<score>\d+)\]\s*.*$/;

    const getItemsScores = (items) => {
      return items.map((item) => {
        const childNodes = [...item.childNodes];
        return childNodes
          .map((i) => {
            if (isCompleteTask(i)) {
			  const itemScore = getItemScore(i.innerText, regexForScoreAndPoints);
              return itemScore === undefined ? 0 : itemScore;
            } else {
              return 0;
            }
          })
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      });
    };
    const getItemScore = (name, regex) => {
      const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.[
        "score"
      ];
      return scoreText ? parseInt(scoreText) : undefined;
    };

    const pastDivToPage = (points, numForId, parent) => {
      const div1 = document.createElement("div");
      const sumOfScores = document.createElement("div");
      const divStyles = div1.style;
      const counterNum =
        parent[numForId].childNodes[0].childNodes[1].childNodes[0];
      //   console.log("counterNum", counterNum);
      div1.innerHTML = `Total Score For This Day: `;
      const stylesSumOfScores = sumOfScores.style;
      sumOfScores.innerHTML = points;
      stylesSumOfScores.fontSize = "12px";
      stylesSumOfScores.fontWeight = 700;
      stylesSumOfScores.fontFamily = "Inter";
      stylesSumOfScores.position = "relative";
      stylesSumOfScores.left = "636px";
      div1.id = `counter`;
      divStyles.fontSize = "12px";
      divStyles.fontWeight = 400;
      divStyles.fontFamily = "Inter";
      divStyles.position = "relative";
      divStyles.left = "492px";
      divStyles.top = "19px";
      console.log("sumOfScores", sumOfScores);
      if (counterNum.id === "counter" && sumOfScores.textContent !== points) {
        div1.remove();
        stylesSumOfScores.innerHTML = points;
        div1.after(sumOfScores);
      }
      if (counterNum.id === "counter") {
        return;
      }
      counterNum.before(div1);
      div1.after(sumOfScores);
    };

    getItemsScores(itemsArray).map((item, index) => {
      return pastDivToPage(item, index, parent);
    });

    function getIcons() {
      const icons = document.getElementsByClassName("avatar_event_icon");

      Array.from(icons).map((element) => {
        const elementParent = element.parentElement.parentElement;
        // console.log("elementParent", elementParent);
        if (
          element.children[0].dataset.svgsPath !==
          "sm1/notification_completed.svg"
        ) {
          return;
        }

        const textOfDiv = elementParent.childNodes[1].childNodes[0];
        //div > task name
        const span = elementParent.childNodes[1].childNodes[1];
        //time of task
        const taskName =
          textOfDiv.childNodes[2].childNodes[0].childNodes[0].textContent;
        console.log("textOfDiv", textOfDiv);
        const score = getItemScore(taskName, regexForScoreAndPoints);
        // console.log("score", score);
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
    }
    getIcons();
  }
};
export default activityBlock;
