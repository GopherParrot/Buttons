Swal.fire("If you hold the button, the alert won't trigger... or just go to settings and disable it ^_^\n\n...Btw you don't need to understand the japanese text, it's not important :)");
const button = document.querySelector('.duo-button');
const alertToggle = document.getElementById('alertToggle');

const messages = [
  'やったー!',
  'ばんざい!',
  'すごい!',
  'やったね!',
  'おめでとう!',
  'よっしゃ!',
  'いいぞ!',
  'わーい!',
  'Yippee!',
  'Yahoo!',
  'Horay!',
  'Hooooo!',
  'Oohhhh!',
  'Wahhhh!',
];

const excitingTitles = [
  'ワクワクする!',
  'エキサイティング!',
  'Exciting!',
];

let currentMessageIndex = 0;

button.addEventListener('click', () => {
  const currentMessage = messages[currentMessageIndex];
  button.textContent = currentMessage;

  if (alertToggle.checked) {
    const randomTitle = excitingTitles[Math.floor(Math.random() * excitingTitles.length)];
    Swal.fire({
      title: randomTitle,
      text: `現在のテキストは：${currentMessage}`,
      icon: 'success',
      confirmButtonText: 'かっこいい! / Cool!'
    });
  }

  currentMessageIndex = (currentMessageIndex + 1) % messages.length;
});

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
let isOpen = false;

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('show');
  if (!isOpen) {
    settingsBtn.classList.remove('spin-back');
    settingsBtn.classList.add('spin');
  } else {
    settingsBtn.classList.remove('spin');
    settingsBtn.classList.add('spin-back');
  }
  isOpen = !isOpen;
});

// theme toggle functionality
const themeToggle = document.getElementById('themeToggleBtn');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeToggle.classList.toggle('switched');
});

// features button toggle
const enableFeaturesBtn = document.getElementById('enableFeaturesBtn');
const featuresBtn = document.getElementById('featuresBtn');

enableFeaturesBtn.addEventListener('change', () => {
  featuresBtn.style.display = enableFeaturesBtn.checked ? 'inline-block' : 'none';
});

featuresBtn.addEventListener('click', () => {
  Swal.fire({
    title: 'Features',
    html: `
      <ul style="text-align: left;">
        <li><b>Buttons</b>: Click to cycle through fun messages. Enable/disable alerts in settings.</li>
        <li><b>Balls</b>: Enable in settings, then click "Add Ball" to create a ball with a chosen color and size.</li>
        <li><b>An alert</b>: Just a simple alert, aka "SweetAlert".</li>
        <li><b>Drag Balls</b>: Click or touch and drag to move balls.</li>
        <li><b>Delete Balls</b>: Hold a ball (500ms) to prompt a "Delete?" alert with Cancel/Delete options.</li>
        <li><b>Theme Toggle</b>: Switch between light and dark mode in settings.</li>
        <li><b>Hide/Show</b>: Enable in settings, then click "Hide" to hide everything except settings, balls and the button itself, or "Show" to restore.</li>
        <li><b>Gravity</b>: Click "Gravity: On/Off" to toggle gravity for all baaaaaaaalllllsssszzzz.</li>
      </ul>
    `,
    icon: 'info',
    confirmButtonText: 'Got it!'
  });
});

// hide/show button
const enableHideShowBtn = document.getElementById('enableHideShowBtn');
const hideShowBtn = document.getElementById('hideShowBtn');
const mainContainer = document.querySelector('.main-container');
let isHidden = false;

const popSound = new Audio('https://cdn.pixabay.com/download/audio/2025/04/16/audio_cec206a548.mp3?filename=pop-cartoon-328167.mp3');
popSound.volume = 0.6;

let airResistanceDisabled = false;

document.getElementById("airResistanceToggle").addEventListener("change", function () {
    airResistanceDisabled = this.checked;
});

enableHideShowBtn.addEventListener('change', () => {
  hideShowBtn.style.display = enableHideShowBtn.checked ? 'inline-block' : 'none';
});

hideShowBtn.addEventListener('click', () => {
  isHidden = !isHidden;
  hideShowBtn.textContent = isHidden ? 'Show' : 'Hide';
  
  button.style.display = isHidden ? 'none' : 'inline-block';
  addBallBtn.style.display = isHidden ? 'none' : (enableAddBalls.checked ? 'inline-block' : 'none');
  featuresBtn.style.display = isHidden ? 'none' : (enableFeaturesBtn.checked ? 'inline-block' : 'none');
  gravityBtn.style.display = isHidden ? 'none' : (enableGravityBtn.checked ? 'inline-block' : 'none');
  balls.forEach(ball => {
    //ball.style.display = isHidden ? 'none' : 'block';
  });
  
  hideShowBtn.style.display = 'inline-block';
});

// gravity button
const enableGravityBtn = document.getElementById('enableGravityBtn');
const gravityBtn = document.getElementById('gravityBtn');
let gravityEnabled = true;

enableGravityBtn.addEventListener('change', () => {
  gravityBtn.style.display = enableGravityBtn.checked ? 'inline-block' : 'none';
});

gravityBtn.addEventListener('click', () => {
  gravityEnabled = !gravityEnabled;
  const gravityText = document.getElementById('gravityText');
  gravityText.textContent = gravityEnabled ? 'Gravity: On' : 'Gravity: Off';
});

// ... balls
const enableAddBalls = document.getElementById('enableAddBalls');
const addBallBtn = document.getElementById('addBallBtn');
const balls = [];

enableAddBalls.addEventListener('change', () => {
  addBallBtn.style.display = enableAddBalls.checked ? 'inline-block' : 'none';
});

addBallBtn.addEventListener('click', async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create a Ball',
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Enter color (e.g., red, #00ff99)">
      <input id="swal-input2" class="swal2-input" placeholder="Enter size in pixels (10-100)">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const color = document.getElementById('swal-input1').value;
      const size = document.getElementById('swal-input2').value;
      if (!color) {
        Swal.showValidationMessage('You need to enter a color!');
        return false;
      }
      if (!size || isNaN(size) || size < 10 || size > 100) {
        Swal.showValidationMessage('Size must be a number between 10 and 100!');
        return false;
      }
      return { color, size: parseFloat(size) };
    }
  });

  if (formValues) {
    createBall(formValues.color, formValues.size);
  }
});

function createBall(color, size) {
  const ball = document.createElement('div');
  ball.className = 'ball';
  ball.style.backgroundColor = color;
  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  ball.style.left = Math.random() * (window.innerWidth - size) + 'px';
  ball.style.top = '10px';

  let velocity = { x: 0, y: 0 };
  let gravity = 0.5;
  let bounce = 0.6;
  let friction = 0.98;
  let maxVelocity = 10;
  let dragFriction = 0.88;

  ball.velocity = velocity;
  ball.bounce = bounce;
  ball.gravity = gravity;
  ball.friction = friction;
  ball.maxVelocity = maxVelocity;
  ball.dragFriction = dragFriction;
  ball.size = size;

  makeDraggable(ball);
  document.body.appendChild(ball);
  balls.push(ball);
}

function updateBalls() {
  balls.forEach((ball, i) => {
    if (ball.isDragging || ball.style.display === 'none') return;

    const rect = ball.getBoundingClientRect();
    if (gravityEnabled) {
      ball.velocity.y += ball.gravity;
    }

    let newTop = rect.top + ball.velocity.y;
    let newLeft = rect.left + ball.velocity.x;
    
// == some collision i think that's cool... or maybe not ==

    // top collision
    if (newTop <= 0) {
      newTop = 0;
      ball.velocity.y *= -ball.bounce;
      ball.velocity.x *= ball.friction;
    }

    // floor collision
    if (newTop + ball.size >= window.innerHeight) {
      newTop = window.innerHeight - ball.size;
      ball.velocity.y *= -ball.bounce;
      ball.velocity.x *= ball.friction;
    }

    // wall collisions
    if (newLeft <= 0) {
      newLeft = 0;
      ball.velocity.x *= -1;
    } else if (newLeft + ball.size >= window.innerWidth) {
      newLeft = window.innerWidth - ball.size;
      ball.velocity.x *= -1;
    }

    // cap velocity
    ball.velocity.x = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.x));
    ball.velocity.y = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.y));

    // apply friction to horizontal movement
	if (!airResistanceDisabled) {
    	ball.velocity.x *= ball.friction;
	}

    // prevent NaN or undefined positions
    ball.style.top = isNaN(newTop) ? rect.top + 'px' : newTop + 'px';
    ball.style.left = isNaN(newLeft) ? rect.left + 'px' : newLeft + 'px';

    // ... balls... collision... :)
    for (let j = i + 1; j < balls.length; j++) {
      const other = balls[j];
      if (other.style.display === 'none') continue;

      const r1 = ball.getBoundingClientRect();
      const r2 = other.getBoundingClientRect();

      const dx = r1.left + r1.width / 2 - (r2.left + r2.width / 2);
      const dy = r1.top + r1.height / 2 - (r2.top + r2.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (r1.width / 2 + r2.width / 2)) {
        const nx = dx / distance || 0;
        const ny = dy / distance || 0;
        const dvx = ball.velocity.x - other.velocity.x;
        const dvy = ball.velocity.y - other.velocity.y;
        const dot = dvx * nx + dvy * ny;
        const impulse = 1.0 * dot / 2;

        ball.velocity.x -= impulse * nx;
        ball.velocity.y -= impulse * ny;
        other.velocity.x += impulse * nx;
        other.velocity.y += impulse * ny;

        ball.velocity.x = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.x));
        ball.velocity.y = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.y));
        other.velocity.x = Math.max(-other.maxVelocity, Math.min(other.maxVelocity, other.velocity.x));
        other.velocity.y = Math.max(-other.maxVelocity, Math.min(other.maxVelocity, other.velocity.y));

        const overlap = (r1.width / 2 + r2.width / 2) - distance;
        const angle = Math.atan2(dy, dx);
        ball.style.left = (r1.left + Math.cos(angle) * overlap / 2) + 'px';
        ball.style.top = (r1.top + Math.sin(angle) * overlap / 2) + 'px';
        other.style.left = (r2.left - Math.cos(angle) * overlap / 2) + 'px';
        other.style.top = (r2.top - Math.sin(angle) * overlap / 2) + 'px';
      }
    }
  });

  requestAnimationFrame(updateBalls);
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0;
  let holdTimeout;
  let lastX = 0, lastY = 0;
  let lastTime = 0;

  const promptDelete = () => {
    Swal.fire({
      title: 'Delete?',
      text: 'Do you want to delete this ball?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = balls.indexOf(el);
        if (index > -1) {
          balls.splice(index, 1);
          blowUp(el);
		  el.remove();
		  popSound.currentTime = 0;
  		  popSound.play();
        }
      }
      el.isDragging = false;
    });
  };

  const updateVelocity = (x, y, time) => {
    if (lastTime === 0) {
      lastX = x;
      lastY = y;
      lastTime = time;
      return;
    }
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    if (dt > 0.01) {
      const newVx = (x - lastX) / dt;
      const newVy = (y - lastY) / dt;
      const maxDragSpeed = 8;
      el.velocity.x = Math.max(-maxDragSpeed, Math.min(maxDragSpeed, 0.4 * el.velocity.x + 0.6 * newVx));
      el.velocity.y = Math.max(-maxDragSpeed, Math.min(maxDragSpeed, 0.4 * el.velocity.y + 0.6 * newVy));
    }
    lastX = x;
    lastY = y;
    lastTime = time;
  };

  el.addEventListener('touchstart', (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    el.isDragging = true;
    offsetX = e.touches[0].clientX - parseFloat(el.style.left || 0);
    offsetY = e.touches[0].clientY - parseFloat(el.style.top || 0);
    lastTime = 0;
    holdTimeout = setTimeout(promptDelete, 500);
  });

  el.addEventListener('touchmove', (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    if (el.isDragging) {
      clearTimeout(holdTimeout);
      const x = e.touches[0].clientX - offsetX;
      const y = e.touches[0].clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      updateVelocity(x, y, e.timeStamp);
    }
  });

  el.addEventListener('touchend', () => {
    clearTimeout(holdTimeout);
    el.isDragging = false;
    //el.velocity.x *= el.dragFriction;
    //el.velocity.y *= el.dragFriction;
  });

  el.addEventListener('mousedown', (e) => {
    e.preventDefault();
    el.isDragging = true;
    offsetX = e.clientX - parseFloat(el.style.left || 0);
    offsetY = e.clientY - parseFloat(el.style.top || 0);
    lastTime = 0;
    holdTimeout = setTimeout(promptDelete, 500);
  });

  document.addEventListener('mousemove', (e) => {
    if (el.isDragging) {
      clearTimeout(holdTimeout);
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      updateVelocity(x, y, e.timeStamp);
    }
  });

  document.addEventListener('mouseup', () => {
    clearTimeout(holdTimeout);
    el.isDragging = false;
    //el.velocity.x *= el.dragFriction;
    //el.velocity.y *= el.dragFriction;
  });
}

function blowUp(ball) {
  const pieces = 10 + Math.floor(Math.random() * 10); // 10–20 fragments
  for (let i = 0; i < pieces; i++) {
    const frag = document.createElement('div');
    frag.className = 'fragment';
    frag.style.backgroundColor = ball.style.backgroundColor;
    frag.style.width = '6px';
    frag.style.height = '6px';
    frag.style.position = 'absolute';
    frag.style.left = ball.style.left;
    frag.style.top = ball.style.top;
    document.body.appendChild(frag);

    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 4;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // Animate with JS
    let life = 1.0;
    function animate() {
      if (life <= 0) {
        frag.remove();
        return;
      }
      const rect = frag.getBoundingClientRect();
      frag.style.left = `${rect.left + vx}px`;
      frag.style.top = `${rect.top + vy}px`;
      frag.style.opacity = life;
      life -= 0.02;
      requestAnimationFrame(animate);
    }
    animate();
  }
}

// each ball has: position, velocity, radius, mass

function applyGravityAttraction(balls) {
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (i === j) continue;
      const big = balls[i];
      const small = balls[j];
      if (big.mass > 1.5 * small.mass) {
        const dx = big.position.x - small.position.x;
        const dy = big.position.y - small.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < big.radius) {
          absorbBall(big, small, balls, j);
        } else {
          const forceMag = (big.mass * small.mass) / (dist * dist + 1);
          const forceX = (dx / dist) * forceMag * 0.1;
          const forceY = (dy / dist) * forceMag * 0.1;
          small.velocity.x += forceX / small.mass;
          small.velocity.y += forceY / small.mass;
        }
      }
    }
  }
}

function absorbBall(big, small, balls, smallIndex) {
  popSound.currentTime = 0
  popSound.play()

  big.mass += small.mass;
  big.radius = Math.sqrt(big.mass) * baseRadiusFactor;

  balls.splice(smallIndex, 1);
}

updateBalls();

// Search Button Toggle
const enableSearchTabBtn = document.getElementById('enableSearchTabBtn');
const searchTabBtn = document.getElementById('searchTabBtn');

enableSearchTabBtn.addEventListener('change', () => {
    searchTabBtn.style.display = enableSearchTabBtn.checked ? 'inline-block' : 'none';
});

// Search Tab
searchTabBtn.addEventListener('click', () => {
    let searchTab = document.querySelector('.search-tab');
    if (searchTab) {
        searchTab.style.display = 'flex';
        return;
    }

    searchTab = document.createElement('div');
    searchTab.className = 'search-tab';
    searchTab.innerHTML = `
        <div class="search-tab-header">
            <div class="search-tab-buttons">
                <button class="search-tab-button close"></button>
                <button class="search-tab-button minimize"></button>
                <button class="search-tab-button maximize"></button>
            </div>
        </div>
        <div class="search-tab-content">
            <iframe src="search.html" title="Google Search"></iframe>
        </div>
    `;
    document.body.appendChild(searchTab);

    makeWindowDraggable(searchTab);

    const closeBtn = searchTab.querySelector('.close');
    const minimizeBtn = searchTab.querySelector('.minimize');
    const maximizeBtn = searchTab.querySelector('.maximize');

    closeBtn.addEventListener('click', () => {
        searchTab.remove();
    });

    minimizeBtn.addEventListener('click', () => {
        searchTab.style.display = 'none';
    });

    maximizeBtn.addEventListener('click', () => {
        if (searchTab.style.width === '100%') {
            searchTab.style.width = '80%';
            searchTab.style.maxWidth = '800px';
            searchTab.style.height = '60%';
            searchTab.style.maxHeight = '600px';
            searchTab.style.top = '50%';
            searchTab.style.left = '50%';
            searchTab.style.transform = 'translate(-50%, -50%)';
        } else {
            searchTab.style.width = '100%';
            searchTab.style.maxWidth = 'none';
            searchTab.style.height = '100%';
            searchTab.style.maxHeight = 'none';
            searchTab.style.top = '0';
            searchTab.style.left = '0';
            searchTab.style.transform = 'none';
        }
    });

    // Handle Enter key in search form
    const searchFrame = searchTab.querySelector('iframe');
    searchFrame.addEventListener('load', () => {
        const frameDoc = searchFrame.contentDocument || searchFrame.contentWindow.document;
        const searchInput = frameDoc.querySelector('#mySearch');
        const searchForm = frameDoc.querySelector('form');

        if (searchInput && searchForm) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    e.preventDefault();
                    searchForm.submit();
                }
            });
        }
    });
});

// Draggable Window (corrected)
function makeWindowDraggable(el) {
    let offsetX = 0, offsetY = 0;
    const header = el.querySelector('.search-tab-header');

    header.addEventListener('mousedown', (e) => {
        e.preventDefault();
        offsetX = e.clientX - parseFloat(el.style.left || window.innerWidth / 2);
        offsetY = e.clientY - parseFloat(el.style.top || window.innerHeight / 2);
        el.isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (el.isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', () => {
        el.isDragging = false;
    });

    header.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        offsetX = e.touches[0].clientX - parseFloat(el.style.left || window.innerWidth / 2);
        offsetY = e.touches[0].clientY - parseFloat(el.style.top || window.innerHeight / 2);
        el.isDragging = true;
    });

    header.addEventListener('touchmove', (e) => {
        if (e.cancelable) e.preventDefault();
        if (el.isDragging) {
            const x = e.touches[0].clientX - offsetX;
            const y = e.touches[0].clientY - offsetY;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.transform = 'none';
        }
    });

    header.addEventListener('touchend', () => {
        el.isDragging = false;
    });
}
