/** Textual markov chain generator */
const process = require("process")

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const wordObj = {};
    const uniqueWords = new Set(this.words);

    uniqueWords.forEach(element => {
      if (wordObj[element] === undefined) {
        const nextWords = []
        for (let i = 0; i < this.words.length; i++) {
          if (element == this.words[i]) {
            if (this.words[i + 1] === undefined) {
              nextWords.push(null)
            } else if (this.words[i + 1] !== undefined){
              nextWords.push(this.words[i + 1])
            }
          }
        }
        wordObj[element] = nextWords
      }
    });

    return this.chain = wordObj
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let numWordsArr = []
    if (this.chain === undefined) {
      return ""
    }
    const Keys = Object.keys(this.chain)
    while (numWordsArr.length < numWords) {
      let randomKey = Keys[Math.floor(Math.random() * Keys.length)]
      let randomWord = this.chain[randomKey][Math.floor(Math.random() * this.chain[randomKey].length)]
      if (randomWord !== null) {
        numWordsArr.push(randomWord)
      }
    }
   return numWordsArr.join(' ')
  }
}

module.exports = {
  MarkovMachine
}