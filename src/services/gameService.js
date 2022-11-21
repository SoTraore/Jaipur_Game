import * as db from "../database"
import { shuffle } from "lodash"

export function initDeck() {
  // TODO
  // Créer un tableau vide
  // Ajouter les diamants, l'or, l'argent, les tissus, les épices, le cuir et les chameaux
  // Retourner le tableau remplis
  const deck = []

  for (let i = 0; i < 6; i++) deck.push("diamonds")
  for (let i = 0; i < 6; i++) deck.push("gold")
  for (let i = 0; i < 6; i++) deck.push("silver")
  for (let i = 0; i < 8; i++) deck.push("cloth")
  for (let i = 0; i < 8; i++) deck.push("spice")
  for (let i = 0; i < 10; i++) deck.push("leather")
  for (let i = 0; i < 11 - 3; i++) deck.push("camel")

  return shuffle(deck)
}

// Pioche x cartes d'un deck.
export function drawCards(deck, count = 1) {
  // TODO
  // Créer un tableau vide
  // Pour chaque carte à piocher:
  //  Retirer la carte piochée du deck et la mettre dans le tableau
  // Retourner le tableau contenant les cartes piochées

  let cartesPioches = []

  for (let i = 0; i < count; i++) cartesPioches.unshift(deck.shift())

  return cartesPioches
}

// Déplace les chameaux de la main d'un joueur (_players[i].hand) vers son enclos (_players[i].camelsCount).
export function putCamelsFromHandToHerd(game) {
  // TODO
  // Pour chaque joueur:
  //  Pour chaque chameau dans la main du joueur
  //  Enlever le chameau de la main et le mettre dans l'enclos

  for (let i = 0; i < game._players.length; i++) {
    game._players[i].hand.forEach(function (x) {
      if (x === "camel") {
        game._players[i].hand.splice(game._players[i].hand.indexOf(x), 1)
        game._players[i].camelsCount++
      }
    })
  }
}

// Créer un objet game.
export function createGame(name) {
  // TODO
  // Initialiser un nouveau deck avec la fonction précédente
  // Créer le marché avec 3 chameaux et 2 cartes piochés du deck
  // Générer un nouvel identifiant pour la partie
  // Pour chaque joueur:
  //  Créer la main en piochant 5 cartes du deck
  //  Initialiser l'enclos à 0
  //  Initialiser le score à 0
  // Créer les objets contenant les jetons
  // Rassembler le tout pour créer la partie
  // Mettre les chameaux des mains des joueurs dans leurs enclos avec la fonction précédente
  // Retourner la partie

  const deck = initDeck()
  const market = drawCards(deck, 2)
  for (let i = 0; i < 3; i++) market.push("camel")

  const players = []
  for (let i = 0; i < 2; i++) 
    players.push({
      "hand": drawCards(deck, 5),
      "camelsCount": 0,
      "score": 0,
    })

  const game = {
    // Identifiant de la partie
    "id": 1,
    "name": name,
    "_deck": deck,
    "market": market,
    "_players": players,
    "currentPlayerIndex": 0,
    "tokens": {
      "diamonds": [7, 7, 5, 5, 5],
      "gold": [6, 6, 5, 5, 5],
      "silver": [5, 5, 5, 5, 5],
      "cloth": [5, 3, 3, 2, 2, 1, 1],
      "spice": [5, 3, 3, 2, 2, 1, 1],
      "leather": [4, 3, 2, 1, 1, 1, 1, 1, 1],
    },
    _bonusTokens: {
      "3": shuffle([2, 1, 2, 3, 1, 2, 3]),
      "4": shuffle([4, 6, 6, 4, 5, 5]),
      "5": shuffle([8, 10, 9, 8, 10]),
    },
    "winnerId": undefined,
  }

  putCamelsFromHandToHerd(game)
  db.saveGame(game)
  return game
}