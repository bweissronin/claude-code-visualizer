// ========================================
// Combos Page Controller
// ========================================

class CombosController {
    constructor() {
        this.grid = document.getElementById('combos-grid');
        this.modal = document.getElementById('combo-modal');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.searchInput = document.getElementById('search');
        this.loadingOverlay = document.getElementById('loading-overlay');

        this.activeFilter = 'all';
        this.searchQuery = '';

        this.init();
    }

    init() {
        this.renderCombos();
        this.bindEvents();

        // Hide loading
        setTimeout(() => {
            this.loadingOverlay.classList.add('hidden');
        }, 600);
    }

    // ========================================
    // Rendering
    // ========================================
    renderCombos() {
        const combos = getAllCombos();
        this.grid.innerHTML = combos.map(combo => this.renderComboCard(combo)).join('');

        // Bind card click events
        this.grid.querySelectorAll('.combo-card').forEach(card => {
            card.addEventListener('click', () => {
                const combo = getComboById(card.dataset.id);
                if (combo) this.openModal(combo);
            });
        });
    }

    renderComboCard(combo) {
        const capabilityPills = combo.capabilities.slice(0, 4).map(capId => {
            const cap = getCapabilityById(capId);
            if (!cap) return '';
            const color = getCategoryColor(cap.category);
            return `
                <span class="capability-pill">
                    <span class="pill-dot" style="--pill-color: ${color}"></span>
                    ${cap.name}
                </span>
            `;
        }).join('');

        const moreCount = combo.capabilities.length - 4;
        const morePill = moreCount > 0 ? `<span class="capability-pill">+${moreCount} more</span>` : '';

        const difficultyDots = Array(3).fill(0).map((_, i) =>
            `<span class="difficulty-dot ${i < combo.difficulty ? 'filled' : ''}"></span>`
        ).join('');

        return `
            <div class="combo-card" data-id="${combo.id}" data-category="${combo.category}">
                <div class="card-header">
                    <div class="card-icon">${combo.icon}</div>
                    <div class="card-title-group">
                        <div class="card-category">${combo.category}</div>
                        <h3 class="card-title">${combo.name}</h3>
                    </div>
                </div>
                <p class="card-description">${combo.description}</p>
                <div class="card-capabilities">
                    ${capabilityPills}
                    ${morePill}
                </div>
                <div class="card-footer">
                    <div class="card-difficulty">
                        <span class="difficulty-dots">${difficultyDots}</span>
                        <span>${['', 'Beginner', 'Intermediate', 'Advanced'][combo.difficulty]}</span>
                    </div>
                    <span class="card-arrow">→</span>
                </div>
            </div>
        `;
    }

    // ========================================
    // Modal
    // ========================================
    openModal(combo) {
        // Set accent color based on category
        const categoryColors = {
            development: '#00d4ff',
            debugging: '#ff3366',
            refactoring: '#ffd700',
            devops: '#ff8c00',
            research: '#9966ff'
        };
        this.modal.style.setProperty('--modal-accent', categoryColors[combo.category] || '#00d4ff');

        // Populate header
        document.getElementById('modal-category').textContent = combo.category.toUpperCase();
        document.getElementById('modal-title').textContent = combo.name;
        document.getElementById('modal-description').textContent = combo.description;

        // Populate capabilities flow
        const capabilitiesHtml = combo.capabilities.map((capId, index) => {
            const cap = getCapabilityById(capId);
            if (!cap) return '';
            const color = getCategoryColor(cap.category);
            const arrow = index < combo.capabilities.length - 1 ? '<span class="flow-arrow">→</span>' : '';
            return `
                <span class="capability-node">
                    <span class="node-dot" style="color: ${color}; background: ${color}"></span>
                    ${cap.name}
                </span>
                ${arrow}
            `;
        }).join('');
        document.getElementById('modal-capabilities').innerHTML = capabilitiesHtml;

        // Populate workflow steps
        const stepsHtml = combo.steps.map((step, index) => {
            const cap = getCapabilityById(step.capability);
            const capName = cap ? cap.name : step.capability;
            return `
                <div class="workflow-step">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                        <div class="step-title">${step.title}</div>
                        <div class="step-description">${step.description}</div>
                        <span class="step-capability">${capName}</span>
                    </div>
                </div>
            `;
        }).join('');
        document.getElementById('modal-steps').innerHTML = stepsHtml;

        // Populate prompt
        document.getElementById('modal-prompt').querySelector('code').textContent = combo.prompt;

        // Populate tips
        const tipsHtml = combo.tips.map(tip => `<li>${tip}</li>`).join('');
        document.getElementById('modal-tips').innerHTML = tipsHtml;

        // Show modal
        this.modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // ========================================
    // Filtering
    // ========================================
    setFilter(category) {
        this.activeFilter = category;

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        this.applyFilters();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        const cards = this.grid.querySelectorAll('.combo-card');

        cards.forEach(card => {
            const combo = getComboById(card.dataset.id);
            if (!combo) return;

            const matchesCategory = this.activeFilter === 'all' ||
                combo.category === this.activeFilter;

            const matchesSearch = !this.searchQuery ||
                combo.name.toLowerCase().includes(this.searchQuery) ||
                combo.description.toLowerCase().includes(this.searchQuery) ||
                combo.capabilities.some(cap => cap.toLowerCase().includes(this.searchQuery));

            const isVisible = matchesCategory && matchesSearch;
            card.classList.toggle('filtered-out', !isVisible);
        });
    }

    // ========================================
    // Events
    // ========================================
    bindEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.category));
        });

        // Search
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Modal close
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });

        // Copy prompt button
        document.getElementById('copy-prompt').addEventListener('click', (e) => {
            const code = document.getElementById('modal-prompt').querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                e.target.textContent = 'Copied!';
                e.target.classList.add('copied');
                setTimeout(() => {
                    e.target.textContent = 'Copy Prompt';
                    e.target.classList.remove('copied');
                }, 2000);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }

            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
        });
    }
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.combosController = new CombosController();
});
