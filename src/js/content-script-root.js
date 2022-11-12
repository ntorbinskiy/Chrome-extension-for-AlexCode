import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";
import connectFonts from "./fonts/connectFonts";

connectFonts();

setTimeout(async () => {
  await runApp();
  mutationObserver();
}, 1000);
