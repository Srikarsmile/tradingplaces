# Supabase Authentication Setup Guide

This guide covers setting up Supabase Authentication for Trading Places.

## 🔐 Authentication Overview

Trading Places uses **Supabase Auth** for:
- User registration (email/password)
- User login
- Session management
- Protected routes
- User profile data

## 📋 Prerequisites

1. Supabase project created
2. Database migration run (`001_initial_schema.sql`)
3. Auth triggers migration run (`002_auth_triggers.sql`)

## 🚀 Step-by-Step Setup

### Step 1: Configure Authentication Settings

1. Go to **Authentication** → **Settings** in Supabase dashboard
2. Configure the following:

#### Email Auth
- ✅ **Enable Email provider** (should be enabled by default)
- **Confirm email**: Choose based on your needs:
  - **Disabled** - For development (users can sign in immediately)
  - **Enabled** - For production (users must confirm email)

#### Email Templates
- Customize email templates if needed:
  - Confirmation email
  - Password reset email
  - Magic link email

#### Site URL
- Set your site URL (e.g., `http://localhost:5173` for dev)
- Add redirect URLs for production

### Step 2: Run Auth Triggers Migration

1. Go to **SQL Editor** in Supabase
2. Copy contents of `supabase/migrations/002_auth_triggers.sql`
3. Run the SQL

This creates:
- Automatic user profile creation on signup
- Profile sync when user metadata updates

### Step 3: Test Authentication

1. Start your app: `npm run dev`
2. Navigate to `/auth`
3. Try signing up a new user
4. Check **Authentication** → **Users** in Supabase to verify

### Step 4: Verify User Profile Creation

1. After signup, check **Table Editor** → **user_profiles**
2. You should see a new row with the user's data
3. The trigger automatically creates this from auth metadata

## 🔧 How It Works

### Sign Up Flow

1. User fills signup form (email, password, username, DOB)
2. `Auth.jsx` calls `supabase.auth.signUp()`
3. Supabase creates user in `auth.users` table
4. **Trigger fires** → Creates row in `user_profiles` table
5. User receives confirmation email (if enabled)
6. User can sign in

### Sign In Flow

1. User enters email/password
2. `Auth.jsx` calls `supabase.auth.signInWithPassword()`
3. Supabase validates credentials
4. Session created → `AuthContext` updates
5. User redirected to protected route

### Session Management

- `AuthContext` automatically tracks auth state
- Listens to `onAuthStateChange` events
- Updates user state across the app
- Handles session refresh

## 🛡️ Security Features

### Row Level Security (RLS)

All tables have RLS enabled:
- Users can only access their own data
- Policies enforce data isolation
- Automatic security at database level

### Password Security

- Supabase handles password hashing (bcrypt)
- Passwords never stored in plain text
- Secure password reset flow

### Session Security

- JWT tokens for sessions
- Automatic token refresh
- Secure cookie handling

## 📝 User Profile Integration

### Automatic Profile Creation

When a user signs up:
1. User created in `auth.users`
2. Trigger automatically creates `user_profiles` row
3. Username and DOB synced from metadata

### Manual Profile Updates

You can also update profiles manually:

```javascript
import { userProfileService } from '../lib/supabaseService';

await userProfileService.upsertProfile(userId, {
  username: 'newusername',
  date_of_birth: '1990-01-01'
});
```

## 🔄 Email Confirmation (Optional)

### For Development
- **Disable email confirmation** for faster testing
- Users can sign in immediately after signup

### For Production
- **Enable email confirmation** for security
- Users must click link in email before signing in
- Prevents fake email signups

### Configure Email Confirmation

1. Go to **Authentication** → **Settings**
2. Toggle **"Enable email confirmations"**
3. Configure email template
4. Set redirect URL (e.g., `/auth?confirmed=true`)

## 🧪 Testing Checklist

- [ ] Sign up new user works
- [ ] User profile created automatically
- [ ] Sign in works with correct credentials
- [ ] Sign in fails with wrong credentials
- [ ] Protected routes redirect to `/auth` when not logged in
- [ ] Sign out works
- [ ] Session persists on page refresh
- [ ] User can access their own data only

## 🐛 Troubleshooting

### Issue: "User profile not created"
- **Solution**: Make sure `002_auth_triggers.sql` migration ran
- Check trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`

### Issue: "Email confirmation not working"
- **Solution**: Check email settings in Supabase
- Verify SMTP is configured (or use Supabase's default)
- Check spam folder

### Issue: "Can't sign in after signup"
- **Solution**: Check if email confirmation is required
- If enabled, user must confirm email first
- Check email for confirmation link

### Issue: "Session not persisting"
- **Solution**: Check browser localStorage
- Verify Supabase client is configured correctly
- Check network tab for auth requests

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

## ✅ Next Steps

After auth is set up:
1. ✅ Test sign up/sign in flow
2. ✅ Verify user profiles are created
3. ✅ Test protected routes
4. ✅ Configure email settings (if needed)
5. ✅ Set up password reset (optional)

---

**Ready to go!** Your authentication is now fully configured with Supabase.
