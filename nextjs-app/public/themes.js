// ========================================
// Theme System
// ========================================

const THEMES = [
    {
        id: 'space',
        name: 'Deep Space',
        icon: '🌌',
        preview: 'linear-gradient(135deg, #000005 0%, #050510 50%, #1a0a2e 100%)'
    },
    {
        id: 'sakura',
        name: 'Japanese Sakura',
        icon: '🌸',
        preview: 'linear-gradient(135deg, #1a0a10 0%, #2d1a24 50%, #3d2a34 100%)'
    },
    {
        id: 'terminal',
        name: 'Retro Terminal',
        icon: '💾',
        preview: 'linear-gradient(135deg, #0a0a0a 0%, #0d1a0d 50%, #0a0a0a 100%)'
    },
    {
        id: 'aurora',
        name: 'Aurora Borealis',
        icon: '✨',
        preview: 'linear-gradient(135deg, #0a0a20 0%, #1a3a2a 50%, #2a1a4a 100%)'
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        icon: '🌃',
        preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d0a4e 100%)'
    },
    {
        id: 'forest',
        name: 'Enchanted Forest',
        icon: '🌲',
        preview: 'linear-gradient(135deg, #0a1f0a 0%, #0f2a0f 50%, #1a3a1a 100%)'
    },
    {
        id: 'ocean',
        name: 'Deep Ocean',
        icon: '🌊',
        preview: 'linear-gradient(135deg, #001020 0%, #002040 50%, #003060 100%)'
    },
    {
        id: 'midnight-garden',
        name: 'Midnight Garden',
        icon: '🌺',
        preview: 'linear-gradient(135deg, #0a0a1a 0%, #1a102a 50%, #2a1a3a 100%)'
    },
    {
        id: 'arctic',
        name: 'Arctic Ice',
        icon: '❄️',
        preview: 'linear-gradient(135deg, #e8f4f8 0%, #c8dce8 50%, #a8c8d8 100%)'
    },
    {
        id: 'sepia',
        name: 'Vintage Sepia',
        icon: '📜',
        preview: 'linear-gradient(135deg, #f5e6d3 0%, #d4c4a8 50%, #b8a888 100%)'
    }
];

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('claude-viz-theme') || 'space';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);

        // Create theme switcher UI
        this.createSwitcher();

        // Bind events
        this.bindEvents();
    }

    createSwitcher() {
        // Find the control bar
        const controlBar = document.querySelector('.control-bar');
        if (!controlBar) return;

        // Create theme switcher container
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';

        const currentTheme = THEMES.find(t => t.id === this.currentTheme) || THEMES[0];

        switcher.innerHTML = `
            <button class="theme-btn" id="theme-toggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <span class="theme-current-name">${currentTheme.name}</span>
            </button>
            <div class="theme-dropdown" id="theme-dropdown">
                ${THEMES.map(theme => `
                    <button class="theme-option ${theme.id === this.currentTheme ? 'active' : ''}" data-theme="${theme.id}">
                        <div class="theme-preview" style="background: ${theme.preview}">${theme.icon}</div>
                        <span class="theme-name">${theme.name}</span>
                        <svg class="theme-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </button>
                `).join('')}
            </div>
        `;

        // Insert before the search container
        const searchContainer = controlBar.querySelector('.search-container');
        if (searchContainer) {
            controlBar.insertBefore(switcher, searchContainer);
        } else {
            controlBar.appendChild(switcher);
        }
    }

    bindEvents() {
        // Toggle dropdown
        const toggleBtn = document.getElementById('theme-toggle');
        const dropdown = document.getElementById('theme-dropdown');
        const switcher = document.querySelector('.theme-switcher');

        if (toggleBtn && switcher) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                switcher.classList.toggle('open');
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!switcher.contains(e.target)) {
                    switcher.classList.remove('open');
                }
            });

            // Theme selection
            document.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => {
                    const themeId = option.dataset.theme;
                    this.setTheme(themeId);
                    switcher.classList.remove('open');
                });
            });
        }
    }

    setTheme(themeId) {
        this.currentTheme = themeId;
        localStorage.setItem('claude-viz-theme', themeId);
        this.applyTheme(themeId);
        this.updateSwitcherUI(themeId);
    }

    applyTheme(themeId) {
        document.documentElement.setAttribute('data-theme', themeId);

        // Start/stop sakura petals for sakura theme
        if (themeId === 'sakura') {
            this.startSakuraPetals();
        } else {
            this.stopSakuraPetals();
        }

        // Start/stop fireflies for forest theme
        if (themeId === 'forest') {
            this.startFireflies();
        } else {
            this.stopFireflies();
        }

        // Start/stop aurora effect for aurora theme
        if (themeId === 'aurora') {
            this.startAurora();
        } else {
            this.stopAurora();
        }

        // Start/stop scanlines for terminal theme
        if (themeId === 'terminal') {
            this.startScanlines();
        } else {
            this.stopScanlines();
        }

        // Start/stop cosmic dust for space theme
        if (themeId === 'space') {
            this.startCosmicDust();
        } else {
            this.stopCosmicDust();
        }

        // Start/stop midnight garden fireflies and flowers
        if (themeId === 'midnight-garden') {
            this.startMidnightGarden();
        } else {
            this.stopMidnightGarden();
        }

        // Start/stop arctic snowfall
        if (themeId === 'arctic') {
            this.startSnowfall();
        } else {
            this.stopSnowfall();
        }

        // Start/stop sepia film grain
        if (themeId === 'sepia') {
            this.startFilmGrain();
        } else {
            this.stopFilmGrain();
        }

        // Start/stop cyberpunk city
        if (themeId === 'cyberpunk') {
            this.startCyberpunkCity();
        } else {
            this.stopCyberpunkCity();
        }

        // Start/stop ocean topography
        if (themeId === 'ocean') {
            this.startOceanTopo();
        } else {
            this.stopOceanTopo();
        }
    }

    // Cosmic dust particles floating slowly through space
    startCosmicDust() {
        if (this.cosmicCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'cosmic-dust-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        container.appendChild(canvas);
        this.cosmicCanvas = canvas;
        this.cosmicCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.cosmicResizeHandler = resize;

        // Create LOTS of dust particles for grainy effect
        this.cosmicParticles = [];

        // Layer 0: Ultra fine grain - tons of tiny specks (static noise)
        for (let i = 0; i < 400; i++) {
            this.cosmicParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 0.2 + Math.random() * 0.3,
                speedX: (Math.random() - 0.5) * 0.02,
                speedY: (Math.random() - 0.5) * 0.015,
                opacity: 0.08 + Math.random() * 0.12,
                color: `rgba(${180 + Math.random() * 75}, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, 1)`,
                layer: 0
            });
        }

        // Layer 1: Fine dust - many small particles
        for (let i = 0; i < 150; i++) {
            this.cosmicParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 0.3 + Math.random() * 0.5,
                speedX: (Math.random() - 0.5) * 0.04,
                speedY: (Math.random() - 0.5) * 0.025,
                opacity: 0.15 + Math.random() * 0.2,
                color: `rgba(${150 + Math.random() * 50}, ${150 + Math.random() * 50}, ${200 + Math.random() * 55}, 1)`,
                layer: 1
            });
        }

        // Layer 2: Mid-distance particles
        for (let i = 0; i < 80; i++) {
            this.cosmicParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 0.5 + Math.random() * 0.7,
                speedX: (Math.random() - 0.5) * 0.08,
                speedY: (Math.random() - 0.5) * 0.05,
                opacity: 0.2 + Math.random() * 0.25,
                color: `rgba(${180 + Math.random() * 40}, ${160 + Math.random() * 60}, ${220 + Math.random() * 35}, 1)`,
                layer: 2
            });
        }

        // Layer 3: Closer, brighter particles
        for (let i = 0; i < 40; i++) {
            this.cosmicParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 0.8 + Math.random() * 1.0,
                speedX: (Math.random() - 0.5) * 0.12,
                speedY: (Math.random() - 0.5) * 0.08,
                opacity: 0.3 + Math.random() * 0.3,
                color: `rgba(${200 + Math.random() * 55}, ${190 + Math.random() * 50}, ${230 + Math.random() * 25}, 1)`,
                layer: 3
            });
        }

        // Shooting stars
        this.shootingStars = [];

        // Create planets data
        this.planets = [
            // Top-right planet - Gas giant with rings (like Saturn)
            {
                x: 0.88,  // percentage of width
                y: 0.12,  // percentage of height
                radius: 45,
                type: 'gas-giant',
                baseColor: { r: 200, g: 160, b: 120 },
                bands: [
                    { pos: 0.1, color: { r: 180, g: 140, b: 100 } },
                    { pos: 0.25, color: { r: 210, g: 175, b: 130 } },
                    { pos: 0.4, color: { r: 190, g: 150, b: 110 } },
                    { pos: 0.55, color: { r: 220, g: 185, b: 145 } },
                    { pos: 0.7, color: { r: 185, g: 145, b: 105 } },
                    { pos: 0.85, color: { r: 205, g: 165, b: 125 } }
                ],
                hasRings: true,
                ringColor: { r: 180, g: 160, b: 140 },
                ringInner: 1.4,
                ringOuter: 2.2,
                rotation: -15 * Math.PI / 180
            },
            // Bottom-left planet - Rocky/ice planet (like Neptune)
            {
                x: 0.08,
                y: 0.85,
                radius: 35,
                type: 'ice-giant',
                baseColor: { r: 80, g: 120, b: 180 },
                bands: [
                    { pos: 0.15, color: { r: 70, g: 110, b: 170 } },
                    { pos: 0.35, color: { r: 90, g: 135, b: 195 } },
                    { pos: 0.55, color: { r: 75, g: 115, b: 175 } },
                    { pos: 0.75, color: { r: 100, g: 145, b: 200 } }
                ],
                hasRings: false,
                hasStorm: true,
                stormX: 0.3,
                stormY: 0.4
            }
        ];

        const animate = () => {
            if (!this.cosmicCanvas) return;

            const ctx = this.cosmicCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Draw planets first (behind dust)
            this.planets.forEach(planet => {
                this.drawPlanet(ctx, planet, w, h);
            });

            // Draw dust particles
            this.cosmicParticles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around edges
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace('1)', `${p.opacity})`);
                ctx.fill();
            });

            // Occasionally spawn a shooting star
            if (Math.random() < 0.003 && this.shootingStars.length < 2) {
                this.shootingStars.push({
                    x: Math.random() * w,
                    y: Math.random() * h * 0.5,
                    speedX: 3 + Math.random() * 4,
                    speedY: 1 + Math.random() * 2,
                    length: 30 + Math.random() * 50,
                    life: 1,
                    decay: 0.015 + Math.random() * 0.01
                });
            }

            // Draw shooting stars
            this.shootingStars = this.shootingStars.filter(s => {
                s.x += s.speedX;
                s.y += s.speedY;
                s.life -= s.decay;

                if (s.life <= 0) return false;

                const gradient = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x - s.speedX * (s.length / s.speedX), s.y - s.speedY * (s.length / s.speedX)
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life * 0.8})`);
                gradient.addColorStop(0.3, `rgba(200, 220, 255, ${s.life * 0.4})`);
                gradient.addColorStop(1, 'rgba(150, 180, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.speedX * (s.length / s.speedX), s.y - s.speedY * (s.length / s.speedX));
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Bright head
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
                ctx.fill();

                return s.life > 0 && s.x < w + 50 && s.y < h + 50;
            });

            this.cosmicAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // Draw a detailed planet
    drawPlanet(ctx, planet, canvasWidth, canvasHeight) {
        const x = planet.x * canvasWidth;
        const y = planet.y * canvasHeight;
        const r = planet.radius;

        ctx.save();
        ctx.translate(x, y);

        // Draw rings behind planet if applicable
        if (planet.hasRings) {
            ctx.save();
            ctx.rotate(planet.rotation);

            // Ring shadow on planet side
            const ringShadow = ctx.createLinearGradient(-r * planet.ringOuter, 0, r * planet.ringOuter, 0);
            ringShadow.addColorStop(0, 'rgba(0,0,0,0)');
            ringShadow.addColorStop(0.3, `rgba(${planet.ringColor.r}, ${planet.ringColor.g}, ${planet.ringColor.b}, 0.15)`);
            ringShadow.addColorStop(0.5, `rgba(${planet.ringColor.r}, ${planet.ringColor.g}, ${planet.ringColor.b}, 0.3)`);
            ringShadow.addColorStop(0.7, `rgba(${planet.ringColor.r}, ${planet.ringColor.g}, ${planet.ringColor.b}, 0.15)`);
            ringShadow.addColorStop(1, 'rgba(0,0,0,0)');

            // Draw back half of rings
            ctx.beginPath();
            ctx.ellipse(0, 0, r * planet.ringOuter, r * planet.ringOuter * 0.25, 0, Math.PI, 2 * Math.PI);
            ctx.ellipse(0, 0, r * planet.ringInner, r * planet.ringInner * 0.25, 0, 2 * Math.PI, Math.PI, true);
            ctx.fillStyle = ringShadow;
            ctx.fill();

            ctx.restore();
        }

        // Planet body with gradient
        const planetGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
        planetGrad.addColorStop(0, `rgba(${planet.baseColor.r + 40}, ${planet.baseColor.g + 40}, ${planet.baseColor.b + 40}, 1)`);
        planetGrad.addColorStop(0.5, `rgba(${planet.baseColor.r}, ${planet.baseColor.g}, ${planet.baseColor.b}, 1)`);
        planetGrad.addColorStop(1, `rgba(${planet.baseColor.r - 50}, ${planet.baseColor.g - 50}, ${planet.baseColor.b - 50}, 1)`);

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        ctx.fill();

        // Atmospheric bands
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.clip();

        planet.bands.forEach((band, i) => {
            const bandY = -r + (band.pos * 2 * r);
            const bandHeight = r * 0.15;
            const bandGrad = ctx.createLinearGradient(0, bandY - bandHeight/2, 0, bandY + bandHeight/2);
            bandGrad.addColorStop(0, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0)`);
            bandGrad.addColorStop(0.5, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0.4)`);
            bandGrad.addColorStop(1, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0)`);

            ctx.fillStyle = bandGrad;
            ctx.fillRect(-r, bandY - bandHeight/2, r * 2, bandHeight);
        });

        // Storm spot for ice giant
        if (planet.hasStorm) {
            const stormX = -r + planet.stormX * 2 * r;
            const stormY = -r + planet.stormY * 2 * r;
            const stormGrad = ctx.createRadialGradient(stormX, stormY, 0, stormX, stormY, r * 0.15);
            stormGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            stormGrad.addColorStop(0.5, 'rgba(200, 220, 255, 0.2)');
            stormGrad.addColorStop(1, 'rgba(150, 180, 220, 0)');
            ctx.beginPath();
            ctx.ellipse(stormX, stormY, r * 0.15, r * 0.1, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = stormGrad;
            ctx.fill();
        }

        ctx.restore();

        // Atmosphere glow
        const atmosGrad = ctx.createRadialGradient(0, 0, r * 0.9, 0, 0, r * 1.15);
        atmosGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        atmosGrad.addColorStop(0.5, `rgba(${planet.baseColor.r + 30}, ${planet.baseColor.g + 50}, ${planet.baseColor.b + 70}, 0.1)`);
        atmosGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = atmosGrad;
        ctx.fill();

        // Draw front half of rings
        if (planet.hasRings) {
            ctx.save();
            ctx.rotate(planet.rotation);

            const ringGrad = ctx.createLinearGradient(-r * planet.ringOuter, 0, r * planet.ringOuter, 0);
            ringGrad.addColorStop(0, 'rgba(0,0,0,0)');
            ringGrad.addColorStop(0.2, `rgba(${planet.ringColor.r - 20}, ${planet.ringColor.g - 20}, ${planet.ringColor.b - 20}, 0.2)`);
            ringGrad.addColorStop(0.35, `rgba(${planet.ringColor.r}, ${planet.ringColor.g}, ${planet.ringColor.b}, 0.5)`);
            ringGrad.addColorStop(0.5, `rgba(${planet.ringColor.r + 20}, ${planet.ringColor.g + 20}, ${planet.ringColor.b + 20}, 0.6)`);
            ringGrad.addColorStop(0.65, `rgba(${planet.ringColor.r}, ${planet.ringColor.g}, ${planet.ringColor.b}, 0.5)`);
            ringGrad.addColorStop(0.8, `rgba(${planet.ringColor.r - 20}, ${planet.ringColor.g - 20}, ${planet.ringColor.b - 20}, 0.2)`);
            ringGrad.addColorStop(1, 'rgba(0,0,0,0)');

            // Ring gap (Cassini division style)
            ctx.beginPath();
            ctx.ellipse(0, 0, r * planet.ringOuter, r * planet.ringOuter * 0.25, 0, 0, Math.PI);
            ctx.ellipse(0, 0, r * (planet.ringInner + 0.15), r * (planet.ringInner + 0.15) * 0.25, 0, Math.PI, 0, true);
            ctx.fillStyle = ringGrad;
            ctx.fill();

            // Inner ring
            ctx.beginPath();
            ctx.ellipse(0, 0, r * (planet.ringInner + 0.1), r * (planet.ringInner + 0.1) * 0.25, 0, 0, Math.PI);
            ctx.ellipse(0, 0, r * planet.ringInner, r * planet.ringInner * 0.25, 0, Math.PI, 0, true);
            ctx.fillStyle = ringGrad;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.restore();
        }

        // Terminator shadow (day/night line)
        const shadowGrad = ctx.createLinearGradient(r * 0.2, 0, r, 0);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(0.6, 'rgba(0, 0, 20, 0.4)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 30, 0.7)');
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = shadowGrad;
        ctx.fill();

        ctx.restore();
    }

    stopCosmicDust() {
        if (this.cosmicAnimationId) {
            cancelAnimationFrame(this.cosmicAnimationId);
            this.cosmicAnimationId = null;
        }
        if (this.cosmicCanvas) {
            this.cosmicCanvas.remove();
            this.cosmicCanvas = null;
            this.cosmicCtx = null;
        }
        if (this.cosmicResizeHandler) {
            window.removeEventListener('resize', this.cosmicResizeHandler);
            this.cosmicResizeHandler = null;
        }
        this.cosmicParticles = null;
        this.shootingStars = null;
    }

    startFireflies() {
        if (this.firefliesCanvas) return; // Already running

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        // Create canvas for fireflies
        const canvas = document.createElement('canvas');
        canvas.id = 'fireflies-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        container.appendChild(canvas);
        this.firefliesCanvas = canvas;
        this.firefliesCtx = canvas.getContext('2d');

        // Resize canvas
        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.firefliesResizeHandler = resize;

        // Create fireflies with varying sizes
        this.fireflies = [];
        const sizes = [
            { radius: 2, glow: 8, count: 15 },   // Tiny (far away)
            { radius: 3, glow: 12, count: 10 },  // Small
            { radius: 4, glow: 18, count: 8 },   // Medium
            { radius: 6, glow: 25, count: 5 },   // Large (close)
        ];

        sizes.forEach(size => {
            for (let i = 0; i < size.count; i++) {
                this.fireflies.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: size.radius,
                    glow: size.glow,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.03,
                    brightness: 0.5 + Math.random() * 0.5
                });
            }
        });

        // Animation loop
        const animate = () => {
            if (!this.firefliesCanvas) return;

            const ctx = this.firefliesCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            this.fireflies.forEach(f => {
                // Update position with gentle drift
                f.x += f.vx;
                f.y += f.vy;

                // Soft boundary bounce
                if (f.x < 0 || f.x > w) f.vx *= -1;
                if (f.y < 0 || f.y > h) f.vy *= -1;

                // Occasionally change direction
                if (Math.random() < 0.01) {
                    f.vx += (Math.random() - 0.5) * 0.2;
                    f.vy += (Math.random() - 0.5) * 0.2;
                    f.vx = Math.max(-0.8, Math.min(0.8, f.vx));
                    f.vy = Math.max(-0.8, Math.min(0.8, f.vy));
                }

                // Pulsing brightness
                f.phase += f.pulseSpeed;
                const pulse = (Math.sin(f.phase) + 1) / 2;
                const alpha = 0.3 + pulse * 0.7 * f.brightness;

                // Draw glow
                const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glow);
                gradient.addColorStop(0, `rgba(180, 255, 100, ${alpha})`);
                gradient.addColorStop(0.3, `rgba(150, 255, 80, ${alpha * 0.5})`);
                gradient.addColorStop(1, 'rgba(100, 200, 50, 0)');

                ctx.beginPath();
                ctx.arc(f.x, f.y, f.glow, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 255, 180, ${alpha})`;
                ctx.fill();
            });

            this.firefliesAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopFireflies() {
        if (this.firefliesAnimationId) {
            cancelAnimationFrame(this.firefliesAnimationId);
            this.firefliesAnimationId = null;
        }
        if (this.firefliesCanvas) {
            this.firefliesCanvas.remove();
            this.firefliesCanvas = null;
            this.firefliesCtx = null;
        }
        if (this.firefliesResizeHandler) {
            window.removeEventListener('resize', this.firefliesResizeHandler);
            this.firefliesResizeHandler = null;
        }
        this.fireflies = null;
    }

    startSakuraPetals() {
        if (this.sakuraCanvas) return; // Already running

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        // Create canvas for petals
        const canvas = document.createElement('canvas');
        canvas.id = 'sakura-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        container.appendChild(canvas);
        this.sakuraCanvas = canvas;
        this.sakuraCtx = canvas.getContext('2d');

        // Resize canvas
        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.sakuraResizeHandler = resize;

        // Create sakura petals
        this.sakuraPetals = [];
        for (let i = 0; i < 50; i++) {
            this.sakuraPetals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: 4 + Math.random() * 8,
                speedY: 0.5 + Math.random() * 1.5,
                speedX: (Math.random() - 0.5) * 1,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.02 + Math.random() * 0.03,
                opacity: 0.4 + Math.random() * 0.4
            });
        }

        // Animation loop
        const animate = () => {
            if (!this.sakuraCanvas) return;

            const ctx = this.sakuraCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            this.sakuraPetals.forEach(p => {
                // Update position
                p.wobble += p.wobbleSpeed;
                p.x += p.speedX + Math.sin(p.wobble) * 0.5;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                // Reset when off screen
                if (p.y > h + 20) {
                    p.y = -20;
                    p.x = Math.random() * w;
                }
                if (p.x < -20) p.x = w + 20;
                if (p.x > w + 20) p.x = -20;

                // Draw petal
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;

                // Petal shape (stylized)
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 183, 197, ${p.opacity})`;
                ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();

                // Inner highlight
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 220, 230, ${p.opacity * 0.5})`;
                ctx.ellipse(-p.size * 0.2, -p.size * 0.1, p.size * 0.4, p.size * 0.25, 0.3, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });

            this.sakuraAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopSakuraPetals() {
        if (this.sakuraAnimationId) {
            cancelAnimationFrame(this.sakuraAnimationId);
            this.sakuraAnimationId = null;
        }
        if (this.sakuraCanvas) {
            this.sakuraCanvas.remove();
            this.sakuraCanvas = null;
            this.sakuraCtx = null;
        }
        if (this.sakuraResizeHandler) {
            window.removeEventListener('resize', this.sakuraResizeHandler);
            this.sakuraResizeHandler = null;
        }
        this.sakuraPetals = null;
    }

    // Aurora Borealis effect - flowing curtains of light
    startAurora() {
        if (this.auroraCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'aurora-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.6;';
        container.appendChild(canvas);
        this.auroraCanvas = canvas;
        this.auroraCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.auroraResizeHandler = resize;

        // Aurora wave parameters
        this.auroraTime = 0;

        const animate = () => {
            if (!this.auroraCanvas) return;

            const ctx = this.auroraCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            this.auroraTime += 0.008;

            // Draw multiple aurora curtains
            const colors = [
                { r: 0, g: 255, b: 150, a: 0.15 },   // Green
                { r: 100, g: 200, b: 255, a: 0.12 }, // Cyan
                { r: 150, g: 100, b: 255, a: 0.1 },  // Purple
                { r: 0, g: 255, b: 200, a: 0.08 }    // Teal
            ];

            colors.forEach((color, i) => {
                ctx.beginPath();

                const baseY = h * 0.15 + i * 40;
                const amplitude = 60 + i * 20;
                const frequency = 0.003 + i * 0.001;
                const speed = this.auroraTime * (0.8 + i * 0.2);

                ctx.moveTo(0, baseY);

                for (let x = 0; x <= w; x += 5) {
                    const y = baseY +
                        Math.sin(x * frequency + speed) * amplitude +
                        Math.sin(x * frequency * 2.5 + speed * 1.3) * (amplitude * 0.4) +
                        Math.sin(x * frequency * 0.5 + speed * 0.7) * (amplitude * 0.6);
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(w, h);
                ctx.lineTo(0, h);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, h);
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
                gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.fill();
            });

            this.auroraAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopAurora() {
        if (this.auroraAnimationId) {
            cancelAnimationFrame(this.auroraAnimationId);
            this.auroraAnimationId = null;
        }
        if (this.auroraCanvas) {
            this.auroraCanvas.remove();
            this.auroraCanvas = null;
            this.auroraCtx = null;
        }
        if (this.auroraResizeHandler) {
            window.removeEventListener('resize', this.auroraResizeHandler);
            this.auroraResizeHandler = null;
        }
    }

    // Retro Terminal scanline effect
    startScanlines() {
        if (this.scanlineEl) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        // Create scanline overlay
        const scanline = document.createElement('div');
        scanline.id = 'terminal-scanlines';
        scanline.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.15) 2px,
                rgba(0, 0, 0, 0.15) 4px
            );
        `;
        container.appendChild(scanline);
        this.scanlineEl = scanline;

        // Create CRT flicker effect
        const flicker = document.createElement('div');
        flicker.id = 'terminal-flicker';
        flicker.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 2;
            background: transparent;
            animation: terminal-flicker 0.1s infinite;
        `;
        container.appendChild(flicker);
        this.flickerEl = flicker;

        // Add keyframes if not exists
        if (!document.getElementById('terminal-keyframes')) {
            const style = document.createElement('style');
            style.id = 'terminal-keyframes';
            style.textContent = `
                @keyframes terminal-flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.98; }
                }
                @keyframes terminal-glow {
                    0%, 100% { text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0; }
                    50% { text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    stopScanlines() {
        if (this.scanlineEl) {
            this.scanlineEl.remove();
            this.scanlineEl = null;
        }
        if (this.flickerEl) {
            this.flickerEl.remove();
            this.flickerEl = null;
        }
    }

    // Midnight Garden - glowing flowers and fireflies
    startMidnightGarden() {
        if (this.gardenCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'garden-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        container.appendChild(canvas);
        this.gardenCanvas = canvas;
        this.gardenCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.gardenResizeHandler = resize;

        // Create glowing flowers at fixed positions
        this.flowers = [];
        const flowerColors = [
            { r: 255, g: 100, b: 150 },  // Pink
            { r: 180, g: 100, b: 255 },  // Purple
            { r: 100, g: 150, b: 255 },  // Blue
            { r: 255, g: 180, b: 100 },  // Orange
            { r: 150, g: 255, b: 200 },  // Mint
        ];

        for (let i = 0; i < 12; i++) {
            const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            this.flowers.push({
                x: Math.random() * canvas.width,
                y: canvas.height - 50 - Math.random() * 150,
                size: 15 + Math.random() * 20,
                color: color,
                glowPhase: Math.random() * Math.PI * 2,
                glowSpeed: 0.02 + Math.random() * 0.02,
                petals: 5 + Math.floor(Math.random() * 3)
            });
        }

        // Create fireflies
        this.gardenFireflies = [];
        for (let i = 0; i < 40; i++) {
            this.gardenFireflies.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.3,
                size: 2 + Math.random() * 2,
                glowPhase: Math.random() * Math.PI * 2,
                glowSpeed: 0.03 + Math.random() * 0.03,
                color: Math.random() > 0.5 ? { r: 200, g: 255, b: 150 } : { r: 150, g: 220, b: 255 }
            });
        }

        const animate = () => {
            if (!this.gardenCanvas) return;

            const ctx = this.gardenCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Draw moon glow
            const moonGrad = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, 150);
            moonGrad.addColorStop(0, 'rgba(200, 210, 255, 0.15)');
            moonGrad.addColorStop(0.5, 'rgba(150, 170, 220, 0.05)');
            moonGrad.addColorStop(1, 'rgba(100, 120, 180, 0)');
            ctx.fillStyle = moonGrad;
            ctx.fillRect(0, 0, w, h);

            // Draw glowing flowers
            this.flowers.forEach(flower => {
                flower.glowPhase += flower.glowSpeed;
                const glow = 0.4 + Math.sin(flower.glowPhase) * 0.3;

                // Flower glow
                const flowerGrad = ctx.createRadialGradient(flower.x, flower.y, 0, flower.x, flower.y, flower.size * 2);
                flowerGrad.addColorStop(0, `rgba(${flower.color.r}, ${flower.color.g}, ${flower.color.b}, ${glow * 0.4})`);
                flowerGrad.addColorStop(0.5, `rgba(${flower.color.r}, ${flower.color.g}, ${flower.color.b}, ${glow * 0.15})`);
                flowerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = flowerGrad;
                ctx.beginPath();
                ctx.arc(flower.x, flower.y, flower.size * 2, 0, Math.PI * 2);
                ctx.fill();

                // Draw petals
                ctx.save();
                ctx.translate(flower.x, flower.y);
                for (let p = 0; p < flower.petals; p++) {
                    ctx.rotate((Math.PI * 2) / flower.petals);
                    ctx.beginPath();
                    ctx.ellipse(0, -flower.size * 0.6, flower.size * 0.3, flower.size * 0.5, 0, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${flower.color.r}, ${flower.color.g}, ${flower.color.b}, ${glow * 0.6})`;
                    ctx.fill();
                }
                // Center
                ctx.beginPath();
                ctx.arc(0, 0, flower.size * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 200, ${glow * 0.8})`;
                ctx.fill();
                ctx.restore();
            });

            // Draw and update fireflies
            this.gardenFireflies.forEach(ff => {
                ff.x += ff.vx;
                ff.y += ff.vy;
                ff.glowPhase += ff.glowSpeed;

                // Bounce off edges
                if (ff.x < 0 || ff.x > w) ff.vx *= -1;
                if (ff.y < 0 || ff.y > h) ff.vy *= -1;

                // Random direction changes
                if (Math.random() < 0.01) {
                    ff.vx += (Math.random() - 0.5) * 0.2;
                    ff.vy += (Math.random() - 0.5) * 0.2;
                }

                const glow = 0.3 + Math.sin(ff.glowPhase) * 0.7;
                if (glow > 0.2) {
                    const ffGrad = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.size * 4);
                    ffGrad.addColorStop(0, `rgba(${ff.color.r}, ${ff.color.g}, ${ff.color.b}, ${glow})`);
                    ffGrad.addColorStop(0.3, `rgba(${ff.color.r}, ${ff.color.g}, ${ff.color.b}, ${glow * 0.3})`);
                    ffGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = ffGrad;
                    ctx.beginPath();
                    ctx.arc(ff.x, ff.y, ff.size * 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            this.gardenAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopMidnightGarden() {
        if (this.gardenAnimationId) {
            cancelAnimationFrame(this.gardenAnimationId);
            this.gardenAnimationId = null;
        }
        if (this.gardenCanvas) {
            this.gardenCanvas.remove();
            this.gardenCanvas = null;
            this.gardenCtx = null;
        }
        if (this.gardenResizeHandler) {
            window.removeEventListener('resize', this.gardenResizeHandler);
            this.gardenResizeHandler = null;
        }
        this.flowers = null;
        this.gardenFireflies = null;
    }

    // Arctic Ice - snowfall effect
    startSnowfall() {
        if (this.snowCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'snow-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        container.appendChild(canvas);
        this.snowCanvas = canvas;
        this.snowCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.snowResizeHandler = resize;

        // Create snowflakes
        this.snowflakes = [];
        for (let i = 0; i < 150; i++) {
            this.snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 1 + Math.random() * 3,
                speed: 0.5 + Math.random() * 1.5,
                wind: (Math.random() - 0.5) * 0.5,
                opacity: 0.3 + Math.random() * 0.7
            });
        }

        // Ice crystals (static decorative elements)
        this.iceCrystals = [];
        for (let i = 0; i < 8; i++) {
            this.iceCrystals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 30 + Math.random() * 50,
                rotation: Math.random() * Math.PI * 2,
                opacity: 0.05 + Math.random() * 0.1
            });
        }

        const animate = () => {
            if (!this.snowCanvas) return;

            const ctx = this.snowCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Draw ice crystals (hexagonal)
            this.iceCrystals.forEach(crystal => {
                ctx.save();
                ctx.translate(crystal.x, crystal.y);
                ctx.rotate(crystal.rotation);
                ctx.strokeStyle = `rgba(200, 230, 255, ${crystal.opacity})`;
                ctx.lineWidth = 1;

                // Draw hexagonal crystal
                for (let i = 0; i < 6; i++) {
                    ctx.rotate(Math.PI / 3);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -crystal.size);
                    // Branch
                    ctx.moveTo(0, -crystal.size * 0.4);
                    ctx.lineTo(-crystal.size * 0.2, -crystal.size * 0.6);
                    ctx.moveTo(0, -crystal.size * 0.4);
                    ctx.lineTo(crystal.size * 0.2, -crystal.size * 0.6);
                    ctx.moveTo(0, -crystal.size * 0.7);
                    ctx.lineTo(-crystal.size * 0.15, -crystal.size * 0.85);
                    ctx.moveTo(0, -crystal.size * 0.7);
                    ctx.lineTo(crystal.size * 0.15, -crystal.size * 0.85);
                    ctx.stroke();
                }
                ctx.restore();
            });

            // Draw and update snowflakes
            this.snowflakes.forEach(flake => {
                flake.y += flake.speed;
                flake.x += flake.wind + Math.sin(flake.y * 0.01) * 0.3;

                // Reset if off screen
                if (flake.y > h) {
                    flake.y = -5;
                    flake.x = Math.random() * w;
                }
                if (flake.x < 0) flake.x = w;
                if (flake.x > w) flake.x = 0;

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();
            });

            this.snowAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopSnowfall() {
        if (this.snowAnimationId) {
            cancelAnimationFrame(this.snowAnimationId);
            this.snowAnimationId = null;
        }
        if (this.snowCanvas) {
            this.snowCanvas.remove();
            this.snowCanvas = null;
            this.snowCtx = null;
        }
        if (this.snowResizeHandler) {
            window.removeEventListener('resize', this.snowResizeHandler);
            this.snowResizeHandler = null;
        }
        this.snowflakes = null;
        this.iceCrystals = null;
    }

    // Vintage Sepia - film grain and vignette
    startFilmGrain() {
        if (this.grainCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'grain-canvas';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;mix-blend-mode:overlay;opacity:0.4;';
        container.appendChild(canvas);
        this.grainCanvas = canvas;
        this.grainCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.grainResizeHandler = resize;

        // Add vignette overlay
        const vignette = document.createElement('div');
        vignette.id = 'sepia-vignette';
        vignette.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 2;
            background: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(60, 40, 20, 0.4) 100%);
        `;
        container.appendChild(vignette);
        this.vignetteEl = vignette;

        // Add film scratches overlay
        const scratches = document.createElement('div');
        scratches.id = 'film-scratches';
        scratches.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            opacity: 0.1;
            background-image: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 200px,
                rgba(0,0,0,0.1) 200px,
                rgba(0,0,0,0.1) 201px
            );
        `;
        container.appendChild(scratches);
        this.scratchesEl = scratches;

        const animate = () => {
            if (!this.grainCanvas) return;

            const ctx = this.grainCtx;
            const w = canvas.width;
            const h = canvas.height;

            // Create film grain noise
            const imageData = ctx.createImageData(w, h);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 50;
                data[i] = noise;     // R
                data[i + 1] = noise; // G
                data[i + 2] = noise; // B
                data[i + 3] = 30;    // A
            }

            ctx.putImageData(imageData, 0, 0);

            this.grainAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopFilmGrain() {
        if (this.grainAnimationId) {
            cancelAnimationFrame(this.grainAnimationId);
            this.grainAnimationId = null;
        }
        if (this.grainCanvas) {
            this.grainCanvas.remove();
            this.grainCanvas = null;
            this.grainCtx = null;
        }
        if (this.grainResizeHandler) {
            window.removeEventListener('resize', this.grainResizeHandler);
            this.grainResizeHandler = null;
        }
        if (this.vignetteEl) {
            this.vignetteEl.remove();
            this.vignetteEl = null;
        }
        if (this.scratchesEl) {
            this.scratchesEl.remove();
            this.scratchesEl = null;
        }
    }

    // Cyberpunk City - Image background with grid lines
    startCyberpunkCity() {
        if (this.cityEl) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        // Create canvas for grid lines (behind image)
        const gridCanvas = document.createElement('canvas');
        gridCanvas.id = 'cyberpunk-grid';
        gridCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;';
        container.appendChild(gridCanvas);
        this.gridCanvas = gridCanvas;
        this.gridCtx = gridCanvas.getContext('2d');

        // Create city image overlay
        const cityImg = document.createElement('div');
        cityImg.id = 'cyberpunk-city-img';
        cityImg.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60%;
            background: url('/cyberpunk-city-bg.jpg') center bottom / cover no-repeat;
            pointer-events: none;
            z-index: 1;
            mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%);
        `;
        container.appendChild(cityImg);
        this.cityEl = cityImg;

        const resize = () => {
            gridCanvas.width = container.clientWidth;
            gridCanvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.cityResizeHandler = resize;

        this.gridTime = 0;

        const animate = () => {
            if (!this.gridCanvas) return;

            const ctx = this.gridCtx;
            const w = gridCanvas.width;
            const h = gridCanvas.height;

            ctx.clearRect(0, 0, w, h);
            this.gridTime += 0.003;

            // Draw perspective grid in upper portion (behind city)
            const horizonY = h * 0.5;
            const gridColor = 'rgba(255, 0, 180, 0.25)';

            // Horizontal grid lines
            const numHLines = 12;
            for (let i = 0; i < numHLines; i++) {
                const t = i / numHLines;
                const y = horizonY - t * horizonY * 0.8;

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.strokeStyle = `rgba(255, 0, 180, ${0.08 + t * 0.12})`;
                ctx.lineWidth = 0.5 + t * 0.5;
                ctx.stroke();
            }

            // Vertical lines converging upward
            const numVLines = 20;
            for (let i = 0; i <= numVLines; i++) {
                const t = i / numVLines;
                const bottomX = t * w;
                const topX = w * 0.3 + t * w * 0.4;

                ctx.beginPath();
                ctx.moveTo(bottomX, horizonY);
                ctx.lineTo(topX, horizonY * 0.2);

                const distFromCenter = Math.abs(t - 0.5) * 2;
                ctx.strokeStyle = `rgba(0, 200, 255, ${0.05 + distFromCenter * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // Add subtle scanlines across the whole screen
            for (let y = 0; y < h; y += 4) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                ctx.fillRect(0, y, w, 1);
            }

            // Subtle glow at the top
            const topGlow = ctx.createLinearGradient(0, 0, 0, h * 0.3);
            topGlow.addColorStop(0, 'rgba(100, 0, 150, 0.1)');
            topGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = topGlow;
            ctx.fillRect(0, 0, w, h * 0.3);

            this.cityAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopCyberpunkCity() {
        if (this.cityAnimationId) {
            cancelAnimationFrame(this.cityAnimationId);
            this.cityAnimationId = null;
        }
        if (this.cityEl) {
            this.cityEl.remove();
            this.cityEl = null;
        }
        if (this.gridCanvas) {
            this.gridCanvas.remove();
            this.gridCanvas = null;
            this.gridCtx = null;
        }
        if (this.cityResizeHandler) {
            window.removeEventListener('resize', this.cityResizeHandler);
            this.cityResizeHandler = null;
        }
    }

    // Ocean Topography - underwater with topo lines
    startOceanTopo() {
        if (this.topoCanvas) return;

        const container = document.querySelector('.visualization-container');
        if (!container) return;

        // Create SVG topographic lines
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'ocean-topo';
        svg.setAttribute('viewBox', '0 0 1400 900');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svg.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.15;';

        // Generate topographic contour lines
        let paths = '';
        const colors = ['#00ffff', '#0080ff', '#00ff80', '#40a0ff'];

        for (let i = 0; i < 12; i++) {
            const y = 100 + i * 70;
            const amplitude = 30 + Math.random() * 40;
            const frequency = 0.005 + Math.random() * 0.005;
            const phase = Math.random() * Math.PI * 2;
            const color = colors[i % colors.length];

            let d = `M 0 ${y}`;
            for (let x = 0; x <= 1400; x += 10) {
                const yOffset = Math.sin(x * frequency + phase) * amplitude +
                               Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.3);
                d += ` L ${x} ${y + yOffset}`;
            }

            paths += `<path d="${d}" fill="none" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
        }

        svg.innerHTML = paths;
        container.appendChild(svg);
        this.topoSvg = svg;

        // Bubbles canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'ocean-bubbles';
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;';
        container.appendChild(canvas);
        this.topoCanvas = canvas;
        this.topoCtx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        this.topoResizeHandler = resize;

        // Create bubbles
        this.bubbles = [];
        for (let i = 0; i < 50; i++) {
            this.bubbles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 200,
                size: 2 + Math.random() * 6,
                speed: 0.5 + Math.random() * 1.5,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.02 + Math.random() * 0.03
            });
        }

        // Light rays
        this.lightRays = [];
        for (let i = 0; i < 5; i++) {
            this.lightRays.push({
                x: 200 + Math.random() * 1000,
                width: 50 + Math.random() * 100,
                opacity: 0.02 + Math.random() * 0.03,
                phase: Math.random() * Math.PI * 2
            });
        }

        const animate = () => {
            if (!this.topoCanvas) return;

            const ctx = this.topoCtx;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Draw light rays from surface
            this.lightRays.forEach(ray => {
                ray.phase += 0.01;
                const shimmer = Math.sin(ray.phase) * 0.01;

                ctx.beginPath();
                ctx.moveTo(ray.x - ray.width / 2, 0);
                ctx.lineTo(ray.x - ray.width * 0.3, h);
                ctx.lineTo(ray.x + ray.width * 0.3, h);
                ctx.lineTo(ray.x + ray.width / 2, 0);
                ctx.closePath();

                const rayGrad = ctx.createLinearGradient(ray.x, 0, ray.x, h);
                rayGrad.addColorStop(0, `rgba(100, 200, 255, ${ray.opacity + shimmer})`);
                rayGrad.addColorStop(1, 'rgba(50, 100, 150, 0)');
                ctx.fillStyle = rayGrad;
                ctx.fill();
            });

            // Draw and update bubbles
            this.bubbles.forEach(bubble => {
                bubble.y -= bubble.speed;
                bubble.wobble += bubble.wobbleSpeed;
                bubble.x += Math.sin(bubble.wobble) * 0.5;

                if (bubble.y < -20) {
                    bubble.y = h + 20;
                    bubble.x = Math.random() * w;
                }

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(150, 220, 255, 0.4)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Bubble highlight
                ctx.beginPath();
                ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(200, 240, 255, 0.3)';
                ctx.fill();
            });

            this.topoAnimationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopOceanTopo() {
        if (this.topoAnimationId) {
            cancelAnimationFrame(this.topoAnimationId);
            this.topoAnimationId = null;
        }
        if (this.topoSvg) {
            this.topoSvg.remove();
            this.topoSvg = null;
        }
        if (this.topoCanvas) {
            this.topoCanvas.remove();
            this.topoCanvas = null;
            this.topoCtx = null;
        }
        if (this.topoResizeHandler) {
            window.removeEventListener('resize', this.topoResizeHandler);
            this.topoResizeHandler = null;
        }
        this.bubbles = null;
        this.lightRays = null;
    }

    updateSwitcherUI(themeId) {
        const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

        // Update current name
        const nameEl = document.querySelector('.theme-current-name');
        if (nameEl) {
            nameEl.textContent = theme.name;
        }

        // Update active state
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === themeId);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});
