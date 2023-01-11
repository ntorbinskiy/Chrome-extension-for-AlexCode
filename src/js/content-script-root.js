import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";
import connectFonts from "./fonts/connectFonts";
import "../icons/icon128.png";
import "../icons/icon48.png";
import "../icons/icon32.png";
import "../icons/icon16.png";

connectFonts();

window.addEventListener(
  "load",
  () => {
    setTimeout(() => {
      runApp();
      mutationObserver();
    }, 700);
  },
  false
);
