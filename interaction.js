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
    const rect = ball.getBoundingClientRect();
    
    // Only apply physics if not being dragged and gravity is enabled
    if (!ball.isDragging) {
      if (gravityEnabled) {
        ball.velocity.y += ball.gravity;
      }

      // Update position based on velocity
      let newTop = rect.top + ball.velocity.y;
      let newLeft = rect.left + ball.velocity.x;
      
      // Boundary collisions (walls, floor, ceiling)
      // ... (keep your existing boundary collision code)
    }

    // Check collisions with other balls - IMPORTANT: do this even for dragged balls!
    for (let j = i + 1; j < balls.length; j++) {
      const other = balls[j];
      if (other.style.display === 'none') continue;

      const r1 = ball.getBoundingClientRect();
      const r2 = other.getBoundingClientRect();

      const dx = r1.left + r1.width / 2 - (r2.left + r2.width / 2);
      const dy = r1.top + r1.height / 2 - (r2.top + r2.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (r1.width / 2 + r2.width / 2);

      if (distance < minDistance) {
        // Calculate overlap
        const overlap = minDistance - distance;
        const angle = Math.atan2(dy, dx);
        
        // Separate the balls based on their masses (size)
        const totalSize = ball.size + other.size;
        const ballPushRatio = other.size / totalSize;
        const otherPushRatio = ball.size / totalSize;
        
        if (!ball.isDragging) {
          ball.style.left = (r1.left + Math.cos(angle) * overlap * ballPushRatio) + 'px';
          ball.style.top = (r1.top + Math.sin(angle) * overlap * ballPushRatio) + 'px';
        }
        
        if (!other.isDragging) {
          other.style.left = (r2.left - Math.cos(angle) * overlap * otherPushRatio) + 'px';
          other.style.top = (r2.top - Math.sin(angle) * overlap * otherPushRatio) + 'px';
        }

        // Only calculate velocity changes if neither ball is being dragged
        if (!ball.isDragging && !other.isDragging) {
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

          // Cap velocities
          ball.velocity.x = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.x));
          ball.velocity.y = Math.max(-ball.maxVelocity, Math.min(ball.maxVelocity, ball.velocity.y));
          other.velocity.x = Math.max(-other.maxVelocity, Math.min(other.maxVelocity, other.velocity.x));
          other.velocity.y = Math.max(-other.maxVelocity, Math.min(other.maxVelocity, other.velocity.y));
        }
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

// Search tab
const enableSearchTabBtn = document.getElementById('enableSearchTabBtn');
const searchTabBtn = document.getElementById('searchTabBtn');

if (enableSearchTabBtn && searchTabBtn) {
    enableSearchTabBtn.addEventListener('change', () => {
        searchTabBtn.style.display = enableSearchTabBtn.checked ? 'inline-block' : 'none';
    });

    searchTabBtn.addEventListener('click', () => { // This click is for the main button to show the tab
        let searchTab = document.querySelector('.search-tab');
        if (searchTab) {
            searchTab.style.display = 'flex';
            return;
        }

        searchTab = document.createElement('div');
        searchTab.className = 'search-tab';
        searchTab.style.top = '50%';
        searchTab.style.left = '50%';
        searchTab.style.transform = 'translate(-50%, -50%)';
        searchTab.style.width = '80%';
        searchTab.style.maxWidth = '800px';
        searchTab.style.height = '60%';
        searchTab.style.maxHeight = '600px';
        // For a complete example, ensure necessary base styles are applied here or in CSS
        // searchTab.style.position = 'fixed';
        // searchTab.style.backgroundColor = '#fff';
        // searchTab.style.border = '1px solid #ccc';
        // searchTab.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        // searchTab.style.zIndex = '1000';
        // searchTab.style.display = 'flex';
        // searchTab.style.flexDirection = 'column';
        // searchTab.style.borderRadius = '8px';
        // searchTab.style.overflow = 'hidden';


        searchTab.innerHTML = `
            <div class="search-tab-header" style="cursor: move; background-color: #f1f1f1; padding: 10px; border-bottom: 1px solid #ccc; display: flex; justify-content: flex-start; align-items: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="search-tab-buttons" style="display: flex;">
                    <button class="search-tab-button close" style="background-color: #ff5f57; border-radius: 50%; width: 12px; height: 12px; border: none; margin-right: 8px; padding: 0; display:block;"></button>
                    <button class="search-tab-button minimize" style="background-color: #ffbd2e; border-radius: 50%; width: 12px; height: 12px; border: none; margin-right: 8px; padding: 0; display:block;"></button>
                    <button class="search-tab-button maximize" style="background-color: #28c940; border-radius: 50%; width: 12px; height: 12px; border: none; padding: 0; display:block;"></button>
                </div>
                <span style="margin-left: auto; font-weight: bold; user-select: none;">Search</span>
            </div>
            <div class="search-tab-content" style="flex-grow: 1; overflow: hidden;">
                <iframe src="search.html" title="Google Search" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        `;
        document.body.appendChild(searchTab);

        const closeBtn = searchTab.querySelector('.search-tab-button.close');
        const minimizeBtn = searchTab.querySelector('.search-tab-button.minimize');
        const maximizeBtn = searchTab.querySelector('.search-tab-button.maximize');
        const headerElement = searchTab.querySelector('.search-tab-header');


        // --- Button Event Listeners ---
        // Using 'click' should generally work, but for mobile, ensuring no interference is key.
        // The fix in makeWindowDraggableAndResizable should help.
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling up further
                searchTab.remove();
            });
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                searchTab.style.display = 'none';
            });
        }
        
        let isMaximized = false;
        let previousDimensions = {};

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!isMaximized) {
                    previousDimensions = {
                        width: searchTab.style.width,
                        height: searchTab.style.height,
                        left: searchTab.style.left,
                        top: searchTab.style.top,
                        transform: searchTab.style.transform,
                        maxWidth: searchTab.style.maxWidth,
                        maxHeight: searchTab.style.maxHeight,
                    };
                    searchTab.style.width = '100vw'; // Use vw/vh for true fullscreen
                    searchTab.style.maxWidth = '100vw';
                    searchTab.style.height = '100vh';
                    searchTab.style.maxHeight = '100vh';
                    searchTab.style.top = '0px';
                    searchTab.style.left = '0px';
                    searchTab.style.transform = 'none';
                    searchTab.style.borderRadius = '0px';
                    if(headerElement) {
                        headerElement.style.borderTopLeftRadius = '0px';
                        headerElement.style.borderTopRightRadius = '0px';
                    }
                    isMaximized = true;
                } else {
                    searchTab.style.width = previousDimensions.width || '80%';
                    searchTab.style.maxWidth = previousDimensions.maxWidth || '800px';
                    searchTab.style.height = previousDimensions.height || '60%';
                    searchTab.style.maxHeight = previousDimensions.maxHeight || '600px';
                    searchTab.style.top = previousDimensions.top || '50%';
                    searchTab.style.left = previousDimensions.left || '50%';
                    searchTab.style.transform = previousDimensions.transform || 'translate(-50%, -50%)';
                    searchTab.style.borderRadius = '8px';
                     if(headerElement) {
                        headerElement.style.borderTopLeftRadius = '8px';
                        headerElement.style.borderTopRightRadius = '8px';
                    }
                    isMaximized = false;
                }
            });
        }
        
        // Call this after buttons are defined so it can potentially reference them if needed
        makeWindowDraggableAndResizable(searchTab);


        const searchFrame = searchTab.querySelector('iframe');
        if (searchFrame) {
            searchFrame.addEventListener('load', () => {
                try {
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
                } catch (error) {
                    console.warn("Could not access iframe content for search form:", error);
                }
            });
        }
    });
} else {
    console.warn("EnableSearchTabBtn or SearchTabBtn not found. UI control will not work.");
}


function makeWindowDraggableAndResizable(el) {
    const header = el.querySelector('.search-tab-header');
    if (!header) {
        console.error("Draggable element needs a .search-tab-header child.");
        return;
    }

    let offsetX = 0, offsetY = 0;
    let initialMouseX, initialMouseY, initialWidth, initialHeight, initialLeft, initialTop;
    let isDragging = false;
    let isResizing = false; // Changed from resizeDirection to boolean
    let currentResizeEdge = null; // Stores N, S, E, W, NW, NE, SW, SE

    const resizeHandleSize = 15; // Increased for better touch accuracy
    const minWidth = 200;
    const minHeight = 150;

    function getResizeEdge(clientX, clientY, rect) {
        let edge = '';
        const onTopEdge = clientY - rect.top < resizeHandleSize && clientY - rect.top > -resizeHandleSize / 2; // Allow grabbing from slightly outside
        const onBottomEdge = rect.bottom - clientY < resizeHandleSize && rect.bottom - clientY > -resizeHandleSize / 2;
        const onLeftEdge = clientX - rect.left < resizeHandleSize && clientX - rect.left > -resizeHandleSize / 2;
        const onRightEdge = rect.right - clientX < resizeHandleSize && rect.right - clientX > -resizeHandleSize / 2;

        if (onTopEdge) edge += 'N';
        else if (onBottomEdge) edge += 'S';

        if (onLeftEdge) edge += 'W';
        else if (onRightEdge) edge += 'E';
        
        return edge || null;
    }
    
    function updateCursor(clientX, clientY) {
        if (isDragging || isResizing) return;

        const rect = el.getBoundingClientRect();
        // Do not allow resizing if maximized
        if (el.style.width === '100vw' || el.style.height === '100vh' || el.style.width === '100%' || el.style.height === '100%') {
            el.style.cursor = 'default';
            header.style.cursor = 'move';
            return;
        }
        
        currentResizeEdge = getResizeEdge(clientX, clientY, rect);

        if (currentResizeEdge) {
            if ((currentResizeEdge === 'N') || (currentResizeEdge === 'S')) el.style.cursor = 'ns-resize';
            else if ((currentResizeEdge === 'E') || (currentResizeEdge === 'W')) el.style.cursor = 'ew-resize';
            else if ((currentResizeEdge === 'NW') || (currentResizeEdge === 'SE')) el.style.cursor = 'nwse-resize';
            else if ((currentResizeEdge === 'NE') || (currentResizeEdge === 'SW')) el.style.cursor = 'nesw-resize';
            else el.style.cursor = 'default'; // Should not happen if currentResizeEdge is true
            header.style.cursor = 'move';
        } else {
            el.style.cursor = 'default';
            header.style.cursor = 'move';
        }
    }
    
    el.addEventListener('mousemove', (e) => { // For desktop cursor updates
        if (e.buttons === 0) { // Only update if no mouse button is pressed
             updateCursor(e.clientX, e.clientY);
        }
    });
    el.addEventListener('mouseleave', () => {
        if (!isDragging && !isResizing) {
            el.style.cursor = 'default';
        }
    });

    function onStart(e) {
        const isTouchEvent = e.type.startsWith('touch');
        const targetElement = e.target;

        // *** CRITICAL FIX FOR BUTTONS ON MOBILE ***
        // If the event target is one of the control buttons, do nothing here.
        // Let the button's own 'click' (or touchend) listener handle it.
        if (targetElement.classList.contains('search-tab-button')) {
            // console.log("Button clicked, ignoring drag/resize start.");
            return; 
        }
        
        // If the touch/click is on a scrollbar of the iframe, ignore.
        // This is a basic check; more robust scrollbar detection can be complex.
        if (targetElement.tagName === 'IFRAME' && (e.offsetX > targetElement.clientWidth || e.offsetY > targetElement.clientHeight)) {
            // console.log("Likely scrollbar interaction, ignoring.")
            return;
        }


        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
        const rect = el.getBoundingClientRect();

        // Check for resize only if not maximized
        if (el.style.width !== '100vw' && el.style.height !== '100vh' && el.style.width !== '100%' && el.style.height !== '100%') {
             currentResizeEdge = getResizeEdge(clientX, clientY, rect);
        } else {
            currentResizeEdge = null;
        }

        if (currentResizeEdge) {
            isResizing = true;
            isDragging = false;
            if (isTouchEvent && e.cancelable) e.preventDefault();

            initialMouseX = clientX;
            initialMouseY = clientY;
            initialWidth = rect.width;
            initialHeight = rect.height;
            initialLeft = rect.left;
            initialTop = rect.top;

            el.style.width = `${initialWidth}px`;
            el.style.height = `${initialHeight}px`;
            el.style.left = `${initialLeft}px`;
            el.style.top = `${initialTop}px`;
            el.style.transform = 'none';
            el.style.maxWidth = 'none';
            el.style.maxHeight = 'none';

        } else if (header.contains(targetElement) || targetElement === header) {
            isDragging = true;
            isResizing = false;
            if (isTouchEvent && e.cancelable) e.preventDefault();
            
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;

            el.style.left = `${rect.left}px`;
            el.style.top = `${rect.top}px`;
            el.style.transform = 'none'; // Important for smooth dragging
        } else {
            return; // Not on header or resize handle
        }

        if (isTouchEvent) {
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onEnd);
            document.addEventListener('touchcancel', onEnd); // Handle interruptions
        } else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        }
    }

    function onMove(e) {
        const isTouchEvent = e.type.startsWith('touch');
        if (isTouchEvent && e.cancelable) e.preventDefault();

        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        if (isResizing && currentResizeEdge) {
            let newWidth = initialWidth;
            let newHeight = initialHeight;
            let newLeft = initialLeft;
            let newTop = initialTop;

            const deltaX = clientX - initialMouseX;
            const deltaY = clientY - initialMouseY;

            if (currentResizeEdge.includes('E')) newWidth = initialWidth + deltaX;
            if (currentResizeEdge.includes('W')) {
                newWidth = initialWidth - deltaX;
                newLeft = initialLeft + deltaX;
            }
            if (currentResizeEdge.includes('S')) newHeight = initialHeight + deltaY;
            if (currentResizeEdge.includes('N')) {
                newHeight = initialHeight - deltaY;
                newTop = initialTop + deltaY;
            }
            
            if (newWidth < minWidth) {
                if (currentResizeEdge.includes('W')) newLeft = newLeft - (minWidth - newWidth);
                newWidth = minWidth;
            }
            if (newHeight < minHeight) {
                if (currentResizeEdge.includes('N')) newTop = newTop - (minHeight - newHeight);
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
        isResizing = false;
        currentResizeEdge = null;
        
        // Update cursor based on final position if it's a mouse event
        if (!isTouchEvent && e) { // e might be undefined for touchcancel
            updateCursor(e.clientX, e.clientY);
        } else { // For touch, or if e is undefined, reset to default
            el.style.cursor = 'default';
            header.style.cursor = 'move';
        }


        if (isTouchEvent) {
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
            document.removeEventListener('touchcancel', onEnd);
        } else {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
        }
    }

    // Listen on the element itself for resize starts, and header for drag starts.
    // This order helps prioritize: if it's a button, it's handled. If not, then check resize, then drag.
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, { passive: false });
    // Header listeners are technically redundant if el listener is smart enough, but can be kept for clarity
    // header.addEventListener('mousedown', onStart); 
    // header.addEventListener('touchstart', onStart, { passive: false });
}
