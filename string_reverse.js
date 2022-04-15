function reverseString1(str) {
    return str.split("").reverse().join("");
}

function reverseString2(str) {
    let reversedStr = "";
    for (let i = str.length - 1; i >= 0; --i) {
        reversedStr += str[i];
    }
    return reversedStr;
}

function reverseString3(str) {
    let reversedStr = [];
    for (let i = str.length - 1, j = 0; i >= 0; --i, ++j) {
        reversedStr[j] = str[i];
    }
    return reversedStr.join("");
}

function reverseString4(str) {
    let reversedStr = [];
    for (let i = 0; i <= str.length; ++i) {
        reversedStr.push(str.charAt(str.length - i));
    }
    return reversedStr.join("");
}

function reverseString5(str) {
    let reversedStr = "";
    for (let i = str.length; i > 0; --i) {
        reversedStr += str.substring(i-1, i);
    }

    return reversedStr;
}

function reverseString6(str) {
    for (var i = str.length - 1, reversedStr = ""; i >= 0; reversedStr += str[i--]) {}
    return reversedStr;
}

function reverseString7(str) {
    let reversedStr = "";
    let i = str.length;
    while (i > 0) {
        reversedStr += str[--i];
    }
    return reversedStr;
}

console.log(reverseString1("JavaScript is not a bad language"));
console.log(reverseString2("JavaScript is not a bad language"));
console.log(reverseString3("JavaScript is not a bad language"));
console.log(reverseString4("JavaScript is not a bad language"));
console.log(reverseString5("JavaScript is not a bad language"));
console.log(reverseString6("JavaScript is not a bad language"));
console.log(reverseString7("JavaScript is not a bad language"));