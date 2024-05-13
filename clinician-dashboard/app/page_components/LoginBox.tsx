import thi_logo_2 from '../thi_logo_2.png';
import OAuthButton from './OAuthButton';

export default function LoginBox() {
    return (
        <div className='m-20 p-10 px-20 border border-gray-300 rounded-sm'>
            <div>
                <img className='' src={thi_logo_2.src}></img>
            </div>
            <hr className='m-5 bg-black dark:bg-white'/>
            <OAuthButton provider="Microsoft" />
            <OAuthButton provider="google"/>
            <hr className='m-5 bg-black dark:bg-white'/>
            <div className='text-center'>
                <p className="text-black dark:text-white">Any questions? <a className="underline text-blue-500 cursor-pointer" href="mailto:shivampathak108@gmail.com">Contact us.</a></p>
            </div>
        </div>
    )
}