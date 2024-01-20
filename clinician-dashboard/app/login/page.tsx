import { supabase } from '../../supabaseClient';

export default function Login() {
    return (
        <div>
            <form
                action="/auth/sign-in"
                method="post"
            >
                <button
                    type="submit"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}