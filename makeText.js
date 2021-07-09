/** Command-line tool to generate Markov text. */
const process = require('process');
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

let data = null

function file(path) {
    fs.readFile(`./${path}`, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            console.log("--Cannot Read File")
            process.exit(3)
        }
        let mm = new MarkovMachine(data);
        mm.makeChains()
        data = mm.makeText()
        console.log(`... generated text from file '${path}' ...`)

    });
}

async function url(url) {
    try {
        const resp = await axios.get(url)
        let mm = new MarkovMachine(resp.data);
        mm.makeChains()
        data = mm.makeText()
        console.log(`... generated text from URL '${url}' ...`)

    } catch (error) {
        console.log(error)
        if (error instanceof TypeError) {
            console.log("--INVALID URL please try a different URL")
            process.exit(3)
        }
        else {
            console.log("--Cannot Read URL--")
        }

    }
}


if (process.argv[2] === 'file') {
    file(process.argv[3]);
} else if (process.argv[2] === 'url') {
    url(process.argv[3]);
}