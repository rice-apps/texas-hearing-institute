const prompt1 = "What consonant phenoms can your child **say**?";
const prompt2 = "What consonant phenoms can your child **hear**?";
const prompt3 = "What vowels can your child **say**?";
const prompt4 = "What vowels can your child **hear**?";

const consonants = ['b','m','w','f','v','th','TH','t','d','n','s','z','l','sh','zh','ch','dg','y','r','k','g','ng','h'];
const vowels = ['ee','I','A','E','a','ah','uh','aw','o','oo','ow','eye','oi'];

const onboarding1Key = "consonantSay";
const onboarding2Key = "consonantHear";
const onboarding3Key = "vowelSay";
const onboarding4Key = "vowelHear";

export const setupPrompts = [prompt1, prompt2, prompt3, prompt4];
export const setupPersistenceKeys = [onboarding1Key, onboarding2Key, onboarding3Key, onboarding4Key];
export const setupPageElements = [consonants, consonants, vowels, vowels]