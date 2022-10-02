const projectBlock = () => {
  if (window.location.href.includes("https://todoist.com/app/project")) {
    if (document.getElementsByClassName("button-href").length < 1) {
      const list = document.getElementsByClassName("items");
      Array.from(list[0].childNodes).map((element) => {
        const button = document.createElement("a");
        const dataSet = element.dataset.itemId;
        const btn_link_parent = element.childNodes[0].childNodes[4].childNodes;
        button.innerHTML = "Link";
        button.className = "button-href";
        button.style.fontSize = "18px";
        button.style.display = "absolute";
        button.style.marginRight = "50px";

        element.addEventListener("mouseenter", () => {
          if (!(btn_link_parent[0].className === "button-href")) {
            btn_link_parent[0].before(button);
          }
        });

        const url = `https://todoist.com/app/task/${dataSet}/0`;
        if (btn_link_parent.length > 1) btn_link_parent[0].before(button);

        button.addEventListener("click", () => {
          window.open(url, "_blank").focus();
        });
      });
    }
  }
};

export default projectBlock;
