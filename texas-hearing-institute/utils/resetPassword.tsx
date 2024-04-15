import * as Crypto from 'expo-crypto';
import { supabase } from '../lib/supabase';
import { Buffer } from 'node:buffer';

export async function resetPassword(email: string, user_id: string) {
	// hash + check with existing hash
	console.log('start');
	// generate pw reset token
	const token = Crypto.getRandomBytes(16);
	const token_str = Buffer.from(token).toString('base64');
	console.log(token);
	console.log(token_str);

	// store hashed ver. in supabase
	const { error } = await supabase.from('password_reset_tokens').insert({
		user_id: user_id,
		token: token_str,
		token_expiry: Date.now() + 10 * 60000, // 10 minute expiry
	});

	// TODO: error handle
	console.log(error);

	// “generate a password reset link which points to a link on your website that displays the “enter new password” form, and also contains the token”

	// send email using sendgrid

	return;
}
