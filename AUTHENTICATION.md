# Authentication Guide

## 🔐 Current Status

**Supabase Authentication is already implemented!** ✅

The app uses Supabase Auth for:
- ✅ User registration (email/password)
- ✅ User login
- ✅ Session management
- ✅ Protected routes
- ✅ User profile data

## 📁 Files

- `src/context/AuthContext.jsx` - Auth state management
- `src/pages/Auth.jsx` - Sign up/Sign in page
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/lib/supabaseClient.js` - Supabase client configuration

## 🚀 Quick Start

### 1. Get Supabase Keys

1. Create/access your Supabase project
2. Go to **Settings** → **API**
3. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`

### 2. Configure Environment

Add to `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set Up Database

1. Run `supabase/migrations/001_initial_schema.sql`
2. Run `supabase/migrations/002_auth_triggers.sql`
3. See `supabase/SUPABASE_SETUP.md` for details

### 4. Configure Auth Settings

1. Go to **Authentication** → **Settings** in Supabase
2. Enable Email provider
3. Configure email confirmation (optional)
4. See `supabase/AUTH_SETUP.md` for details

## 🎯 How It Works

### Sign Up
1. User fills form → `supabase.auth.signUp()`
2. User created in `auth.users`
3. **Trigger** automatically creates `user_profiles` row
4. User receives confirmation email (if enabled)

### Sign In
1. User enters credentials → `supabase.auth.signInWithPassword()`
2. Session created
3. `AuthContext` updates
4. User redirected to protected route

### Protected Routes
- `ProtectedRoute` component checks `isAuthenticated`
- Redirects to `/auth` if not logged in
- Preserves intended destination

## 🔧 Usage in Code

### Check Auth State
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, loading, username, email } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <LoginPrompt />;
  
  return <div>Welcome, {username}!</div>;
}
```

### Sign Out
```javascript
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { signOut } = useAuth();
  
  return <button onClick={signOut}>Sign Out</button>;
}
```

### Protect a Route
```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🛡️ Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Users can only access their own data
- ✅ Secure password hashing (bcrypt)
- ✅ JWT session tokens
- ✅ Automatic token refresh
- ✅ Protected routes

## 📝 User Profile

When a user signs up:
- User created in `auth.users` (Supabase handles this)
- Profile automatically created in `user_profiles` (via trigger)
- Username and DOB synced from signup form

## 🧪 Testing

1. Start app: `npm run dev`
2. Go to `/auth`
3. Sign up a new user
4. Check Supabase dashboard:
   - **Authentication** → **Users** (should see new user)
   - **Table Editor** → **user_profiles** (should see profile)
5. Sign in with credentials
6. Access protected routes

## 🐛 Common Issues

### "Missing Supabase configuration"
- Check `.env` file has correct keys
- Restart dev server after adding `.env`

### "User profile not created"
- Run `002_auth_triggers.sql` migration
- Check trigger exists in database

### "Can't sign in"
- Check email confirmation is disabled (for dev)
- Or confirm email first (if enabled)

## 📚 Next Steps

1. ✅ Set up Supabase project
2. ✅ Get API keys
3. ✅ Run migrations
4. ✅ Configure auth settings
5. ✅ Test sign up/sign in
6. ✅ Integrate with practice sessions (optional)

---

**See Also:**
- `supabase/SUPABASE_SETUP.md` - Database setup
- `supabase/AUTH_SETUP.md` - Detailed auth configuration
