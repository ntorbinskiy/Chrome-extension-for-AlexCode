const createSvg = (iconSvg, iconImage) => {
  iconSvg.setAttribute("version", "1.1");
  iconSvg.setAttribute("x", "0px");
  iconSvg.setAttribute("y", "0px");
  iconSvg.setAttribute("width", "20px");
  iconSvg.setAttribute("height", "20px");
  iconSvg.setAttribute("viewBox", "0 0 20 20");
  iconSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  iconSvg.setAttribute("enable-background", "new 0 0 20 20");
  iconSvg.setAttribute("xml:space", "preserve");

  iconImage.setAttribute("id", "image0");
  iconImage.setAttribute("width", "20px");
  iconImage.setAttribute("height", "20px");
  iconImage.setAttribute("x", "0px");
  iconImage.setAttribute("y", "0px");
  iconImage.setAttribute(
    "href",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfmCgcXIjREwXVHAAAApUlEQVQoz7XSXQ3CMBSG4fcsFTAJlQASkICDSQAFp1VAcDAJOAAHw8EqoQ7KBWwZCWtLAt9dkyfnp61oJyda8gnijGja+pB3ahlwiYq41NQwgGpoptKZtrKE8rPW3874Hm3ZzIfwvOWPECtKAKDjwn4V+js7AO3lNj1vZkbtZUy+uIz2MjoPrxHW4MxKWzeDngGIU8V//J6otoTUEkw6ytWVaJTDAy1iL1Gf3x6IAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEwLTA3VDIxOjM0OjUyKzAyOjAwY9Vg1AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMC0wN1QyMTozNDo1MiswMjowMBKI2GgAAAAASUVORK5CYII="
  );
  iconSvg.appendChild(iconImage);

  return iconSvg;
};

const buttonStyles = (button) => {
  button.className = "button-href";
  button.style.height = "24px";
  button.style.width = "24px";
  button.style.marginTop = "-1px";
};

const nodeToArray = (node) => {
  return Array.from(node);
};

const linkLogic = () => {
  const listOfTasks = document.getElementsByClassName("items");

  nodeToArray(listOfTasks).map((task) =>
    nodeToArray(task.childNodes).map((item) => {
      const button = document.createElement("button");
      const svgPath = "http://www.w3.org/2000/svg";

      const iconSvg = document.createElementNS(svgPath, "svg");

      const iconImage = document.createElementNS(svgPath, "image");

      button.appendChild(createSvg(iconSvg, iconImage));

      const btnLinkParent = item?.childNodes[0]?.childNodes[4]?.childNodes;

      if (!btnLinkParent) {
        return;
      }

      buttonStyles(button);

      item.addEventListener("mouseenter", () => {
        if (!(btnLinkParent[0].className === "button-href")) {
          btnLinkParent[0].before(button);
        }
      });

      button.addEventListener("click", () => {
        window
          .open(
            `https://todoist.com/app/task/${item.dataset.itemId}/0`,
            "_blank"
          )
          .focus();
      });
    })
  );
};

const projectBlock = () => {
  if (window.location.href.includes("https://todoist.com/app/project")) {
    linkLogic();
  }
};

export default projectBlock;
