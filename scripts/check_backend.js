const fs = require("fs");
const path = require("path");

const repo = path.resolve(__dirname, "..");
const checks = [
  { file: "js/storage.js", contains: "saveGameData" },
  { file: "js/helpers.js", contains: "function random" },
  { file: "js/flashcards.js", contains: "class Flashcards" },
  { file: "js/shop.js", contains: "class Shop" },
  { file: "js/inventory.js", contains: "class Inventory" },
  { file: "data/shopItems.json", contains: "food" },
  { file: "assets/icons/coin.png" },
  { file: "assets/items/water.png" },
  { file: "assets/items/food.svg" },
  { file: "index.html" },
];

let ok = true;
console.log("Running quick backend/static checks for StudyBuddy");
checks.forEach((c) => {
  const p = path.join(repo, c.file);
  const exists = fs.existsSync(p);
  if (!exists) {
    ok = false;
    console.log(`MISSING: ${c.file}`);
    return;
  }
  const content = fs.readFileSync(p, "utf8");
  if (c.contains && content.indexOf(c.contains) === -1) {
    ok = false;
    console.log(`CHECK FAILED: ${c.file} (missing '${c.contains}')`);
  } else {
    console.log(`OK: ${c.file}`);
  }
});

if (ok) {
  console.log("\nAll quick checks passed.");
  console.log(
    "To fully verify the app, start a static server from the project root:"
  );
  console.log("  npx http-server -p 8080 -c-1 .");
  console.log(
    "Then open http://127.0.0.1:8080 in your browser and smoke-test the UI."
  );
  process.exit(0);
} else {
  console.log(
    "\nSome checks failed. Fix the missing files or symbols above before making a PR."
  );
  process.exit(2);
}
