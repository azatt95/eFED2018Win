// 1 ok
function countChar(str, symbol) {
    str = str.toLowerCase();
    symbol = symbol.toLowerCase();
    var count = 0;
    var position = str.indexOf(symbol);
    while (position !== -1) {
        count++;
        position = str.indexOf(symbol, position + 1);
    }
    return count;
}

// 2 ok
function deepCompare(obj1, obj2) {
    var keys1 = Object.keys(obj1);
    keys1.sort();
    var len1 = keys1.length;
    var keys2 = Object.keys(obj2);
    keys2.sort();
    var len2 = keys2.length;
    if (len1 !== len2) return false;
    for (var i = 0; i < len1; i++) {
        if (obj1[keys1[i]] !== obj2[keys2[i]]) return false;
    }
    return true;
}

// 3 ok
function chessBoard(width, height) {
    var str = "";
    var addMe = "";
    width += 0;
    height += 0;
    if (!isFinite(width) || !isFinite(height)) throw "Arguments must be finite";
    if (width <= 0 || height <= 0) throw "Arguments must be positive";
    width = Math.round(width);
    height = Math.round(height);
    for (var i = 0; i < height; i++) {
        if (i % 2 == 0) addMe = "# ";
        else addMe = " #"
        for (var j = 0; j < width; j++) {
            str += addMe;
        }
        str += "\n";
    }
    return "\n" + str;
}

// 4 ok
function makeArray(start, end, step = 1) {
    var myArray = [];
    var currentNumber = start;
    step = Math.abs(step);
    if (start == end) return [start];
    if (start > end) {
        while (currentNumber >= end) {
            myArray.push(currentNumber);
            currentNumber -= step;
        }
    } else {
        while (currentNumber <= end) {
            myArray.push(currentNumber);
            currentNumber += step;
        }
    }
    return myArray;
}

// 5 ok
function reverseArray(array) {
    if (!Array.isArray(array)) throw "Not an array!";
    var newArray = [];
    var len = array.length;
    for (var i = 0; i < len; i++) newArray.push(array[len-i-1]);
    return newArray;
}

function reverseArrayInPlace(array) {
    if (!Array.isArray(array)) throw "Not an array!";
    var newArray = [...array];
    array.length = 0;
    var len = newArray.length;
    for (var i = 0; i < len; i++) array.push(newArray[len-i-1]);
    return array;
}

//6 ok
function mergeArrays() {
    var arglen = arguments.length;
    var newArr = [];
    for (var i = 0; i < arglen; i++) {
        if (!Array.isArray(arguments[i])) throw "All arguments must be arrays";
        newArr.push(...arguments[i]);
    }
    uniqueValueSet = new Set(newArr);
    return [...uniqueValueSet];
}

// functioncheck helper function
function isFunction() {
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        if (Object.prototype.toString.call(arguments[i]) !== "[object Function]") return false;
    }
    return true;
}

//7 done
function every(arr, func) {
    if (!Array.isArray(arr)) throw "First argument must be an array";
    if (!isFunction(func)) throw "Second argument must be a function";
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (!func(arr[i], i, arr)) return false;
    }
    return true;
}

function some(arr, func) {
    if (!Array.isArray(arr)) throw "First argument must be an array";
    if (!isFunction(func)) throw "Second argument must be a function";
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (func(arr[i], i, arr)) return true;
    }
    return false;
}

//8 done
function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5) return a * b;
    else throw "MultiplicatorUnitFailure";
}

function safelyExecute(func) {
    var args = [...arguments];
    args.shift();
    var result;
    var i = 0;
    var maxAttempts = 100; // to avoid getting stuck
    while (i < maxAttempts) {
        try { result = func(...args); }
        catch(e) { if (e === "MultiplicatorUnitFailure") { i++; continue; } }
        break;
    }
    // console.log("Exceptions handled: " + i);
    return result;
}

//huge thanks to regexr.com for 9 and 10
//9 done
function replaceQuotes(str) {
    str = str.toString(); // invalid input handling - convert to string first
    var re = /([A-Za-z]+)"([A-Za-z]+)/g;
    return str.replace(/'/g, '"').replace(re, "$1'$2");
}

//10 done
function findNumbers(arr) {
    var re = /^(?:-|\+)?(?:\d+\.?\d*|\.\d+)(?:[eE](?:-|\+)?\d+)?$/;
    var len = arr.length;
    var newArr = [];
    for (var i = 0, elem; i < len; i++) {
        elem = arr[i].toString();
        if (re.test(elem)) newArr.push(elem);
    }
    return newArr;
}

//datecheck helper function 
function isDate() {
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        if (Object.prototype.toString.call(arguments[i]) !== "[object Date]") return false;
    }
    return true;
}

//11 done
function getNames(date) {
    if (!isDate(date)) throw "Argument must be a Date object";
    var monthNames = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"]
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return monthNames[date.getMonth()] + ", " + dayNames[date.getDay()];
}

//12 done
function differenceInYears(d1, d2) {
    if (!isDate(d1, d2)) throw "Each argument must be a Date object";
    return +((d2 - d1)/1000/60/60/24/365).toFixed(1);
}
