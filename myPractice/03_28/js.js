var elapsedTime = 0;
var interval = setInterval(function() {
  timer()
}, 100);

function progressbar(percent) {
  document.getElementById("prgsbarcolor").style.width = percent + '%';
  document.getElementById("prgsbartext").innerHTML = percent + '%';
}

function timer() {
  if (elapsedTime > 100) {
    document.getElementById("prgsbartext").style.color = "#FFF";
    document.getElementById("prgsbartext").innerHTML = "Completed.";
    if (elapsedTime >= 107) {
      clearInterval(interval);
      history.go(-1);
    }
  } else {
    progressbar(elapsedTime);
  }
  elapsedTime++;
}
