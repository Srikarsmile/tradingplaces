# Supabase Database Setup

This directory contains SQL migrations and setup instructions for the Trading Places database.

## 📁 Files

- `migrations/001_initial_schema.sql` - Initial database schema with all tables
- `SUPABASE_SETUP.md` - Step-by-step setup guide

## 🚀 Quick Start

1. **Create Supabase Project**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Create a new project

2. **Get API Keys**
   - Settings → API
   - Copy URL and anon key to `.env` file

3. **Run Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `migrations/001_initial_schema.sql`
   - Run the SQL

4. **Verify**
   - Check Table Editor to see created tables
   - Test authentication

See `SUPABASE_SETUP.md` for detailed instructions.

## 📊 Database Schema

### Tables

1. **user_profiles** - Extended user information
2. **practice_sessions** - Main practice session records
3. **scenario_snapshots** - Scenario practice attempts
4. **dialogue_practices** - Dialogue practice sessions
5. **dialogue_choices** - Individual dialogue choices

### Security

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Policies enforce data isolation

## 🔧 Usage

After setup, use the service functions in `src/lib/supabaseService.js` to interact with the database.

Example:
```javascript
import { completeSessionService } from '../lib/supabaseService';

// Save a session
await completeSessionService.saveCompleteSession(userId, sessionData);

// Load a session
const session = await completeSessionService.loadCompleteSession(sessionId);
```
