const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;
const count = {};

function appStart() {
  function displayGameover() {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:37vw; background-color:white";
    document.body.appendChild(div);
  }

  function gameover() {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  }

  const handleEnterkey = () => {
    let answerCount = 0;
    //정답확인
    for (let i = 0; i < 5; i++) {
      const compare = document.querySelector(
        `.board-block[data-index ='${attempts}${i}']`
      );

      const key = document.querySelector(
        `.line-block[data-key = "${compare.innerText.toUpperCase()}"]`
      );

      if (answer[i] === compare.innerText) {
        compare.style.background = "#6AAA64";
        compare.style.borderColor = "#6AAA64";
        key.style.background = "#6AAA64";
        key.style.color = "white";
        answerCount++;
      } else if (answer.includes(compare.innerText)) {
        compare.style.background = "#C9B458";
        compare.style.borderColor = "#C9B458";

        if (count.keyCode === 0) {
          key.style.background = "#C9B458";
          key.style.color = "white";
        }
      } else {
        compare.style.background = "#787C7E";
      }
      compare.style.color = "white";
    }

    index = 0;
    attempts++;

    if (answerCount === 5) {
      gameover();
    }
  };

  const handleKeydown = (event) => {
    if (index < 0) {
      index = 0;
    }
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const removeBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index - 1}']`
    );

    if (keyCode === 8) {
      index = index - 1;
      removeBlock.innerText = null;

      if (index === 0) {
        return;
      }
    }

    if (index === 5) {
      if (event.key === "Enter") {
        handleEnterkey();
      } else if (keyCode === 8) {
        removeBlock.innerText = null;
      } else {
        return;
      }
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }

    if (attempts === 6) {
      alert("실패하였습니다.");
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTimer() {
      const nowTime = new Date();
      const flowTime = new Date(nowTime - startTime);
      const min = flowTime.getMinutes().toString();
      const sec = flowTime.getSeconds().toString();
      const time2 = document.querySelector("#timer");
      time2.innerText = `Timer : ${min.padStart(2, "0")}:${sec.padStart(
        2,
        "0"
      )}`;
    }
    timer = setInterval(setTimer, 1000);
  };
  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
