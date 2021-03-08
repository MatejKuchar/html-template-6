var slider = tns({
  container: ".my-slider",
  items: 4,
  slideBy: "1",
  gutter: 30,
  controls: true,
  autoplayHoverPause: true,
  autoplay: false,
  autoplayTimeout: 1000,
  arrowKeys: true,
  mouseDrag: true,
  controlsContainer: "#customize-controls",
  responsive: {
    360: {
      items: 2,
      edgePadding: 20,
      controls: false,
    },
    578: {
      items: 3,
      gutter: 20,
      controls: false,
    },
    768: {
      items: 3,
      gutter: 20,
      controls: false,
    },
    900: {
      items: 4,
      controls: false,
      gutter: 20,
      edgePadding: 5,
    },
    1042: {
      items: 3,
      controls: true,
      gutter: 30,
      edgePadding: 5,
    },
    1050: {
      items: 4,
      controls: true,
      gutter: 30,
      edgePadding: 5,
    },
  },
});

var css = newSheet();
var duration = 8000;
document.querySelectorAll(".skills-upper__circle").forEach(function (e, i) {
  var radius = 60;
  var percent = parseInt(e.dataset.note * 1);
  var circumference = Math.PI * (2 * radius);
  var stroke_percentage = circumference - (percent / 100) * circumference;
  // Circle
  e.querySelector(
    ".skills-upper__circle--progress"
  ).style.strokeDasharray = circumference;
  e.querySelector(
    ".skills-upper__circle--progress"
  ).style.strokeDashoffset = circumference;
  e.querySelector(".skills-upper__circle--progress").style.animation =
    "donut-show-" + i + " " + duration + "ms ease forwards";
  css.insertRule(
    "@keyframes donut-show-" +
      i +
      " { to { stroke-dashoffset: " +
      stroke_percentage +
      "; } }",
    0
  );
  animateValue(e, constant);
});

function newSheet() {
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  return style.sheet;
}

function animateValue(element, easing) {
  var start = 0;
  var noteArray = element.dataset.note.split(".");
  var noteInt = noteArray[0];
  var noteDec = noteArray[1];
  var current_int = start;
  var increment_int = noteInt > start ? 1 : -1;
  var obj_int = element.querySelector(".skills-upper__int");

  var step_int = function () {
    current_int += increment_int;
    obj_int.innerHTML = current_int;
    if (current_int != noteInt) {
      setTimeout(step_int, easing(duration, noteInt, current_int));
    }
  };
  setTimeout(step_int, easing(duration, noteInt, start));
}

function constant(duration, range, current) {
  return duration / range;
}

function linear(duration, range, current) {
  return ((duration * 2) / Math.pow(range, 2)) * current;
}

function quadratic(duration, range, current) {
  return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
}

const toggleBtn = document.querySelector(".nav__toggle > span");
const nav = document.querySelector(".nav");
toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("nav__open");
  document.body.classList.toggle("no-overflow");
  var menuClass = toggleBtn.getAttribute("class");
  toggleBtn.classList.toggle("ei-icon_close");
});
