# Trading Places - Empathy Training Simulator

> Build cultural intelligence, awareness, and empathy through interactive roleplay scenarios.

Trading Places is an educational platform designed to help users practice empathy and cultural intelligence through interactive dialogue scenarios. Users can roleplay as different personas (customer, manager, policymaker, etc.) and receive real-time feedback on their empathy metrics.

## ✨ Features

- **Interactive Roleplay Scenarios**: Practice empathy through structured dialogue exercises
- **Real-time Metrics Tracking**: Track Understanding, Empathy, and Clarity scores
- **Multiple Scenarios**: Choose from various scenarios including customer service, policy-making, and accessibility
- **PDF Report Generation**: Export your practice sessions as detailed PDF reports
- **Culture Pulse Guide**: Learn about key culture signals (Curiosity, Inclusion, Clarity)
- **User Authentication**: Secure sign-up and sign-in via Supabase
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Trading-Places-Prototype-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
   
   You can find these values in your Supabase project settings under API.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardCard.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Sidebar.jsx
├── constants/          # Constants and configuration
│   └── scenarios.js
├── context/            # React Context providers
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── layouts/            # Layout components
│   └── WorkspaceLayout.jsx
├── lib/                # External service clients
│   └── supabaseClient.js
├── pages/              # Route components
│   ├── Auth.jsx
│   ├── Consent.jsx
│   ├── CulturePulse.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Report.jsx
│   ├── Scenario.jsx
│   └── Terms.jsx
└── utils/              # Helper functions
    ├── reportUtils.js
    └── validation.js
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Scenario Practice

The Scenario page (`/scenario`) allows users to:
- Select from multiple dialogue scenarios
- Choose responses that affect empathy metrics
- Track real-time scores for Understanding, Empathy, and Clarity
- Add reflection notes
- Practice role-swapping between different personas

### Report Generation

The Report page (`/report`) provides:
- Visual summary of practice sessions
- PDF export functionality
- Improvement tips based on performance
- Learning insights extracted from notes

### Authentication

- Secure email/password authentication via Supabase
- Protected routes requiring authentication
- Session management with auto-redirect

## 🎨 Design System

The app uses a custom design system with:
- **Brand Colors**:
  - Blue: `#00e5ff`
  - Dark: `#00323a`
  - Pink: `#ff4ebe`
  - Background: `#f7f8fa`
- **Neon glow effects** on key interactive elements
- **Responsive design** with mobile-first approach

## 🔒 Security

- Environment variables for sensitive credentials
- Input validation on all forms
- Protected routes for authenticated content
- Error boundaries for graceful error handling

## 📝 Code Quality

- **Error Boundaries**: Catch and handle React errors gracefully
- **Form Validation**: Comprehensive validation for all user inputs
- **Loading States**: Clear feedback during async operations
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Memoization, code splitting, optimized re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is a prototype developed for educational purposes.

## 🙏 Acknowledgments

- Built with React, Vite, and Tailwind CSS
- Authentication powered by Supabase
- PDF generation using jsPDF

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Note**: This is a prototype application. For production use, additional security measures, testing, and optimizations should be implemented.
