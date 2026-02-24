# Trading Places Prototype - Detailed Repository Report

## Summary
Trading Places is a React + Vite prototype for empathy and cultural intelligence training. Users run structured roleplay scenarios, choose dialogue responses, and see empathy metrics update in real time. Practice data is stored in localStorage and can be exported to a PDF report. Supabase integration (auth + Postgres schema + service layer) is present but not wired into the UI by default.

## What This App Does
- Roleplay scripted scenarios that simulate customer, manager, and policymaker interactions.
- Track three empathy signals: Understanding, Empathy signaled, and Clarity of next steps.
- Capture reflection notes and auto-generate learnings and improvement tips.
- View progress on a dashboard and export a PDF report.
- Provide optional Supabase-backed authentication and data persistence (currently bypassed).

## Tech Stack
- React 19 with React Router v7 for SPA routing.
- Vite 7 for build/dev tooling.
- Tailwind CSS v4 for styling utilities.
- Recharts for charts on the dashboard.
- jsPDF for report generation.
- Supabase client + migrations for auth and persistence (optional).

## High-Level Architecture
- `src/main.jsx` bootstraps the app and wraps it with:
  - `BrowserRouter` for routes
  - `AuthProvider` for auth context
  - `ErrorBoundary` for top-level error capture
- `src/App.jsx` renders a global navbar and routes.
- A unified workspace layout (`/workspace/*`) contains most application screens.

## Routing and Layouts
Routes are split into:
- Public pages: `/`, `/auth`, `/terms`, `/consent`
- Workspace pages: `/workspace/dashboard`, `/workspace/scenario`, `/workspace/report`, `/workspace/pulse`
- Old routes (`/dashboard`, `/scenario`, `/report`) are redirected into `/workspace/*`.

The workspace uses `src/layouts/WorkspaceLayout.jsx`:
- Sticky top navbar (global)
- Sidebar navigation for workspace
- Main content area with padding and responsive layout

## Core User Flow
1. User starts on Home and chooses Scenario or Dashboard.
2. Scenario page guides the user through a dialogue:
   - Each line has multiple response options.
   - Each option updates empathy metrics via deltas.
   - The app calculates a connection score from the three metrics.
3. Users adjust empathy sliders for each scenario role.
4. Notes are saved, and a report snapshot is written to localStorage.
5. Dashboard and Report read from localStorage to visualize progress.
6. Report page can generate a PDF summary.

## Scenario System (How It Works)
Scenario content is data-driven in `src/constants/scenarios.js`:
- `dialogueScenarios`: step-by-step scripts with options and metric effects.
- `scenarioLibrary`: broader context scenarios with beats and agreements.

At runtime in `src/pages/Scenario.jsx`:
- `dialogueIndex` tracks the current script line.
- `dialogueSelections` stores chosen options.
- `recalcDialogueScores` aggregates deltas and clamps values to 1-5.
- `useEffect` persists a full snapshot to localStorage on changes.

## Local Persistence Format
The key `trading-places-report` stores a JSON payload in localStorage:

```json
{
  "updatedAt": "2025-01-31T...",
  "user": { "name": "John", "email": "john@example.com" },
  "notes": "Reflection notes...",
  "scenarioSnapshots": [
    {
      "id": "tone-at-till",
      "title": "Tone at the Till",
      "scores": { "customer": 4, "manager": 4 },
      "average": 4
    }
  ],
  "dialogue": { "id": "tone-at-till", "metrics": { "...": 3.8 } },
  "learnings": ["Learning 1"],
  "improvementTips": ["Tip 1"]
}
```

This payload feeds both the dashboard and report pages.

## Dashboard (Analytics View)
`src/pages/Dashboard.jsx`:
- Reads localStorage once on mount.
- Builds "signals" from dialogue metrics and renders summary cards.
- Uses Recharts bar chart for metric visualization.
- Shows recent activity based on stored data.
- Provides quick links to key routes.

## Report and PDF Export
`src/pages/Report.jsx`:
- Loads localStorage and merges with placeholder data for empty states.
- Shows scenario snapshot, dialogue metrics, learnings, and tips.
- `handleDownload` uses jsPDF to draw branded sections and metric bars.
- Exports `trading-places-report.pdf`.

## Authentication and Access Control
Auth is implemented but bypassed by default:
- `AuthContext` uses Supabase auth and exposes `user`, `isAuthenticated`, `signOut`.
- `ProtectedRoute` wraps the workspace routes.
- A hardcoded `|| true` forces `SKIP_AUTH` in:
  - `src/context/AuthContext.jsx`
  - `src/components/ProtectedRoute.jsx`
  - `src/components/Navbar.jsx`
This means protected routes are effectively public in the prototype build.

## Supabase Integration (Prepared, Optional)
Supabase client and a full service layer exist:
- `src/lib/supabaseClient.js`: client config (env-driven, with fallback URL/key).
- `src/lib/supabaseService.js`: CRUD for profiles, sessions, snapshots, dialogue, and choices.

Database migrations in `supabase/migrations/` define:
- `user_profiles`, `practice_sessions`, `scenario_snapshots`, `dialogue_practices`, `dialogue_choices`
- Row Level Security (RLS) policies for user-owned access
- Auth triggers to create user profiles on signup

The UI currently uses localStorage only; the service layer is ready but not hooked up.

## Design System and Styling
Global styles are in `src/index.css`:
- Brand palette: blue, dark teal, pink, and light gray background.
- Neon glow effect via `drop-shadow`.
- Smooth transitions and focus styles.

Most pages use Tailwind utilities directly for layout and visuals.
The design language leans neon and gradient-heavy with card-based layouts.

## Components (Notable)
- `Navbar` and `Sidebar`: primary navigation and layout consistency.
- `EmpathyGauge` and `MetricBar`: reusable visualization components.
- `ErrorBoundary`: catches React errors and provides user-friendly recovery.
- `LoadingSpinner` and `EmptyState`: UI feedback for async/empty data.

## Configuration and Scripts
`package.json` scripts:
- `npm run dev` for local dev
- `npm run build` for production
- `npm run preview` for local preview
- `npm run lint` for linting

`vite.config.js`:
- Manual chunking for React, Supabase, and jsPDF.
- Optimized deps and local dev server options.

## Known Gaps / Prototype Flags
- Auth is forcibly disabled. Real auth requires removing the `|| true` bypass.
- The Supabase service layer is not integrated into Scenario/Dashboard/Report.
- The `trading-places-prototype/` directory exists but is empty.
- `useLocalStorage` and `useDebounce` hooks are unused.

## Suggested Next Steps (Optional)
1. Wire `supabaseService.saveCompleteSession` into Scenario persistence.
2. Replace the auth bypass flag with a real env-driven toggle.
3. Add a session history view using `practiceSessionService.getUserSessions`.
4. Introduce data migration from localStorage to Supabase for existing users.

This report is based on the current repository state and focuses on how the system behaves in practice, not just the intended design.
