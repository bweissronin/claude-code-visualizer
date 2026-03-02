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
        id: 'dungeon',
        name: 'Pixel Dungeon',
        icon: '🏰',
        preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
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

        // Load pixel font for dungeon theme
        if (themeId === 'dungeon') {
            this.loadPixelFont();
        }

        // Start/stop fireflies for forest theme
        if (themeId === 'forest') {
            this.startFireflies();
        } else {
            this.stopFireflies();
        }
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

    loadPixelFont() {
        // Check if already loaded
        if (document.getElementById('pixel-font')) return;

        const link = document.createElement('link');
        link.id = 'pixel-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        document.head.appendChild(link);
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
