import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";
import connectFonts from "./fonts/connectFonts";

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
