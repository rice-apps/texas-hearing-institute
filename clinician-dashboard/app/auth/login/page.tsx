'use client';

export default function Login() {

    return (
        <div>
            <a href="/auth/google">
                {/* Need a google logo/element according to sign in w/ google TOS
                    https://developers.google.com/identity/branding-guidelines
                */}
                Sign in with Google
            </a>
        </div>
    );
};