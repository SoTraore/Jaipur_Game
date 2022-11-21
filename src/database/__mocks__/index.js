// In memory database for tests
let mockedFile = []

export function getGames() {
  return mockedFile
}

export function saveGame(game) {
  const gameIndex = mockedFile.findIndex((g) => g.id === game.id)
  if (gameIndex >= 0) {
    mockedFile[gameIndex] = game
  } else {
    mockedFile.push(game)
  }
  return mockedFile
}

export function clear() {
  mockedFile = []
}
