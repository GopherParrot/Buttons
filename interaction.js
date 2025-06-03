Swal.fire("The Google search engine was created by Aakaanksha—credit goes to her for this incredible tool! Thanks a lot!").then((result) => {
	Swal.fire("If you hold the button, the alert won't trigger... or just go to settings and disable it ^_^\n\n...Btw you don't need to understand the japanese text, it's not important :)");
});

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

// Ensure these elements exist in your HTML
const enableSearchTabBtn = document.getElementById('enableSearchTabBtn');
const searchTabBtn = document.getElementById('searchTabBtn');

if (enableSearchTabBtn && searchTabBtn) {
    enableSearchTabBtn.addEventListener('change', () => {
        searchTabBtn.style.display = enableSearchTabBtn.checked ? 'inline-block' : 'none';
    });

    searchTabBtn.addEventListener('click', () => {
        let searchTab = document.querySelector('.search-tab');
        if (searchTab) {
            searchTab.style.display = 'flex'; // Ensure it's flex when shown
            return;
        }

        searchTab = document.createElement('div');
        searchTab.className = 'search-tab';
        // Initial style should ideally be in CSS, but mirroring original logic
        searchTab.style.top = '50%';
        searchTab.style.left = '50%';
        searchTab.style.transform = 'translate(-50%, -50%)';
        searchTab.style.width = '80%';
        searchTab.style.maxWidth = '800px';
        searchTab.style.height = '60%';
        searchTab.style.maxHeight = '600px';
        // Add other necessary styles if not fully covered by CSS class .search-tab
        // e.g., searchTab.style.position = 'fixed';
        // searchTab.style.backgroundColor = '#fff';
        // searchTab.style.border = '1px solid #ccc';
        // searchTab.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        // searchTab.style.zIndex = '1000';
        // searchTab.style.display = 'flex';
        // searchTab.style.flexDirection = 'column';
        // searchTab.style.borderRadius = '8px';
        // searchTab.style.overflow = 'hidden';


        searchTab.innerHTML = `
            <div class="search-tab-header" style="cursor: move; background-color: #f1f1f1; padding: 10px; border-bottom: 1px solid #ccc; display: flex; justify-content: flex-start; align-items: center;">
                <div class="search-tab-buttons" style="display: flex;">
                    <button class="search-tab-button close" style="background-color: #ff5f57; border-radius: 50%; width: 12px; height: 12px; border: none; margin-right: 8px; padding: 0;"></button>
                    <button class="search-tab-button minimize" style="background-color: #ffbd2e; border-radius: 50%; width: 12px; height: 12px; border: none; margin-right: 8px; padding: 0;"></button>
                    <button class="search-tab-button maximize" style="background-color: #28c940; border-radius: 50%; width: 12px; height: 12px; border: none; padding: 0;"></button>
                </div>
                <span style="margin-left: auto; font-weight: bold; user-select: none;">Search</span>
            </div>
            <div class="search-tab-content" style="flex-grow: 1; overflow: hidden;">
                <iframe src="search.html" title="Google Search" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        `;
        document.body.appendChild(searchTab);

        makeWindowDraggableAndResizable(searchTab);

        const closeBtn = searchTab.querySelector('.search-tab-button.close');
        const minimizeBtn = searchTab.querySelector('.search-tab-button.minimize');
        const maximizeBtn = searchTab.querySelector('.search-tab-button.maximize');
        const headerElement = searchTab.querySelector('.search-tab-header');

        // Ensure buttons are easily tappable on mobile:
        // Adding some padding via JS if CSS isn't sufficient.
        // Best practice is to handle this in CSS with appropriate padding/min-width/min-height.
        [closeBtn, minimizeBtn, maximizeBtn].forEach(btn => {
            if (btn) {
                // btn.style.padding = '8px'; // Example: increase tappable area if needed
            }
        });


        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                searchTab.remove();
            });
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                searchTab.style.display = 'none';
            });
        }
        
        let isMaximized = false;
        let previousDimensions = {};

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                if (!isMaximized) {
                    // Store current dimensions and position before maximizing
                    previousDimensions = {
                        width: searchTab.style.width,
                        height: searchTab.style.height,
                        left: searchTab.style.left,
                        top: searchTab.style.top,
                        transform: searchTab.style.transform,
                        maxWidth: searchTab.style.maxWidth,
                        maxHeight: searchTab.style.maxHeight,
                    };

                    searchTab.style.width = '100%';
                    searchTab.style.maxWidth = 'none';
                    searchTab.style.height = '100%';
                    searchTab.style.maxHeight = 'none';
                    searchTab.style.top = '0px';
                    searchTab.style.left = '0px';
                    searchTab.style.transform = 'none';
                    isMaximized = true;
                    if(headerElement) headerElement.style.borderRadius = '0'; // Optional: remove border radius when maximized
                    searchTab.style.borderRadius = '0';


                } else {
                    // Restore to previous or default dimensions
                    searchTab.style.width = previousDimensions.width || '80%';
                    searchTab.style.maxWidth = previousDimensions.maxWidth || '800px';
                    searchTab.style.height = previousDimensions.height || '60%';
                    searchTab.style.maxHeight = previousDimensions.maxHeight || '600px';
                    searchTab.style.top = previousDimensions.top || '50%';
                    searchTab.style.left = previousDimensions.left || '50%';
                    searchTab.style.transform = previousDimensions.transform || 'translate(-50%, -50%)';
                    isMaximized = false;
                     if(headerElement) headerElement.style.borderTopLeftRadius = '8px'; // Restore
                     if(headerElement) headerElement.style.borderTopRightRadius = '8px';
                     searchTab.style.borderRadius = '8px';
                }
            });
        }

        // Handle Enter key in search form
        const searchFrame = searchTab.querySelector('iframe');
        if (searchFrame) {
            searchFrame.addEventListener('load', () => {
                try {
                    const frameDoc = searchFrame.contentDocument || searchFrame.contentWindow.document;
                    const searchInput = frameDoc.querySelector('#mySearch'); // Ensure this ID matches your search.html
                    const searchForm = frameDoc.querySelector('form'); // Ensure this matches your search.html

                    if (searchInput && searchForm) {
                        searchInput.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' && searchInput.value.trim()) {
                                e.preventDefault();
                                searchForm.submit();
                            }
                        });
                    }
                } catch (error) {
                    console.warn("Could not access iframe content for search form:", error);
                }
            });
        }
    });
} else {
    console.warn("EnableSearchTabBtn or SearchTabBtn not found. UI control will not work.");
}


// Draggable and Resizable Window
function makeWindowDraggableAndResizable(el) {
    const header = el.querySelector('.search-tab-header');
    if (!header) {
        console.error("Draggable element needs a .search-tab-header child.");
        return;
    }

    let offsetX = 0, offsetY = 0;
    let initialMouseX, initialMouseY, initialWidth, initialHeight, initialLeft, initialTop;
    let isDragging = false;
    let resizeDirection = null;
    const resizeHandleSize = 10; // Pixels for resize detection area
    const minWidth = 200; // Minimum width for the window
    const minHeight = 150; // Minimum height for the window

    // Function to determine which edge/corner is being targeted for resize
    function getResizeDirection(clientX, clientY, rect) {
        let dir = '';
        // Check N, S, W, E proximity
        if (clientY - rect.top < resizeHandleSize && clientY - rect.top > -resizeHandleSize) dir += 'N'; // Allow grabbing from slightly outside too
        else if (rect.bottom - clientY < resizeHandleSize && rect.bottom - clientY > -resizeHandleSize) dir += 'S';
        
        if (clientX - rect.left < resizeHandleSize && clientX - rect.left > -resizeHandleSize) dir += 'W';
        else if (rect.right - clientX < resizeHandleSize && rect.right - clientX > -resizeHandleSize) dir += 'E';

        // Prioritize corners
        if (dir.includes('N') && dir.includes('W')) return 'NW';
        if (dir.includes('N') && dir.includes('E')) return 'NE';
        if (dir.includes('S') && dir.includes('W')) return 'SW';
        if (dir.includes('S') && dir.includes('E')) return 'SE';
        
        // Return single direction if not a corner
        if (dir.includes('N')) return 'N';
        if (dir.includes('S')) return 'S';
        if (dir.includes('W')) return 'W';
        if (dir.includes('E')) return 'E';
        
        return null; // No resize area
    }

    // Function to update cursor style based on potential action
    function updateCursor(clientX, clientY) {
        if (isDragging || resizeDirection) return; // Don't change cursor if an action is in progress

        const rect = el.getBoundingClientRect();
        const currentResizeDir = getResizeDirection(clientX, clientY, rect);
        
        if (el.style.width === '100%' || el.style.height === '100%') { // If maximized
            el.style.cursor = 'default';
            header.style.cursor = 'move'; // Keep header draggable
            return;
        }

        if (currentResizeDir) {
            if (currentResizeDir === 'N' || currentResizeDir === 'S') el.style.cursor = 'ns-resize';
            else if (currentResizeDir === 'E' || currentResizeDir === 'W') el.style.cursor = 'ew-resize';
            else if (currentResizeDir === 'NW' || currentResizeDir === 'SE') el.style.cursor = 'nwse-resize';
            else if (currentResizeDir === 'NE' || currentResizeDir === 'SW') el.style.cursor = 'nesw-resize';
            header.style.cursor = 'move'; // Ensure header is still 'move'
        } else {
            el.style.cursor = 'default';
            header.style.cursor = 'move';
        }
    }
    
    // Attach mousemove to the element itself for cursor updates when not actively dragging/resizing
    el.addEventListener('mousemove', (e) => {
        updateCursor(e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', () => { // Reset cursor when mouse leaves the element
        if (!isDragging && !resizeDirection) {
            el.style.cursor = 'default';
            header.style.cursor = 'move';
        }
    });


    function onStart(e) {
        // Determine if it's a touch event
        const isTouchEvent = e.type.startsWith('touch');
        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        const rect = el.getBoundingClientRect();
        
        // Check for resize only if not maximized
        if (el.style.width !== '100%' && el.style.height !== '100%') {
            resizeDirection = getResizeDirection(clientX, clientY, rect);
        } else {
            resizeDirection = null; // No resizing if maximized
        }

        if (resizeDirection) {
            if (e.cancelable && isTouchEvent) e.preventDefault(); // Prevent page scroll on touch for resize
            isDragging = false; // Ensure not also dragging

            initialMouseX = clientX;
            initialMouseY = clientY;
            initialWidth = rect.width;
            initialHeight = rect.height;
            initialLeft = rect.left;
            initialTop = rect.top;

            // Convert to pixel positioning if not already
            el.style.width = `${initialWidth}px`;
            el.style.height = `${initialHeight}px`;
            el.style.left = `${initialLeft}px`;
            el.style.top = `${initialTop}px`;
            el.style.transform = 'none';
            el.style.maxWidth = 'none'; // Allow free resize
            el.style.maxHeight = 'none';

        } else if (header.contains(e.target) || e.target === header) {
            if (e.cancelable && isTouchEvent) e.preventDefault(); // Prevent page scroll on touch for drag
            isDragging = true;
            resizeDirection = null; // Ensure not also resizing

            // Calculate offset from the element's current screen position
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;

            // Set position explicitly in pixels and remove transform for smooth dragging
            el.style.left = `${rect.left}px`;
            el.style.top = `${rect.top}px`;
            el.style.transform = 'none';
        } else {
            return; // Click was not on header or resize handle
        }

        // Add global listeners for move and end events
        if (isTouchEvent) {
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onEnd);
        } else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        }
    }

    function onMove(e) {
        const isTouchEvent = e.type.startsWith('touch');
        if (e.cancelable && isTouchEvent) e.preventDefault();

        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        if (resizeDirection) {
            let newWidth = initialWidth;
            let newHeight = initialHeight;
            let newLeft = initialLeft;
            let newTop = initialTop;

            const deltaX = clientX - initialMouseX;
            const deltaY = clientY - initialMouseY;

            if (resizeDirection.includes('E')) newWidth = initialWidth + deltaX;
            if (resizeDirection.includes('W')) {
                newWidth = initialWidth - deltaX;
                newLeft = initialLeft + deltaX;
            }
            if (resizeDirection.includes('S')) newHeight = initialHeight + deltaY;
            if (resizeDirection.includes('N')) {
                newHeight = initialHeight - deltaY;
                newTop = initialTop + deltaY;
            }
            
            // Apply minimum dimensions
            if (newWidth < minWidth) {
                if (resizeDirection.includes('W')) newLeft = newLeft - (minWidth - newWidth);
                newWidth = minWidth;
            }
            if (newHeight < minHeight) {
                if (resizeDirection.includes('N')) newTop = newTop - (minHeight - newHeight);
                newHeight = minHeight;
            }

            el.style.width = `${newWidth}px`;
            el.style.height = `${newHeight}px`;
            el.style.left = `${newLeft}px`;
            el.style.top = `${newTop}px`;

        } else if (isDragging) {
            el.style.left = `${clientX - offsetX}px`;
            el.style.top = `${clientY - offsetY}px`;
        }
    }

    function onEnd(e) {
        const isTouchEvent = e.type.startsWith('touch');

        isDragging = false;
        resizeDirection = null;
        // Reset cursor to default or move for header
        el.style.cursor = 'default';
        header.style.cursor = 'move';


        if (isTouchEvent) {
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
        } else {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
        }
    }

    // Attach mousedown/touchstart to the header for dragging
    header.addEventListener('mousedown', onStart);
    header.addEventListener('touchstart', onStart, { passive: false }); // passive:false to allow preventDefault

    // Attach mousedown/touchstart to the element itself for resizing
    // This allows detection of clicks near edges but outside the header
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, { passive: false });
}


