# Trading Places Prototype - Architecture Diagram

```mermaid
flowchart TD
  %% Entry + Providers
  A[main.jsx] --> B[React Root]
  B --> C[ErrorBoundary]
  C --> D[BrowserRouter]
  D --> E[AuthProvider]
  E --> F[App.jsx Routes]

  %% Top-level UI
  F --> G[Navbar]
  F --> H[Public Routes]
  F --> I[Workspace Routes]

  %% Public Routes
  H --> H1[Home]
  H --> H2[Auth]
  H --> H3[Terms]
  H --> H4[Consent]

  %% Workspace Layout
  I --> J[ProtectedRoute]
  J --> K[WorkspaceLayout]
  K --> L[Sidebar]
  K --> M[Dashboard]
  K --> N[Scenario]
  K --> O[Report]
  K --> P[Culture Pulse]

  %% Scenario Flow
  N --> N1[dialogueScenarios + scenarioLibrary]
  N --> N2[User Choices + Empathy Gauges]
  N --> N3[Metrics + Connection Score]
  N --> N4[localStorage Snapshot]

  %% Dashboard + Report Data Sources
  N4 --> M
  N4 --> O

  %% PDF Export
  O --> O1[jsPDF Export]

  %% Supabase (Optional / Prepared)
  E -. optional auth .-> S1[Supabase Auth]
  N4 -. future persistence .-> S2[Supabase Services]
  S2 -. uses .-> S3[Supabase DB Schema]
```

## Legend
- Solid arrows: current, active runtime flow.
- Dotted arrows: optional or planned integration (Supabase).

## Notes
- Authentication is implemented but bypassed in the prototype via a hardcoded `SKIP_AUTH` flag.
- localStorage is the current single source of truth for session data.
- Supabase services and migrations are present but not connected to the UI flow.
