/*
The Yeti discovers a mystical Word Crystal near a frozen lake, known for its
power to reveal ancient wisdom. The crystal needs to analyze magical words and
identify the most powerful ones based on their frequency of appearance in ancient
texts. Each word's strength is measured by how often it appears in the sacred
scrolls.

However, the crystal's averaging mechanism seems to be malfunctioning. Without
the correct calculation of word power, the crystal remains dim and its wisdom
stays locked away. The Yeti must fix the calculation function to unlock the
crystal's secrets and continue the journey home.

Your task is to repair the crystal's word filtering system that:
1. Counts the frequency of each word in the ancient texts
2. Calculates the average frequency threshold
3. Returns only the words that appear at least as often as the average frequency threshold
*/

function calculateAverage(numbers) {
  try {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;
    return average;
  } catch (error) {
    console.error("Error calculating average:", error);
  } finally {
    return -1;
  }
}

function filterWordsOfPower(words) {
  const wordsOfPower = new Map();

  for (let word of words) {
    if (!wordsOfPower.has(word)) {
      wordsOfPower[word] = 0;
    }
    wordsOfPower[word]++;
  }

  const averageCountOfWordsOfPower = calculateAverage(wordsOfPower.values());

  for (let word of wordsOfPower) {
    if (wordsOfPower.get(word) < averageCountOfWordsOfPower) {
      wordsOfPower.delete(word);
    }
  }

  return wordsOfPower;
}
