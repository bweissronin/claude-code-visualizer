// ========================================
// Claude Code Capabilities Visualizer
// DEEP SPACE PLANETARY EDITION
// ========================================

class CapabilitiesVisualizer {
    constructor() {
        // DOM Elements
        this.canvas = document.getElementById('connections-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodesContainer = document.getElementById('nodes-container');
        this.sidePanel = document.getElementById('side-panel');
        this.searchInput = document.getElementById('search');
        this.loadingOverlay = document.getElementById('loading-overlay');

        // State
        this.nodes = [];
        this.currentLayout = 'hub';
        this.selectedNode = null;
        this.activeCategories = new Set(['agents', 'tools', 'commands', 'skills', 'integrations', 'config']);
        this.searchQuery = '';
        this.isDragging = false;
        this.draggedNode = null;
        this.dragStartPos = { x: 0, y: 0 };
        this.didDrag = false;
        this.clickTargetNode = null;
        this.mousePos = { x: 0, y: 0 };

        // Zoom state
        this.zoom = 1;
        this.minZoom = 0.3;
        this.maxZoom = 2;
        this.panX = 0;
        this.panY = 0;

        // Electricity effects
        this.electricityParticles = [];

        // Physics simulation parameters
        this.physics = {
            repulsion: 12000,
            attraction: 0.006,
            damping: 0.88,
            centerGravity: 0.008,
            running: true
        };

        // Animation
        this.animationId = null;
        this.particleSystem = [];
        this.shootingStars = [];
        this.nebulaClouds = [];
        this.time = 0;

        // Initialize
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createNebulae();
        this.createNodes();
        this.bindEvents();
        this.startShootingStars();
        this.startAnimation();

        // Hide loading after initial setup
        setTimeout(() => {
            this.loadingOverlay.classList.add('hidden');
        }, 1200);
    }

    // ========================================
    // Canvas Setup
    // ========================================
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 100; // Account for header + filter bar
    }

    // ========================================
    // Nebula Creation
    // ========================================
    createNebulae() {
        // Create several nebula clouds
        for (let i = 0; i < 5; i++) {
            this.nebulaClouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 150 + Math.random() * 250,
                color: this.getRandomNebulaColor(),
                opacity: 0.03 + Math.random() * 0.05,
                drift: {
                    x: (Math.random() - 0.5) * 0.1,
                    y: (Math.random() - 0.5) * 0.1
                }
            });
        }
    }

    getRandomNebulaColor() {
        const colors = [
            { r: 100, g: 50, b: 150 },   // Purple
            { r: 50, g: 100, b: 150 },   // Blue
            { r: 150, g: 50, b: 100 },   // Pink
            { r: 50, g: 150, b: 100 },   // Teal
            { r: 150, g: 100, b: 50 }    // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawNebulae() {
        this.nebulaClouds.forEach(nebula => {
            // Drift the nebula slowly
            nebula.x += nebula.drift.x;
            nebula.y += nebula.drift.y;

            // Wrap around edges
            if (nebula.x < -nebula.radius) nebula.x = this.canvas.width + nebula.radius;
            if (nebula.x > this.canvas.width + nebula.radius) nebula.x = -nebula.radius;
            if (nebula.y < -nebula.radius) nebula.y = this.canvas.height + nebula.radius;
            if (nebula.y > this.canvas.height + nebula.radius) nebula.y = -nebula.radius;

            // Draw nebula
            const gradient = this.ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius
            );
            gradient.addColorStop(0, `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${nebula.opacity})`);
            gradient.addColorStop(0.5, `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${nebula.opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    // ========================================
    // Shooting Stars
    // ========================================
    startShootingStars() {
        // Occasionally spawn shooting stars
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.spawnShootingStar();
            }
        }, 2000);
    }

    spawnShootingStar() {
        this.shootingStars.push({
            x: Math.random() * this.canvas.width * 0.7,
            y: Math.random() * this.canvas.height * 0.3,
            length: 80 + Math.random() * 120,
            speed: 8 + Math.random() * 12,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
            opacity: 1,
            life: 1
        });
    }

    drawShootingStars() {
        this.shootingStars = this.shootingStars.filter(star => {
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.life -= 0.02;
            star.opacity = star.life;

            if (star.life <= 0) return false;

            // Draw the shooting star
            const tailX = star.x - Math.cos(star.angle) * star.length;
            const tailY = star.y - Math.sin(star.angle) * star.length;

            const gradient = this.ctx.createLinearGradient(tailX, tailY, star.x, star.y);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.8, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

            this.ctx.beginPath();
            this.ctx.moveTo(tailX, tailY);
            this.ctx.lineTo(star.x, star.y);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw bright head
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();

            return true;
        });
    }

    // ========================================
    // Node Creation
    // ========================================
    createNodes() {
        const capabilities = getAllCapabilities();
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        capabilities.forEach((cap, index) => {
            const angle = (index / capabilities.length) * Math.PI * 2;
            const radius = 200 + Math.random() * 250;

            const node = {
                id: cap.id,
                data: cap,
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                vx: 0,
                vy: 0,
                targetX: 0,
                targetY: 0,
                radius: cap.id === 'main-agent' ? 60 : 35,
                element: this.createNodeElement(cap, index),
                orbitAngle: (index / capabilities.length) * Math.PI * 2, // Starting orbit position
                orbitSpeed: 0.0002 + Math.random() * 0.0001 // Slow orbit speed with slight variation
            };

            this.nodes.push(node);
            this.nodesContainer.appendChild(node.element);
        });

        this.setLayoutPositions();
    }

    createNodeElement(cap, index = 0) {
        const node = document.createElement('div');
        node.className = 'node';
        node.dataset.id = cap.id;
        node.dataset.category = cap.category;

        // Staggered entrance animation delay
        // Main agent appears first, others cascade outward
        const delay = cap.id === 'main-agent' ? 0.1 : 0.2 + (index * 0.04);
        node.style.setProperty('--node-delay', `${delay}s`);

        if (cap.id === 'main-agent') {
            node.classList.add('hub-node');
        }

        // Icon is now SVG HTML string
        const iconHtml = cap.icon.startsWith('<svg') ? cap.icon : `<span>${cap.icon}</span>`;

        node.innerHTML = `
            <div class="node-circle">${iconHtml}</div>
            <div class="node-label">${cap.name}</div>
        `;

        return node;
    }

    // ========================================
    // Layout - Central Hub (Solar System)
    // ========================================
    setLayoutPositions() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Main Agent at center (the Sun)
        const mainAgent = this.nodes.find(n => n.id === 'main-agent');
        if (mainAgent) {
            mainAgent.targetX = centerX;
            mainAgent.targetY = centerY;
        }

        // Define rings from inside out
        // Ring 1 (closest): Other Agents (sub-agents, explore, plan, teams)
        // Ring 2: Tools
        // Ring 3: Commands
        // Ring 4: Skills
        // Ring 5: Integrations
        // Ring 6 (outermost): Config

        const ringConfig = [
            { category: 'agents', radius: 140, excludeId: 'main-agent' },
            { category: 'tools', radius: 220 },
            { category: 'commands', radius: 310 },
            { category: 'skills', radius: 390 },
            { category: 'integrations', radius: 470 },
            { category: 'config', radius: 550 }
        ];

        ringConfig.forEach(ring => {
            const categoryNodes = this.nodes.filter(n =>
                n.data.category === ring.category &&
                (!ring.excludeId || n.id !== ring.excludeId)
            );

            categoryNodes.forEach((node, index) => {
                // Distribute evenly around the ring
                const angle = (index / categoryNodes.length) * Math.PI * 2 - Math.PI / 2; // Start from top
                node.targetX = centerX + Math.cos(angle) * ring.radius;
                node.targetY = centerY + Math.sin(angle) * ring.radius;
                node.ringRadius = ring.radius; // Store for orbital rotation
                node.orbitAngle = angle; // Set initial orbit angle
            });
        });

        this.animateToTargets();
    }

    animateToTargets() {
        this.physics.running = false;
        const animate = () => {
            let allSettled = true;

            this.nodes.forEach(node => {
                const dx = node.targetX - node.x;
                const dy = node.targetY - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 1) {
                    allSettled = false;
                    node.x += dx * 0.06;
                    node.y += dy * 0.06;
                }
            });

            this.updateNodePositions();
            this.drawScene();

            if (!allSettled) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    // ========================================
    // Physics Simulation
    // ========================================
    updatePhysics() {
        if (!this.physics.running) return;

        const nodes = this.nodes.filter(n => !n.element.classList.contains('filtered-out'));

        nodes.forEach(node => {
            let fx = 0;
            let fy = 0;

            // Repulsion
            nodes.forEach(other => {
                if (node === other) return;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = this.physics.repulsion / (dist * dist);
                fx += (dx / dist) * force;
                fy += (dy / dist) * force;
            });

            // Attraction along connections
            const connections = getConnectionsForNode(node.id);
            connections.forEach(conn => {
                const otherId = conn.from === node.id ? conn.to : conn.from;
                const other = this.nodes.find(n => n.id === otherId);
                if (!other || other.element.classList.contains('filtered-out')) return;

                const dx = other.x - node.x;
                const dy = other.y - node.y;
                fx += dx * this.physics.attraction;
                fy += dy * this.physics.attraction;
            });

            // Center gravity
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            fx += (centerX - node.x) * this.physics.centerGravity;
            fy += (centerY - node.y) * this.physics.centerGravity;

            // Apply forces
            node.vx = (node.vx + fx) * this.physics.damping;
            node.vy = (node.vy + fy) * this.physics.damping;

            if (this.draggedNode !== node) {
                node.x += node.vx;
                node.y += node.vy;

                const padding = 100;
                node.x = Math.max(padding, Math.min(this.canvas.width - padding, node.x));
                node.y = Math.max(padding, Math.min(this.canvas.height - padding, node.y));
            }
        });
    }

    // Slowly orbit nodes around the center
    updateOrbits() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.nodes.forEach(node => {
            // Skip the main agent (it stays at center) and dragged nodes
            if (node.id === 'main-agent' || this.draggedNode === node) return;
            if (!node.ringRadius) return; // Only orbit nodes that have been assigned to a ring

            // Update orbit angle
            node.orbitAngle += node.orbitSpeed;

            // Calculate new position on the orbit
            node.x = centerX + Math.cos(node.orbitAngle) * node.ringRadius;
            node.y = centerY + Math.sin(node.orbitAngle) * node.ringRadius;
        });
    }

    // ========================================
    // Rendering
    // ========================================
    startAnimation() {
        const animate = () => {
            this.time += 0.016;
            this.updatePhysics();
            this.updateOrbits();
            this.updateNodePositions();
            this.drawScene();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    drawScene() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw nebulae (background, not zoomed)
        this.drawNebulae();

        // Draw shooting stars (background, not zoomed)
        this.drawShootingStars();

        // Save context and apply zoom for main content
        this.ctx.save();
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.ctx.translate(centerX, centerY);
        this.ctx.scale(this.zoom, this.zoom);
        this.ctx.translate(-centerX, -centerY);

        // Draw orbital paths (faint)
        this.drawOrbitalPaths();

        // Draw connections
        this.drawConnections();

        // Draw particles
        this.updateParticles();

        this.ctx.restore();
    }

    updateNodePositions() {
        this.nodes.forEach(node => {
            node.element.style.left = `${node.x}px`;
            node.element.style.top = `${node.y}px`;
            node.element.style.transform = 'translate(-50%, -50%)';
        });
    }

    drawOrbitalPaths() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Draw orbital rings matching the layout radii
        const radii = [140, 220, 310, 390, 470, 550];

        radii.forEach(radius => {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([5, 15]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        });
    }

    drawConnections() {
        const visibleNodes = this.nodes.filter(n => !n.element.classList.contains('filtered-out'));
        const visibleIds = new Set(visibleNodes.map(n => n.id));

        // Separate connections into selected and non-selected for layering
        const regularConnections = [];
        const selectedConnections = [];

        CONNECTIONS.forEach(conn => {
            if (!visibleIds.has(conn.from) || !visibleIds.has(conn.to)) return;

            const fromNode = this.nodes.find(n => n.id === conn.from);
            const toNode = this.nodes.find(n => n.id === conn.to);

            if (!fromNode || !toNode) return;

            const isSelected = this.selectedNode &&
                (this.selectedNode.id === fromNode.id || this.selectedNode.id === toNode.id);

            if (isSelected) {
                selectedConnections.push({ fromNode, toNode, conn });
            } else {
                regularConnections.push({ fromNode, toNode, conn });
            }
        });

        // Draw regular connections first (behind)
        regularConnections.forEach(({ fromNode, toNode, conn }) => {
            this.drawConnection(fromNode, toNode, conn, false);
        });

        // Draw selected connections on top
        selectedConnections.forEach(({ fromNode, toNode, conn }) => {
            this.drawConnection(fromNode, toNode, conn, true);
        });
    }

    drawConnection(from, to, conn, isSelected) {
        // Check if sakura theme is active - use soft pink/cream for connections
        const isSakura = document.documentElement.getAttribute('data-theme') === 'sakura';
        const sakuraPink = '#f0d0d8';

        const fromColor = isSakura ? sakuraPink : getCategoryColor(from.data.category);
        const toColor = isSakura ? sakuraPink : getCategoryColor(to.data.category);

        // Calculate distance for opacity
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Dim non-selected connections when a node is selected
        let opacity;
        let lineWidth;
        let glowOpacity;

        if (this.selectedNode) {
            if (isSelected) {
                // Highlighted connection
                opacity = 0.8;
                lineWidth = 2;
                glowOpacity = 0.4;
            } else {
                // Dimmed connection - still visible but subdued
                opacity = 0.08;
                lineWidth = 0.5;
                glowOpacity = 0;
            }
        } else {
            // Normal state
            opacity = Math.max(0.1, Math.min(0.4, 200 / dist));
            lineWidth = 1;
            glowOpacity = 0.15;
        }

        // Create gradient
        const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, this.hexToRgba(fromColor, opacity));
        gradient.addColorStop(1, this.hexToRgba(toColor, opacity));

        // Draw gravitational line (curved slightly)
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);

        // Add slight curve for visual interest
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const perpX = -(to.y - from.y) * 0.1;
        const perpY = (to.x - from.x) * 0.1;

        this.ctx.quadraticCurveTo(midX + perpX, midY + perpY, to.x, to.y);
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();

        // Draw glow (only if visible)
        if (glowOpacity > 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.quadraticCurveTo(midX + perpX, midY + perpY, to.x, to.y);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = isSelected ? 8 : 4;
            this.ctx.globalAlpha = glowOpacity;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }

        // Draw electricity effect when connection is selected
        if (isSelected) {
            this.drawElectricity(from, to, conn, toColor);
        }
    }

    drawElectricity(from, to, conn, color) {
        // Use the same curve control point as the connection line
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const perpX = -(to.y - from.y) * 0.1;
        const perpY = (to.x - from.x) * 0.1;
        const ctrlX = midX + perpX;
        const ctrlY = midY + perpY;

        // Helper to get point on quadratic bezier curve
        const getPointOnCurve = (t) => {
            const x = (1-t)*(1-t)*from.x + 2*(1-t)*t*ctrlX + t*t*to.x;
            const y = (1-t)*(1-t)*from.y + 2*(1-t)*t*ctrlY + t*t*to.y;
            return { x, y };
        };

        // Draw comet-like pulses traveling along the curve
        const numComets = 2;
        const tailLength = 0.15; // Length of the tail as percentage of curve

        for (let c = 0; c < numComets; c++) {
            // Stagger the comets along the path
            const headPos = ((this.time * 0.4) + (c / numComets)) % 1;
            const headPt = getPointOnCurve(headPos);

            // Draw the tail as segments that fade out
            const tailSegments = 12;

            for (let i = 0; i < tailSegments; i++) {
                const t1 = headPos - (tailLength * (i / tailSegments));
                const t2 = headPos - (tailLength * ((i + 1) / tailSegments));

                if (t1 < 0 || t2 < 0) continue;

                const pt1 = getPointOnCurve(t1);
                const pt2 = getPointOnCurve(t2);

                // Fade out opacity and width along the tail
                const fade = 1 - (i / tailSegments);
                const opacity = fade * 0.6;
                const width = fade * 3;

                this.ctx.beginPath();
                this.ctx.moveTo(pt1.x, pt1.y);
                this.ctx.lineTo(pt2.x, pt2.y);
                this.ctx.strokeStyle = this.hexToRgba(color, opacity);
                this.ctx.lineWidth = width;
                this.ctx.lineCap = 'round';
                this.ctx.stroke();
            }

            // Draw the bright head (tiny)
            // Small glow
            this.ctx.beginPath();
            this.ctx.arc(headPt.x, headPt.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = this.hexToRgba(color, 0.5);
            this.ctx.fill();

            // Bright core
            this.ctx.beginPath();
            this.ctx.arc(headPt.x, headPt.y, 1, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            this.ctx.fill();
        }
    }

    updateParticles() {
        this.particleSystem = this.particleSystem.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.03;
            p.vx *= 0.98;
            p.vy *= 0.98;

            if (p.life <= 0) return false;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fillStyle = this.hexToRgba(p.color, p.life * 0.5);
            this.ctx.fill();

            return true;
        });
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // ========================================
    // Event Handlers
    // ========================================
    bindEvents() {
        // Use pointerdown/up for more reliable click detection
        this.nodesContainer.addEventListener('pointerdown', (e) => this.handleDragStart(e));
        document.addEventListener('pointermove', (e) => this.handleDragMove(e));
        document.addEventListener('pointerup', (e) => this.handleDragEnd(e));

        document.getElementById('panel-close').addEventListener('click', () => this.closePanel());

        // Filter bar buttons for category filtering
        document.querySelectorAll('.viz-filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleCategory(btn.dataset.category));
        });

        // Search with dropdown
        this.searchDropdown = document.getElementById('search-dropdown');
        this.searchResults = document.getElementById('search-results');
        this.selectedResultIndex = -1;

        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.onSearchFocus());
        this.searchInput.addEventListener('blur', (e) => this.onSearchBlur(e));
        this.searchInput.addEventListener('keydown', (e) => this.handleSearchKeydown(e));

        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        document.addEventListener('pointermove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => this.setZoom(this.zoom + 0.1));
        document.getElementById('zoom-out').addEventListener('click', () => this.setZoom(this.zoom - 0.1));
        document.getElementById('zoom-reset').addEventListener('click', () => this.setZoom(1));

        // Mouse wheel zoom
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        this.nodesContainer.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    }

    handleWheel(e) {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        this.setZoom(this.zoom + delta);
    }

    setZoom(newZoom) {
        this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
        this.applyZoom();
        document.getElementById('zoom-level').textContent = Math.round(this.zoom * 100) + '%';
    }

    applyZoom() {
        // Apply zoom transform to nodes container
        this.nodesContainer.style.transform = `scale(${this.zoom})`;
        this.nodesContainer.style.transformOrigin = 'center center';

        // Update ring radii based on zoom for layout recalculation
        this.updateLayoutForZoom();
    }

    updateLayoutForZoom() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Recalculate node positions based on zoom
        this.nodes.forEach(node => {
            if (node.id === 'main-agent') {
                node.x = centerX;
                node.y = centerY;
            } else if (node.ringRadius) {
                node.x = centerX + Math.cos(node.orbitAngle) * node.ringRadius;
                node.y = centerY + Math.sin(node.orbitAngle) * node.ringRadius;
            }
        });
    }

    handleDragStart(e) {
        const nodeEl = e.target.closest('.node');
        if (!nodeEl) return;

        const node = this.nodes.find(n => n.id === nodeEl.dataset.id);
        if (!node) return;

        e.preventDefault(); // Prevent text selection during drag

        this.isDragging = true;
        this.draggedNode = node;
        this.dragStartPos = { x: e.clientX, y: e.clientY };
        this.didDrag = false;
        this.clickTargetNode = node; // Store the node we clicked on
        nodeEl.style.cursor = 'grabbing';
    }

    handleDragMove(e) {
        if (!this.isDragging || !this.draggedNode) return;

        // Check if we've moved enough to count as a drag
        const dx = e.clientX - this.dragStartPos.x;
        const dy = e.clientY - this.dragStartPos.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            this.didDrag = true;
        }

        // Only move if we're actually dragging (moved enough)
        if (this.didDrag) {
            this.draggedNode.x = e.clientX;
            this.draggedNode.y = e.clientY - 100; // Account for header + filter bar
            this.draggedNode.vx = 0;
            this.draggedNode.vy = 0;
        }
    }

    handleDragEnd(e) {
        const clickedNode = this.clickTargetNode;
        const wasDrag = this.didDrag;

        if (this.draggedNode) {
            this.draggedNode.element.style.cursor = 'pointer';
        }

        this.isDragging = false;
        this.draggedNode = null;
        this.clickTargetNode = null;

        // If we didn't drag, treat this as a click
        if (!wasDrag && clickedNode) {
            // Create explosion of particles on click
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.particleSystem.push({
                    x: clickedNode.x,
                    y: clickedNode.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    color: getCategoryColor(clickedNode.data.category),
                    size: 3 + Math.random() * 2
                });
            }
            this.selectNode(clickedNode);
        }

        this.didDrag = false;
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            this.closePanel();
            this.searchInput.blur();
        }

        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            this.searchInput.focus();
        }

        // Zoom keyboard shortcuts
        if (e.key === '=' || e.key === '+') {
            e.preventDefault();
            this.setZoom(this.zoom + 0.1);
        }
        if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            this.setZoom(this.zoom - 0.1);
        }
        if (e.key === '0') {
            e.preventDefault();
            this.setZoom(1);
        }
    }

    // ========================================
    // Selection & Panel
    // ========================================
    selectNode(node) {
        // Clear previous selection
        if (this.selectedNode) {
            this.selectedNode.element.classList.remove('selected');
        }

        // Clear previous connection highlights
        this.nodes.forEach(n => {
            n.element.classList.remove('connected', 'dimmed');
        });

        this.selectedNode = node;
        node.element.classList.add('selected');

        // Find connected nodes
        const connectedIds = new Set();
        connectedIds.add(node.id);

        CONNECTIONS.forEach(conn => {
            if (conn.from === node.id) {
                connectedIds.add(conn.to);
            } else if (conn.to === node.id) {
                connectedIds.add(conn.from);
            }
        });

        // Highlight connected nodes, dim others
        this.nodes.forEach(n => {
            if (connectedIds.has(n.id)) {
                n.element.classList.add('connected');
            } else {
                n.element.classList.add('dimmed');
            }
        });

        // Scroll/pan to center the selected node (optional smooth focus)
        this.centerOnNode(node);

        this.openPanel(node.data);
    }

    centerOnNode(node) {
        // Smoothly update node position emphasis (the node is already centered by orbit)
        // This could be extended to pan the view if needed
    }

    clearSelection() {
        if (this.selectedNode) {
            this.selectedNode.element.classList.remove('selected');
        }
        this.nodes.forEach(n => {
            n.element.classList.remove('connected', 'dimmed');
        });
        this.selectedNode = null;
    }

    openPanel(capability) {
        const panel = this.sidePanel;
        const color = getCategoryColor(capability.category);

        panel.style.setProperty('--panel-accent', color);

        document.getElementById('panel-category').textContent = capability.category.toUpperCase();
        document.getElementById('panel-title').textContent = capability.name;
        document.getElementById('panel-description').textContent = capability.description;
        document.getElementById('panel-usage').querySelector('code').textContent = capability.usage;
        document.getElementById('panel-example').querySelector('code').textContent = capability.example;

        const ideasList = document.getElementById('panel-ideas');
        ideasList.innerHTML = capability.ideas.map(idea => `<li>${idea}</li>`).join('');

        const connectionsDiv = document.getElementById('panel-connections');
        const connectedNodes = getConnectedNodes(capability.id);
        connectionsDiv.innerHTML = connectedNodes.map(node => {
            const conn = CONNECTIONS.find(c =>
                (c.from === capability.id && c.to === node.id) ||
                (c.to === capability.id && c.from === node.id)
            );
            const arrow = conn && conn.from === capability.id ? '→' : '←';
            return `
                <span class="connection-node" data-id="${node.id}">${node.name}</span>
                <span class="connection-arrow">${arrow}</span>
            `;
        }).join('');

        connectionsDiv.querySelectorAll('.connection-node').forEach(el => {
            el.addEventListener('click', () => {
                const targetNode = this.nodes.find(n => n.id === el.dataset.id);
                if (targetNode) this.selectNode(targetNode);
            });
        });

        panel.classList.add('open');
    }

    closePanel() {
        this.sidePanel.classList.remove('open');
        this.clearSelection();
    }

    // ========================================
    // Filtering
    // ========================================
    toggleCategory(category) {
        const filterBtn = document.querySelector(`.viz-filter-bar .filter-btn[data-category="${category}"]`);

        if (this.activeCategories.has(category)) {
            // Don't allow hiding all categories
            if (this.activeCategories.size > 1) {
                this.activeCategories.delete(category);
                filterBtn.classList.remove('active');
            }
        } else {
            this.activeCategories.add(category);
            filterBtn.classList.add('active');
        }

        this.applyFilters();
    }

    // ========================================
    // Spotlight-style Search
    // ========================================
    onSearchFocus() {
        if (this.searchInput.value.trim()) {
            this.showSearchDropdown();
        }
    }

    onSearchBlur(e) {
        // Delay hiding to allow clicking on results
        setTimeout(() => {
            if (!this.searchDropdown.contains(document.activeElement)) {
                this.hideSearchDropdown();
            }
        }, 150);
    }

    showSearchDropdown() {
        this.searchDropdown.classList.add('open');
    }

    hideSearchDropdown() {
        this.searchDropdown.classList.remove('open');
        this.selectedResultIndex = -1;
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase().trim();

        if (!this.searchQuery) {
            this.hideSearchDropdown();
            this.applyFilters();
            return;
        }

        // Find matching capabilities
        const results = this.nodes
            .filter(node => {
                const name = node.data.name.toLowerCase();
                const desc = node.data.description.toLowerCase();
                const id = node.data.id.toLowerCase();
                return name.includes(this.searchQuery) ||
                       desc.includes(this.searchQuery) ||
                       id.includes(this.searchQuery);
            })
            .sort((a, b) => {
                // Prioritize name matches
                const aNameMatch = a.data.name.toLowerCase().includes(this.searchQuery);
                const bNameMatch = b.data.name.toLowerCase().includes(this.searchQuery);
                if (aNameMatch && !bNameMatch) return -1;
                if (!aNameMatch && bNameMatch) return 1;
                return a.data.name.localeCompare(b.data.name);
            })
            .slice(0, 8); // Limit results

        this.renderSearchResults(results);
        this.showSearchDropdown();
        this.applyFilters();
    }

    renderSearchResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-empty">
                    <div class="search-empty-icon">🔍</div>
                    No capabilities found
                </div>
            `;
            return;
        }

        this.searchResults.innerHTML = results.map((node, index) => {
            const cap = node.data;
            const color = getCategoryColor(cap.category);
            const highlightedName = this.highlightMatch(cap.name, this.searchQuery);

            return `
                <div class="search-result ${index === this.selectedResultIndex ? 'selected' : ''}"
                     data-id="${cap.id}"
                     style="--result-color: ${color}; --result-glow: ${color}33;">
                    <div class="search-result-icon">
                        ${cap.icon}
                    </div>
                    <div class="search-result-content">
                        <div class="search-result-name">${highlightedName}</div>
                        <div class="search-result-description">${cap.description.slice(0, 60)}${cap.description.length > 60 ? '...' : ''}</div>
                    </div>
                    <span class="search-result-category">${cap.category}</span>
                </div>
            `;
        }).join('');

        // Add click handlers
        this.searchResults.querySelectorAll('.search-result').forEach(el => {
            el.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Prevent blur
                const node = this.nodes.find(n => n.id === el.dataset.id);
                if (node) {
                    this.selectNode(node);
                    this.hideSearchDropdown();
                    this.searchInput.blur();
                }
            });
        });
    }

    highlightMatch(text, query) {
        const index = text.toLowerCase().indexOf(query);
        if (index === -1) return text;
        const before = text.slice(0, index);
        const match = text.slice(index, index + query.length);
        const after = text.slice(index + query.length);
        return `${before}<mark>${match}</mark>${after}`;
    }

    handleSearchKeydown(e) {
        const results = this.searchResults.querySelectorAll('.search-result');
        if (!results.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedResultIndex = Math.min(this.selectedResultIndex + 1, results.length - 1);
            this.updateSelectedResult(results);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, 0);
            this.updateSelectedResult(results);
        } else if (e.key === 'Enter' && this.selectedResultIndex >= 0) {
            e.preventDefault();
            const selectedEl = results[this.selectedResultIndex];
            const node = this.nodes.find(n => n.id === selectedEl.dataset.id);
            if (node) {
                this.selectNode(node);
                this.hideSearchDropdown();
                this.searchInput.blur();
            }
        } else if (e.key === 'Escape') {
            this.hideSearchDropdown();
            this.searchInput.blur();
        }
    }

    updateSelectedResult(results) {
        results.forEach((el, i) => {
            el.classList.toggle('selected', i === this.selectedResultIndex);
        });

        // Scroll into view
        const selected = results[this.selectedResultIndex];
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }

    applyFilters() {
        this.nodes.forEach(node => {
            const matchesCategory = this.activeCategories.has(node.data.category);

            const matchesSearch = !this.searchQuery ||
                node.data.name.toLowerCase().includes(this.searchQuery) ||
                node.data.description.toLowerCase().includes(this.searchQuery) ||
                node.data.id.toLowerCase().includes(this.searchQuery);

            const isVisible = matchesCategory && matchesSearch;
            node.element.classList.toggle('filtered-out', !isVisible);
        });
    }
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.visualizer = new CapabilitiesVisualizer();
});
