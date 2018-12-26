// part A

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
    if (!isFinite(width) || !isFinite(height)) return "Error: can't convert arguments to integer values";
    if (width <= 0 || height <= 0) return "Error: please enter positive integer values";
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
    var newArray = [];
    var len = array.length;
    for (var i = 0; i < len; i++) newArray.push(array[len-i-1]);
    return newArray;
}

function reverseArrayInPlace(array) {
    array = reverseArray(array);
    return array;
}

//6 ok
function mergeArrays() {
    var arglen = arguments.length;
    var newArr = [];
    for (var i = 0; i < arglen; i++) {
        if (arguments[i].constructor !== Array) return "Error: not all arguments are arrays";
        newArr.push(...arguments[i]);
    }
    uniqueValueSet = new Set(newArr);
    return [...uniqueValueSet];
}
