let targetOffset = {
    x: 0,
    y: 0,
};

let isTargetDragged = false;
let draggedTarget;

let highestZIndex = 1;

let boxCount = 1;
let boxId = 1;

const mouseDownHandler = (ev) => {
    if (isTargetDragged) {
        return;
    }

    const target = ev.target;
    switch (ev.which) {
        // Left mouse button
        case 1:
            if (ev.shiftKey) {
                target.classList.toggle("box-large");
                return;
            }

            targetOffset.x = target.offsetLeft - ev.clientX;
            targetOffset.y = target.offsetTop - ev.clientY;
            // Move selected target to front
            if (ev.target.style["z-index"] < highestZIndex) {
                ev.target.style["z-index"] = ++highestZIndex;
            }
            isTargetDragged = true;
            draggedTarget = ev.target;
            break;

        // Right mouse button
        case 3:
            ev.preventDefault();
            ev.target.style['background-color'] = generateRandomColor();
    }
};

const mouseUpHandler = (ev) => {
    isTargetDragged = false;
};

const mouseMoveHandler = (ev) => {
    if (!isTargetDragged) {
        return;
    }
    draggedTarget.style["left"] = targetOffset.x + ev.clientX + "px";
    draggedTarget.style["top"] = targetOffset.y + ev.clientY + "px";
};

const doubleClickHandler = (ev) => {
    let newBox = document.createElement("div");

    if ((ev.currentTarget !== ev.target) && (ev.currentTarget.classList.contains("box-container"))) {
        // Check if alt key is pressed for delete
        if (ev.altKey) {
            if (boxCount > 1) {
                ev.target.remove();
                boxCount--;
            }
            return;
        }

        ev.currentTarget.appendChild(newBox);
    } else {
        ev.target.appendChild(newBox);
    }

    boxCount++;
    newBox.appendChild(document.createTextNode(++boxId));

    newBox.classList.add("box");
    newBox.style["left"] = ev.clientX + "px";
    newBox.style["top"] = ev.clientY + "px";
    newBox.style["z-index"] = ++highestZIndex;
    newBox.style["background-color"] = generateRandomColor();
    addBoxEventListeners(newBox);
};

const contextMenuHandler = (ev) => {
    ev.preventDefault();
};

const addBoxEventListeners = (box) => {
    box.addEventListener("mousedown", mouseDownHandler);
    box.addEventListener("mouseup", mouseUpHandler);
    box.addEventListener("contextmenu", contextMenuHandler);
};

const addBoxContainerEventListeners = (boxContainer) => {
    boxContainer.addEventListener("dblclick", doubleClickHandler);
    boxContainer.addEventListener("mousemove", mouseMoveHandler);
    boxContainer.addEventListener("contextmenu", contextMenuHandler);
};

const generateRandomColor = () => {
    const chars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; ++i) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
};
  

const boxes = document.getElementsByClassName("box");
const boxContainers = document.getElementsByClassName("box-container");

Array.from(boxContainers).forEach((boxContainer) => {
    console.log(boxContainer);
    addBoxContainerEventListeners(boxContainer);
});

Array.from(boxes).forEach((box) => {
    addBoxEventListeners(box);
});