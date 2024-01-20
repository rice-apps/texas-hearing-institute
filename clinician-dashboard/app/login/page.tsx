'use client';

import { Provider } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';

export default function Login() {
    const handleOAuthLogin = async (provider : Provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: 'http://localhost:3000'
            }
        });

        if (error) {
            console.error('OAuth Login Error:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => handleOAuthLogin('google')}
            >
                Sign in with Google
            </button>
        </div>
    );
};