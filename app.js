const cards = [
  { id: "fenrir-enslaved-savage", name: "Fenrir - Enslaved Savage", type: "COMMANDER", cost: 4, art: "FS", description: "Commander, kinetic/explosive", attack: 6, health: 9, className: "unit", effect: "burst" },
  { id: "halcyon-silent-tundra", name: "Halcyon - Silent Tundra", type: "COMMANDER", cost: 4, art: "HT", description: "Commander, kinetic/energy", attack: 5, health: 10, className: "unit", effect: "freeze" },
  { id: "vidar-zealous-resentment", name: "Vidar - Zealous Resentment", type: "COMMANDER", cost: 3, art: "VZ", description: "Commander, kinetic", attack: 5, health: 7, className: "unit", effect: "charge" },
  { id: "kinetic-tuning", name: "Kinetic Tuning", type: "UPGRADE", cost: 1, art: "KT", description: "SCT upgrade", attack: 2, health: null, className: "spell", effect: "damage" },
  { id: "explosive-tuning", name: "Explosive Tuning", type: "UPGRADE", cost: 1, art: "ET", description: "SCT upgrade", attack: 3, health: null, className: "spell", effect: "damage" },
  { id: "energy-tuning", name: "Energy Tuning", type: "UPGRADE", cost: 1, art: "EnT", description: "SCT upgrade", attack: 2, health: null, className: "spell", effect: "damage" },
  { id: "kinetic-deflection-tuning", name: "Kinetic Deflection Tuning", type: "UPGRADE", cost: 2, art: "KDT", description: "SCT upgrade", attack: 2, health: 2, className: "spell", effect: "guard" },
  { id: "energy-deflection-tuning", name: "Energy Deflection Tuning", type: "UPGRADE", cost: 2, art: "EDT", description: "SCT upgrade", attack: 2, health: 2, className: "spell", effect: "guard" },
  { id: "explosive-deflection-tuning", name: "Explosive Deflection Tuning", type: "UPGRADE", cost: 2, art: "XDT", description: "SCT upgrade", attack: 2, health: 2, className: "spell", effect: "guard" },
  { id: "weapon-critical-tuning", name: "Weapon Critical Tuning", type: "UPGRADE", cost: 2, art: "WCT", description: "SCT upgrade", attack: 3, health: null, className: "spell", effect: "crit" },
  { id: "melee-amplifier-tuning", name: "Melee Amplifier Tuning", type: "UPGRADE", cost: 2, art: "MAT", description: "SCT upgrade", attack: 3, health: null, className: "spell", effect: "melee" },
  { id: "charge-shot-modification-tuning", name: "Charge Shot Modification Tuning", type: "UPGRADE", cost: 2, art: "CSM", description: "SCT upgrade", attack: 3, health: null, className: "spell", effect: "charge" },
  { id: "type-nullifier", name: "Type Nullifier", type: "VIRUS", cost: 2, art: "TN", description: "SCT virus", attack: 4, health: null, className: "spell", effect: "nullify" },
  { id: "deflection-nullifier", name: "Deflection Nullifier", type: "VIRUS", cost: 2, art: "DN", description: "SCT virus", attack: 3, health: null, className: "spell", effect: "nullify" },
  { id: "armor-weakening", name: "Armor Weakening", type: "VIRUS", cost: 1, art: "AW", description: "SCT virus", attack: 2, health: null, className: "spell", effect: "weaken" },
  { id: "refurbished-rifle-cycle", name: "Refurbished Rifle “Cycle”", type: "WEAPON", cost: 3, art: "RC", description: "Range weapon, kinetic", attack: 4, health: 4, className: "unit", effect: "range" },
  { id: "laser-sword", name: "Laser Sword", type: "WEAPON", cost: 2, art: "LS", description: "Melee weapon, energy", attack: 4, health: 3, className: "unit", effect: "melee" },
  { id: "astral-lin-rifle-star", name: "AsTraL Lin. Rifle “Star”", type: "WEAPON", cost: 3, art: "AS", description: "Range weapon, kinetic", attack: 5, health: 4, className: "unit", effect: "range" },
  { id: "ujwd-burst-rifle-sayonara", name: "UJWD (Burst) Rifle “Sayonara”", type: "WEAPON", cost: 4, art: "UB", description: "Range weapon, kinetic", attack: 6, health: 5, className: "unit", effect: "burst" },
  { id: "two-rounded-missile-launcher", name: "2-rounded Missile Launcher", type: "WEAPON", cost: 4, art: "ML", description: "Range weapon, explosive", attack: 6, health: 4, className: "unit", effect: "explosive" },
  { id: "refurbished-shotgun-striker", name: "Refurbished Shotgun “Striker”", type: "WEAPON", cost: 3, art: "RS", description: "Ranged weapon, kinetic", attack: 5, health: 3, className: "unit", effect: "shot" },
  { id: "laser-dual-blades", name: "Laser Dual Blades", type: "WEAPON", cost: 3, art: "LD", description: "Melee weapon, energy", attack: 5, health: 4, className: "unit", effect: "melee" },
  { id: "two-rounded-e-missile-launcher", name: "2-rounded E. Missile Launcher", type: "WEAPON", cost: 4, art: "EM", description: "Range weapon, energy", attack: 6, health: 5, className: "unit", effect: "energy" }
];

const MAX_COPY_COUNT = 3;

const state = {
  energy: 6,
  maxEnergy: 10,
  round: 1,
  selected: null,
  deck: cards.length,
  health: 2400,
  hand: cards.map((card) => ({ ...card })),
  playerBoard: Array(3).fill(null),
  enemyBoard: [
    { id: "hollow-sentinel", name: "Hollow Sentinel", type: "UNIT", attack: 3, health: 5, art: "HS", description: "A sentry of ash.", className: "unit" },
    null,
    null
  ]
};

const screens = document.querySelectorAll(".screen");
const placeholderContent = {
  account: ["Player profile", "Account", "Your profile and identity will live here."],
  collection: ["Collection", "Card Collection / Commander Collection", "Your roster is capped at three copies per card."],
  story: ["Narrative", "Story", "The campaign route is still being written."],
  summon: ["Rarity pull", "Shop", "The summoning hub is not active yet."],
  settings: ["Configuration", "Settings", "Your game preferences will live here."]
};
const hand = document.querySelector("#hand");
const logItems = document.querySelector("#log-items");
const playerBoardEl = document.querySelector("#player-board");
const enemyBoardEl = document.querySelector("#enemy-board");
const collectionListEl = document.querySelector("#collection-list");
const collectionInventory = cards.map((card) => ({ ...card, copies: 1 }));
const unitKinds = ["UNIT", "COMMANDER", "WEAPON"];
const tacticKinds = ["UPGRADE", "VIRUS", "TACTIC"];

function isUnitCard(card) {
  return card && unitKinds.includes(card.type);
}

function isTacticCard(card) {
  return card && tacticKinds.includes(card.type);
}

function showScreen(screenName) {
  const screenMap = {
    "main-menu": "#main-menu",
    battle: "#battle-screen",
    collection: "#collection-screen",
    account: "#placeholder-screen",
    story: "#placeholder-screen",
    summon: "#placeholder-screen",
    settings: "#placeholder-screen"
  };

  screens.forEach((screen) => {
    const targetSelector = screenMap[screenName];
    screen.hidden = !((targetSelector && screen.matches(targetSelector)) || (screenName === "main-menu" && screen.id === "main-menu"));
  });

  const placeholder = document.querySelector("#placeholder-screen");
  if (placeholder) {
    const placeholderScreens = ["account", "story", "summon", "settings"];
    placeholder.hidden = !placeholderScreens.includes(screenName);
  }

  if (placeholderContent[screenName]) {
    const [eyebrow, title, copy] = placeholderContent[screenName];
    document.querySelector("#placeholder-eyebrow").textContent = eyebrow;
    document.querySelector("#placeholder-title").textContent = title;
    document.querySelector("#placeholder-copy").textContent = copy;
  }
}

document.querySelectorAll("[data-screen]").forEach((button) => button.addEventListener("click", () => showScreen(button.dataset.screen)));

window.setGameBackground = function setGameBackground(backgroundValue) {
  document.documentElement.style.setProperty("--game-background", backgroundValue || "none");
};
window.setGameBackground(null);

function addLog(message) {
  const entry = document.createElement("p");
  entry.className = "log-entry";
  entry.innerHTML = `<span>›</span><span>${message}</span>`;
  logItems.prepend(entry);
  while (logItems.children.length > 3) logItems.lastElementChild.remove();
}

function updateEnergy() {
  document.querySelector("#energy-value").innerHTML = `${String(state.energy).padStart(2, "0")} <small>/ ${String(state.maxEnergy).padStart(2, "0")}</small>`;
  document.querySelector("#energy-bar").style.width = `${(state.energy / state.maxEnergy) * 100}%`;
}

function updateHealth() {
  document.querySelector("#health-value").textContent = String(state.health);
}

function getCardMarkup(card, side) {
  return `
    <button class="unit-card active-slot" type="button" data-side="${side}" data-slot-index="${card.slotIndex || 0}">
      <div class="card-top"><span class="card-type">${card.type}</span><span class="card-cost">${card.cost || ""}</span></div>
      <div class="card-art" style="background:${side === "enemy" ? "#3d292f" : "#34332c"};color:${side === "enemy" ? "#d18e85" : "#f3c46b"}"><span>${card.art}</span></div>
      <h3>${card.name}</h3>
      <p>${card.description}</p>
      <div class="card-stats"><span>◆ ${card.attack ?? 0}</span><span>♥ ${card.health ?? 0}</span></div>
    </button>`;
}

function renderBoard() {
  enemyBoardEl.innerHTML = state.enemyBoard.map((slot, index) => {
    if (slot) {
      return getCardMarkup({ ...slot, slotIndex: index }, "enemy");
    }
    return `<button class="empty-slot active-slot" type="button" data-side="enemy" data-slot-index="${index}"><span>+</span><small>target</small></button>`;
  }).join("");

  playerBoardEl.innerHTML = state.playerBoard.map((slot, index) => {
    if (slot) {
      return getCardMarkup({ ...slot, slotIndex: index }, "player");
    }
    return `<button class="empty-slot active-slot" type="button" data-side="player" data-slot-index="${index}"><span>+</span><small>deploy</small></button>`;
  }).join("");
}

function renderCollection() {
  if (!collectionListEl) return;
  collectionListEl.innerHTML = collectionInventory.map((card) => `
    <article class="collection-card">
      <div class="collection-card-top">
        <span class="card-type">${card.type}</span>
        <span class="copy-badge">${Math.min(card.copies, MAX_COPY_COUNT)} / ${MAX_COPY_COUNT}</span>
      </div>
      <div class="card-art collection-art"><span>${card.art}</span></div>
      <h3>${card.name}</h3>
      <p>${card.description}</p>
      <div class="card-stats"><span>◆ ${card.attack ?? 0}</span><span>♥ ${card.health ?? 0}</span></div>
    </article>
  `).join("");
}

function renderHand() {
  hand.innerHTML = state.hand.map((card) => `
    <article class="hand-card ${card.className}" data-card-id="${card.id}" tabindex="0" aria-label="${card.name}, cost ${card.cost}">
      <div class="card-top"><span class="card-type">${card.type}</span><span class="card-cost">${card.cost}</span></div>
      <div class="card-art"><span>${card.art}</span></div>
      <h3>${card.name}</h3><p>${card.description}</p>
      <div class="card-stats"><span>${card.attack ? `◆ ${card.attack}` : "TACTIC"}</span><span>${card.health ? `♥ ${card.health}` : "✦"}</span></div>
    </article>`).join("");
  hand.querySelectorAll(".hand-card").forEach((element) => element.addEventListener("click", () => selectCard(element.dataset.cardId, element)));
}

function removeCardFromHand(cardId) {
  state.hand = state.hand.filter((card) => card.id !== cardId);
  renderHand();
  document.querySelector("#hand-count").textContent = `${state.hand.length} cards`;
}

function selectCard(cardId, element) {
  const card = state.hand.find((item) => item.id === cardId);
  hand.querySelectorAll(".hand-card").forEach((item) => item.classList.remove("selected"));
  if (!card) return;
  if (state.energy < card.cost) {
    addLog(`Not enough energy for <strong>${card.name}</strong>.`);
    return;
  }
  state.selected = cardId;
  element.classList.add("selected");
  addLog(`<strong>${card.name}</strong> selected. Choose a slot to resolve its effect.`);
}

function deployUnitToBoard(slotIndex, card) {
  if (state.playerBoard[slotIndex]) {
    addLog("That front-line slot is already occupied.");
    return;
  }
  state.playerBoard[slotIndex] = { ...card, health: card.health, currentHealth: card.health, slotIndex };
  state.energy -= card.cost;
  state.selected = null;
  state.deck -= 1;
  removeCardFromHand(card.id);
  document.querySelector("#deck-count").textContent = state.deck;
  updateEnergy();
  renderBoard();
  addLog(`<strong>${card.name}</strong> deployed to the front line.`);

  if (card.effect === "charge") {
    state.health = Math.min(2400, state.health + 2);
    updateHealth();
    addLog("<strong>Charge</strong> gives the warden a small burst of stability.");
  }
}

function resolveTargetedTactic(card, targetIndex) {
  if (!state.enemyBoard[targetIndex]) {
    addLog(`<strong>${card.name}</strong> needs a valid enemy target.`);
    return false;
  }

  const target = state.enemyBoard[targetIndex];
  const damage = Number(card.attack || 1);

  if (card.effect === "damage" || card.effect === "crit" || card.effect === "burst" || card.effect === "charge") {
    target.health -= damage;
    addLog(`<strong>${card.name}</strong> hits <strong>${target.name}</strong> for ${damage} damage.`);
  } else if (card.effect === "guard") {
    state.health = Math.min(2400, state.health + 2);
    updateHealth();
    addLog(`<strong>${card.name}</strong> reinforces your defenses by +2 health.`);
  } else if (card.effect === "weaken") {
    target.health -= damage + 1;
    addLog(`<strong>${card.name}</strong> strips armor and deals ${damage + 1} damage.`);
  } else if (card.effect === "nullify") {
    target.health -= damage + 2;
    addLog(`<strong>${card.name}</strong> nullifies enemy resistance for ${damage + 2} damage.`);
  } else {
    state.health = Math.min(2400, state.health + 2);
    updateHealth();
    addLog(`<strong>${card.name}</strong> stabilizes the line and restores 2 health.`);
  }

  if (target.health <= 0) {
    state.enemyBoard[targetIndex] = null;
    addLog(`<strong>${target.name}</strong> is destroyed.`);
  }

  return true;
}

function handleBoardClick(slot) {
  if (!state.selected) {
    addLog("Select a card from your hand first.");
    return;
  }

  const card = state.hand.find((item) => item.id === state.selected);
  if (!card) {
    addLog("That card is no longer in your hand.");
    return;
  }

  const slotSide = slot.dataset.side;
  const slotIndex = Number(slot.dataset.slotIndex);

  if (slotSide === "player") {
    if (isUnitCard(card)) {
      deployUnitToBoard(slotIndex, card);
      return;
    }
    addLog(`<strong>${card.name}</strong> must target the enemy line.`);
    return;
  }

  if (slotSide === "enemy") {
    if (isTacticCard(card)) {
      const resolved = resolveTargetedTactic(card, slotIndex);
      if (resolved) {
        state.energy -= card.cost;
        state.selected = null;
        removeCardFromHand(card.id);
        updateEnergy();
        renderBoard();
      }
      return;
    }
    addLog(`<strong>${card.name}</strong> can only be deployed to your own front line.`);
    return;
  }

  addLog("Choose a valid slot for that card.");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest(".active-slot");
  if (target) handleBoardClick(target);
});

document.querySelector("#end-turn").addEventListener("click", () => {
  state.round += 1;
  state.energy = Math.min(state.maxEnergy, state.energy + 1);
  document.querySelector("#round-label").textContent = `Round ${String(state.round).padStart(2, "0")}`;
  addLog("Turn ended. The Hollow King is preparing a response.");
  updateEnergy();
});

showScreen("main-menu");
renderBoard();
renderCollection();
renderHand();
updateEnergy();
updateHealth();
addLog("Your opening hand is ready.");
