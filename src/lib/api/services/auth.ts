import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export async function register({ email, password, name }: RegisterData) {
  // First sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name // Store name in auth metadata as backup
      }
    }
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Failed to create user');
  }

  try {
    // Then create their profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: name,
        }
      ]);

    if (profileError) {
      // If profile creation fails, we should log out the user
      await supabase.auth.signOut();
      throw new Error('Failed to create profile: ' + profileError.message);
    }

    return authData;
  } catch (error) {
    // Clean up by signing out if anything fails
    await supabase.auth.signOut();
    throw error;
  }
}

export async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function me() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    ...user,
    ...profile
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}