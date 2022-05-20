const textArea = document.createElement("textarea");
textArea.className = "text-area";
let caseDown = document.querySelector(".caseDown");

const rows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];

//Init HTML body

document.addEventListener("DOMContentLoaded", (e) => {
  insertKeyboardContainer();
  insertKeyboardsRows();
  insertTextArea();
  toggleClassPressKey();
  toggleClassClickKey();
});

// Insert keyboard container

const insertKeyboardContainer = () => {
  const keyboardContainerHTML = `<div class="container">
  <div class="body-keyboard"></div>
  </div>`;
  document.body.innerHTML = keyboardContainerHTML;
};

// Insert keyboard rows

const insertKeyboardsRows = () => {
  const keyboardRowsHTML = rows
    .map(
      (row) =>
        `<div class="keyboard-row row">${row
          .map(
            (item) => `<div class="keyboard-key key ${item.name}">
            <span class="rus">
  <span class="caseDown">${item.rus.caseDown}</span>
  <span class="caseUp hidden">${item.rus.caseUp}</span>
  <span class="capsLock hidden">${item.rus.capsLock}</span>
  <span class="shiftCaps hidden">${item.rus.shiftCaps}</span>
</span>
<span class="eng hidden">
  <span class="caseDown">${item.eng.caseDown}</span>
  <span class="caseUp hidden">${item.eng.caseUp}</span>
  <span class="capsLock hidden">${item.eng.capsLock}</span>
  <span class="shiftCaps hidden">${item.eng.shiftCaps}</span>
</span>
</div>`
          )
          .reduce((prevItem, currentItem) => prevItem + currentItem, "")}</div>`
    )
    .reduce((prevItem, currentItem) => prevItem + currentItem, "");
  const keyboardContainer = document.querySelector(".body-keyboard");
  keyboardContainer.innerHTML = keyboardRowsHTML;
};

// Isert textarea

const insertTextArea = () => {
  document.body.prepend(textArea);
};

// ADD EVENTS WHEN KEY IS PRESSED

const toggleClassPressKey = () => {
  document.addEventListener("keydown", (e) => {
    const code = e.code;
    document.querySelector(`.${code}`).classList.add("active");

    setTimeout(() => {
      document.querySelector(`.${code}`).classList.remove("active");
    }, 200);

    if (isSpecialSymbol(e.key)) {
      return;
    }

    textArea.value += e.key;
  });

  function isSpecialSymbol(key) {
    return (
      key === "Backspace" ||
      key === "Alt" ||
      key === "Control" ||
      key === "Enter" ||
      key === "Meta" ||
      key === "Tab" ||
      key === "Escape" ||
      key === "Delete" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "CapsLock" ||
      key === "Shift"
    );
  }

  // ADDED FUNC TO SPECIALS KEYS

  const specialSymbolFunctions = {
    "Backspace": (value) => value.slice(0, textArea.value.length - 1)
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === "Backspace") {
      const truncatedValue = specialSymbolFunctions[e.code](textArea.value)
      textArea.value = truncatedValue;
    }
    if (e.code === "Space") {
      const addedSpace = textArea.value.concat("");
      textArea.value = addedSpace;
    }
    if (e.code === "Tab") {
      const addedTab = textArea.value.concat(" ");
      textArea.value = addedTab;
    }
    if (e.code === "Enter") {
      const addedEnter = textArea.value.concat("\n");
      textArea.value = addedEnter;
    }
    if (e.code === "CapsLock") {
      const keysForCaps = document.querySelectorAll(".key");
      keysForCaps.forEach((key) => {
        key.querySelector(".capsLock").classList.toggle("hidden");
        key.querySelector(".caseDown").classList.toggle("hidden");
      });
    }
    if (e.code === "ShiftLeft") {
      const keysForShift = document.querySelectorAll(".key");
      keysForShift.forEach((key) => {
        key.querySelector(".caseUp").classList.remove("hidden");
        key.querySelector(".caseDown").classList.add("hidden");
      });
    }
    if (e.code === ("ControlLeft" && "AltLeft")) {
      const keysForSwitchingLang = document.querySelectorAll(".key");
      keysForSwitchingLang.forEach((key) => {
        key.querySelector(".rus").classList.toggle("hidden");
        key.querySelector(".eng").classList.toggle("hidden");
      });
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "ShiftLeft") {
      const keysForShift = document.querySelectorAll(".key");
      keysForShift.forEach((key) => {
        key.querySelector(".caseUp").classList.add("hidden");
        key.querySelector(".caseDown").classList.remove("hidden");
      });
    }
  });
};
const toggleClassClickKey = () => {
  document.addEventListener("click", (e) => {
    //если имя тега элемента на который мы нажали не спан, то ничего не делаем
    if (e.target.tagName !== "SPAN") return;
    //во всех других случаях мы делаем это:
    e.target.closest("DIV").classList.add("active");
    setTimeout(() => {
      e.target.closest("DIV").classList.remove("active");
    }, 200);
    if (isSpecialSymbol(e.target.innerHTML)) {
      return;
    }
    //раметка поля ввода \ добавляю / кнопку на которую нажали
    textArea.value += e.target.innerHTML;
  });

  function isSpecialSymbol(key) {
    return (
      key === "Backspace" ||
      key === "Alt" ||
      key === "Ctrl" ||
      key === "Enter" ||
      key === "Meta" ||
      key === "Tab" ||
      key === "Escape" ||
      key === "Delete" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "Caps" ||
      key === "Shift"
    );
  }

  document.addEventListener("click", (e) => {
    if (e.target.innerHTML === "Backspace") {
      const truncatedValue = textArea.value.slice(0, textArea.value.length - 1);
      textArea.value = truncatedValue;
    }
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Space") {
      const addedSpace = textArea.value.concat("");
      textArea.value = addedSpace;
    }
    if (e.target.innerHTML === "Tab") {
      const addedTab = textArea.value.concat(" ");
      textArea.value = addedTab;
    }
    if (e.target.innerHTML === "Enter") {
      const addedEnter = textArea.value.concat("\n");
      textArea.value = addedEnter;
    }
    if (e.target.innerHTML === "Caps") {
      const keysForCaps = document.querySelectorAll(".key");
      keysForCaps.forEach((key) => {
        key.querySelector(".capsLock").classList.toggle("hidden");
        key.querySelector(".caseDown").classList.toggle("hidden");
      });
    }
    if (e.target.innerHTML === "Shift") {
      const keysForShift = document.querySelectorAll(".key");
      keysForShift.forEach((key) => {
        key.querySelector(".caseUp").classList.remove("hidden");
        key.querySelector(".caseDown").classList.add("hidden");
      });
    }
    if (e.target.innerHTML === ("Ctrl" && "Alt")) {
      const keysForSwitchingLang = document.querySelectorAll(".key");
      keysForSwitchingLang.forEach((key) => {
        key.querySelector(".rus").classList.toggle("hidden");
        key.querySelector(".eng").classList.toggle("hidden");
      });
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.innerHTML === "Shift") {
      const keysForShift = document.querySelectorAll(".key");
      keysForShift.forEach((key) => {
        key.querySelector(".caseUp").classList.add("hidden");
        key.querySelector(".caseDown").classList.remove("hidden");
      });
    }
  });
};
