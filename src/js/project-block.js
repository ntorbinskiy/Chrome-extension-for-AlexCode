import "../img/icon.png";

const linkFunc = () => {
  if (document.getElementsByClassName("button-href").length < 1) {
    const list = document.getElementsByClassName("items");

    console.log(Array.from(list));
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

        // if (btn_link_parent.length > 1) btn_link_parent[0].before(button);
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

export default projectBlock;
