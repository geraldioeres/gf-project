/* ==========================================================================
   GIFA'S CELLS BIRTHDAY WEBSITE - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. WEB AUDIO API SYNTHESIZER FOR SOUND EFFECTS
  // ------------------------------------------------------------------------
  class SoundSynth {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPop(freq = 440) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    }

    playChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = this.ctx.currentTime + (idx * 0.08);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    }

    playFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const melody = [
        { note: 523.25, dur: 0.15 },
        { note: 659.25, dur: 0.15 },
        { note: 783.99, dur: 0.15 },
        { note: 1046.50, dur: 0.4 }
      ];
      let now = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = item.note;

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + item.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + item.dur);
        now += item.dur + 0.05;
      });
    }
  }

  const audio = new SoundSynth();

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      soundToggleBtn.textContent = audio.enabled ? '🔊' : '🔇';
      if (audio.enabled) audio.playPop(520);
    });
  }

  // Dark Mode Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
      audio.playPop(350);
    });
  }

  // ------------------------------------------------------------------------
  // 2. CANVAS PARTICLES & CONFETTI ENGINE
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const confettiPieces = [];

  class HeartParticle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || canvas.height + 20;
      this.size = Math.random() * 14 + 8;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 1;
      this.opacity = Math.random() * 0.6 + 0.3;
      this.color = ['#FF8EAC', '#FF477E', '#FFD166', '#70C1B3'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -20) {
        this.y = canvas.height + 20;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(this.x, this.y + topCurveHeight);
      ctx.bezierCurveTo(
        this.x, this.y, 
        this.x - this.size / 2, this.y, 
        this.x - this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
        this.x, this.y + this.size, 
        this.x, this.y + this.size
      );
      ctx.bezierCurveTo(
        this.x, this.y + this.size, 
        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
        this.x + this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x + this.size / 2, this.y, 
        this.x, this.y, 
        this.x, this.y + topCurveHeight
      );
      ctx.fill();
      ctx.restore();
    }
  }

  // Create initial background hearts
  for (let i = 0; i < 25; i++) {
    particles.push(new HeartParticle());
  }

  class ConfettiPiece {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 10 + 6;
      this.speedX = (Math.random() - 0.5) * 12;
      this.speedY = Math.random() * -12 - 4;
      this.gravity = 0.3;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.color = ['#FF477E', '#FFD166', '#4EA8DE', '#00F5D4', '#7209B7'][Math.floor(Math.random() * 5)];
      this.opacity = 1;
    }

    update() {
      this.speedY += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      this.opacity -= 0.008;
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function triggerConfetti(x, y) {
    const startX = x || canvas.width / 2;
    const startY = y || canvas.height / 2;
    for (let i = 0; i < 80; i++) {
      confettiPieces.push(new ConfettiPiece(startX, startY));
    }
    audio.playFanfare();
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ambient floating hearts
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Confetti burst
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      confettiPieces[i].update();
      confettiPieces[i].draw();
      if (confettiPieces[i].opacity <= 0) {
        confettiPieces.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // ------------------------------------------------------------------------
  // 3. LOVE METER BOOST LOGIC
  // ------------------------------------------------------------------------
  let loveLevel = 75;
  const loveMeterFill = document.getElementById('loveMeterFill');
  const loveMeterVal = document.getElementById('loveMeterVal');
  const boostLoveBtn = document.getElementById('boostLoveBtn');

  if (boostLoveBtn && loveMeterFill && loveMeterVal) {
    boostLoveBtn.addEventListener('click', (e) => {
      loveLevel += 10;
      if (loveLevel > 100) loveLevel = 100;

      loveMeterFill.style.width = loveLevel + '%';
      loveMeterVal.textContent = loveLevel + '%';

      audio.playPop(300 + loveLevel * 5);

      // Spawn heart burst at button coordinates
      const rect = boostLoveBtn.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const hp = new HeartParticle(rect.left + rect.width / 2, rect.top);
        hp.speedY = Math.random() * 4 + 2;
        hp.speedX = (Math.random() - 0.5) * 6;
        particles.push(hp);
      }

      if (loveLevel === 100) {
        loveMeterVal.textContent = '100% (MAXIMUM LOVE!) ♥';
        triggerConfetti(rect.left + rect.width / 2, rect.top);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. BIRTHDAY CELEBRATION BANNER LOGIC (IT'S TODAY!)
  // ------------------------------------------------------------------------
  const todayBadge = document.querySelector('.today-badge');
  if (todayBadge) {
    // Welcome celebration confetti burst on page load
    setTimeout(() => {
      triggerConfetti(window.innerWidth / 2, 200);
    }, 800);
  }

  // ------------------------------------------------------------------------
  // 5. CELL POKE & DIALOGUE SYSTEM
  // ------------------------------------------------------------------------
  const cellQuotes = {
    love: [
      "Sending infinity hearts to the birthday girl! 💕",
      "Love Cell is currently taking over 99.9% of Mind Village!",
      "You are the most precious person in our entire universe! ✨"
    ],
    hungry: [
      "Target acquired: Giant Birthday Cake with extra frosting! 🎂",
      "Can we eat delicious tteokbokki after the cake? 😋",
      "Hungry Cell grants 1000 calories of pure birthday happiness!"
    ],
    rational: [
      "Calculation complete: 100% probability of an amazing year ahead. 📊",
      "Re-analyzing joy level... Error: Exceeds maximum scale!",
      "Strict schedule today: Laugh, eat cake, be happy."
    ],
    emotional: [
      "Writing a tearfully romantic poem under the stars right now... 🌙",
      "Every single birthday memory with you shines like silver dust.",
      "Mind Village feels warm and cozy today because of you!"
    ],
    fashion: [
      "OOTD Rating: 100/10! Absolute Birthday Queen style! 👑",
      "Accessories required: Crown, bright smile, and endless sparkle!",
      "Fashion Cell approves this stunning birthday outfit!"
    ],
    naughty: [
      "Whispering a sneaky secret wish into your ear... 😈",
      "Naughty Cell is planning a cute surprise prank!",
      "Stealing an extra slice of cake when Hungry Cell isn't looking!"
    ]
  };

  const activeCellBadge = document.getElementById('activeCellBadge');

  document.querySelectorAll('.cell-card').forEach(card => {
    const cellKey = card.getAttribute('data-cell');
    const pokeBtn = card.querySelector('.btn-poke-cell');
    const bubble = card.querySelector('.speech-bubble');
    const counter = card.querySelector('.poke-counter');
    let pokes = 0;

    if (pokeBtn) {
      pokeBtn.addEventListener('click', () => {
        pokes++;
        if (counter) counter.textContent = `${pokes} Pokes`;

        audio.playPop(400 + Math.random() * 200);

        // Update speech bubble with random quote
        if (cellQuotes[cellKey]) {
          const quotes = cellQuotes[cellKey];
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          if (bubble) bubble.textContent = `"${randomQuote}"`;
        }

        // Card bounce animation
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
          card.style.transform = '';
        }, 200);

        // Update active cell badge in nav
        if (activeCellBadge) {
          const cellName = card.querySelector('.cell-name')?.textContent || 'Love Cell';
          activeCellBadge.innerHTML = `<span>Active:</span> ${cellName} ✨`;
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 6. SECRET GIFT BOX & LOVE LETTER MODAL
  // ------------------------------------------------------------------------
  const giftBox = document.getElementById('giftBox');
  const loveLetterModal = document.getElementById('loveLetterModal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  if (giftBox) {
    giftBox.addEventListener('click', () => {
      giftBox.classList.add('opened');
      audio.playChime();

      const rect = giftBox.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top);

      setTimeout(() => {
        if (loveLetterModal) loveLetterModal.classList.add('active');
      }, 600);
    });
  }

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', () => {
      if (loveLetterModal) loveLetterModal.classList.remove('active');
    });
  }



  // ------------------------------------------------------------------------
  // 8. BIRTHDAY CELL QUIZ LOGIC
  // ------------------------------------------------------------------------
  const quizQuestions = [
    {
      q: "What is your main birthday goal today?",
      options: [
        { text: "Eat lots of delicious cake & food!", cell: "hungry" },
        { text: "Spend quality time with my loved one", cell: "love" },
        { text: "Wear a super stylish birthday outfit!", cell: "fashion" },
        { text: "Relax under the stars with peaceful music", cell: "emotional" }
      ]
    },
    {
      q: "How do you react to opening birthday presents?",
      options: [
        { text: "Analyze every detail with excitement!", cell: "rational" },
        { text: "Burst into happy tears & hugs!", cell: "emotional" },
        { text: "Scream with joy and dance around!", cell: "naughty" },
        { text: "Feel overwhelming love and gratitude", cell: "love" }
      ]
    }
  ];

  let currentQuizStep = 0;
  const scores = { love: 0, hungry: 0, rational: 0, emotional: 0, fashion: 0, naughty: 0 };

  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsGrid = document.getElementById('quizOptionsGrid');
  const quizResultBox = document.getElementById('quizResultBox');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultDesc = document.getElementById('quizResultDesc');
  const quizResultImg = document.getElementById('quizResultImg');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  function renderQuizQuestion() {
    if (!quizQuestionText || !quizOptionsGrid) return;

    if (currentQuizStep >= quizQuestions.length) {
      showQuizResult();
      return;
    }

    const currentQ = quizQuestions[currentQuizStep];
    quizQuestionText.textContent = currentQ.q;
    quizOptionsGrid.innerHTML = '';

    currentQ.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        scores[opt.cell] = (scores[opt.cell] || 0) + 1;
        audio.playPop(500);
        currentQuizStep++;
        renderQuizQuestion();
      });
      quizOptionsGrid.appendChild(btn);
    });
  }

  function showQuizResult() {
    if (!quizResultBox) return;

    // Find highest cell
    let topCell = 'love';
    let maxVal = -1;
    Object.keys(scores).forEach(cell => {
      if (scores[cell] > maxVal) {
        maxVal = scores[cell];
        topCell = cell;
      }
    });

    const resultDetails = {
      love: {
        title: "Primary Cell: Love Cell! 💕",
        desc: "Your mind is 100% filled with warmth, affection, and love today! You are spreading happiness to everyone around you.",
        img: "images/love_cell.svg"
      },
      hungry: {
        title: "Primary Cell: Hungry Cell! 🎂",
        desc: "Your tummy is leading the birthday party! Demand the biggest slice of cake, favorite dishes, and endless sweets!",
        img: "images/hungry_cell.svg"
      },
      rational: {
        title: "Primary Cell: Rational Cell! 📊",
        desc: "Smart, organized, and ready to enjoy an flawlessly calculated birthday celebration with maximum happiness efficiency!",
        img: "images/rational_cell.svg"
      },
      emotional: {
        title: "Primary Cell: Emotional Cell! 🌙",
        desc: "Deeply touched by all the love, nostalgic memories, and heartfelt wishes. It's a truly romantic and meaningful day!",
        img: "images/emotional_cell.svg"
      },
      fashion: {
        title: "Primary Cell: Fashion Cell! ✨",
        desc: "You are the undisputed fashion icon of the day! Shiny, fabulous, and turning heads wherever you go!",
        img: "images/fashion_cell.svg"
      },
      naughty: {
        title: "Primary Cell: Naughty Cell! 😈",
        desc: "Full of cheeky energy, playful giggles, and fun birthday pranks! Ready to make unforgettable wild memories!",
        img: "images/naughty_cell.svg"
      }
    };

    const res = resultDetails[topCell] || resultDetails.love;

    if (quizQuestionText) quizQuestionText.parentElement.style.display = 'none';
    quizResultBox.style.display = 'flex';

    if (quizResultTitle) quizResultTitle.textContent = res.title;
    if (quizResultDesc) quizResultDesc.textContent = res.desc;
    if (quizResultImg) quizResultImg.src = res.img;

    const rect = quizResultBox.getBoundingClientRect();
    triggerConfetti(rect.left + rect.width / 2, rect.top);
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      currentQuizStep = 0;
      Object.keys(scores).forEach(k => scores[k] = 0);
      if (quizResultBox) quizResultBox.style.display = 'none';
      if (quizQuestionText) quizQuestionText.parentElement.style.display = 'block';
      renderQuizQuestion();
    });
  }

  renderQuizQuestion();
});
