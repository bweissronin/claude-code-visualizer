// ========================================
// Claude Code Workflow Combos
// ========================================

const COMBOS_DATA = [
    // ========================================
    // DEVELOPMENT WORKFLOWS
    // ========================================
    {
        id: 'feature-from-scratch',
        name: 'Feature From Scratch',
        category: 'development',
        difficulty: 3,
        icon: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        description: 'Plan, implement, and test a complete feature using agent coordination and sub-agents for parallel exploration.',
        capabilities: ['main-agent', 'agent-plan', 'agent-explore', 'tools-edit', 'tools-bash'],
        steps: [
            {
                title: 'Explore the Codebase',
                description: 'Let Claude understand your project structure, patterns, and conventions before writing any code.',
                capability: 'agent-explore'
            },
            {
                title: 'Plan the Implementation',
                description: 'Use plan mode to design the architecture, identify files to modify, and break down into steps.',
                capability: 'agent-plan'
            },
            {
                title: 'Implement with Context',
                description: 'Claude writes code following your existing patterns, creating/editing files as needed.',
                capability: 'tools-edit'
            },
            {
                title: 'Run Tests & Iterate',
                description: 'Execute tests, fix issues, and refine until the feature works correctly.',
                capability: 'tools-bash'
            }
        ],
        prompt: `I need to implement a new feature: [describe feature].

Before writing any code:
1. Explore the codebase to understand existing patterns
2. Create a plan for implementation
3. Identify all files that need to be created or modified

Then implement the feature following our existing conventions, and run the tests to make sure everything works.`,
        tips: [
            'Start with /init to give Claude project context via CLAUDE.md',
            'Use "think step by step" for complex features',
            'Ask Claude to explain its plan before implementing',
            'Commit incrementally as features are completed'
        ]
    },
    {
        id: 'test-driven-dev',
        name: 'Test-Driven Development',
        category: 'development',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
        description: 'Write tests first, then implement code to make them pass. Claude handles both sides of the TDD loop.',
        capabilities: ['main-agent', 'tools-edit', 'tools-bash', 'tools-read'],
        steps: [
            {
                title: 'Describe the Behavior',
                description: 'Explain what the code should do in plain English.',
                capability: 'main-agent'
            },
            {
                title: 'Write Failing Tests',
                description: 'Claude creates comprehensive tests that define the expected behavior.',
                capability: 'tools-edit'
            },
            {
                title: 'Run Tests (Red)',
                description: 'Verify tests fail as expected before implementation.',
                capability: 'tools-bash'
            },
            {
                title: 'Implement to Pass',
                description: 'Write the minimal code needed to make tests pass.',
                capability: 'tools-edit'
            },
            {
                title: 'Refactor (Green)',
                description: 'Clean up the implementation while keeping tests green.',
                capability: 'tools-edit'
            }
        ],
        prompt: `Let's do TDD for [feature/function name].

First, write comprehensive tests for this behavior:
[describe expected behavior]

Run the tests to confirm they fail, then implement the code to make them pass. After tests are green, refactor if needed while keeping tests passing.`,
        tips: [
            'Be specific about edge cases you want tested',
            'Ask for both unit and integration tests',
            'Have Claude explain why each test case matters',
            'Use --continue to iterate on test failures'
        ]
    },
    {
        id: 'api-integration',
        name: 'API Integration',
        category: 'development',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><line x1="9" y1="12" x2="15" y2="12"/></svg>',
        description: 'Research an API, understand its docs, and implement a clean integration with proper error handling.',
        capabilities: ['tools-websearch', 'tools-webfetch', 'agent-explore', 'tools-edit', 'tools-bash'],
        steps: [
            {
                title: 'Research the API',
                description: 'Search for documentation, examples, and best practices.',
                capability: 'tools-websearch'
            },
            {
                title: 'Fetch Documentation',
                description: 'Read the official docs to understand endpoints and authentication.',
                capability: 'tools-webfetch'
            },
            {
                title: 'Find Existing Patterns',
                description: 'Look for similar integrations in your codebase to match conventions.',
                capability: 'agent-explore'
            },
            {
                title: 'Implement Integration',
                description: 'Write the client code with proper typing, error handling, and retries.',
                capability: 'tools-edit'
            },
            {
                title: 'Test the Integration',
                description: 'Create tests and verify the integration works.',
                capability: 'tools-bash'
            }
        ],
        prompt: `I need to integrate with [API name].

1. Search for the latest documentation and best practices
2. Check our codebase for similar API integrations to match our patterns
3. Implement the integration with:
   - Proper TypeScript types
   - Error handling and retries
   - Rate limiting if needed
   - Unit tests with mocked responses`,
        tips: [
            'Ask Claude to find the official SDK if one exists',
            'Request OpenAPI/Swagger spec parsing if available',
            'Have Claude create a dedicated client class',
            'Include authentication refresh logic upfront'
        ]
    },

    // ========================================
    // DEBUGGING WORKFLOWS
    // ========================================
    {
        id: 'bug-hunt',
        name: 'Bug Hunt',
        category: 'debugging',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/><path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>',
        description: 'Systematically track down a bug by analyzing code, logs, and behavior to find the root cause.',
        capabilities: ['main-agent', 'tools-grep', 'tools-read', 'agent-explore', 'tools-bash'],
        steps: [
            {
                title: 'Understand the Symptom',
                description: 'Describe the bug clearly and share any error messages or logs.',
                capability: 'main-agent'
            },
            {
                title: 'Search for Clues',
                description: 'Find related code, error handlers, and recent changes.',
                capability: 'tools-grep'
            },
            {
                title: 'Trace the Flow',
                description: 'Follow the code path to understand where things go wrong.',
                capability: 'agent-explore'
            },
            {
                title: 'Add Debug Logging',
                description: 'Insert strategic logs to narrow down the issue.',
                capability: 'tools-edit'
            },
            {
                title: 'Test & Verify Fix',
                description: 'Apply the fix and confirm the bug is resolved.',
                capability: 'tools-bash'
            }
        ],
        prompt: `I'm seeing this bug: [describe the bug]

Error message: [paste error if any]

Help me track down the root cause:
1. Search for related code and error handling
2. Trace the execution flow
3. Identify potential causes
4. Fix the issue and add a test to prevent regression`,
        tips: [
            'Share the full stack trace if available',
            'Mention when the bug started (recent deploy?)',
            'Ask Claude to check git history for related changes',
            'Request a regression test with the fix'
        ]
    },
    {
        id: 'performance-profiling',
        name: 'Performance Profiling',
        category: 'debugging',
        difficulty: 3,
        icon: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 6-6"/></svg>',
        description: 'Find and fix performance bottlenecks by analyzing code patterns and implementing optimizations.',
        capabilities: ['agent-explore', 'tools-grep', 'tools-read', 'tools-edit', 'tools-bash'],
        steps: [
            {
                title: 'Identify Hot Paths',
                description: 'Find the slow code paths based on symptoms or profiling data.',
                capability: 'agent-explore'
            },
            {
                title: 'Analyze Patterns',
                description: 'Look for N+1 queries, unnecessary loops, or missing caching.',
                capability: 'tools-read'
            },
            {
                title: 'Find Similar Issues',
                description: 'Search codebase for patterns that might have the same problem.',
                capability: 'tools-grep'
            },
            {
                title: 'Implement Optimizations',
                description: 'Apply fixes like caching, batching, or algorithm improvements.',
                capability: 'tools-edit'
            },
            {
                title: 'Benchmark',
                description: 'Measure before and after to verify improvements.',
                capability: 'tools-bash'
            }
        ],
        prompt: `This code path is slow: [describe the slow behavior]

Analyze for performance issues:
1. Look for N+1 queries or database issues
2. Check for unnecessary loops or computations
3. Identify missing caching opportunities
4. Find any blocking operations that could be async

Suggest and implement optimizations with benchmarks.`,
        tips: [
            'Share any profiling data you have',
            'Ask Claude to add timing logs before optimizing',
            'Consider asking for multiple optimization strategies',
            'Request before/after performance comparisons'
        ]
    },

    // ========================================
    // REFACTORING WORKFLOWS
    // ========================================
    {
        id: 'safe-refactor',
        name: 'Safe Refactor',
        category: 'refactoring',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3l-9 9"/><path d="M3 21l9-9"/></svg>',
        description: 'Refactor code safely by understanding all usages, making incremental changes, and verifying with tests.',
        capabilities: ['agent-explore', 'tools-grep', 'tools-read', 'tools-edit', 'tools-bash'],
        steps: [
            {
                title: 'Map All Usages',
                description: 'Find everywhere the code is used before changing it.',
                capability: 'tools-grep'
            },
            {
                title: 'Understand the Context',
                description: 'Read related code to understand constraints and edge cases.',
                capability: 'agent-explore'
            },
            {
                title: 'Plan the Refactor',
                description: 'Break into small, safe steps that can be verified individually.',
                capability: 'main-agent'
            },
            {
                title: 'Incremental Changes',
                description: 'Make one change at a time, running tests after each.',
                capability: 'tools-edit'
            },
            {
                title: 'Verify Behavior',
                description: 'Run full test suite to ensure nothing broke.',
                capability: 'tools-bash'
            }
        ],
        prompt: `I want to refactor [describe what you want to change].

Before making any changes:
1. Find all usages of this code
2. Understand the full context and edge cases
3. Plan the safest refactoring approach

Make changes incrementally and run tests after each step to catch any regressions early.`,
        tips: [
            'Ask Claude to list all affected files first',
            'Request backwards-compatible changes when possible',
            'Have Claude update tests alongside code',
            'Consider feature flags for risky refactors'
        ]
    },
    {
        id: 'code-modernization',
        name: 'Code Modernization',
        category: 'refactoring',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83"/><circle cx="12" cy="12" r="5"/></svg>',
        description: 'Update legacy code to modern patterns, syntax, and best practices while maintaining functionality.',
        capabilities: ['tools-read', 'agent-explore', 'tools-edit', 'tools-bash', 'tools-websearch'],
        steps: [
            {
                title: 'Assess Current State',
                description: 'Understand the legacy code and identify what needs modernizing.',
                capability: 'tools-read'
            },
            {
                title: 'Research Modern Patterns',
                description: 'Find current best practices for the technology stack.',
                capability: 'tools-websearch'
            },
            {
                title: 'Check Project Standards',
                description: 'Look at newer code in the project for patterns to follow.',
                capability: 'agent-explore'
            },
            {
                title: 'Modernize Incrementally',
                description: 'Update code section by section, preserving behavior.',
                capability: 'tools-edit'
            },
            {
                title: 'Verify & Document',
                description: 'Test thoroughly and update any documentation.',
                capability: 'tools-bash'
            }
        ],
        prompt: `This code needs modernization: [file or describe the code]

Update it to use modern patterns:
1. Identify outdated syntax or patterns
2. Check how similar code is written elsewhere in our project
3. Modernize while preserving exact functionality
4. Add any missing types or tests`,
        tips: [
            'Specify target language version (ES2022, Python 3.11, etc.)',
            'Ask for specific patterns (async/await, hooks, etc.)',
            'Request that Claude explains each modernization',
            'Modernize tests at the same time as code'
        ]
    },

    // ========================================
    // DEVOPS WORKFLOWS
    // ========================================
    {
        id: 'ci-cd-setup',
        name: 'CI/CD Pipeline Setup',
        category: 'devops',
        difficulty: 3,
        icon: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v6m12-6v6M9 6h6m-6 12h6"/></svg>',
        description: 'Set up automated testing, building, and deployment pipelines using GitHub Actions or similar.',
        capabilities: ['integration-github', 'tools-read', 'tools-edit', 'agent-explore', 'tools-bash'],
        steps: [
            {
                title: 'Analyze Project Structure',
                description: 'Understand build system, test setup, and deployment needs.',
                capability: 'agent-explore'
            },
            {
                title: 'Check Existing CI',
                description: 'Look for any existing workflows or CI configuration.',
                capability: 'tools-read'
            },
            {
                title: 'Create Workflows',
                description: 'Write GitHub Actions workflows for CI/CD.',
                capability: 'tools-edit'
            },
            {
                title: 'Test Locally',
                description: 'Verify workflow syntax and logic before pushing.',
                capability: 'tools-bash'
            },
            {
                title: 'Push & Monitor',
                description: 'Deploy workflows and check the first runs.',
                capability: 'integration-github'
            }
        ],
        prompt: `Set up CI/CD for this project:

1. Analyze the project structure and build system
2. Create GitHub Actions workflows for:
   - Running tests on PRs
   - Building on main branch
   - Deploying to [staging/production]
3. Include caching for faster builds
4. Add status badges to README`,
        tips: [
            'Ask for matrix testing across versions',
            'Include dependency caching from the start',
            'Request secrets management setup',
            'Have Claude add workflow dispatch for manual runs'
        ]
    },
    {
        id: 'pr-review',
        name: 'PR Review Assistant',
        category: 'devops',
        difficulty: 1,
        icon: '<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
        description: 'Get thorough code review with security checks, best practice suggestions, and improvement ideas.',
        capabilities: ['integration-github', 'tools-read', 'tools-grep', 'cmd-review', 'main-agent'],
        steps: [
            {
                title: 'Fetch PR Details',
                description: 'Get the PR diff and understand what changed.',
                capability: 'integration-github'
            },
            {
                title: 'Review Changes',
                description: 'Analyze code for bugs, security issues, and style.',
                capability: 'cmd-review'
            },
            {
                title: 'Check Context',
                description: 'Read related code to understand the full picture.',
                capability: 'tools-read'
            },
            {
                title: 'Search for Patterns',
                description: 'Find similar code to ensure consistency.',
                capability: 'tools-grep'
            },
            {
                title: 'Provide Feedback',
                description: 'Summarize findings with specific suggestions.',
                capability: 'main-agent'
            }
        ],
        prompt: `Review this PR: [PR URL or number]

Check for:
1. Bugs or logic errors
2. Security vulnerabilities
3. Performance issues
4. Code style consistency
5. Missing tests or documentation

Provide specific, actionable feedback with code suggestions where helpful.`,
        tips: [
            'Use /review command for quick PR reviews',
            'Ask for security-focused review specifically',
            'Request that Claude check test coverage',
            'Have Claude suggest tests for uncovered paths'
        ]
    },

    // ========================================
    // RESEARCH WORKFLOWS
    // ========================================
    {
        id: 'codebase-onboarding',
        name: 'Codebase Onboarding',
        category: 'research',
        difficulty: 1,
        icon: '<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        description: 'Quickly understand a new codebase by exploring structure, patterns, and key components.',
        capabilities: ['agent-explore', 'tools-glob', 'tools-read', 'tools-grep', 'main-agent'],
        steps: [
            {
                title: 'Map the Structure',
                description: 'Understand the directory layout and file organization.',
                capability: 'tools-glob'
            },
            {
                title: 'Find Entry Points',
                description: 'Locate main files, configs, and startup code.',
                capability: 'agent-explore'
            },
            {
                title: 'Identify Patterns',
                description: 'Discover architectural patterns and conventions used.',
                capability: 'tools-read'
            },
            {
                title: 'Find Key Components',
                description: 'Search for core business logic and shared utilities.',
                capability: 'tools-grep'
            },
            {
                title: 'Generate Summary',
                description: 'Create a mental model of how everything fits together.',
                capability: 'main-agent'
            }
        ],
        prompt: `I'm new to this codebase. Help me understand it:

1. What's the overall structure and organization?
2. What are the main entry points?
3. What architectural patterns are used?
4. Where is the core business logic?
5. What are the key dependencies and why?

Create a summary that would help a new developer get up to speed quickly.`,
        tips: [
            'Run /init first to create CLAUDE.md',
            'Ask about testing conventions too',
            'Request a "glossary" of project-specific terms',
            'Have Claude create an architecture diagram in Mermaid'
        ]
    },
    {
        id: 'technology-research',
        name: 'Technology Research',
        category: 'research',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6m-3-3h6"/></svg>',
        description: 'Research a technology, framework, or library to make informed decisions for your project.',
        capabilities: ['tools-websearch', 'tools-webfetch', 'main-agent', 'agent-explore', 'tools-edit'],
        steps: [
            {
                title: 'Search for Info',
                description: 'Find documentation, comparisons, and community opinions.',
                capability: 'tools-websearch'
            },
            {
                title: 'Read Documentation',
                description: 'Fetch and analyze official docs and guides.',
                capability: 'tools-webfetch'
            },
            {
                title: 'Analyze Trade-offs',
                description: 'Compare options and understand pros/cons.',
                capability: 'main-agent'
            },
            {
                title: 'Check Compatibility',
                description: 'See how it fits with your existing stack.',
                capability: 'agent-explore'
            },
            {
                title: 'Create Proof of Concept',
                description: 'Implement a small test to validate the choice.',
                capability: 'tools-edit'
            }
        ],
        prompt: `I'm evaluating [technology/framework] for [use case].

Research this for me:
1. What are the main features and benefits?
2. What are the drawbacks or limitations?
3. How does it compare to alternatives?
4. Will it work well with our current stack?
5. What's the learning curve and community support like?

Provide a recommendation with reasoning.`,
        tips: [
            'Specify your evaluation criteria upfront',
            'Ask about production-readiness and stability',
            'Request real-world case studies if available',
            'Have Claude check GitHub issues for common problems'
        ]
    },
    {
        id: 'documentation-generator',
        name: 'Documentation Generator',
        category: 'research',
        difficulty: 2,
        icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8m2-8H8"/></svg>',
        description: 'Generate comprehensive documentation by analyzing code and extracting key information.',
        capabilities: ['agent-explore', 'tools-read', 'tools-grep', 'tools-edit', 'main-agent'],
        steps: [
            {
                title: 'Explore the Code',
                description: 'Understand the codebase structure and components.',
                capability: 'agent-explore'
            },
            {
                title: 'Read Key Files',
                description: 'Analyze important modules, APIs, and interfaces.',
                capability: 'tools-read'
            },
            {
                title: 'Find Examples',
                description: 'Search for usage patterns and test cases.',
                capability: 'tools-grep'
            },
            {
                title: 'Generate Docs',
                description: 'Write clear documentation with examples.',
                capability: 'tools-edit'
            },
            {
                title: 'Review & Refine',
                description: 'Ensure accuracy and completeness.',
                capability: 'main-agent'
            }
        ],
        prompt: `Generate documentation for [module/API/project]:

1. Explore the code to understand what it does
2. Document:
   - Overview and purpose
   - Installation/setup
   - API reference with all public methods
   - Usage examples
   - Common patterns and best practices
3. Use actual code examples from tests when possible`,
        tips: [
            'Specify documentation format (README, JSDoc, etc.)',
            'Ask for different docs for different audiences',
            'Request diagrams for complex flows',
            'Have Claude add a troubleshooting section'
        ]
    }
];

// Helper functions
function getAllCombos() {
    return COMBOS_DATA;
}

function getComboById(id) {
    return COMBOS_DATA.find(combo => combo.id === id);
}

function getCombosByCategory(category) {
    if (category === 'all') return COMBOS_DATA;
    return COMBOS_DATA.filter(combo => combo.category === category);
}

function searchCombos(query) {
    const lowerQuery = query.toLowerCase();
    return COMBOS_DATA.filter(combo =>
        combo.name.toLowerCase().includes(lowerQuery) ||
        combo.description.toLowerCase().includes(lowerQuery) ||
        combo.capabilities.some(cap => cap.toLowerCase().includes(lowerQuery))
    );
}
