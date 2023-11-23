function setup() {
  createCanvas(windowWidth, windowHeight);

  // 模式設定
  angleMode(DEGREES);
  textAlign(CENTER);
  textStyle(BOLD);
  colorMode(HSB);

  // 背景滑桿樣式
  slider_bg = createSlider(0, 255, 0);
  slider_bg.position(50, 10);
  slider_bg.style("width", "100px");
  slider_bg.style("color", 255, 0, 0);

  // H滑桿樣式
  slider_h = createSlider(0, 255, 0);
  slider_h.position(50, 30);
  slider_h.style("width", "100px");

  // S滑桿樣式
  slider_s = createSlider(0, 255, 0);
  slider_s.position(50, 50);
  slider_s.style("width", "100px");

  // B滑桿樣式
  slider_b = createSlider(0, 255, 100);
  slider_b.position(50, 70);
  slider_b.style("width", "100px");

  // 取樣滑桿樣式
  slider_xoff = createSlider(0, 100, 0);
  slider_xoff.position(250, 10);
  slider_xoff.style("width", "100px");

  // 變動速度滑桿樣式
  slider_yoff = createSlider(0, 100, 0);
  slider_yoff.position(250, 30);
  slider_yoff.style("width", "100px");

  // 幅度滑桿樣式
  slider_waveheight = createSlider(100, 500, 0);
  slider_waveheight.position(250, 50);
  slider_waveheight.style("width", "100px");

  // 時長滑桿樣式
  slider_time = createSlider(100, 2500, 0);
  slider_time.position(250, 70);
  slider_time.style("width", "100px");

  //新增按鈕
  button = createButton("新增");
  button.position(220, 100);
  button.mousePressed(new_wave);
  button.style("width", "50px");
  button.style("height", "22px");

  //更新按鈕
  button_reset = createButton("更新");
  button_reset.position(280, 100);
  button_reset.mousePressed(preview_reset);
  button_reset.style("width", "50px");
  button_reset.style("height", "22px");
}
/* ----------- 初始參數 -----------*/
// perlin noise 調整參數
let xoff = [0, 0, 0]; //取樣原點x座標
let yoff = [0, 0, 0]; //取樣原點y座標
let xoff_rate = [0.001, 0.003, 0.002]; // 取樣尺度(0.001~0.003)
let yoff_rate = [0.005, 0.002, 0.004]; // 變動速度(0.002~0.005)

// wave 調整參數
let wave_height = [150, 200, 150]; // 波動幅度
let rotate_arr = [0, 5, -5]; // 選轉角度
let xtraslate = [0, 0, -100]; // 往右位移
let duration = [500, 2000, 3000]; // 氣息的持續時間
let duration_now = [500, 2000, 3000]; // 氣息的剩餘時間

// wave 樣式參數
let clr_h = [0, 0, 0]; // H
let clr_s = [0, 0, 0]; // S
let clr_b = [255, 255, 255]; // B
/* ----------- 初始參數 -----------*/

/* ----------- 預覽視窗初始參數 -----------*/
// perlin noise 調整參數
let preview_xoff = 0;
let preview_yoff = 0;

// wave 調整參數
let preview_duration = 500;
let preview_duration_now = 500;
/* ----------- 預覽視窗初始參數 -----------*/

function draw() {
  // 繪製滑桿
  slider();

  // 背景
  background(0, 0, slider_bg.value(), 0.09);

  // 氣息
  for (let i = 0; i < xoff.length; i++) {
    push();

    //trs
    translate(xtraslate[i], +50);
    rotate(rotate_arr[i]);
    scale(2, 1);

    //wave
    noFill();
    let trp = map(duration_now[i], 0, duration[i], 0, 0.5);
    stroke(clr_h[i], clr_s[i], clr_b[i], trp);
    strokeWeight(2);
    beginShape();
    vertex(-20, height / 2);
    xoff[i] = 0;
    for (let x = 0; x < width; x++) {
      let y = map(
        noise(xoff[i], yoff[i]),
        0,
        1,
        height / 2 - wave_height[i],
        height / 2 + wave_height[i]
      );
      vertex(x, y);
      xoff[i] += xoff_rate[i];
    }
    yoff[i] += yoff_rate[i];
    vertex(width, height / 2);
    endShape();

    pop();

    if (duration_now[i] > 0) {
      duration_now[i] -= 1;
    }
  }

  // 視窗預覽
  fill(0, 0, slider_bg.value(), 0.1);
  rect(400, 10, width / 5, height / 5);
  //wave
  push();
  translate(400, 10);
  scale(0.2, 0.2);

  noFill();
  let preview_trp = map(preview_duration_now, 0, preview_duration, 0, 0.5);
  stroke(slider_h.value(), slider_s.value(), slider_b.value(), preview_trp);
  strokeWeight(10);
  beginShape();
  vertex(-5, height / 2);
  let preview_xoff_rate = lerp(0.001, 0.005, slider_xoff.value() / 100);
  let preview_yoff_rate = lerp(0.001, 0.005, slider_yoff.value() / 100);
  preview_xoff = 0;
  for (let x = 0; x < width; x++) {
    let y = map(
      noise(preview_xoff, preview_yoff),
      0,
      1,
      height / 2 - slider_waveheight.value(),
      height / 2 + slider_waveheight.value()
    );
    vertex(x, y);
    preview_xoff += preview_xoff_rate;
  }
  preview_yoff += preview_yoff_rate;
  vertex(width, height / 2);
  endShape();
  pop();

  noFill();
  strokeWeight(4);
  rect(400, 10, width / 5, height / 5);

  if (preview_duration_now > 0) {
    preview_duration_now -= 1;
  } else if (preview_duration_now == 0) {
    preview_reset();
  }
  print(preview_trp);
}

//滑桿
function slider() {
  // 背景顏色滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("背景", 25, 25);
  text(slider_bg.value(), 175, 25);

  // H滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("H", 25, 45);
  text(slider_h.value(), 175, 45);

  // S滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("S", 25, 65);
  text(slider_s.value(), 175, 65);

  // B滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("B", 25, 85);
  text(slider_b.value(), 175, 85);

  // x取樣滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("曲折度", 230, 25);
  text(slider_xoff.value(), 375, 25);

  // y變動速度滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("變動性", 230, 45);
  text(slider_yoff.value(), 375, 45);

  // 幅度滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("幅度", 230, 65);
  text(slider_waveheight.value(), 375, 65);

  // 時長滑桿
  stroke(0, 0, 255);
  strokeWeight(0.8);
  fill(0, 0, 0);
  text("時長", 230, 85);
  text(slider_time.value(), 375, 85);
}

//新增氣息
function new_wave() {
  noStroke();
  fill(0, 0, 255);
  ellipse(mouseX, mouseY, 5, 5);
  xoff.push(0);
  yoff.push(0);
  xoff_rate.push(lerp(0.001, 0.005, slider_xoff.value() / 100));
  yoff_rate.push(lerp(0.001, 0.005, slider_yoff.value() / 100));
  wave_height.push(random(1, 4) * 100);
  rotate_arr.push(random(-5, 5));
  xtraslate.push(-60);
  duration.push(slider_time.value());
  duration_now.push(slider_time.value());

  clr_h.push(slider_h.value());
  clr_s.push(slider_s.value());
  clr_b.push(slider_b.value());

  return;
}

function preview_reset() {
  //更新預覽的氣息
  preview_duration = slider_time.value();
  preview_duration_now = slider_time.value();
}
