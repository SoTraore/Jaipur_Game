import fs from "fs"
import path from "path"

const DATABASE_FILE = path.join(__dirname, "../../storage/database.json")

// Read the file storage/database.json and return the parsed array of games.
export function getGames() {
  try {
    const file = fs.readFileSync(DATABASE_FILE)
    return JSON.parse(file)
  } catch (e) {
    return []
  }
}

// Save a game to storage/database.json
export function saveGame(game) {
  const games = getGames()
  const gameIndex = games.findIndex((g) => g.id === game.id)

  if (gameIndex >= 0) {
    // Game already exists
    games[gameIndex] = game
  } else {
    // Game not exists
    games.push(game)
  }

  try {
    fs.mkdirSync(path.dirname(DATABASE_FILE))
  } catch (e) {
    // Do nothing if fails
  }

  fs.writeFileSync(DATABASE_FILE, JSON.stringify(games))
  return games
}

// Delete all games
export function clear() {
  fs.rmSync(DATABASE_FILE)
}
