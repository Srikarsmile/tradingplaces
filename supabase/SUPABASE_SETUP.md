# Supabase Setup Guide for Trading Places

This guide will help you set up your Supabase database for the Trading Places application.

## 📋 Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project created

## 🚀 Step-by-Step Setup

### Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: Trading Places (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon/public key** (this is your `VITE_SUPABASE_ANON_KEY`)

### Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if you haven't already)
2. Add your keys:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)

✅ You should see "Success. No rows returned" - this means the tables were created successfully!

### Step 5: Verify Tables Were Created

1. Go to **Table Editor** in your Supabase dashboard
2. You should see these tables:
   - `user_profiles`
   - `practice_sessions`
   - `scenario_snapshots`
   - `dialogue_practices`
   - `dialogue_choices`

### Step 6: Run Auth Triggers Migration

1. In **SQL Editor**, create a new query
2. Copy contents of `supabase/migrations/002_auth_triggers.sql`
3. Paste and run it
4. This creates automatic user profile creation on signup

### Step 7: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Enable **Email** provider (should be enabled by default)
3. Configure email templates if needed (optional)
4. Set up email confirmation:
   - **Development**: Disable for faster testing
   - **Production**: Enable for security
5. See `AUTH_SETUP.md` for detailed auth configuration

### Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try signing up a new user
3. Check **Authentication** → **Users** in Supabase to see if the user was created

## 📊 Database Schema Overview

### Tables Created

1. **user_profiles**
   - Stores extended user information (username, date of birth)
   - Linked to Supabase auth.users

2. **practice_sessions**
   - Main table for each practice session
   - Stores notes, learnings, improvement tips

3. **scenario_snapshots**
   - Stores scenario practice attempts
   - Contains empathy scores (customer, manager, average)

4. **dialogue_practices**
   - Stores dialogue practice sessions
   - Contains metrics (understanding, empathy, clarity, connection)

5. **dialogue_choices**
   - Stores individual dialogue choices
   - Tracks which options were selected and their effects

### Security (RLS)

All tables have **Row Level Security (RLS)** enabled:
- Users can only access their own data
- Policies ensure data isolation between users
- Automatic security at the database level

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use anon key in frontend** - It's safe for client-side use
3. **Service role key** - Never expose this in frontend code
4. **RLS is enabled** - Your data is protected by default

## 🧪 Testing the Database

You can test the database connection by:

1. **Using Supabase Dashboard**:
   - Go to Table Editor
   - Manually insert a test row (if needed)

2. **Using the App**:
   - Sign up a new user
   - Complete a practice session
   - Check if data appears in Supabase tables

## 📝 Next Steps

After setting up the database:

1. ✅ Update your app code to use Supabase instead of localStorage
2. ✅ Create data service functions (see `src/lib/supabaseService.js` - to be created)
3. ✅ Test data persistence
4. ✅ Verify RLS policies work correctly

## 🐛 Troubleshooting

### Issue: "relation does not exist"
- **Solution**: Make sure you ran the migration SQL in Step 4

### Issue: "permission denied"
- **Solution**: Check that RLS policies are set up correctly (they should be in the migration)

### Issue: "invalid API key"
- **Solution**: Verify your `.env` file has the correct keys from Step 2

### Issue: Can't see tables
- **Solution**: Refresh the Table Editor or check if migration ran successfully

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## ✅ Checklist

- [ ] Supabase project created
- [ ] API keys copied to `.env` file
- [ ] Database migration (`001_initial_schema.sql`) run successfully
- [ ] Auth triggers migration (`002_auth_triggers.sql`) run successfully
- [ ] Tables visible in Table Editor
- [ ] Authentication configured (see `AUTH_SETUP.md`)
- [ ] Test user created via app signup
- [ ] User profile automatically created
- [ ] RLS policies verified

---

**Need Help?** Check the Supabase documentation or open an issue in the repository.
