import * as gameService from "./gameService"

describe("Game service", () => {
    const game = gameService.createGame("test")
    test("should put camels from hand to herd", () => {
        // TODO

        gameService.putCamelsFromHandToHerd(game)

        for (let player of game._players) {
            expect(player.hand.includes('camel')).toBe(false)
        }
    })

    // Faire cette partie avant la seance prochaine

    test("should draw cards", () => {
        // TODO
        let count = 1
        const tab1 = ['Camel', 'gold', 'cloth', 'spice']
        const tab = gameService.drawCards(tab1, 1)

        expect(tab).toStrictEqual(['Camel'])
        expect(tab1.includes('Camel')).toEqual(false)
    })

    test("should init a deck", () => {
        // TODO
        const deck = gameService.initDeck()
        expect(deck.length).toEqual(52)
        expect(deck.filter(x => x === "diamonds").length).toEqual(6)
        expect(deck.filter(x => x === 'gold').length).toEqual(6)
        expect(deck.filter(x => x === 'cloth').length).toEqual(8)
        expect(deck.filter(x => x === 'spice').length).toEqual(8)
        expect(deck.filter(x => x === 'leather').length).toEqual(10)
        expect(deck.filter(x => x === 'camel').length).toEqual(8)
    })
})