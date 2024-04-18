import { Audio } from 'expo-av';

export async function playSound(phoneme: string) {
	const soundObj = new Audio.Sound();

	await soundObj.loadAsync(SOUND_FILES.get(phoneme));

	await soundObj.setStatusAsync({ shouldPlay: true });
}

export const SOUND_FILES = new Map([
	['ah', require('../assets/phoneme-audio/ah.mp3')],
	['ay', require('../assets/phoneme-audio/ay.mp3')],
	['bah', require('../assets/phoneme-audio/bah.mp3')],
	['bay', require('../assets/phoneme-audio/bay.mp3')],
	['bee', require('../assets/phoneme-audio/bee.mp3')],
	['beye', require('../assets/phoneme-audio/beye.mp3')],
	['bih', require('../assets/phoneme-audio/bih.mp3')],
	['boh', require('../assets/phoneme-audio/boh.mp3')],
	['boo', require('../assets/phoneme-audio/boo.mp3')],
	['bow', require('../assets/phoneme-audio/bow.mp3')],
	['boy', require('../assets/phoneme-audio/boy.mp3')],
	['buh', require('../assets/phoneme-audio/buh.mp3')],
	['chah', require('../assets/phoneme-audio/chah.mp3')],
	['chay', require('../assets/phoneme-audio/chay.mp3')],
	['chee', require('../assets/phoneme-audio/chee.mp3')],
	['cheye', require('../assets/phoneme-audio/cheye.mp3')],
	['chih', require('../assets/phoneme-audio/chih.mp3')],
	['choh', require('../assets/phoneme-audio/choh.mp3')],
	['choo', require('../assets/phoneme-audio/choo.mp3')],
	['chow', require('../assets/phoneme-audio/chow.mp3')],
	['choy', require('../assets/phoneme-audio/choy.mp3')],
	['chuh', require('../assets/phoneme-audio/chuh.mp3')],
	['dah', require('../assets/phoneme-audio/dah.mp3')],
	['day', require('../assets/phoneme-audio/day.mp3')],
	['dee', require('../assets/phoneme-audio/dee.mp3')],
	['deye', require('../assets/phoneme-audio/deye.mp3')],
	['dih', require('../assets/phoneme-audio/dih.mp3')],
	['doh', require('../assets/phoneme-audio/doh.mp3')],
	['doo', require('../assets/phoneme-audio/doo.mp3')],
	['dow', require('../assets/phoneme-audio/dow.mp3')],
	['doy', require('../assets/phoneme-audio/doy.mp3')],
	['duh', require('../assets/phoneme-audio/duh.mp3')],
	['ee', require('../assets/phoneme-audio/ee.mp3')],
	['eye', require('../assets/phoneme-audio/eye.mp3')],
	['fah', require('../assets/phoneme-audio/fah.mp3')],
	['fay', require('../assets/phoneme-audio/fay.mp3')],
	['fee', require('../assets/phoneme-audio/fee.mp3')],
	['feye', require('../assets/phoneme-audio/feye.mp3')],
	['fih', require('../assets/phoneme-audio/fih.mp3')],
	['foh', require('../assets/phoneme-audio/foh.mp3')],
	['foo', require('../assets/phoneme-audio/foo.mp3')],
	['fow', require('../assets/phoneme-audio/fow.mp3')],
	['foy', require('../assets/phoneme-audio/foy.mp3')],
	['fuh', require('../assets/phoneme-audio/fuh.mp3')],
	['gah', require('../assets/phoneme-audio/gah.mp3')],
	['gay', require('../assets/phoneme-audio/gay.mp3')],
	['gee', require('../assets/phoneme-audio/gee.mp3')],
	['geye', require('../assets/phoneme-audio/geye.mp3')],
	['gih', require('../assets/phoneme-audio/gih.mp3')],
	['goh', require('../assets/phoneme-audio/goh.mp3')],
	['goo', require('../assets/phoneme-audio/goo.mp3')],
	['gow', require('../assets/phoneme-audio/gow.mp3')],
	['goy', require('../assets/phoneme-audio/goy.mp3')],
	['guh', require('../assets/phoneme-audio/guh.mp3')],
	['hah', require('../assets/phoneme-audio/hah.mp3')],
	['hay', require('../assets/phoneme-audio/hay.mp3')],
	['hee', require('../assets/phoneme-audio/hee.mp3')],
	['heye', require('../assets/phoneme-audio/heye.mp3')],
	['hih', require('../assets/phoneme-audio/hih.mp3')],
	['hoh', require('../assets/phoneme-audio/hoh.mp3')],
	['hoo', require('../assets/phoneme-audio/hoo.mp3')],
	['how', require('../assets/phoneme-audio/how.mp3')],
	['hoy', require('../assets/phoneme-audio/hoy.mp3')],
	['huh', require('../assets/phoneme-audio/huh.mp3')],
	['ih', require('../assets/phoneme-audio/ih.mp3')],
	['jah', require('../assets/phoneme-audio/jah.mp3')],
	['jay', require('../assets/phoneme-audio/jay.mp3')],
	['jee', require('../assets/phoneme-audio/jee.mp3')],
	['jeye', require('../assets/phoneme-audio/jeye.mp3')],
	['jih', require('../assets/phoneme-audio/jih.mp3')],
	['joh', require('../assets/phoneme-audio/joh.mp3')],
	['joo', require('../assets/phoneme-audio/joo.mp3')],
	['jow', require('../assets/phoneme-audio/jow.mp3')],
	['joy', require('../assets/phoneme-audio/joy.mp3')],
	['juh', require('../assets/phoneme-audio/juh.mp3')],
	['kah', require('../assets/phoneme-audio/kah.mp3')],
	['kay', require('../assets/phoneme-audio/kay.mp3')],
	['kee', require('../assets/phoneme-audio/kee.mp3')],
	['keye', require('../assets/phoneme-audio/keye.mp3')],
	['kih', require('../assets/phoneme-audio/kih.mp3')],
	['koh', require('../assets/phoneme-audio/koh.mp3')],
	['koo', require('../assets/phoneme-audio/koo.mp3')],
	['kow', require('../assets/phoneme-audio/kow.mp3')],
	['koy', require('../assets/phoneme-audio/koy.mp3')],
	['kuh', require('../assets/phoneme-audio/kuh.mp3')],
	['lah', require('../assets/phoneme-audio/lah.mp3')],
	['lay', require('../assets/phoneme-audio/lay.mp3')],
	['lee', require('../assets/phoneme-audio/lee.mp3')],
	['leye', require('../assets/phoneme-audio/leye.mp3')],
	['lih', require('../assets/phoneme-audio/lih.mp3')],
	['loh', require('../assets/phoneme-audio/loh.mp3')],
	['loo', require('../assets/phoneme-audio/loo.mp3')],
	['low', require('../assets/phoneme-audio/low.mp3')],
	['loy', require('../assets/phoneme-audio/loy.mp3')],
	['luh', require('../assets/phoneme-audio/luh.mp3')],
	['mah', require('../assets/phoneme-audio/mah.mp3')],
	['may', require('../assets/phoneme-audio/may.mp3')],
	['mee', require('../assets/phoneme-audio/mee.mp3')],
	['meye', require('../assets/phoneme-audio/meye.mp3')],
	['mih', require('../assets/phoneme-audio/mih.mp3')],
	['moh', require('../assets/phoneme-audio/moh.mp3')],
	['moo', require('../assets/phoneme-audio/moo.mp3')],
	['mow', require('../assets/phoneme-audio/mow.mp3')],
	['moy', require('../assets/phoneme-audio/moy.mp3')],
	['muh', require('../assets/phoneme-audio/muh.mp3')],
	['nah', require('../assets/phoneme-audio/nah.mp3')],
	['nay', require('../assets/phoneme-audio/nay.mp3')],
	['nee', require('../assets/phoneme-audio/nee.mp3')],
	['neye', require('../assets/phoneme-audio/neye.mp3')],
	['nih', require('../assets/phoneme-audio/nih.mp3')],
	['noh', require('../assets/phoneme-audio/noh.mp3')],
	['noo', require('../assets/phoneme-audio/noo.mp3')],
	['now', require('../assets/phoneme-audio/now.mp3')],
	['noy', require('../assets/phoneme-audio/noy.mp3')],
	['nuh', require('../assets/phoneme-audio/nuh.mp3')],
	['oh', require('../assets/phoneme-audio/oh.mp3')],
	['oo', require('../assets/phoneme-audio/oo.mp3')],
	['ow', require('../assets/phoneme-audio/ow.mp3')],
	['oy', require('../assets/phoneme-audio/oy.mp3')],
	['pah', require('../assets/phoneme-audio/pah.mp3')],
	['pay', require('../assets/phoneme-audio/pay.mp3')],
	['pee', require('../assets/phoneme-audio/pee.mp3')],
	['peye', require('../assets/phoneme-audio/peye.mp3')],
	['pih', require('../assets/phoneme-audio/pih.mp3')],
	['poh', require('../assets/phoneme-audio/poh.mp3')],
	['poo', require('../assets/phoneme-audio/poo.mp3')],
	['pow', require('../assets/phoneme-audio/pow.mp3')],
	['poy', require('../assets/phoneme-audio/poy.mp3')],
	['puh', require('../assets/phoneme-audio/puh.mp3')],
	['rah', require('../assets/phoneme-audio/rah.mp3')],
	['ray', require('../assets/phoneme-audio/ray.mp3')],
	['ree', require('../assets/phoneme-audio/ree.mp3')],
	['reye', require('../assets/phoneme-audio/reye.mp3')],
	['rih', require('../assets/phoneme-audio/rih.mp3')],
	['roh', require('../assets/phoneme-audio/roh.mp3')],
	['roo', require('../assets/phoneme-audio/roo.mp3')],
	['row', require('../assets/phoneme-audio/row.mp3')],
	['roy', require('../assets/phoneme-audio/roy.mp3')],
	['ruh', require('../assets/phoneme-audio/ruh.mp3')],
	['sah', require('../assets/phoneme-audio/sah.mp3')],
	['say', require('../assets/phoneme-audio/say.mp3')],
	['see', require('../assets/phoneme-audio/see.mp3')],
	['seye', require('../assets/phoneme-audio/seye.mp3')],
	['shah', require('../assets/phoneme-audio/shah.mp3')],
	['shay', require('../assets/phoneme-audio/shay.mp3')],
	['shee', require('../assets/phoneme-audio/shee.mp3')],
	['sheye', require('../assets/phoneme-audio/sheye.mp3')],
	['shih', require('../assets/phoneme-audio/shih.mp3')],
	['shoh', require('../assets/phoneme-audio/shoh.mp3')],
	['shoo', require('../assets/phoneme-audio/shoo.mp3')],
	['show', require('../assets/phoneme-audio/show.mp3')],
	['shoy', require('../assets/phoneme-audio/shoy.mp3')],
	['shuh', require('../assets/phoneme-audio/shuh.mp3')],
	['sih', require('../assets/phoneme-audio/sih.mp3')],
	['soh', require('../assets/phoneme-audio/soh.mp3')],
	['soo', require('../assets/phoneme-audio/soo.mp3')],
	['sow', require('../assets/phoneme-audio/sow.mp3')],
	['soy', require('../assets/phoneme-audio/soy.mp3')],
	['suh', require('../assets/phoneme-audio/suh.mp3')],
	['tah', require('../assets/phoneme-audio/tah.mp3')],
	['tay', require('../assets/phoneme-audio/tay.mp3')],
	['tee', require('../assets/phoneme-audio/tee.mp3')],
	['teye', require('../assets/phoneme-audio/teye.mp3')],
	['thah', require('../assets/phoneme-audio/thah.mp3')],
	['thay', require('../assets/phoneme-audio/thay.mp3')],
	['thee', require('../assets/phoneme-audio/thee.mp3')],
	['theye', require('../assets/phoneme-audio/theye.mp3')],
	['thih', require('../assets/phoneme-audio/thih.mp3')],
	['thoh', require('../assets/phoneme-audio/thoh.mp3')],
	['thoo', require('../assets/phoneme-audio/thoo.mp3')],
	['thow', require('../assets/phoneme-audio/thow.mp3')],
	['thoy', require('../assets/phoneme-audio/thoy.mp3')],
	['thuh', require('../assets/phoneme-audio/thuh.mp3')],
	['tih', require('../assets/phoneme-audio/tih.mp3')],
	['toh', require('../assets/phoneme-audio/toh.mp3')],
	['too', require('../assets/phoneme-audio/too.mp3')],
	['tow', require('../assets/phoneme-audio/tow.mp3')],
	['toy', require('../assets/phoneme-audio/toy.mp3')],
	['tuh', require('../assets/phoneme-audio/tuh.mp3')],
	['uh', require('../assets/phoneme-audio/uh.mp3')],
	['vah', require('../assets/phoneme-audio/vah.mp3')],
	['vay', require('../assets/phoneme-audio/vay.mp3')],
	['vee', require('../assets/phoneme-audio/vee.mp3')],
	['veye', require('../assets/phoneme-audio/veye.mp3')],
	['vih', require('../assets/phoneme-audio/vih.mp3')],
	['voh', require('../assets/phoneme-audio/voh.mp3')],
	['voo', require('../assets/phoneme-audio/voo.mp3')],
	['vow', require('../assets/phoneme-audio/vow.mp3')],
	['voy', require('../assets/phoneme-audio/voy.mp3')],
	['vuh', require('../assets/phoneme-audio/vuh.mp3')],
	['wah', require('../assets/phoneme-audio/wah.mp3')],
	['way', require('../assets/phoneme-audio/way.mp3')],
	['wee', require('../assets/phoneme-audio/wee.mp3')],
	['weye', require('../assets/phoneme-audio/weye.mp3')],
	['wih', require('../assets/phoneme-audio/wih.mp3')],
	['woh', require('../assets/phoneme-audio/woh.mp3')],
	['woo', require('../assets/phoneme-audio/woo.mp3')],
	['wow', require('../assets/phoneme-audio/wow.mp3')],
	['woy', require('../assets/phoneme-audio/woy.mp3')],
	['wuh', require('../assets/phoneme-audio/wuh.mp3')],
	['yah', require('../assets/phoneme-audio/yah.mp3')],
	['yay', require('../assets/phoneme-audio/yay.mp3')],
	['yee', require('../assets/phoneme-audio/yee.mp3')],
	['yeye', require('../assets/phoneme-audio/yeye.mp3')],
	['yih', require('../assets/phoneme-audio/yih.mp3')],
	['yoh', require('../assets/phoneme-audio/yoh.mp3')],
	['yoo', require('../assets/phoneme-audio/yoo.mp3')],
	['yow', require('../assets/phoneme-audio/yow.mp3')],
	['yoy', require('../assets/phoneme-audio/yoy.mp3')],
	['yuh', require('../assets/phoneme-audio/yuh.mp3')],
	['zah', require('../assets/phoneme-audio/zah.mp3')],
	['zay', require('../assets/phoneme-audio/zay.mp3')],
	['zee', require('../assets/phoneme-audio/zee.mp3')],
	['zeye', require('../assets/phoneme-audio/zeye.mp3')],
	['zhah', require('../assets/phoneme-audio/zhah.mp3')],
	['zhay', require('../assets/phoneme-audio/zhay.mp3')],
	['zhee', require('../assets/phoneme-audio/zhee.mp3')],
	['zheye', require('../assets/phoneme-audio/zheye.mp3')],
	['zhih', require('../assets/phoneme-audio/zhih.mp3')],
	['zhoh', require('../assets/phoneme-audio/zhoh.mp3')],
	['zhoo', require('../assets/phoneme-audio/zhoo.mp3')],
	['zhow', require('../assets/phoneme-audio/zhow.mp3')],
	['zhoy', require('../assets/phoneme-audio/zhoy.mp3')],
	['zhuh', require('../assets/phoneme-audio/zhuh.mp3')],
	['zih', require('../assets/phoneme-audio/zih.mp3')],
	['zoh', require('../assets/phoneme-audio/zoh.mp3')],
	['zoo', require('../assets/phoneme-audio/zoo.mp3')],
	['zow', require('../assets/phoneme-audio/zow.mp3')],
	['zoy', require('../assets/phoneme-audio/zoy.mp3')],
	['zuh', require('../assets/phoneme-audio/zuh.mp3')],
]);
