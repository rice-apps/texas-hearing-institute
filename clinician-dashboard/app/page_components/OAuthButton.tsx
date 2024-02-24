import apple_logo from './images/apple_logo.png';
import google_logo from './images/google_logo.png';
import microsoft_logo from './images/microsoft_logo.png';

type OAuthButtonProps = {
    provider: string;
}

export default function OAuthButton({ provider }: OAuthButtonProps) {
    let finalProvider = provider;
    if (provider.toLowerCase() === 'microsoft') {
        finalProvider = 'azure';
    } 

    return (
        <div>
            <form action={`/auth/${finalProvider}`} method='get'> 
                <button className="m-2" type="submit">
                    <div className="p-3 border border border-stone-300 w-96 flex items-center justify-between rounded-sm">
                        <img className="h-8 mx-3" src={
                            provider.toLowerCase() == 'microsoft' ? microsoft_logo.src :
                                provider.toLowerCase() == 'google' ? google_logo.src :
                                    provider.toLowerCase() == 'apple' ? apple_logo.src : ''
                        }></img>
                        <h1 className="text-stone-600 font-medium">Continue with {provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase()}</h1>
                        <div className="w-8 mx-3"></div>
                    </div>
                </button>
            </form>
        </div>
    )
}