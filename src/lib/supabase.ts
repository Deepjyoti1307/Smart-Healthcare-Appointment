import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Only create client if we have valid URL
export const supabase = supabaseUrl.startsWith('https://')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Auth helper functions
export const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
        // Mock authentication for development
        return {
            data: {
                user: {
                    id: '1',
                    email,
                    user_metadata: { name: 'Test User' }
                }
            },
            error: null
        }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, metadata: any) => {
    if (!supabase) {
        // Mock authentication for development
        return {
            data: {
                user: {
                    id: Date.now().toString(),
                    email,
                    user_metadata: metadata
                }
            },
            error: null
        }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    })
    return { data, error }
}

export const signInWithGoogle = async () => {
    if (!supabase) {
        alert('Google login requires Supabase configuration. Please set up your Supabase project.')
        return { data: null, error: new Error('Supabase not configured') }
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
    return { data, error }
}

export const signOut = async () => {
    if (!supabase) {
        return { error: null }
    }

    const { error } = await supabase.auth.signOut()
    return { error }
}

export const getCurrentUser = async () => {
    if (!supabase) {
        return null
    }

    const { data: { user } } = await supabase.auth.getUser()
    return user
}
