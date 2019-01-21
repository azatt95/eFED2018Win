// this.window.onload = function() {
//   window.document.getElementById("mainInfo").innerHTML = JSON.stringify(
//     weekForecastMock
//   );
// };

var dayView = document.getElementById("dayView");
var days = dayView.getElementsByClassName("day");
var daySel = 0;
var daySelector = document.getElementById("daySelector");
var dayBtns = daySelector.getElementsByClassName("dayBtn");

function selectDay(arg) {
    var formerDaySel = daySel;
    if (Number.isInteger(arg) && arg >= 0 && arg < days.length && arg != daySel) {
        daySel = arg;
    }
    if (arg === "next") {
        if (daySel === days.length - 1) daySel = 0;
        else daySel++;
    }
    if (arg === "previous") {
        if (daySel === 0) daySel = days.length - 1;
        else daySel--;
    }
    days[formerDaySel].setAttribute("hidden", "");
    days[daySel].removeAttribute("hidden");
    dayBtns[formerDaySel].removeAttribute("checked");
    dayBtns[daySel].setAttribute("checked", "");
}
