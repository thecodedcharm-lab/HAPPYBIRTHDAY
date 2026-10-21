/* ==========================================================
   THE LITTLE BOOK OF YOU  -  script.js

   TABLE OF CONTENTS
   1.  CUSTOMIZE ME  (names, messages, photos, fortunes, music, colors)
   2.  Small helper functions
   3.  App state
   4.  Text, decorations and effects (hearts, sparkles, confetti)
   5.  BIRTHDAY WELCOME + switching between scenes
   6.  Music
   7.  NOTEBOOK COVER and NOTEBOOK PAGE FLIP
   8.  Checklist page
   9.  YES OR NO INTERACTION
   10. DARK ROOM + BIRTHDAY LIGHT REVEAL
   11. BIRTHDAY CAKE (wish, candles, cutting)
   12. GIFT SELECTION
   13. Gift 1: the letter
   14. PHOTO SCRAPBOOK (gift 2) + photo lightbox
   15. Gift 3: fortune machine
   16. THE SECRET ENVELOPE
   17. FINAL CELEBRATION + replay
   18. Start everything

   You only need to edit section 1. Everything else just works.
   ========================================================== */


/* ==========================================================
   1. CUSTOMIZE ME  💗
   Change the text between the "quotes". Keep the quotes,
   the commas and the [square brackets] exactly where they are.

   In any message you can write:
     {name}   -> becomes the birthday person's name
     {sender} -> becomes your name
   ========================================================== */

// ----- The two names -----
const birthdayPerson = "Bagwanji";       // your best friend
const senderName = "Your Bestie";        // YOU (shown at the end of the letter)

// ----- Main colors (they replace the colors in style.css) -----
const themeColors = {
  background: "#FFF5F8",   // page background
  pink: "#FFD6E7",         // baby pink
  lavender: "#DCD6FF",     // soft lavender
  butter: "#FFF0B8",       // butter yellow
  paper: "#FFFDF7",        // cream paper
  text: "#49374F"          // dark plum text
};

// ----- Background music -----
// 1. Put your song in the "audio" folder.  2. Change the file name below.
// Music never starts by itself: your friend taps the music button (top right).
const musicSettings = {
  enabled: true,                       // false = hide the music button completely
  file: "audio/birthday-music.mp3",    // path to your song
  volume: 0.4                          // 0 (silent) to 1 (loud)
};

// ----- Photos for "Our Little World" (gift 2) -----
// Put your pictures in the "images" folder and change the names here.
// Add or remove blocks { ... } to show more or fewer photos.
// If a file is missing, a cute placeholder is shown instead.
const birthdayPhotos = [
  { src: "images/photo1.jpg", caption: "One of my favorite memories." },
  { src: "images/photo2.jpg", caption: "A moment worth remembering." },
  { src: "images/photo3.jpg", caption: "Us being us." },
  { src: "images/photo4.jpg", caption: "My favorite picture of us." }
];

// ----- Little notes on the second tab of "Our Little World" -----
// color can be: "pink", "lavender", "butter" or "mint"
const friendshipNotes = [
  { title: "Inside jokes 🤭", color: "pink", items: [
    "That time we laughed so hard we couldn't breathe (you know which one 😂)",
    "Our secret code word: [add yours here]",
    "Literally anything involving snacks"
  ] },
  { title: "Things I love about you 💗", color: "lavender", items: [
    "Your laugh makes any day better",
    "You always know what to say",
    "You are the most loyal friend ever"
  ] },
  { title: "Our memories 📸", color: "butter", items: [
    "The day we became best friends",
    "All our unplanned adventures",
    "Late-night talks that turned into sunrise"
  ] },
  { title: "Things we should do 🌷", color: "mint", items: [
    "Take a spontaneous trip together",
    "Wear matching outfits (obviously)",
    "A very long dessert crawl 🍰"
  ] }
];

// ----- Fortune machine messages (gift 3). One is picked at random. -----
const fortunes = [
  "Your future contains unlimited happiness. ✨",
  "Officially the most iconic birthday girl. 👑",
  "Warning: extra hugs and cake are required today. 🍰",
  "Best-friend status: PERMANENTLY LOCKED IN. 🔒",
  "Your next adventure will be unforgettable. 🌈",
  "Someone is thinking of you right now (hi, it's me). 💗",
  "A very good surprise is heading your way. 🎁",
  "You will laugh until your cheeks hurt this year. 😂",
  "The stars say: eat dessert first. ⭐",
  "This is going to be your best year yet. 🎀"
];

// ----- The tick-box list on notebook page 2 -----
const checklistItems = [
  "Be absolutely adorable (already done ✅)",
  "Eat a very big slice of cake 🍰",
  "Collect at least 100 hugs 🤗",
  "Take way too many photos 📸",
  "Do whatever you want today 👑"
];

// ----- Funny replies when she clicks NO. They play in order, the last one repeats. -----
const noMessages = [
  "Excuse me?! 😭",
  "Wrong answer, bestie!",
  "Nice try!",
  "The YES button is waiting for you!",
  "Look how big YES is getting 👀",
  "Pretty please? 🥺",
  "JUST SAY YESSSS! 🎀"
];

// ----- Every other piece of text in the website -----
// A message in [square brackets] is a list: each item becomes its own paragraph.
const messages = {

  // Scene 1: welcome
  welcomeTop: "HAPPY BIRTHDAY,",
  welcomeLines: [
    "Today is all about YOU! 🎀",
    "I've made a little something special just for you.",
    "Ready to discover your surprise?"
  ],
  welcomeButton: "OPEN YOUR BIRTHDAY SURPRISE!",

  // Scene 2: notebook cover and inside cover
  coverTitle: "The Little Book of You",
  coverSubtitle: "A birthday surprise made especially for {name}.",
  coverHint: "tap to open ✨",
  bookHint: "Tap the notebook to open it ✨",
  lockedHint: "Answer the question to unlock the rest 💗",
  lockedToast: "Answer the question first, birthday girl! 💗",
  bookplateLabel: "this little book belongs to",
  bookplateName: "{name}",
  bookplateNote: "(and only {name}) 💗",

  // Notebook page 1
  noteTitle: "HEY, BIRTHDAY GIRL! 💗",
  noteLines: [
    "Today is your special day, and I wanted to make something different for you.",
    "So, I made this tiny corner of the internet just for you.",
    "Flip through the pages. There are surprises waiting for you!"
  ],
  noteFlip: "flip the page",

  // Notebook page 2
  checklistTitle: "Your Birthday Checklist ✨",
  stickyNote: "Tick them all and the day gets even better!",
  checklistDone: "All ticked! You're officially ready for cake 🍰",

  // Notebook page 3: the question
  questionTitle: "Birthday girl, will you accept your surprise?",
  yesButton: "YESSS, OBVIOUSLY! 💗",
  noButton: "NO 🙄",
  yesTitle: "YOU SAID YES! 💗",
  yesText: "I KNEW YOU WOULD!",

  // Scene 4: dark room
  darkTitle: "IT'S A LITTLE DARK IN HERE...",
  darkText: "Turn on the lights! 💡",

  // Scene 5: the room, the wish, the candles and the cake
  bannerText: "HAPPY BIRTHDAY",
  wishTitle: "NOW, CLOSE YOUR EYES AND MAKE A WISH! ✨",
  wishText: "Your birthday wish is waiting...",
  wishButton: "I MADE A WISH! 💗",
  wishDoneTitle: "Wish sent to the stars! ✨",
  wishDoneText: "It's definitely coming true, {name} 💗",
  blowTitle: "READY? LET'S BLOW THE CANDLES! 🎂",
  blowButton: "BLOW THE CANDLES! 💨",
  blownTitle: "WOOHOO! 🎉",
  blownText: "Wish locked in. Happy birthday, {name}!",
  cakeTitle: "IT'S CAKE TIME! 💗",
  cakeText: "Grab a plate, bestie...",
  cutButton: "CUT THE CAKE! 🎂",
  cutDoneTitle: "The first slice is yours! 🍰",
  cutDoneText: "Sweet wishes for the sweetest girl 💗",
  toGiftsButton: "OPEN MY GIFTS 🎁",

  // Gift selection (notebook page 4)
  giftsTitle: "THREE LITTLE GIFTS FOR MY FAVORITE HUMAN 🎀",
  giftsSubtitle: "I couldn't fit all my love into one gift, so here's three.",
  gift1Name: "A Letter for You",
  gift2Name: "Our Little World",
  gift3Name: "One Last Surprise",
  giftsProgress: "Gifts opened: {count} / 3",
  giftsAllOpened: "All three opened! Flip the page 💌",
  backButton: "BACK TO MY GIFTS",

  // Secret envelope (notebook page 5)
  secretLockedText: "Open all three gifts to find a little secret... 🤫",
  secretTeaser: "PSST... THERE'S ONE LAST THING FOR YOU. 💌",
  secretAppeared: "A secret envelope appeared on the next page! 💌",
  finaleButton: "SEE MY FINAL WISH 🎂",
  secretTitle: "Shhh... a secret note 🤫",
  secretLines: [
    "You found the secret note!",
    "Here's something I don't say enough: you make my world so much brighter.",
    "No matter what, I'm always on your side.",
    "P.S. I owe you a big hug and a very big slice of cake. 🍰"
  ],
  secretClose: "CLOSE",
  secretContinue: "CONTINUE 💗",

  // Gift 1: the letter
  envelopeHint: "Tap the envelope to open it! 💌",
  letterGreeting: "Dear {name},",
  letterLines: [
    "Happy birthday to one of my favorite people in the world!",
    "I'm so glad you're part of my life.",
    "I hope your day is filled with happiness, laughter, and all your favorite things.",
    "You deserve so many beautiful moments, today and always."
  ],
  letterSignoff: "Love,",
  letterSignature: "{sender} 💗",

  // Gift 2: scrapbook
  worldTitle: "OUR LITTLE WORLD",
  worldSubtitle: "tiny pieces of us, pinned on a page 📌",
  tabPhotos: "📸 Photos",
  tabNotes: "💌 Little notes",
  photoHint: "Open photo:",

  // Gift 3: fortune machine
  fortuneTitle: "YOUR BIRTHDAY FORTUNE MACHINE ✨",
  fortuneSubtitle: "Let's see what the universe has to say about you!",
  fortuneButton: "GENERATE MY FORTUNE",
  fortuneAgain: "ONE MORE FORTUNE ✨",

  // The final screen
  finalTitle: "HAPPY BIRTHDAY, {name}! 🎂",
  finalLines: [
    "I hope this year brings you countless reasons to smile, beautiful memories to collect, and little moments that make life feel special.",
    "Thank you for being YOU.",
    "You deserve all the happiness in the world.",
    "Love you, bestie! 🎀"
  ],
  replayButton: "REPLAY MY BIRTHDAY SURPRISE",

  // Music button and little pop-up messages
  musicOff: "MUSIC",
  musicOn: "MUSIC ON",
  musicMissing: "Add your song to {file} to hear music 🎵"
};

/* ==========================================================
   2. SMALL HELPER FUNCTIONS
   ========================================================== */

// $("#id") finds ONE element on the page.  $$(".class") finds ALL matching elements.
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// wait(500) pauses for half a second.
// ADVANCED BIT, EXPLAINED: functions marked "async" can use the word "await".
//   await wait(500);   means "pause here for 500 ms, then carry on with the next line".
// This lets us write animations as a simple list of steps, top to bottom.
function wait(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// True when the device asks for less motion (an accessibility setting).
function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Replace {name} and {sender} inside a message.
function fillNames(text) {
  return String(text)
    .split("{name}").join(birthdayPerson)
    .split("{sender}").join(senderName);
}

// The middle of an element on the screen (used to place confetti and sparkles).
function getCenterOf(element) {
  const box = element.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
}

// animateNumber(0, 100, 2000, show) counts from 0 to 100 over 2 seconds
// and calls show(number) on every screen refresh. We use it to grow the circle of light.
function animateNumber(from, to, duration, onUpdate) {
  return new Promise(function (resolve) {
    if (reducedMotion()) {
      onUpdate(to);
      resolve();
      return;
    }
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      onUpdate(from + (to - from) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}


/* ==========================================================
   3. APP STATE
   One small object that remembers where we are.
   ========================================================== */
const state = {
  currentScene: "sceneWelcome",
  isBusy: false,          // true while a big scene change is playing (blocks double clicks)
  unlocked: false,        // becomes true after the party: opens the rest of the notebook
  openedGifts: [],        // which gifts have been opened ("letter", "world", "fortune")
  secretUnlocked: false,  // true when all 3 gifts were opened
  secretToastPending: false  // show "a secret envelope appeared" when she is back at the notebook
};


/* ==========================================================
   4. TEXT, DECORATIONS AND EFFECTS
   ========================================================== */

// Copy the colors from the customization section into the CSS variables.
function applyThemeColors() {
  const root = document.documentElement.style;
  root.setProperty("--bg", themeColors.background);
  root.setProperty("--pink", themeColors.pink);
  root.setProperty("--lavender", themeColors.lavender);
  root.setProperty("--butter", themeColors.butter);
  root.setProperty("--paper", themeColors.paper);
  root.setProperty("--plum", themeColors.text);
}

// Put every message into the page.
//   <h2 data-text="darkTitle"></h2>   gets the text messages.darkTitle
//   a list becomes several paragraphs
function fillAllTexts() {
  $$("[data-text]").forEach(function (element) {
    const message = messages[element.dataset.text];
    if (message === undefined) {
      console.warn("No message found for:", element.dataset.text);
      return;
    }
    if (Array.isArray(message)) {
      element.innerHTML = "";
      message.forEach(function (line) {
        const paragraph = document.createElement("p");
        paragraph.textContent = fillNames(line);
        element.appendChild(paragraph);
      });
    } else {
      element.textContent = fillNames(message);
    }
  });

  $$("[data-name]").forEach(function (element) {
    element.textContent = birthdayPerson;
  });

  document.title = "Happy Birthday, " + birthdayPerson + "! 🎀";
}

// Split a title into single letters so they can wave up and down one after another.
function makeWaveText(element) {
  const text = element.textContent;
  element.textContent = "";

  // a hidden copy of the text for screen readers
  const readable = document.createElement("span");
  readable.className = "sr-only";
  readable.textContent = text;
  element.appendChild(readable);

  let letterNumber = 0;
  const words = text.split(" ");
  words.forEach(function (word, wordIndex) {
    const wordSpan = document.createElement("span");
    wordSpan.className = "wave-word";
    wordSpan.setAttribute("aria-hidden", "true");
    Array.from(word).forEach(function (character) {
      const letterSpan = document.createElement("span");
      letterSpan.className = "wave-letter";
      letterSpan.style.setProperty("--i", letterNumber);
      letterSpan.textContent = character;
      wordSpan.appendChild(letterSpan);
      letterNumber++;
    });
    element.appendChild(wordSpan);
    if (wordIndex < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
}

// Every .bow needs three little parts (left loop, right loop, knot).
function addBowParts() {
  $$(".bow").forEach(function (bow) {
    if (bow.children.length === 0) {
      bow.innerHTML = "<i></i><i></i><i></i>";
    }
  });
}

// The row of little triangle flags at the top of some scenes.
function addBunting() {
  const colors = ["#FFB7D5", "#DCD6FF", "#FFF0B8", "#FFD6E7", "#CDEFE1"];
  const flagWidth = Math.min(58, Math.max(26, window.innerWidth * 0.044));
  const count = Math.floor(window.innerWidth / (flagWidth + 4));
  $$("[data-bunting]").forEach(function (bunting) {
    let html = "";
    for (let i = 0; i < count; i++) {
      html += '<i style="--c:' + colors[i % colors.length] + '; --i:' + i + '"></i>';
    }
    bunting.innerHTML = html;
  });
}

// Twinkling stars scattered around a scene: <div class="sparkle-field" data-sparkles="12">
function addSparkles() {
  const colors = ["#FFD35E", "#FF8FBA", "#B7A9F5", "#FFFFFF"];
  $$("[data-sparkles]").forEach(function (field) {
    const count = Number(field.dataset.sparkles);
    let html = "";
    for (let i = 0; i < count; i++) {
      const shape = Math.random() < 0.3 ? "i-star" : "i-sparkle";
      html += '<svg class="icon sparkle" style="left:' + randomBetween(2, 96).toFixed(1) + '%; top:' + randomBetween(4, 92).toFixed(1) +
        '%; --size:' + randomBetween(10, 26).toFixed(0) + 'px; --dur:' + randomBetween(2.4, 5).toFixed(1) + 's; --delay:' +
        randomBetween(-4, 0).toFixed(1) + 's; --sparkle-color:' + pickRandom(colors) + '"><use href="#' + shape + '"></use></svg>';
    }
    field.innerHTML = html;
  });
}

// ----- Confetti, sparkles and little hearts -----
// They are tiny <span> elements added to #effectsLayer, animated by CSS, then removed.
const confettiColors = ["#FF8FBA", "#FFD6E7", "#DCD6FF", "#B7A9F5", "#FFF0B8", "#FFD35E", "#CDEFE1"];

function addToEffects(element, lifetime) {
  $("#effectsLayer").appendChild(element);
  setTimeout(function () {
    element.remove();
  }, lifetime);
}

// A burst of confetti that flies out from a point (x, y) in pixels.
function confettiBurst(count, x, y) {
  if (reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    const isRound = Math.random() < 0.35;
    const size = randomBetween(7, 13);
    piece.style.setProperty("--x", x + "px");
    piece.style.setProperty("--y", y + "px");
    piece.style.setProperty("--w", size + "px");
    piece.style.setProperty("--h", (isRound ? size : size * 1.6) + "px");
    piece.style.setProperty("--r", isRound ? "50%" : "2px");
    piece.style.setProperty("--c", pickRandom(confettiColors));
    piece.style.setProperty("--dx", randomBetween(-260, 260) + "px");
    piece.style.setProperty("--rise", randomBetween(-380, -120) + "px");
    piece.style.setProperty("--fall", randomBetween(160, 520) + "px");
    piece.style.setProperty("--spin", randomBetween(-900, 900) + "deg");
    piece.style.setProperty("--dur", randomBetween(1.8, 3.2) + "s");
    addToEffects(piece, 3500);
  }
}

// Confetti that falls from the top of the screen like rain.
function confettiRain(count) {
  if (reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    const isRound = Math.random() < 0.35;
    const size = randomBetween(7, 13);
    piece.style.setProperty("--x", randomBetween(0, window.innerWidth) + "px");
    piece.style.setProperty("--y", "-20px");
    piece.style.setProperty("--w", size + "px");
    piece.style.setProperty("--h", (isRound ? size : size * 1.6) + "px");
    piece.style.setProperty("--r", isRound ? "50%" : "2px");
    piece.style.setProperty("--c", pickRandom(confettiColors));
    piece.style.setProperty("--dx", randomBetween(-90, 90) + "px");
    piece.style.setProperty("--rise", randomBetween(-30, 0) + "px");
    piece.style.setProperty("--fall", window.innerHeight + 80 + "px");
    piece.style.setProperty("--spin", randomBetween(-700, 700) + "deg");
    piece.style.setProperty("--dur", randomBetween(3, 5.5) + "s");
    piece.style.animationDelay = randomBetween(0, 1.6) + "s";
    addToEffects(piece, 7600);
  }
}

// Little stars that burst out of a point.
function sparkleBurst(x, y, count) {
  const colors = ["#FFD35E", "#FF8FBA", "#B7A9F5", "#FFFFFF"];
  for (let i = 0; i < count; i++) {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(50, 160);
    const sparkle = document.createElement("span");
    sparkle.className = "burst-sparkle";
    sparkle.innerHTML = '<svg class="icon"><use href="#' + (Math.random() < 0.3 ? "i-star" : "i-sparkle") + '"></use></svg>';
    sparkle.style.setProperty("--x", x + "px");
    sparkle.style.setProperty("--y", y + "px");
    sparkle.style.setProperty("--s", randomBetween(14, 30) + "px");
    sparkle.style.setProperty("--c", pickRandom(colors));
    sparkle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    sparkle.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    addToEffects(sparkle, 1100);
  }
}

// Small hearts that pop up from a point (used when buttons are pressed).
function heartPops(x, y, count) {
  const colors = ["#FF8FBA", "#FFB7D5", "#E9628F", "#B7A9F5"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "pop-heart";
    heart.innerHTML = '<svg class="icon"><use href="#i-heart"></use></svg>';
    heart.style.setProperty("--x", x + "px");
    heart.style.setProperty("--y", y + "px");
    heart.style.setProperty("--s", randomBetween(14, 24) + "px");
    heart.style.setProperty("--c", pickRandom(colors));
    heart.style.setProperty("--dx", randomBetween(-44, 44) + "px");
    heart.style.setProperty("--rot", randomBetween(-30, 30) + "deg");
    addToEffects(heart, 1000);
  }
}

// Every button gives a tiny shower of hearts when pressed.
function setupButtonHearts() {
  document.addEventListener("click", function (event) {
    const button = event.target.closest(".btn, .round-btn, .tab-btn");
    if (!button || button.disabled) return;
    let x = event.clientX;
    let y = event.clientY;
    if (!x && !y) {
      // keyboard "click": use the middle of the button instead
      const center = getCenterOf(button);
      x = center.x;
      y = center.y;
    }
    heartPops(x, y, 5);
  });
}

// Hearts that float up the screen in scenes that have a .hearts-layer.
function startFloatingHearts() {
  const colors = ["#FF8FBA", "#FFB7D5", "#B7A9F5", "#FFD35E", "#FFFFFF"];
  setInterval(function () {
    if (reducedMotion() || document.hidden) return;
    const layer = $(".scene.is-active .hearts-layer");
    if (!layer || layer.childElementCount > 12) return;

    const duration = randomBetween(7, 12);
    layer.insertAdjacentHTML("beforeend",
      '<svg class="icon floating-heart" style="--left:' + randomBetween(2, 96).toFixed(1) + '%; --size:' + randomBetween(16, 38).toFixed(0) +
      'px; --color:' + pickRandom(colors) + '; --dur:' + duration.toFixed(1) + 's"><use href="#i-heart"></use></svg>');
    const heart = layer.lastElementChild;
    setTimeout(function () {
      heart.remove();
    }, duration * 1000 + 600);
  }, 700);
}

// A small message that pops up at the bottom of the screen.
let toastTimer = null;
function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 3400);
}


/* ==========================================================
   5. BIRTHDAY WELCOME + SWITCHING BETWEEN SCENES
   ========================================================== */

// Show one scene and hide the others (no animation).
function switchSceneInstantly(sceneId) {
  $$(".scene").forEach(function (scene) {
    scene.classList.toggle("is-active", scene.id === sceneId);
  });
  state.currentScene = sceneId;
  $("#" + sceneId).scrollTop = 0;
}

// The pink circle that grows from the button you clicked (the "iris wipe").
function setWipeOrigin(element) {
  const wipe = $("#wipe");
  let x = 50;
  let y = 50;
  if (element) {
    const center = getCenterOf(element);
    x = (center.x / window.innerWidth) * 100;
    y = (center.y / window.innerHeight) * 100;
  }
  wipe.style.setProperty("--wx", x + "%");
  wipe.style.setProperty("--wy", y + "%");
}

// showScene("sceneBook", { ...options })  is THE way we move between scenes.
// options:  fromElement  the button that was clicked (the wipe grows from it)
//           dark         true = a dark wipe (for the dark room)
//           quick        true = just a soft cross-fade, no wipe
//           afterSwap    a function that runs when the screen is covered
async function showScene(sceneId, options) {
  options = options || {};
  if (state.isBusy) return;
  state.isBusy = true;   // blocks clicks that would start a second transition

  if (options.quick) {
    switchSceneInstantly(sceneId);
    if (options.afterSwap) options.afterSwap();
    await wait(reducedMotion() ? 50 : 650);
    state.isBusy = false;
    return;
  }

  const wipe = $("#wipe");
  setWipeOrigin(options.fromElement);
  wipe.classList.toggle("wipe--dark", Boolean(options.dark));
  wipe.classList.add("is-playing");
  document.body.classList.add("is-wiping");   // scenes swap instantly while we are covered

  const halfTime = reducedMotion() ? 60 : 750;
  await wait(halfTime);                       // the screen is now fully covered
  switchSceneInstantly(sceneId);
  if (options.afterSwap) options.afterSwap();
  await wait(halfTime);                       // the cover fades away

  wipe.classList.remove("is-playing");
  document.body.classList.remove("is-wiping");
  state.isBusy = false;
}

function setupWelcome() {
  $("#openSurpriseBtn").addEventListener("click", function (event) {
    showScene("sceneBook", {
      fromElement: event.currentTarget,
      afterSwap: function () {
        resetBook();   // always start with the closed notebook
      }
    });
  });
}


/* ==========================================================
   6. MUSIC
   Music NEVER starts by itself. The button toggles it.
   If the audio file is missing, the website keeps working.
   ========================================================== */
function setupMusic() {
  const button = $("#musicBtn");
  const audio = $("#bgMusic");

  if (!musicSettings.enabled) {
    button.hidden = true;
    return;
  }

  audio.src = musicSettings.file;
  audio.loop = true;
  audio.volume = musicSettings.volume;
  showMusicState(false);

  button.addEventListener("click", async function () {
    if (audio.paused) {
      try {
        await audio.play();            // fails if the file is missing
        showMusicState(true);
      } catch (error) {
        showMusicState(false);
        showToast(fillNames(messages.musicMissing).replace("{file}", musicSettings.file));
      }
    } else {
      audio.pause();
      showMusicState(false);
    }
  });
}

function showMusicState(isPlaying) {
  const button = $("#musicBtn");
  button.setAttribute("aria-pressed", String(isPlaying));
  button.setAttribute("aria-label", isPlaying ? "Pause the music" : "Play the music");
  $("#musicLabel").textContent = isPlaying ? messages.musicOn : messages.musicOff;
}

/* ==========================================================
   7. NOTEBOOK COVER and NOTEBOOK PAGE FLIP

   HOW THE FLIP WORKS (simple version):
   - The notebook is a pile of "leaves" (sheets of paper).
   - Each leaf has a FRONT page and a BACK page.
   - On a big screen a leaf sits on the right half of the book.
     Flipping it = rotating it 180 degrees around the middle (the spine),
     so it lands on the left half and its back page is now visible.
   - On a phone every page is its own leaf and just peels away to the left.
   - The turning itself is done by CSS (see "NOTEBOOK PAGE FLIP" in style.css).
     JavaScript only adds/removes the class "is-flipped".
   ========================================================== */

// The order of the pages inside the notebook (cover first).
const pageIds = ["pageCover", "pageBookplate", "pageNote", "pageChecklist", "pageQuestion", "pageGifts", "pageSecret"];
const PAGE = { cover: 0, bookplate: 1, note: 2, checklist: 3, question: 4, gifts: 5, secret: 6 };

const flipTime = 1000;   // milliseconds. Must match --flip-time in style.css

const book = {
  leaves: [],            // the leaf elements
  flippedCount: 0,       // how many leaves are flipped (0 = closed notebook)
  isFlipping: false,     // true while a page is turning (blocks double clicks)
  isDesktop: true        // two pages side by side, or one page at a time?
};

function isDesktopLayout() {
  return window.matchMedia("(min-width: 761px)").matches;
}

// How many leaves must be flipped before this page is visible?
function flipsNeededToSee(pageIndex, isDesktop) {
  return isDesktop ? Math.ceil(pageIndex / 2) : pageIndex;
}

// The notebook stops at the YES/NO question until the party is over.
function maxFlips() {
  if (state.unlocked) return book.leaves.length - 1;
  return flipsNeededToSee(PAGE.question, book.isDesktop);
}

// An empty page used as the back of the very last leaf.
function createBlankPage() {
  const page = document.createElement("article");
  page.className = "page page--blank";
  return page;
}

// A curled corner you can click to turn the page.
function createCorner(direction) {
  const corner = document.createElement("button");
  corner.className = "page-corner page-corner--" + direction;
  corner.setAttribute("aria-label", direction === "next" ? "Next page" : "Previous page");
  corner.addEventListener("click", direction === "next" ? goNext : goPrev);
  return corner;
}

// One leaf = a front face, and (on big screens) a back face.
function createLeaf(bookElement, frontPage, backPage, isLastLeaf) {
  const leaf = document.createElement("div");
  leaf.className = "leaf";

  const front = document.createElement("div");
  front.className = "leaf-face leaf-front";
  front.appendChild(frontPage);
  if (frontPage.id === "pageCover") {
    front.classList.add("is-cover");
  } else if (!isLastLeaf) {
    front.appendChild(createCorner("next"));
  }
  leaf.appendChild(front);

  if (backPage) {
    const back = document.createElement("div");
    back.className = "leaf-face leaf-back";
    back.appendChild(backPage);
    if (!backPage.classList.contains("page--blank")) {
      back.appendChild(createCorner("prev"));
    }
    leaf.appendChild(back);
  }

  bookElement.appendChild(leaf);
  return leaf;
}

// Build all the leaves from the pages that wait in #pageStash.
function buildBook() {
  const bookElement = $("#book");
  const stash = $("#pageStash");
  const pages = pageIds.map(function (id) {
    return document.getElementById(id);
  });

  pages.forEach(function (page) {
    stash.appendChild(page);      // put the pages back first, so we never lose them
  });
  bookElement.innerHTML = "";
  book.leaves = [];
  book.isDesktop = isDesktopLayout();

  const base = document.createElement("div");   // the pink hard cover behind the pages
  base.className = "book-base";
  bookElement.appendChild(base);

  if (book.isDesktop) {
    // pages are paired up: (cover, inside cover), (page 1, page 2), ...
    for (let i = 0; i < pages.length; i += 2) {
      const backPage = pages[i + 1] || createBlankPage();
      const isLastLeaf = i + 2 >= pages.length;
      book.leaves.push(createLeaf(bookElement, pages[i], backPage, isLastLeaf));
    }
  } else {
    pages.forEach(function (page, index) {
      book.leaves.push(createLeaf(bookElement, page, null, index === pages.length - 1));
    });
  }
  updateLeaves();
}

// Give every leaf the right "is-flipped" class and stacking order.
function updateLeaves() {
  book.leaves.forEach(function (leaf, index) {
    const isFlipped = index < book.flippedCount;
    leaf.classList.toggle("is-flipped", isFlipped);
    // flipped leaves pile up on the left (later ones on top),
    // unflipped leaves pile up on the right (earlier ones on top)
    leaf.style.zIndex = isFlipped ? index + 1 : book.leaves.length - index;
  });
}

// Update the buttons, the little hearts and the hint text under the book.
function updateBookUi() {
  const isClosed = book.flippedCount === 0;
  $("#book").classList.toggle("is-closed", isClosed);
  $("#bookControls").classList.toggle("is-hidden", isClosed);
  $("#prevPageBtn").disabled = isClosed;
  $("#nextPageBtn").disabled = book.flippedCount >= maxFlips();

  let hint = "";
  if (isClosed) {
    hint = messages.bookHint;
  } else if (!state.unlocked && book.flippedCount >= maxFlips()) {
    hint = messages.lockedHint;
  }
  $("#bookHint").textContent = fillNames(hint);

  let dots = "";
  for (let i = 1; i < book.leaves.length; i++) {
    dots += '<svg class="icon page-dot' + (i === book.flippedCount ? " is-active" : "") + '"><use href="#i-heart"></use></svg>';
  }
  $("#pageDots").innerHTML = dots;
}

// Turn ONE leaf. direction: 1 = forward, -1 = backward.
async function flipOneLeaf(direction) {
  const leafIndex = direction === 1 ? book.flippedCount : book.flippedCount - 1;
  const leaf = book.leaves[leafIndex];

  leaf.classList.add("is-turning");   // shows a soft shadow while the paper moves
  leaf.style.zIndex = 500;            // keep the turning leaf above all the others
  book.flippedCount += direction;
  leaf.classList.toggle("is-flipped", direction === 1);   // <-- this starts the 3D turn
  updateBookUi();

  await wait(reducedMotion() ? 60 : flipTime);
  leaf.classList.remove("is-turning");
  updateLeaves();
}

async function goNext() {
  if (book.isFlipping || state.currentScene !== "sceneBook") return;
  if (book.flippedCount === 0) return;                    // closed: tap the cover instead
  if (book.flippedCount >= maxFlips()) {
    if (!state.unlocked) showToast(fillNames(messages.lockedToast));
    return;
  }
  book.isFlipping = true;
  await flipOneLeaf(1);
  book.isFlipping = false;
}

async function goPrev() {
  if (book.isFlipping || book.flippedCount === 0) return;
  book.isFlipping = true;
  await flipOneLeaf(-1);
  book.isFlipping = false;
}

// Open the cover.
async function openBook() {
  if (book.isFlipping || book.flippedCount !== 0 || state.currentScene !== "sceneBook") return;
  book.isFlipping = true;
  await flipOneLeaf(1);
  book.isFlipping = false;
}

// Turn several leaves one after another until we reach a target (used after the party).
async function flipToCount(target) {
  if (book.isFlipping) return;
  book.isFlipping = true;
  while (book.flippedCount < target) {
    await flipOneLeaf(1);
    await wait(150);
  }
  while (book.flippedCount > target) {
    await flipOneLeaf(-1);
    await wait(150);
  }
  book.isFlipping = false;
}

// Jump to a number of flipped leaves WITHOUT animation.
function setFlippedCountInstantly(count) {
  const bookElement = $("#book");
  bookElement.classList.add("no-anim");     // switches the CSS transitions off for a moment
  book.flippedCount = count;
  updateLeaves();
  updateBookUi();
  void bookElement.offsetWidth;             // makes the browser apply the change right now
  bookElement.classList.remove("no-anim");
}

// Closed notebook, from the very start.
function resetBook() {
  book.isFlipping = false;
  buildBook();
  setFlippedCountInstantly(0);
}

// Which page is the "main" visible page? (used when the screen size changes)
function getPrimaryVisiblePage() {
  if (book.flippedCount === 0) return 0;
  if (book.isDesktop) return Math.min(2 * book.flippedCount, pageIds.length - 1);
  return book.flippedCount;
}

// The window was resized across the phone/desktop limit: rebuild but stay on the same page.
function handleLayoutChange() {
  if (isDesktopLayout() === book.isDesktop) return;
  const visiblePage = getPrimaryVisiblePage();
  book.isFlipping = false;
  buildBook();
  setFlippedCountInstantly(flipsNeededToSee(visiblePage, book.isDesktop));
}

// Left and right arrow keys turn the pages.
function handleBookKeys(event) {
  if (state.currentScene !== "sceneBook") return;
  if (!$("#lightbox").hidden || !$("#secretModal").hidden) return;
  if (event.key === "ArrowRight") goNext();
  if (event.key === "ArrowLeft") goPrev();
}

// Swiping left/right on a touch screen turns the pages.
function setupSwipe() {
  const scene = $("#sceneBook");
  let startX = 0;
  let startY = 0;
  let ignore = false;

  scene.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    ignore = Boolean(event.target.closest("button, input, label"));
  }, { passive: true });

  scene.addEventListener("touchend", function (event) {
    if (ignore) return;
    const distanceX = event.changedTouches[0].clientX - startX;
    const distanceY = event.changedTouches[0].clientY - startY;
    if (Math.abs(distanceX) > 60 && Math.abs(distanceX) > Math.abs(distanceY) * 1.5) {
      if (distanceX < 0) goNext(); else goPrev();
    }
  }, { passive: true });
}

function setupBook() {
  buildBook();
  updateBookUi();

  const cover = $("#pageCover");
  cover.addEventListener("click", openBook);
  cover.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBook();
    }
  });

  $("#nextPageBtn").addEventListener("click", goNext);
  $("#prevPageBtn").addEventListener("click", goPrev);
  document.addEventListener("keydown", handleBookKeys);
  setupSwipe();
  window.matchMedia("(min-width: 761px)").addEventListener("change", handleLayoutChange);
}


/* ==========================================================
   8. CHECKLIST PAGE (tick the little boxes!)
   ========================================================== */
function renderChecklist() {
  const list = $("#checklist");
  list.innerHTML = "";

  checklistItems.forEach(function (text) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    label.className = "check-item";
    label.innerHTML = '<input type="checkbox"><span class="check-box"><svg class="icon"><use href="#i-check"></use></svg></span>';

    const textSpan = document.createElement("span");
    textSpan.className = "check-text";
    textSpan.textContent = fillNames(text);

    label.appendChild(textSpan);
    item.appendChild(label);
    list.appendChild(item);
  });

  // when every box is ticked, celebrate a little
  list.addEventListener("change", function () {
    const allTicked = $$("#checklist input").every(function (box) {
      return box.checked;
    });
    if (allTicked) {
      const center = getCenterOf($("#pageChecklist"));
      sparkleBurst(center.x, center.y, 24);
      showToast(fillNames(messages.checklistDone));
    }
  });
}

function resetChecklist() {
  $$("#checklist input").forEach(function (box) {
    box.checked = false;
  });
}


/* ==========================================================
   9. YES OR NO INTERACTION
   Every NO makes YES bigger and NO smaller.
   ========================================================== */
const yesNo = { noClicks: 0, answered: false };

function setupYesNo() {
  $("#yesBtn").addEventListener("click", handleYes);
  $("#noBtn").addEventListener("click", handleNo);
}

// Show a message with a little "pop".
function showQuestionMessage(text) {
  const message = $("#questionMessage");
  message.textContent = fillNames(text);
  message.classList.remove("is-popping");
  void message.offsetWidth;                // restarts the CSS animation
  message.classList.add("is-popping");
}

function handleNo() {
  if (yesNo.answered) return;
  yesNo.noClicks++;
  const clicks = yesNo.noClicks;

  const yesButton = $("#yesBtn");
  const noButton = $("#noBtn");

  // YES grows up to 1.9 times, NO shrinks down to 0.45 times (it never disappears)
  yesButton.style.setProperty("--yes-scale", Math.min(1 + clicks * 0.22, 1.9));
  noButton.style.setProperty("--no-scale", Math.max(1 - clicks * 0.14, 0.45));

  if (clicks >= 4) yesButton.classList.add("is-huge");        // YES starts to beat like a heart
  $("#moodFace").dataset.mood = clicks >= 4 ? "cry" : "sad";   // the little face gets sadder

  const messageNumber = Math.min(clicks, noMessages.length) - 1;   // the last message repeats
  showQuestionMessage(noMessages[messageNumber]);
}

async function handleYes() {
  if (yesNo.answered || state.isBusy) return;
  yesNo.answered = true;
  $("#yesBtn").disabled = true;
  $("#noBtn").disabled = true;

  $("#moodFace").dataset.mood = "happy";
  $("#yesCelebration").classList.add("is-visible");

  const center = getCenterOf($("#pageQuestion"));
  confettiBurst(60, center.x, center.y);
  heartPops(center.x, center.y, 12);

  await wait(reducedMotion() ? 600 : 2600);
  startParty();                              // -> section 10
}

function resetYesNo() {
  yesNo.noClicks = 0;
  yesNo.answered = false;

  const yesButton = $("#yesBtn");
  const noButton = $("#noBtn");
  yesButton.disabled = false;
  noButton.disabled = false;
  yesButton.style.removeProperty("--yes-scale");
  noButton.style.removeProperty("--no-scale");
  yesButton.classList.remove("is-huge");

  $("#moodFace").dataset.mood = "happy";
  $("#questionMessage").textContent = "";
  $("#yesCelebration").classList.remove("is-visible");
}

/* ==========================================================
   10. DARK ROOM + BIRTHDAY LIGHT REVEAL

   The room is already built behind a dark overlay.
   - Clicking the light switch makes a circle of light grow out of the bulb.
   - At the same moment we add the class "is-lit" to the scene. Every
     decoration with class "reveal" then fades in after its own delay
     (set with --reveal-delay in index.html), so the room builds up piece by piece.
   ========================================================== */
const party = { isLightingUp: false };

// The "HAPPY BIRTHDAY" flags hanging on a sagging string.
function buildBanner() {
  const text = messages.bannerText;
  const colors = ["#FFB7D5", "#DCD6FF", "#FFF0B8", "#FFD6E7", "#CDEFE1"];

  let html = '<svg class="banner-string" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 0 Q50 10 100 0"></path></svg>';
  Array.from(text).forEach(function (letter, index) {
    if (letter === " ") return;                      // a gap between the two words
    const t = (index + 0.5) / text.length;           // 0 = far left, 1 = far right
    const sag = 4 * t * (1 - t);                     // 0 at the ends, 1 in the middle
    const tilt = (0.5 - t) * 22;                     // flags near the ends lean a little
    html += '<span class="flag" style="--t:' + t.toFixed(3) + '; --k:' + sag.toFixed(3) + '; --rot:' + tilt.toFixed(1) +
      'deg; --c:' + colors[index % colors.length] + '; --n:' + index + '"><b>' + letter + '</b></span>';
  });

  const banner = $("#banner");
  banner.innerHTML = html;
  banner.setAttribute("role", "img");
  banner.setAttribute("aria-label", text);
}

// Little glowing bulbs along two curved strings.
function buildFairyLights() {
  const colors = ["#FFE49A", "#FFB7D5", "#DCD6FF", "#FFFFFF", "#CDEFE1"];
  let html = "";
  let lightNumber = 0;
  for (let string = 0; string < 2; string++) {
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const x = string * 50 + 50 * t;                    // across the screen, in %
      const y = (2 + 32 * t * (1 - t)) * 5;              // the sag of the string, in %
      html += '<i class="light-bulb" style="left:' + x.toFixed(1) + '%; top:' + y.toFixed(1) + '%; --c:' +
        colors[lightNumber % colors.length] + '; --n:' + lightNumber + '"></i>';
      lightNumber++;
    }
  }
  $("#fairyLights").insertAdjacentHTML("beforeend", html);
}

// Which step of the party panel is showing? ("" = none)
function showPartyStep(stepName) {
  $$(".party-step").forEach(function (step) {
    step.classList.toggle("is-active", step.dataset.step === stepName);
  });
  $("#partyPanel").classList.toggle("is-empty", stepName === "");
}

// Put the room back to "dark, nothing revealed" (also used by the replay button).
function prepareDarkRoom() {
  const overlay = $("#darkOverlay");
  $("#sceneParty").classList.remove("is-lit");
  overlay.classList.remove("is-lighting", "is-gone");
  overlay.style.setProperty("--lit", -30);

  $("#lightSwitch").classList.remove("is-on");
  $("#cake").classList.remove("is-blown", "is-cutting", "is-cut");

  ["wishBtn", "blowBtn", "cutBtn", "toGiftsBtn"].forEach(function (id) {
    $("#" + id).disabled = false;
  });
  showPartyStep("");
  party.isLightingUp = false;
}

// The YES click brings us here: a dark wipe, then the dark room.
function startParty() {
  showScene("sceneParty", {
    dark: true,
    fromElement: $("#yesBtn"),
    afterSwap: prepareDarkRoom
  });
}

async function turnOnLights() {
  if (party.isLightingUp) return;
  party.isLightingUp = true;

  const scene = $("#sceneParty");
  const overlay = $("#darkOverlay");

  $("#lightSwitch").classList.add("is-on");     // the switch flips up
  overlay.classList.add("is-lighting");         // the bulb glows, the words fade
  await wait(reducedMotion() ? 50 : 500);

  scene.classList.add("is-lit");                // the decorations start to appear
  // grow the circle of light from the bulb (--lit goes from -30 to 135)
  await animateNumber(-30, 135, 2800, function (value) {
    overlay.style.setProperty("--lit", value);
  });
  overlay.classList.add("is-gone");             // the dark overlay fades out completely

  await wait(reducedMotion() ? 50 : 1000);      // wait until the cake has appeared
  showPartyStep("wish");
}

function setupParty() {
  buildBanner();
  buildFairyLights();
  $("#lightSwitch").addEventListener("click", turnOnLights);
  $("#wishBtn").addEventListener("click", handleWish);
  $("#blowBtn").addEventListener("click", handleBlow);
  $("#cutBtn").addEventListener("click", handleCut);
  $("#toGiftsBtn").addEventListener("click", returnToGifts);
}


/* ==========================================================
   11. BIRTHDAY CAKE: wish -> blow the candles -> cut the cake
   Each step changes a class on #cake. CSS does the animation.
   ========================================================== */
async function handleWish() {
  $("#wishBtn").disabled = true;

  const center = getCenterOf($("#cake"));
  sparkleBurst(center.x, center.y - 70, 30);     // sparkles around the cake
  showPartyStep("wishDone");                     // "Wish sent to the stars!"

  await wait(reducedMotion() ? 800 : 2700);
  showPartyStep("candles");                      // the user decides when to blow
}

async function handleBlow() {
  $("#blowBtn").disabled = true;

  const cake = $("#cake");
  cake.classList.add("is-blown");                // flames out, glow fades, smoke puffs
  const center = getCenterOf(cake);
  confettiBurst(40, center.x, center.y - 110);   // a small amount of confetti
  showPartyStep("blown");

  await wait(reducedMotion() ? 800 : 2700);
  showPartyStep("cake");                         // "IT'S CAKE TIME!" + the cut button
}

async function handleCut() {
  $("#cutBtn").disabled = true;

  const cake = $("#cake");
  cake.classList.add("is-cutting");              // the knife slices down
  await wait(reducedMotion() ? 100 : 900);
  cake.classList.add("is-cut");                  // the inside shows, the slice slides out
  await wait(reducedMotion() ? 100 : 1500);

  const slice = getCenterOf($("#cakeSlice"));
  confettiBurst(50, slice.x, slice.y);
  showPartyStep("cut");                          // sweet message + "OPEN MY GIFTS"
}

// After the cake: back to the notebook, which turns to the gift page by itself.
async function returnToGifts() {
  if (state.isBusy) return;
  state.unlocked = true;                         // the rest of the notebook opens up

  await showScene("sceneBook", {
    fromElement: $("#toGiftsBtn"),
    afterSwap: function () {
      updateBookUi();
      refreshGiftsUi();
    }
  });
  await wait(450);
  await flipToCount(flipsNeededToSee(PAGE.gifts, book.isDesktop));   // turn to the gifts
}

/* ==========================================================
   12. GIFT SELECTION (notebook page 4)
   Each gift opens its own full-screen scene.
   The back button brings her back to the notebook, so she can open another gift.
   ========================================================== */
const giftScenes = {
  letter: "sceneLetter",
  world: "sceneWorld",
  fortune: "sceneFortune"
};

function setupGifts() {
  $$(".gift-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openGift(card.dataset.gift, card);
    });
  });
  $$("[data-back-to-gifts]").forEach(function (button) {
    button.addEventListener("click", backToGifts);
  });
  refreshGiftsUi();
}

function openGift(giftName, card) {
  if (state.isBusy) return;
  markGiftOpened(giftName);
  showScene(giftScenes[giftName], {
    fromElement: card,
    afterSwap: function () {
      prepareGiftScene(giftName);
    }
  });
}

// Every time a gift is opened it starts fresh.
function prepareGiftScene(giftName) {
  if (giftName === "letter") resetLetter();
  if (giftName === "world") resetScrapbook();
  if (giftName === "fortune") resetFortune();
}

function backToGifts() {
  showScene("sceneBook", {
    quick: true,
    afterSwap: function () {
      if (state.secretToastPending) {
        state.secretToastPending = false;
        setTimeout(function () {
          showToast(messages.secretAppeared);
        }, 800);
      }
    }
  });
}

function markGiftOpened(giftName) {
  if (!state.openedGifts.includes(giftName)) {
    state.openedGifts.push(giftName);
  }
  if (state.openedGifts.length === 3 && !state.secretUnlocked) {
    state.secretUnlocked = true;          // all three opened: the secret envelope appears
    state.secretToastPending = true;
  }
  refreshGiftsUi();
}

// Update the ticks on the gift boxes, the counter and the secret envelope page.
function refreshGiftsUi() {
  $$(".gift-card").forEach(function (card) {
    card.classList.toggle("is-opened", state.openedGifts.includes(card.dataset.gift));
  });

  const count = state.openedGifts.length;
  $("#giftsProgress").textContent = count >= 3
    ? fillNames(messages.giftsAllOpened)
    : fillNames(messages.giftsProgress).replace("{count}", count);

  $("#secretLocked").hidden = state.secretUnlocked;
  $("#secretArea").hidden = !state.secretUnlocked;
}


/* ==========================================================
   13. GIFT 1: A LETTER FOR YOU
   Envelope steps (CSS classes on the stage): is-opening -> is-reading
   ========================================================== */
async function openEnvelope(stage) {
  if (stage.classList.contains("is-opening")) return;
  stage.classList.add("is-opening");                   // flap opens, the paper rises
  await wait(reducedMotion() ? 100 : 1500);
  stage.classList.add("is-reading");                   // the full letter appears
  const center = getCenterOf(stage);
  sparkleBurst(center.x, center.y - 80, 18);
}

function resetEnvelope(stage) {
  stage.classList.remove("is-opening", "is-reading");
}

function setupLetter() {
  $("#letterEnvelope").addEventListener("click", function () {
    openEnvelope($("#letterStage"));
  });
}

function resetLetter() {
  resetEnvelope($("#letterStage"));
}


/* ==========================================================
   14. PHOTO SCRAPBOOK (gift 2: Our Little World) + photo lightbox
   ========================================================== */

// A cute stand-in used when a photo file can't be found.
function makePhotoPlaceholder(photo) {
  const box = document.createElement("span");
  box.className = "photo-placeholder";
  box.innerHTML = '<svg class="icon"><use href="#i-camera"></use></svg><span>Your photo goes here</span><small></small>';
  box.querySelector("small").textContent = photo.src || "";
  return box;
}

// Put a photo (or the placeholder) inside a container.
function fillPhoto(container, photo) {
  container.innerHTML = "";
  if (!photo.src) {
    container.appendChild(makePhotoPlaceholder(photo));
    return;
  }
  const image = document.createElement("img");
  image.alt = photo.caption;                               // text for screen readers
  image.addEventListener("error", function () {            // file missing? show the placeholder
    container.innerHTML = "";
    container.appendChild(makePhotoPlaceholder(photo));
  });
  image.src = photo.src;
  container.appendChild(image);
}

function renderPhotos() {
  const board = $("#photoBoard");
  board.innerHTML = "";

  const tilts = [-3, 2.5, -1.5, 3.5, -2.5, 2];
  const tapes = ["washi--pink", "washi--lavender", "washi--butter", "washi--mint"];
  const stickers = [["i-heart", "#FF8FBA"], ["i-star", "#FFD35E"], ["i-flower", "#B7A9F5"], ["i-sparkle", "#FFD35E"]];

  birthdayPhotos.forEach(function (photo, index) {
    const polaroid = document.createElement("button");
    polaroid.className = "polaroid";
    polaroid.style.setProperty("--tilt", tilts[index % tilts.length] + "deg");
    polaroid.style.setProperty("--n", index);
    polaroid.setAttribute("aria-label", messages.photoHint + " " + photo.caption);

    const sticker = stickers[index % stickers.length];
    polaroid.innerHTML =
      '<span class="washi ' + tapes[index % tapes.length] + ' polaroid-tape"></span>' +
      '<span class="polaroid-photo"></span>' +
      '<span class="polaroid-caption"></span>' +
      '<svg class="icon sticker polaroid-sticker" style="color:' + sticker[1] + '"><use href="#' + sticker[0] + '"></use></svg>';

    fillPhoto(polaroid.querySelector(".polaroid-photo"), photo);
    polaroid.querySelector(".polaroid-caption").textContent = photo.caption;
    polaroid.addEventListener("click", function () {
      openLightbox(index);
    });
    board.appendChild(polaroid);
  });
}

// The sticky notes on the "Little notes" tab.
function renderNotes() {
  const board = $("#notesBoard");
  board.innerHTML = "";

  const tilts = [-2, 1.5, 2, -1.5];
  const tapes = ["washi--lavender", "washi--pink", "washi--mint", "washi--butter"];

  friendshipNotes.forEach(function (note, index) {
    const card = document.createElement("section");
    card.className = "note-card note-card--" + note.color;
    card.style.setProperty("--tilt", tilts[index % tilts.length] + "deg");
    card.style.setProperty("--n", index);
    card.innerHTML = '<span class="washi ' + tapes[index % tapes.length] + '"></span><h3></h3><ul></ul>';
    card.querySelector("h3").textContent = fillNames(note.title);

    const list = card.querySelector("ul");
    note.items.forEach(function (itemText) {
      const item = document.createElement("li");
      item.textContent = fillNames(itemText);
      list.appendChild(item);
    });
    board.appendChild(card);
  });
}

function showScrapbookTab(tabName) {
  $$(".tab-btn").forEach(function (button) {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $("#photoBoard").hidden = tabName !== "photos";
  $("#notesBoard").hidden = tabName !== "notes";
}

function resetScrapbook() {
  showScrapbookTab("photos");
}

// ----- The big photo viewer -----
const lightbox = { index: 0, lastFocus: null };

function showLightboxPhoto(index) {
  const total = birthdayPhotos.length;
  lightbox.index = (index + total) % total;          // wraps around at both ends
  const photo = birthdayPhotos[lightbox.index];
  fillPhoto($("#lightboxPhoto"), photo);
  $("#lightboxCaption").textContent = photo.caption;
  $("#lightboxPrev").hidden = total < 2;
  $("#lightboxNext").hidden = total < 2;
}

function openLightbox(index) {
  lightbox.lastFocus = document.activeElement;
  $("#lightbox").hidden = false;
  showLightboxPhoto(index);
  $("#lightboxClose").focus();
}

function closeLightbox() {
  if ($("#lightbox").hidden) return;
  $("#lightbox").hidden = true;
  if (lightbox.lastFocus) lightbox.lastFocus.focus();
}

function setupScrapbook() {
  renderPhotos();
  renderNotes();

  $$(".tab-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      showScrapbookTab(button.dataset.tab);
    });
  });

  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", function () {
    showLightboxPhoto(lightbox.index - 1);
  });
  $("#lightboxNext").addEventListener("click", function () {
    showLightboxPhoto(lightbox.index + 1);
  });
  // clicking the dark area around the photo also closes it
  $("#lightbox").addEventListener("click", function (event) {
    if (event.target === $("#lightbox")) closeLightbox();
  });
  document.addEventListener("keydown", function (event) {
    if ($("#lightbox").hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxPhoto(lightbox.index - 1);
    if (event.key === "ArrowRight") showLightboxPhoto(lightbox.index + 1);
  });
}


/* ==========================================================
   15. GIFT 3: ONE LAST SURPRISE (fortune machine)
   ========================================================== */
const fortuneState = { isBusy: false, lastIndex: -1 };

// Pick a random fortune, but never the same one twice in a row.
function pickFortune() {
  if (fortunes.length < 2) return fortunes[0];
  let index = Math.floor(Math.random() * fortunes.length);
  while (index === fortuneState.lastIndex) {
    index = Math.floor(Math.random() * fortunes.length);
  }
  fortuneState.lastIndex = index;
  return fortunes[index];
}

async function generateFortune() {
  if (fortuneState.isBusy) return;
  fortuneState.isBusy = true;

  const button = $("#fortuneBtn");
  const machine = $("#fortuneMachine");
  const ticket = $("#fortuneTicket");
  button.disabled = true;

  // reset the animation from the last time
  machine.classList.remove("is-shaking", "is-cranking", "is-dropping", "is-opened");
  ticket.classList.remove("is-visible");
  void machine.offsetWidth;                     // makes the browser restart the CSS animations

  machine.classList.add("is-shaking", "is-cranking");           // shake and crank the handle
  await wait(reducedMotion() ? 100 : 850);
  machine.classList.remove("is-shaking", "is-cranking");

  machine.classList.add("is-dropping");                         // a capsule drops into the tray
  await wait(reducedMotion() ? 100 : 900);
  machine.classList.add("is-opened");                           // the capsule pops open
  await wait(reducedMotion() ? 100 : 450);

  $("#fortuneText").textContent = fillNames(pickFortune());
  ticket.classList.add("is-visible");                           // the paper fortune unrolls
  const center = getCenterOf(ticket);
  sparkleBurst(center.x, center.y, 16);

  button.textContent = fillNames(messages.fortuneAgain);
  button.disabled = false;
  fortuneState.isBusy = false;
}

function setupFortune() {
  $("#fortuneBtn").addEventListener("click", generateFortune);
}

function resetFortune() {
  fortuneState.isBusy = false;
  fortuneState.lastIndex = -1;
  $("#fortuneMachine").classList.remove("is-shaking", "is-cranking", "is-dropping", "is-opened");
  $("#fortuneTicket").classList.remove("is-visible");
  $("#fortuneText").textContent = "";
  const button = $("#fortuneBtn");
  button.textContent = fillNames(messages.fortuneButton);
  button.disabled = false;
}


/* ==========================================================
   16. THE SECRET ENVELOPE (notebook page 5)
   ========================================================== */
let secretReturnFocus = null;

async function openSecret() {
  const stage = $("#secretStage");
  secretReturnFocus = document.activeElement;
  resetEnvelope(stage);
  $("#secretModal").hidden = false;

  await wait(reducedMotion() ? 50 : 500);
  await openEnvelope(stage);                      // the envelope opens by itself
  if (!$("#secretModal").hidden) $("#secretCloseBtn").focus();
}

function closeSecret() {
  if ($("#secretModal").hidden) return;
  $("#secretModal").hidden = true;
  $("#finaleBtn").hidden = false;                 // now the "see my final wish" button shows
  if (secretReturnFocus) secretReturnFocus.focus();
}

function resetSecret() {
  $("#secretModal").hidden = true;
  $("#finaleBtn").hidden = true;
  resetEnvelope($("#secretStage"));
}

function setupSecret() {
  $("#secretEnvelopeBtn").addEventListener("click", openSecret);
  $("#secretCloseBtn").addEventListener("click", closeSecret);
  $("#secretContinueBtn").addEventListener("click", function (event) {
    const button = event.currentTarget;
    closeSecret();
    goToFinale(button);
  });
  $("#finaleBtn").addEventListener("click", function (event) {
    goToFinale(event.currentTarget);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSecret();
  });
}


/* ==========================================================
   17. FINAL CELEBRATION + REPLAY
   ========================================================== */
function goToFinale(fromElement) {
  showScene("sceneFinal", {
    fromElement: fromElement,
    afterSwap: function () {
      confettiRain(70);
    }
  });
}

// Put EVERYTHING back to the way it was at the very start.
function resetEverything() {
  state.unlocked = false;
  state.openedGifts = [];
  state.secretUnlocked = false;
  state.secretToastPending = false;

  resetBook();
  resetChecklist();
  resetYesNo();
  prepareDarkRoom();
  resetLetter();
  resetScrapbook();
  resetFortune();
  resetSecret();
  closeLightbox();
  refreshGiftsUi();
}

function replayExperience(event) {
  if (state.isBusy) return;
  showScene("sceneWelcome", {
    fromElement: event.currentTarget,
    afterSwap: resetEverything
  });
}

function setupFinale() {
  $("#replayBtn").addEventListener("click", replayExperience);
  $("#finalBackBtn").addEventListener("click", function (event) {
    showScene("sceneBook", { fromElement: event.currentTarget });
  });

  // a little more confetti every few seconds while the final screen is open
  setInterval(function () {
    if (state.currentScene === "sceneFinal" && !document.hidden) confettiRain(14);
  }, 5000);
}


/* ==========================================================
   18. START EVERYTHING
   ========================================================== */
function init() {
  applyThemeColors();
  fillAllTexts();
  $$("[data-wave]").forEach(makeWaveText);
  addBowParts();
  addBunting();
  addSparkles();

  renderChecklist();

  setupWelcome();
  setupMusic();
  setupBook();
  setupYesNo();
  setupParty();
  setupGifts();
  setupLetter();
  setupScrapbook();
  setupFortune();
  setupSecret();
  setupFinale();

  setupButtonHearts();
  startFloatingHearts();

  // keep the bunting the right length when the window changes size
  let resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(addBunting, 250);
  });
}

init();

