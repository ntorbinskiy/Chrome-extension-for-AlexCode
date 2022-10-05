/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/img/icon.png":
/*!**************************!*\
  !*** ./src/img/icon.png ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "icon.png");

/***/ }),

/***/ "./src/js/activity-block.js":
/*!**********************************!*\
  !*** ./src/js/activity-block.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    const listItem = elementParent.childNodes;
    //div > task name
    console.log(listItem);
    const span = elementParent.childNodes[1].childNodes[1];
    //time of task
    const taskName =
      elementParent.childNodes[1].childNodes[0].childNodes[2].childNodes[0]
        .childNodes[0].textContent;

    const score = getItemScore(taskName, regexForScoreAndPoints);
    if (score === undefined) {
      elementParent.style.backgroundColor = "rgba(246, 193, 4, 0.11)";
      if (span.id === "nopoints") {
        return;
      }
      const noPoints = document.createElement("span");
      noPoints.innerHTML = "No points entered for this task";
      span.id = "nopoints";
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (activityBlock);


/***/ }),

/***/ "./src/js/project-block.js":
/*!*********************************!*\
  !*** ./src/js/project-block.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _img_icon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/icon.png */ "./src/img/icon.png");


const linkFunc = () => {
  if (document.getElementsByClassName("button-href").length < 1) {
    const list = document.getElementsByClassName("items");

    Array.from(list).map((element) =>
      Array.from(element.childNodes).map((item, i) => {
        const button = document.createElement("a");
        const dataSet = item.dataset.itemId;
        const btn_link_parent = item?.childNodes[0]?.childNodes[4]?.childNodes;
        if (!btn_link_parent) {
          return;
        }

        const url = `https://todoist.com/app/task/${dataSet}/0`;
        button.style.background = `url(${chrome.runtime.getURL("icon.png")})`;
        button.className = "button-href";
        button.style.height = "20px";
        button.style.width = "20px";
        button.style.marginRight = "50px";

        item.addEventListener("mouseenter", () => {
          if (!(btn_link_parent[0].className === "button-href")) {
            btn_link_parent[0].before(button);
          }
        });

        button.addEventListener("click", () => {
          window.open(url, "_blank").focus();
        });
      })
    );
  }
};

const projectBlock = () => {
  if (window.location.href.includes("https://todoist.com/app/project")) {
    linkFunc();
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectBlock);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/js/content-script-root.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _activity_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activity-block */ "./src/js/activity-block.js");
/* harmony import */ var _project_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-block */ "./src/js/project-block.js");


const runApp = () => {
  (0,_activity_block__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_project_block__WEBPACK_IMPORTED_MODULE_1__["default"])();
};

window.setInterval(function () {
  runApp();
}, 1000);

})();

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map