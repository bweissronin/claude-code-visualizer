// ========================================
// Claude Code Capabilities Data
// ========================================

// SVG Icons - Thin white line style
const ICONS = {
    // Agents
    'main-agent': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/></svg>',
    'sub-agents': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="12" y1="12" x2="6" y2="15"/><line x1="12" y1="12" x2="18" y2="15"/></svg>',
    'agent-explore': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><line x1="16" y1="16" x2="21" y2="21"/><circle cx="11" cy="11" r="3"/></svg>',
    'agent-plan': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>',
    'agent-teams': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="12" cy="16" r="3"/><line x1="8" y1="11" x2="8" y2="13"/><line x1="16" y1="11" x2="16" y2="13"/><line x1="10" y1="14" x2="8" y2="13"/><line x1="14" y1="14" x2="16" y2="13"/></svg>',

    // Tools
    'tools-read': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M4 4l8 6 8-6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="16" x2="14" y2="16"/></svg>',
    'tools-edit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 3l5 5-12 12H4v-5L16 3z"/><line x1="14" y1="6" x2="18" y2="10"/></svg>',
    'tools-write': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>',
    'tools-bash': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="7 10 10 12 7 14"/><line x1="12" y1="14" x2="17" y2="14"/></svg>',
    'tools-grep': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><line x1="7" y1="10" x2="13" y2="10"/></svg>',
    'tools-glob': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h4v4H3z"/><path d="M10 7h4v4h-4z"/><path d="M17 7h4v4h-4z"/><path d="M3 14h4v4H3z"/><path d="M10 14h4v4h-4z"/><line x1="5" y1="4" x2="5" y2="7"/><line x1="12" y1="4" x2="12" y2="7"/><line x1="19" y1="4" x2="19" y2="7"/></svg>',
    'tools-webfetch': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/></svg>',
    'tools-websearch': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a9 9 0 0 1 0 18"/><circle cx="18" cy="18" r="3"/><line x1="20" y1="20" x2="22" y2="22"/></svg>',

    // Commands
    'cmd-help': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 3 3v2"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>',
    'cmd-init': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>',
    'cmd-clear': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
    'cmd-compact': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><polyline points="8 10 12 14 16 10"/><line x1="12" y1="6" x2="12" y2="14"/></svg>',
    'cmd-config': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    'cmd-cost': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>',
    'cmd-doctor': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="10" y1="10" x2="14" y2="10"/></svg>',
    'cmd-memory': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><line x1="9" y1="4" x2="9" y2="9"/><circle cx="12" cy="15" r="2"/><line x1="12" y1="17" x2="12" y2="20"/></svg>',
    'cmd-model': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/><line x1="9" y1="6" x2="9" y2="4"/><line x1="15" y1="6" x2="15" y2="4"/></svg>',
    'cmd-permissions': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'cmd-review': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="5" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="19"/></svg>',
    'cmd-mcp': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="9" width="8" height="6" rx="1"/><rect x="14" y="9" width="8" height="6" rx="1"/><line x1="10" y1="12" x2="14" y2="12"/><circle cx="6" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>',
    'cmd-vim': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',

    // Skills
    'skill-custom': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'skill-mcp': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="4" cy="12" r="2"/><line x1="12" y1="6" x2="12" y2="9"/><line x1="18" y1="12" x2="15" y2="12"/><line x1="12" y1="18" x2="12" y2="15"/><line x1="6" y1="12" x2="9" y2="12"/></svg>',
    'skill-plugins': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/><line x1="10" y1="7" x2="14" y2="7"/><line x1="10" y1="17" x2="14" y2="17"/><line x1="7" y1="10" x2="7" y2="14"/><line x1="17" y1="10" x2="17" y2="14"/></svg>',
    'skill-agent-sdk': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',

    // Integrations
    'integration-github': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    'integration-actions': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2"/></svg>',
    'integration-slack': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>',
    'integration-vscode': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 2l4 2v16l-4 2-9-7.5L4 18V6l4-3.5L17 10z"/><polyline points="8 6 8 18"/><polyline points="17 6 17 18"/></svg>',
    'integration-jetbrains': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="7" y="7" width="10" height="10"/><line x1="7" y1="14" x2="14" y2="14"/></svg>',
    'integration-chrome': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="8"/><line x1="4.5" y1="16.5" x2="8.5" y2="13.5"/><line x1="19.5" y1="16.5" x2="15.5" y2="13.5"/></svg>',

    // Config
    'config-settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/></svg>',
    'config-permissions': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l8 4v6c0 5.5-3.5 10-8 11-4.5-1-8-5.5-8-11V6l8-4z"/><polyline points="9 12 11 14 15 10"/></svg>',
    'config-rules': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><circle cx="8" cy="13" r="0.5" fill="currentColor"/><circle cx="8" cy="17" r="0.5" fill="currentColor"/></svg>',
    'config-hooks': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    'config-claudemd': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><text x="7" y="11" font-size="5" fill="currentColor" stroke="none">MD</text></svg>',
    'config-memory': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>'
};

const CAPABILITIES_DATA = {
    // ========================================
    // AGENTS
    // ========================================
    agents: [
        {
            id: 'main-agent',
            name: 'Main Agent',
            icon: ICONS['main-agent'],
            category: 'agents',
            description: 'The primary Claude Code agent that orchestrates all tasks. It analyzes requests, plans execution, selects appropriate tools, and coordinates with sub-agents when needed.',
            usage: 'claude\nclaude "your task here"\nclaude --chat',
            example: 'claude "Refactor the authentication module to use JWT tokens and add refresh token support"',
            ideas: [
                'Let it analyze your entire codebase before starting a large refactor',
                'Use conversational mode for iterative development sessions',
                'Combine with CLAUDE.md for project-specific context',
                'Chain complex tasks that span multiple files and systems'
            ],
            connections: ['sub-agents', 'tools-read', 'tools-edit', 'tools-bash', 'config-memory']
        },
        {
            id: 'sub-agents',
            name: 'Sub-Agents',
            icon: ICONS['sub-agents'],
            category: 'agents',
            description: 'Specialized agents spawned by the main agent to handle specific subtasks in isolation. They run in their own context and report back results. Great for parallel execution and complex multi-step operations.',
            usage: '// Automatically spawned by main agent\n// Or via Task tool in agentic loop\nTask({ subagent_type: "Explore", prompt: "..." })',
            example: '// Main agent spawns sub-agent for code exploration\n"Find all API endpoints and their authentication requirements"',
            ideas: [
                'Use for parallel code analysis across multiple modules',
                'Spawn explorers to understand unfamiliar codebases',
                'Delegate research tasks while continuing main work',
                'Isolate risky operations in sandboxed sub-agents'
            ],
            connections: ['main-agent', 'agent-explore', 'agent-plan', 'tools-read', 'tools-grep']
        },
        {
            id: 'agent-explore',
            name: 'Explore Agent',
            icon: ICONS['agent-explore'],
            category: 'agents',
            description: 'Fast, specialized agent for codebase exploration. Uses pattern matching, keyword search, and file analysis to quickly understand code structure and answer questions about the codebase.',
            usage: 'Task({\n  subagent_type: "Explore",\n  prompt: "How does the auth system work?"\n})',
            example: '"Find all React components that use the useAuth hook and explain the authentication flow"',
            ideas: [
                'Map out microservice communication patterns',
                'Discover undocumented APIs and their usage',
                'Trace data flow through the application',
                'Find all instances of a particular pattern or anti-pattern'
            ],
            connections: ['sub-agents', 'tools-grep', 'tools-glob', 'tools-read']
        },
        {
            id: 'agent-plan',
            name: 'Plan Agent',
            icon: ICONS['agent-plan'],
            category: 'agents',
            description: 'Software architect agent that designs implementation strategies. Creates step-by-step plans, identifies critical files, and considers architectural trade-offs before implementation begins.',
            usage: 'Task({\n  subagent_type: "Plan",\n  prompt: "Plan implementation for..."\n})',
            example: '"Design the implementation plan for adding real-time collaboration to the document editor"',
            ideas: [
                'Get architectural review before major changes',
                'Compare different implementation approaches',
                'Identify potential breaking changes early',
                'Create documentation from implementation plans'
            ],
            connections: ['sub-agents', 'main-agent', 'tools-read', 'config-claudemd']
        },
        {
            id: 'agent-teams',
            name: 'Agent Teams',
            icon: ICONS['agent-teams'],
            category: 'agents',
            description: 'Coordinate multiple Claude instances working together on large tasks. Each agent operates in isolated Git worktrees, enabling true parallel development without conflicts.',
            usage: '// Multiple parallel sessions\nclaude --worktree feature-a\nclaude --worktree feature-b',
            example: '// Team of agents working on different features\nAgent 1: "Implement user authentication"\nAgent 2: "Build the dashboard UI"\nAgent 3: "Write API integration tests"',
            ideas: [
                'Parallelize feature development across team members',
                'Run multiple refactoring tasks simultaneously',
                'Coordinate frontend and backend changes together',
                'Speed up large migrations with parallel workers'
            ],
            connections: ['main-agent', 'sub-agents', 'integration-github', 'config-settings']
        }
    ],

    // ========================================
    // TOOLS
    // ========================================
    tools: [
        {
            id: 'tools-read',
            name: 'Read',
            icon: ICONS['tools-read'],
            category: 'tools',
            description: 'Reads files from the filesystem including code, images, PDFs, and Jupyter notebooks. Supports line ranges for large files. Foundation for all code understanding.',
            usage: 'Read({ file_path: "/path/to/file.js" })\nRead({ file_path: "/path/to/file.js", offset: 100, limit: 50 })',
            example: '// Read a TypeScript file\nRead({ file_path: "/src/components/Button.tsx" })\n\n// Read specific lines\nRead({ file_path: "/src/app.ts", offset: 150, limit: 30 })',
            ideas: [
                'Read config files before making changes',
                'Analyze package.json for dependency insights',
                'Review test files to understand expected behavior',
                'Read images/screenshots for visual debugging'
            ],
            connections: ['tools-edit', 'tools-grep', 'main-agent', 'config-permissions']
        },
        {
            id: 'tools-edit',
            name: 'Edit',
            icon: ICONS['tools-edit'],
            category: 'tools',
            description: 'Performs precise string replacements in files. Requires reading the file first. Supports exact matching and replace-all for refactoring.',
            usage: 'Edit({\n  file_path: "/path/to/file.js",\n  old_string: "const foo = 1",\n  new_string: "const foo = 2"\n})',
            example: '// Rename a function\nEdit({\n  file_path: "/src/utils.ts",\n  old_string: "function getData(",\n  new_string: "function fetchUserData(",\n  replace_all: true\n})',
            ideas: [
                'Refactor variable names across a file',
                'Update import statements',
                'Fix bugs with surgical precision',
                'Add error handling to existing functions'
            ],
            connections: ['tools-read', 'tools-write', 'main-agent', 'config-permissions']
        },
        {
            id: 'tools-write',
            name: 'Write',
            icon: ICONS['tools-write'],
            category: 'tools',
            description: 'Creates new files or completely overwrites existing ones. Use sparingly - prefer Edit for modifications. Must read existing files before overwriting.',
            usage: 'Write({\n  file_path: "/path/to/new-file.js",\n  content: "// File contents here"\n})',
            example: '// Create a new React component\nWrite({\n  file_path: "/src/components/Modal.tsx",\n  content: `import React from "react";\n\nexport const Modal = ({ children }) => {\n  return <div className="modal">{children}</div>;\n};`\n})',
            ideas: [
                'Generate boilerplate for new components',
                'Create configuration files from templates',
                'Write new test files for uncovered code',
                'Generate TypeScript type definitions'
            ],
            connections: ['tools-read', 'tools-edit', 'main-agent', 'config-permissions']
        },
        {
            id: 'tools-bash',
            name: 'Bash',
            icon: ICONS['tools-bash'],
            category: 'tools',
            description: 'Executes shell commands with optional timeout. Used for git operations, running tests, installing packages, and system commands. Sandboxed for safety.',
            usage: 'Bash({ command: "npm run test" })\nBash({ command: "git status", timeout: 5000 })',
            example: '// Run tests and check results\nBash({ command: "npm run test -- --coverage" })\n\n// Install a package\nBash({ command: "npm install lodash @types/lodash" })',
            ideas: [
                'Run test suites after making changes',
                'Execute build scripts to verify compilation',
                'Use git commands for version control',
                'Run linters and formatters'
            ],
            connections: ['main-agent', 'integration-github', 'config-permissions', 'config-hooks']
        },
        {
            id: 'tools-grep',
            name: 'Grep',
            icon: ICONS['tools-grep'],
            category: 'tools',
            description: 'Powerful regex-based search using ripgrep. Search across entire codebases with file type filtering, context lines, and multiple output modes.',
            usage: 'Grep({ pattern: "TODO:", type: "js" })\nGrep({ pattern: "async function", glob: "**/*.ts", output_mode: "content" })',
            example: '// Find all API calls\nGrep({\n  pattern: "fetch\\\\(|axios\\\\.",\n  glob: "**/*.{ts,tsx}",\n  output_mode: "content",\n  "-C": 2\n})',
            ideas: [
                'Find all usages of a deprecated function',
                'Locate security-sensitive patterns',
                'Search for TODO/FIXME comments',
                'Find all error handling patterns'
            ],
            connections: ['tools-read', 'agent-explore', 'main-agent', 'tools-glob']
        },
        {
            id: 'tools-glob',
            name: 'Glob',
            icon: ICONS['tools-glob'],
            category: 'tools',
            description: 'Fast file pattern matching for finding files by name. Returns paths sorted by modification time. Essential for navigating large codebases.',
            usage: 'Glob({ pattern: "**/*.test.ts" })\nGlob({ pattern: "src/**/*.tsx", path: "/project" })',
            example: '// Find all React components\nGlob({ pattern: "src/components/**/*.tsx" })\n\n// Find config files\nGlob({ pattern: "**/*.config.{js,ts,json}" })',
            ideas: [
                'Discover all test files in a project',
                'Find configuration files across the codebase',
                'Locate all files of a specific type',
                'Map out project structure quickly'
            ],
            connections: ['tools-grep', 'tools-read', 'agent-explore', 'main-agent']
        },
        {
            id: 'tools-webfetch',
            name: 'WebFetch',
            icon: ICONS['tools-webfetch'],
            category: 'tools',
            description: 'Fetches and processes web content. Converts HTML to markdown and can extract specific information using AI. Useful for documentation and API research.',
            usage: 'WebFetch({\n  url: "https://docs.example.com",\n  prompt: "Extract the API endpoints"\n})',
            example: '// Fetch library documentation\nWebFetch({\n  url: "https://react.dev/reference/react/useState",\n  prompt: "Summarize the useState hook API and common patterns"\n})',
            ideas: [
                'Research library documentation while coding',
                'Fetch API specs for integration work',
                'Get latest best practices from official docs',
                'Extract examples from tutorials'
            ],
            connections: ['main-agent', 'tools-websearch', 'config-permissions']
        },
        {
            id: 'tools-websearch',
            name: 'WebSearch',
            icon: ICONS['tools-websearch'],
            category: 'tools',
            description: 'Searches the web for up-to-date information. Returns search results with links. Great for finding solutions, documentation, and current best practices.',
            usage: 'WebSearch({ query: "React 19 new features" })',
            example: '// Search for error solutions\nWebSearch({ query: "TypeError cannot read property of undefined React hooks" })',
            ideas: [
                'Find solutions to obscure error messages',
                'Research current best practices',
                'Discover new libraries and tools',
                'Get context on unfamiliar technologies'
            ],
            connections: ['main-agent', 'tools-webfetch']
        }
    ],

    // ========================================
    // COMMANDS (Slash Commands)
    // ========================================
    commands: [
        {
            id: 'cmd-help',
            name: '/help',
            icon: ICONS['cmd-help'],
            category: 'commands',
            description: 'Displays available commands, keyboard shortcuts, and usage information. Your starting point for discovering Claude Code capabilities.',
            usage: '/help',
            example: '/help',
            ideas: [
                'Check available commands in any context',
                'Discover keyboard shortcuts',
                'Find less commonly used features',
                'Quick reference during sessions'
            ],
            connections: ['main-agent', 'cmd-config']
        },
        {
            id: 'cmd-init',
            name: '/init',
            icon: ICONS['cmd-init'],
            category: 'commands',
            description: 'Initializes Claude Code in the current project. Creates CLAUDE.md with project context and sets up recommended configurations.',
            usage: '/init',
            example: '/init\n# Follow prompts to configure project',
            ideas: [
                'Set up new projects with best practices',
                'Generate initial CLAUDE.md with project understanding',
                'Configure team-wide settings',
                'Bootstrap Claude Code for existing codebases'
            ],
            connections: ['config-claudemd', 'config-settings', 'main-agent']
        },
        {
            id: 'cmd-clear',
            name: '/clear',
            icon: ICONS['cmd-clear'],
            category: 'commands',
            description: 'Clears the current conversation context. Useful when starting a new task or when context becomes cluttered.',
            usage: '/clear',
            example: '/clear\n# Start fresh conversation',
            ideas: [
                'Reset context after completing a task',
                'Clear when switching between unrelated tasks',
                'Free up context window for new work',
                'Start debugging with a clean slate'
            ],
            connections: ['main-agent', 'cmd-compact', 'config-memory']
        },
        {
            id: 'cmd-compact',
            name: '/compact',
            icon: ICONS['cmd-compact'],
            category: 'commands',
            description: 'Summarizes and compresses the current conversation context. Preserves important information while reducing token usage.',
            usage: '/compact\n/compact "focus on the API changes"',
            example: '/compact "Keep details about the authentication refactor"',
            ideas: [
                'Preserve important context during long sessions',
                'Focus summary on specific aspects of work',
                'Reduce costs while maintaining continuity',
                'Prepare for context-heavy operations'
            ],
            connections: ['main-agent', 'cmd-clear', 'config-memory']
        },
        {
            id: 'cmd-config',
            name: '/config',
            icon: ICONS['cmd-config'],
            category: 'commands',
            description: 'View and edit Claude Code configuration. Access settings, permissions, and preferences interactively.',
            usage: '/config',
            example: '/config\n# Opens configuration interface',
            ideas: [
                'Adjust permissions for current project',
                'View active configuration hierarchy',
                'Debug configuration issues',
                'Quick access to common settings'
            ],
            connections: ['config-settings', 'config-permissions', 'main-agent']
        },
        {
            id: 'cmd-cost',
            name: '/cost',
            icon: ICONS['cmd-cost'],
            category: 'commands',
            description: 'Shows token usage and estimated costs for the current session. Helps monitor API consumption.',
            usage: '/cost',
            example: '/cost\n# Token usage: 45,231 input, 12,456 output\n# Estimated cost: $0.42',
            ideas: [
                'Monitor costs during expensive operations',
                'Compare efficiency of different approaches',
                'Set mental budgets for sessions',
                'Identify cost-heavy operations'
            ],
            connections: ['main-agent', 'cmd-compact']
        },
        {
            id: 'cmd-doctor',
            name: '/doctor',
            icon: ICONS['cmd-doctor'],
            category: 'commands',
            description: 'Runs diagnostic checks on Claude Code installation and configuration. Identifies issues and suggests fixes.',
            usage: '/doctor',
            example: '/doctor\n# Checking configuration...\n# Checking authentication...\n# All systems operational',
            ideas: [
                'Troubleshoot connection issues',
                'Verify installation is correct',
                'Check MCP server status',
                'Debug permission problems'
            ],
            connections: ['config-settings', 'skill-mcp', 'main-agent']
        },
        {
            id: 'cmd-memory',
            name: '/memory',
            icon: ICONS['cmd-memory'],
            category: 'commands',
            description: 'View and edit CLAUDE.md memory files. Manage project instructions, preferences, and learned context.',
            usage: '/memory\n/memory edit',
            example: '/memory\n# Shows current memory files\n\n/memory edit\n# Opens CLAUDE.md for editing',
            ideas: [
                'Add project-specific instructions',
                'Review what Claude has learned',
                'Update coding standards',
                'Share team conventions'
            ],
            connections: ['config-claudemd', 'config-memory', 'main-agent']
        },
        {
            id: 'cmd-model',
            name: '/model',
            icon: ICONS['cmd-model'],
            category: 'commands',
            description: 'Switch between available Claude models. Choose based on task complexity, speed requirements, and cost.',
            usage: '/model\n/model sonnet',
            example: '/model opus\n# Switched to claude-opus for complex reasoning',
            ideas: [
                'Use Haiku for simple, fast tasks',
                'Switch to Opus for complex architecture',
                'Optimize costs with model selection',
                'Test behavior across models'
            ],
            connections: ['main-agent', 'config-settings']
        },
        {
            id: 'cmd-permissions',
            name: '/permissions',
            icon: ICONS['cmd-permissions'],
            category: 'commands',
            description: 'Manage tool permissions and approval settings. Control what actions Claude can take automatically.',
            usage: '/permissions\n/permissions allow Bash(npm *)',
            example: '/permissions allow Edit\n# Now auto-approves file edits\n\n/permissions deny Bash(rm *)\n# Blocks dangerous commands',
            ideas: [
                'Pre-approve common development commands',
                'Lock down sensitive operations',
                'Configure per-project permissions',
                'Speed up workflows with auto-approval'
            ],
            connections: ['config-permissions', 'config-rules', 'main-agent']
        },
        {
            id: 'cmd-review',
            name: '/review',
            icon: ICONS['cmd-review'],
            category: 'commands',
            description: 'Starts code review mode. Claude analyzes changes, identifies issues, and suggests improvements.',
            usage: '/review\n/review --diff HEAD~3',
            example: '/review\n# Reviews staged changes\n\n/review src/auth/\n# Reviews specific directory',
            ideas: [
                'Review before committing changes',
                'Get feedback on pull request changes',
                'Analyze code quality systematically',
                'Find potential bugs and security issues'
            ],
            connections: ['main-agent', 'integration-github', 'tools-read']
        },
        {
            id: 'cmd-mcp',
            name: '/mcp',
            icon: ICONS['cmd-mcp'],
            category: 'commands',
            description: 'Manage Model Context Protocol servers. Add, remove, and configure external tool integrations.',
            usage: '/mcp\n/mcp add server-name',
            example: '/mcp\n# Lists configured MCP servers\n\n/mcp add filesystem\n# Adds filesystem MCP server',
            ideas: [
                'Connect to database tools',
                'Add custom API integrations',
                'Configure team-shared tools',
                'Debug MCP connection issues'
            ],
            connections: ['skill-mcp', 'config-settings', 'main-agent']
        },
        {
            id: 'cmd-vim',
            name: '/vim',
            icon: ICONS['cmd-vim'],
            category: 'commands',
            description: 'Toggle vim-style keybindings for the Claude Code interface. For developers who prefer modal editing.',
            usage: '/vim',
            example: '/vim\n# Vim mode enabled',
            ideas: [
                'Use familiar vim navigation',
                'Faster text input for vim users',
                'Muscle memory compatibility',
                'Modal editing in terminal'
            ],
            connections: ['main-agent', 'config-settings']
        }
    ],

    // ========================================
    // SKILLS (Custom Commands & Extensions)
    // ========================================
    skills: [
        {
            id: 'skill-custom',
            name: 'Custom Skills',
            icon: ICONS['skill-custom'],
            category: 'skills',
            description: 'User-defined slash commands created via SKILL.md files. Package complex workflows into reusable commands with argument support and tool restrictions.',
            usage: '# Create ~/.claude/skills/my-skill/SKILL.md\n---\nname: my-skill\ndescription: Does something useful\n---\n# Instructions here',
            example: '# .claude/skills/deploy/SKILL.md\n---\nname: deploy\ndescription: Deploy to staging\nallowed-tools: [Bash]\n---\nRun the deployment script with $ARGUMENTS',
            ideas: [
                'Create project-specific deployment commands',
                'Build code generation templates',
                'Package team workflows as commands',
                'Automate repetitive multi-step tasks'
            ],
            connections: ['main-agent', 'skill-mcp', 'config-settings', 'cmd-help']
        },
        {
            id: 'skill-mcp',
            name: 'MCP Servers',
            icon: ICONS['skill-mcp'],
            category: 'skills',
            description: 'Model Context Protocol servers extend Claude with custom tools, resources, and prompts. Connect to databases, APIs, and external services.',
            usage: '// In settings.json\n"mcpServers": {\n  "my-server": {\n    "command": "node",\n    "args": ["server.js"]\n  }\n}',
            example: '// Connect to a database MCP\n"mcpServers": {\n  "postgres": {\n    "command": "mcp-postgres",\n    "args": ["--connection", "postgresql://..."]\n  }\n}',
            ideas: [
                'Query databases directly from Claude',
                'Integrate with internal APIs',
                'Connect to monitoring systems',
                'Build custom tooling for your stack'
            ],
            connections: ['main-agent', 'config-settings', 'cmd-mcp', 'skill-custom']
        },
        {
            id: 'skill-plugins',
            name: 'Plugins',
            icon: ICONS['skill-plugins'],
            category: 'skills',
            description: 'Distributable packages containing skills, agents, and hooks. Install from marketplace or create your own. Share configurations across teams.',
            usage: '// .claude-plugin/plugin.json\n{\n  "name": "my-plugin",\n  "skills": ["./skills/*"],\n  "hooks": ["./hooks/*"]\n}',
            example: '// Install a community plugin\nclaude plugin install @team/deployment-tools',
            ideas: [
                'Share team tooling as installable packages',
                'Distribute best practices across projects',
                'Create open-source Claude extensions',
                'Modularize complex configurations'
            ],
            connections: ['skill-custom', 'skill-mcp', 'config-hooks', 'main-agent']
        },
        {
            id: 'skill-agent-sdk',
            name: 'Agent SDK',
            icon: ICONS['skill-agent-sdk'],
            category: 'skills',
            description: 'Build custom agents programmatically. Create specialized agents for your domain with custom tools, behaviors, and integrations.',
            usage: 'import { Agent } from "@anthropic/agent-sdk";\n\nconst agent = new Agent({\n  tools: [...],\n  instructions: "..."\n});',
            example: 'const codeReviewer = new Agent({\n  name: "code-reviewer",\n  tools: [readFile, analyzeCode],\n  instructions: "Review code for security issues"\n});',
            ideas: [
                'Build domain-specific coding assistants',
                'Create automated code review bots',
                'Develop custom CI/CD agents',
                'Integrate Claude into existing tools'
            ],
            connections: ['main-agent', 'sub-agents', 'skill-mcp', 'skill-plugins']
        }
    ],

    // ========================================
    // INTEGRATIONS
    // ========================================
    integrations: [
        {
            id: 'integration-github',
            name: 'GitHub',
            icon: ICONS['integration-github'],
            category: 'integrations',
            description: 'Deep GitHub integration for PRs, issues, commits, and Actions. Auto-fix failing checks, create PRs from conversations, and monitor repositories.',
            usage: 'gh pr create\ngh issue list\nclaude "Fix the failing CI check"',
            example: '# Create PR with Claude\nclaude "Create a PR for the auth changes with a detailed description"\n\n# Fix CI failures\nclaude "The build is failing, analyze and fix the issue"',
            ideas: [
                'Auto-generate PR descriptions',
                'Fix failing CI checks automatically',
                'Triage and respond to issues',
                'Automate release notes generation'
            ],
            connections: ['main-agent', 'tools-bash', 'integration-actions', 'cmd-review']
        },
        {
            id: 'integration-actions',
            name: 'GitHub Actions',
            icon: ICONS['integration-actions'],
            category: 'integrations',
            description: 'Run Claude Code in CI/CD pipelines. Automate code review, testing, and deployment tasks within GitHub Actions workflows.',
            usage: '# .github/workflows/claude.yml\n- uses: anthropics/claude-code-action@v1\n  with:\n    task: "Review the PR changes"',
            example: 'name: Claude Review\non: pull_request\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: anthropics/claude-code-action@v1\n        with:\n          task: "Review for security issues"',
            ideas: [
                'Automated PR code review',
                'Generate test cases for new code',
                'Check for breaking changes',
                'Auto-fix linting issues'
            ],
            connections: ['integration-github', 'main-agent', 'agent-teams']
        },
        {
            id: 'integration-slack',
            name: 'Slack',
            icon: ICONS['integration-slack'],
            category: 'integrations',
            description: 'Trigger Claude Code tasks via @Claude mentions in Slack. Route tasks to appropriate channels and get progress updates in threads.',
            usage: '@Claude fix the login bug in the auth module',
            example: '# In Slack channel\n@Claude "The API is returning 500 errors on /users endpoint, investigate and fix"\n\n# Claude responds in thread with progress',
            ideas: [
                'Triage bugs directly from Slack',
                'Quick code questions without context switching',
                'Team-wide access to Claude Code',
                'Async task handoff to Claude'
            ],
            connections: ['main-agent', 'integration-github', 'agent-teams']
        },
        {
            id: 'integration-vscode',
            name: 'VS Code',
            icon: ICONS['integration-vscode'],
            category: 'integrations',
            description: 'Native VS Code extension with inline diff viewing, context from selection, and diagnostics integration. Seamless IDE experience.',
            usage: 'Cmd+Shift+P → Claude Code\n# Or use keyboard shortcut',
            example: '# Select code in VS Code\n# Cmd+Shift+P → "Claude: Explain Selection"\n# Or "Claude: Refactor Selection"',
            ideas: [
                'Get explanations for complex code',
                'Refactor selected code inline',
                'Fix errors from diagnostics panel',
                'Generate tests for selected functions'
            ],
            connections: ['main-agent', 'integration-jetbrains', 'tools-edit']
        },
        {
            id: 'integration-jetbrains',
            name: 'JetBrains IDEs',
            icon: ICONS['integration-jetbrains'],
            category: 'integrations',
            description: 'Plugin for IntelliJ, PyCharm, WebStorm, and other JetBrains IDEs. Keyboard shortcuts, diff viewer, and context from current file.',
            usage: 'Cmd+Esc (macOS)\nCtrl+Esc (Windows/Linux)',
            example: '# In any JetBrains IDE\n# Cmd+Esc to open Claude\n# Cmd+Option+K to insert file reference',
            ideas: [
                'Quick access with keyboard shortcuts',
                'Use IDE diagnostics as context',
                'Inline code generation',
                'Refactoring with IDE awareness'
            ],
            connections: ['main-agent', 'integration-vscode', 'tools-edit']
        },
        {
            id: 'integration-chrome',
            name: 'Chrome Browser',
            icon: ICONS['integration-chrome'],
            category: 'integrations',
            description: 'Control Chrome browser for web testing, scraping, and automation. Access DOM, console, and interact with web apps using your login sessions.',
            usage: 'claude --chrome\n"Click the login button and fill in credentials"',
            example: '# Start with Chrome integration\nclaude --chrome\n\n# Then:\n"Navigate to the admin panel and export the user list to CSV"',
            ideas: [
                'Automate web app testing',
                'Scrape authenticated content',
                'Debug frontend issues visually',
                'Record and replay user flows'
            ],
            connections: ['main-agent', 'tools-bash', 'tools-webfetch']
        }
    ],

    // ========================================
    // CONFIGURATION
    // ========================================
    config: [
        {
            id: 'config-settings',
            name: 'Settings',
            icon: ICONS['config-settings'],
            category: 'config',
            description: 'Hierarchical configuration system: Managed → User → Project → Local. Controls model selection, permissions, environment, and behavior.',
            usage: '// ~/.claude/settings.json\n{\n  "model": "claude-sonnet-4-5-20250929",\n  "permissions": { ... }\n}',
            example: '// Project settings: .claude/settings.json\n{\n  "model": "claude-sonnet-4-5-20250929",\n  "permissions": {\n    "allow": ["Bash(npm *)"],\n    "deny": ["Bash(rm -rf *)"]\n  }\n}',
            ideas: [
                'Set team-wide model preferences',
                'Configure environment variables',
                'Override settings per-project',
                'Manage multiple configurations'
            ],
            connections: ['config-permissions', 'config-hooks', 'cmd-config', 'main-agent']
        },
        {
            id: 'config-permissions',
            name: 'Permissions',
            icon: ICONS['config-permissions'],
            category: 'config',
            description: 'Control what tools Claude can use and when approval is required. Set allow/deny rules with glob patterns for fine-grained control.',
            usage: '// Rules in settings.json\n"permissions": {\n  "allow": ["Bash(npm *)"],\n  "deny": ["Bash(rm *)"]\n}',
            example: '{\n  "permissions": {\n    "allow": [\n      "Bash(npm run *)",\n      "Bash(git *)",\n      "Edit"\n    ],\n    "deny": [\n      "Bash(curl *)",\n      "WebFetch(domain:*.exe)"\n    ]\n  }\n}',
            ideas: [
                'Auto-approve safe development commands',
                'Block destructive operations',
                'Per-project permission profiles',
                'Audit-friendly permission logs'
            ],
            connections: ['config-settings', 'config-rules', 'cmd-permissions', 'tools-bash']
        },
        {
            id: 'config-rules',
            name: 'Permission Rules',
            icon: ICONS['config-rules'],
            category: 'config',
            description: 'Fine-grained rules for tool permissions. Supports glob patterns, domain filtering, and conditional approval based on arguments.',
            usage: '{\n  "tool": "Bash(npm *)",\n  "mode": "allow"\n}',
            example: '// Complex rules\n[\n  { "tool": "Bash(npm run build)", "mode": "allow" },\n  { "tool": "WebFetch(domain:docs.*)", "mode": "allow" },\n  { "tool": "Edit(/src/*)", "mode": "allow" },\n  { "tool": "Edit(/config/*)", "mode": "ask" }\n]',
            ideas: [
                'Whitelist specific command patterns',
                'Restrict access to sensitive directories',
                'Allow fetching from trusted domains only',
                'Create security boundaries'
            ],
            connections: ['config-permissions', 'config-settings', 'tools-bash', 'tools-edit']
        },
        {
            id: 'config-hooks',
            name: 'Hooks',
            icon: ICONS['config-hooks'],
            category: 'config',
            description: 'Shell commands that execute at lifecycle events. Validate inputs, enforce policies, modify behavior, and integrate with external systems.',
            usage: '// In settings.json\n"hooks": [{\n  "event": "PreToolUse",\n  "command": "./validate.sh"\n}]',
            example: '{\n  "hooks": [{\n    "name": "lint-before-commit",\n    "when": {\n      "event": "PreToolUse",\n      "tool": "Bash",\n      "command": "git commit*"\n    },\n    "handler": "npm run lint"\n  }]\n}',
            ideas: [
                'Auto-lint before commits',
                'Validate code changes against rules',
                'Log all tool executions',
                'Integrate with approval systems'
            ],
            connections: ['config-settings', 'config-permissions', 'main-agent', 'tools-bash']
        },
        {
            id: 'config-claudemd',
            name: 'CLAUDE.md',
            icon: ICONS['config-claudemd'],
            category: 'config',
            description: 'Project instruction files that provide context, coding standards, and preferences. Hierarchical: user-level, project-level, and directory-level.',
            usage: '# CLAUDE.md in project root\n# Project: MyApp\n\n## Coding Standards\n- Use TypeScript strict mode\n- Prefer functional components',
            example: '# CLAUDE.md\n\n## Project Overview\nE-commerce platform using Next.js 14\n\n## Conventions\n- Use server components by default\n- API routes in /app/api\n- Tailwind for styling\n\n## Important Files\n- /src/lib/db.ts - Database connection\n- /src/auth/ - Authentication logic',
            ideas: [
                'Document project architecture',
                'Set coding standards and conventions',
                'Provide context for better suggestions',
                'Include important file locations'
            ],
            connections: ['config-memory', 'main-agent', 'cmd-memory', 'cmd-init']
        },
        {
            id: 'config-memory',
            name: 'Auto-Memory',
            icon: ICONS['config-memory'],
            category: 'config',
            description: 'Automatic learning system that records insights, patterns, and preferences to MEMORY.md. First 200 lines loaded each session.',
            usage: '# Automatic - Claude learns as you work\n# View with /memory command',
            example: '# MEMORY.md (auto-generated)\n\n## Learned Preferences\n- User prefers async/await over .then()\n- Tests should use describe/it pattern\n- Error messages should be user-friendly\n\n## Project Insights\n- Auth uses JWT with 24h expiry\n- API rate limited to 100 req/min',
            ideas: [
                'Let Claude learn your preferences',
                'Build project-specific knowledge',
                'Share learnings across team',
                'Curate memory for better results'
            ],
            connections: ['config-claudemd', 'main-agent', 'cmd-memory', 'cmd-compact']
        }
    ]
};

// ========================================
// CONNECTION DEFINITIONS
// (Defines which nodes connect to which)
// ========================================
const CONNECTIONS = [
    // Agent connections
    { from: 'main-agent', to: 'sub-agents', direction: 'out', label: 'spawns' },
    { from: 'main-agent', to: 'tools-read', direction: 'out', label: 'uses' },
    { from: 'main-agent', to: 'tools-edit', direction: 'out', label: 'uses' },
    { from: 'main-agent', to: 'tools-bash', direction: 'out', label: 'uses' },
    { from: 'main-agent', to: 'config-memory', direction: 'both', label: 'reads/writes' },
    { from: 'main-agent', to: 'config-claudemd', direction: 'in', label: 'configured by' },

    { from: 'sub-agents', to: 'agent-explore', direction: 'out', label: 'includes' },
    { from: 'sub-agents', to: 'agent-plan', direction: 'out', label: 'includes' },
    { from: 'sub-agents', to: 'main-agent', direction: 'out', label: 'reports to' },

    { from: 'agent-explore', to: 'tools-grep', direction: 'out', label: 'uses' },
    { from: 'agent-explore', to: 'tools-glob', direction: 'out', label: 'uses' },
    { from: 'agent-explore', to: 'tools-read', direction: 'out', label: 'uses' },

    { from: 'agent-plan', to: 'tools-read', direction: 'out', label: 'uses' },
    { from: 'agent-plan', to: 'config-claudemd', direction: 'in', label: 'references' },

    { from: 'agent-teams', to: 'main-agent', direction: 'out', label: 'coordinates' },
    { from: 'agent-teams', to: 'integration-github', direction: 'out', label: 'syncs via' },

    // Tool connections
    { from: 'tools-read', to: 'tools-edit', direction: 'out', label: 'enables' },
    { from: 'tools-read', to: 'tools-write', direction: 'out', label: 'informs' },
    { from: 'tools-edit', to: 'config-permissions', direction: 'in', label: 'governed by' },
    { from: 'tools-bash', to: 'config-permissions', direction: 'in', label: 'governed by' },
    { from: 'tools-bash', to: 'config-hooks', direction: 'in', label: 'triggers' },
    { from: 'tools-grep', to: 'tools-read', direction: 'out', label: 'finds for' },
    { from: 'tools-glob', to: 'tools-read', direction: 'out', label: 'locates for' },
    { from: 'tools-websearch', to: 'tools-webfetch', direction: 'out', label: 'provides URLs' },

    // Command connections
    { from: 'cmd-init', to: 'config-claudemd', direction: 'out', label: 'creates' },
    { from: 'cmd-init', to: 'config-settings', direction: 'out', label: 'creates' },
    { from: 'cmd-memory', to: 'config-claudemd', direction: 'both', label: 'manages' },
    { from: 'cmd-memory', to: 'config-memory', direction: 'both', label: 'manages' },
    { from: 'cmd-config', to: 'config-settings', direction: 'both', label: 'edits' },
    { from: 'cmd-permissions', to: 'config-permissions', direction: 'both', label: 'manages' },
    { from: 'cmd-mcp', to: 'skill-mcp', direction: 'both', label: 'configures' },
    { from: 'cmd-review', to: 'integration-github', direction: 'out', label: 'integrates' },
    { from: 'cmd-compact', to: 'config-memory', direction: 'out', label: 'optimizes' },
    { from: 'cmd-clear', to: 'config-memory', direction: 'out', label: 'resets' },

    // Skill connections
    { from: 'skill-custom', to: 'main-agent', direction: 'in', label: 'extends' },
    { from: 'skill-custom', to: 'skill-mcp', direction: 'out', label: 'can use' },
    { from: 'skill-mcp', to: 'main-agent', direction: 'in', label: 'provides tools' },
    { from: 'skill-mcp', to: 'config-settings', direction: 'in', label: 'configured in' },
    { from: 'skill-plugins', to: 'skill-custom', direction: 'out', label: 'packages' },
    { from: 'skill-plugins', to: 'config-hooks', direction: 'out', label: 'includes' },
    { from: 'skill-agent-sdk', to: 'main-agent', direction: 'out', label: 'creates' },
    { from: 'skill-agent-sdk', to: 'sub-agents', direction: 'out', label: 'builds' },
    { from: 'skill-agent-sdk', to: 'skill-mcp', direction: 'out', label: 'integrates' },

    // Integration connections
    { from: 'integration-github', to: 'tools-bash', direction: 'in', label: 'via git' },
    { from: 'integration-github', to: 'main-agent', direction: 'both', label: 'triggers/reports' },
    { from: 'integration-actions', to: 'integration-github', direction: 'in', label: 'runs in' },
    { from: 'integration-actions', to: 'main-agent', direction: 'out', label: 'invokes' },
    { from: 'integration-slack', to: 'main-agent', direction: 'out', label: 'triggers' },
    { from: 'integration-slack', to: 'integration-github', direction: 'out', label: 'links to' },
    { from: 'integration-vscode', to: 'main-agent', direction: 'both', label: 'interface' },
    { from: 'integration-jetbrains', to: 'main-agent', direction: 'both', label: 'interface' },
    { from: 'integration-chrome', to: 'main-agent', direction: 'in', label: 'controlled by' },

    // Config connections
    { from: 'config-settings', to: 'config-permissions', direction: 'out', label: 'contains' },
    { from: 'config-settings', to: 'config-hooks', direction: 'out', label: 'contains' },
    { from: 'config-permissions', to: 'config-rules', direction: 'out', label: 'uses' },
    { from: 'config-hooks', to: 'tools-bash', direction: 'out', label: 'executes' },
    { from: 'config-claudemd', to: 'config-memory', direction: 'out', label: 'references' }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

// Get all capabilities as flat array
function getAllCapabilities() {
    return [
        ...CAPABILITIES_DATA.agents,
        ...CAPABILITIES_DATA.tools,
        ...CAPABILITIES_DATA.commands,
        ...CAPABILITIES_DATA.skills,
        ...CAPABILITIES_DATA.integrations,
        ...CAPABILITIES_DATA.config
    ];
}

// Get capability by ID
function getCapabilityById(id) {
    return getAllCapabilities().find(cap => cap.id === id);
}

// Get connections for a specific node
function getConnectionsForNode(nodeId) {
    return CONNECTIONS.filter(conn => conn.from === nodeId || conn.to === nodeId);
}

// Get connected nodes for a specific node
function getConnectedNodes(nodeId) {
    const connections = getConnectionsForNode(nodeId);
    const connectedIds = new Set();

    connections.forEach(conn => {
        if (conn.from === nodeId) connectedIds.add(conn.to);
        if (conn.to === nodeId) connectedIds.add(conn.from);
    });

    return Array.from(connectedIds).map(id => getCapabilityById(id)).filter(Boolean);
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        agents: '#00ffff',
        tools: '#ff00ff',
        commands: '#ffff00',
        skills: '#ff6600',
        integrations: '#aa66ff',
        config: '#00ff88'
    };
    return colors[category] || '#ffffff';
}

// Export for use in app.js
window.CAPABILITIES_DATA = CAPABILITIES_DATA;
window.CONNECTIONS = CONNECTIONS;
window.getAllCapabilities = getAllCapabilities;
window.getCapabilityById = getCapabilityById;
window.getConnectionsForNode = getConnectionsForNode;
window.getConnectedNodes = getConnectedNodes;
window.getCategoryColor = getCategoryColor;
