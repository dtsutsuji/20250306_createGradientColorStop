"use strict";

// DOMの整理
const canvas = document.getElementById("canvas");

const bar1Range = document.getElementById("bar1");
const bar1Label = document.getElementById("bar1Label");

const gradListLength = gradColorList.length;
const btnRandom = document.getElementById("btnRandom");

const canvasRatio = document.getElementsByName("canvasRatio");
const ratio3 = "400";//500,700
const ratio2 = "282";//353,495


// DOMの処理

window.onload = function() {
  changeRandomGrad();
  draw();
}

canvasRatio.forEach(
  r => r.addEventListener("change" ,() => {
    const checkedRadio = document.querySelector("input[name='canvasRatio']:checked");
    console.log(checkedRadio.value)
    if (checkedRadio.id == "holizontal") {
      console.log("fire1")
      canvas.width = ratio3;
      canvas.height = ratio2;
    } else if(checkedRadio.id == "vertical") {
      console.log("fire2")
      canvas.width = ratio2;
      canvas.height = ratio3;
    }
    draw();
  })
);

bar1Range.addEventListener('input',() => {
  bar1Label.textContent = bar1Range.value;
  draw();
})

btnRandom.addEventListener('click',() => {
  changeRandomGrad();
  draw();
})

function changeRandomGrad () {
  bar1Range.max = gradListLength-1;
  const randValue = Math.floor(Math.random() * gradListLength);
  bar1Range.value = randValue;
  bar1Label.textContent = randValue;
}

// canvasの処理

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // グラデーションの描画
    const lingrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    setGradColorStop(gradColorList, lingrad)
  
    ctx.fillStyle = lingrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // 不透明・半透明の四角を描画
    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgb(0 0 200 / 50%)";
    ctx.fillRect(30, 30, 50, 50);

  }
}

// グラデーションのカラーストップを作成

function divGradList(list) {
  return list[bar1Range.value]
}
function setGradColorStop(lists, grad) {
  const list = divGradList(lists)
  Object.keys(list).forEach(key => {
    grad.addColorStop(key, list[key]);
  })
}