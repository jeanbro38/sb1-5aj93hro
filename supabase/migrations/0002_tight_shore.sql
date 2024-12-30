/*
  # Add profiles insert policy

  1. Changes
    - Add RLS policy to allow inserting profiles for authenticated users
    - Users can only insert their own profile (id must match auth.uid())

  2. Security
    - Maintains data integrity by ensuring users can only create their own profile
    - Keeps existing select and update policies intact
*/

-- Add insert policy for profiles table
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);