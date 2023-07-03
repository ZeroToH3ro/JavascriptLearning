// Custom implementation of toLowerCase()
function toLowerCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // Convert uppercase letters to lowercase
      result += String.fromCharCode(charCode + 32);
    } else {
      result += str[i];
    }
  }
  return result;
}

// Custom implementation of toUpperCase()
function toUpperCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) {
      // Convert lowercase letters to uppercase
      result += String.fromCharCode(charCode - 32);
    } else {
      result += str[i];
    }
  }
  return result;
}

// Example usage:
const input = "Hello World";

const lowerCaseOutput = toLowerCase(input);
console.log("Lowercase:", lowerCaseOutput);

const upperCaseOutput = toUpperCase(input);
console.log("Uppercase:", upperCaseOutput);
