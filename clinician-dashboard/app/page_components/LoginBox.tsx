import thi_logo_2 from '../thi_logo_2.png';
import OAuthButton from './OAuthButton';

export default function LoginBox() {
    return (
        <div className='m-20 p-10 px-20 border  border border-gray-300'>
            <div>
                <img className='' src={thi_logo_2.src}></img>
            </div>
            <hr className='m-5 bg-gray'/>
            <OAuthButton provider="Microsoft" />
            <OAuthButton provider="google"/>
            <OAuthButton provider="apple" />
            <hr className='m-5 bg-gray'/>
            <div className='text-center'>
                <p className="text-gray-700">Any questions? <a className="underline text-blue-500 cursor-pointer">Contact us.</a></p>
            </div>
        </div>
    )
}