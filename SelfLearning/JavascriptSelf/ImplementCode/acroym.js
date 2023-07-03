function convertToAcronym(phrase) {
  const words = phrase.split(" ");
  const acronym = words.map((word) => word.charAt(0)).join("");
  return acronym.toUpperCase();
}

// Example usage:
const phrase = "Complementary metal-oxide semiconductor";

const result = convertToAcronym(phrase);
console.log("Result:", result);
