const { MarkovMachine } = require("./markov.js");

describe("tests for markovMachine.makeChains", function () {

    beforeAll(function () {
        mm = new MarkovMachine('test this script serioussly test this script')
    });

    test("makeChains creates a proper chain", function () {
        expect(typeof mm.makeChains()).toEqual('object')
    });

    test("makeChains has proper amount of keys", function () {
        const data = mm.makeChains()
        expect(Object.keys(data).length).toEqual(4)
    });

    test("makeChains with no text", function () {
        const nn = new MarkovMachine('')
        expect(typeof nn.makeChains()).toEqual('object')
    });

    test("makeChains with same words", function () {
        const nn = new MarkovMachine('Deku Deku')
        const data = nn.makeChains()
        expect(Object.keys(data).length).toEqual(1)
    });

    afterAll(function () {
        console.log('Finished :) ')
    })
})

describe("tests for markovMachine.makeText", function () {

    beforeAll(function () {
        mm = new MarkovMachine('test this script serioussly test this script')
        mm.makeChains()
    });

    test("makeText creates a proper string", function () {
        expect(typeof mm.makeText()).toEqual('string')
    });

    test("makeText has proper amount of words", function () {
        const data = mm.makeText()
        const dataAsArr = data.split(' ')
        expect(dataAsArr.length).toEqual(100)
    });

    test("makeText with no text", function () {
        const nn = new MarkovMachine('')
        expect(nn.makeText()).toEqual('')
    });

    test("makeChains with same words", function () {
        const nn = new MarkovMachine('Deku Deku')
        nn.makeChains()
        expect(nn.makeText(2)).toEqual('Deku Deku')
    });

    afterAll(function () {
        console.log('Finished :) ')
    })
})