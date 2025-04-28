# Supabase Setup Guide

This guide explains how to set up Supabase for user authentication and registration for the Roxom project.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project with a name of your choice (e.g., "roxom")
3. Choose a strong database password and save it securely
4. Choose a region closest to your target audience
5. Wait for the project to be created (this can take a few minutes)

## 2. Get API Credentials

1. Once your project is created, go to the project dashboard
2. Navigate to Project Settings > API
3. Copy the "Project URL" - this will be your `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the "anon" public key - this will be your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Set Up Authentication

1. In the Supabase dashboard, go to Authentication > Settings
2. Under Email Auth, make sure "Enable Email Signup" is enabled
3. Configure any additional authentication settings as needed

## 4. Create Users Table

1. Go to SQL Editor in the Supabase dashboard
2. Create a new query and paste the following SQL:

```sql
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read and update only their own data
CREATE POLICY "Users can view their own data" 
    ON public.users 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
    ON public.users 
    FOR UPDATE 
    USING (auth.uid() = id);

-- Create a function to automatically set updated_at when a record is updated
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
```

3. Run the query to create the table and set up the permissions

## 5. Configure Local Environment

1. Create a `.env.local` file in the root of your Next.js project
2. Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Replace the placeholder values with the credentials you copied in step 2

## 6. Install Supabase Client

Run the following command in your project directory:

```bash
npm install @supabase/supabase-js
```

## 7. Test the Integration

After completing these steps and implementing the code, test the user registration and login functionality to ensure everything is working correctly. 