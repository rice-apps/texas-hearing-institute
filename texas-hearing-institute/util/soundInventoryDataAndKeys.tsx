const prompt1 = "What consonant phenoms can your child **say**?";
const prompt2 = "What consonant phenoms can your child **hear**?";
const prompt3 = "What vowels can your child **say**?";
const prompt4 = "What vowels can your child **hear**?";

export const consonants = ['b','m','w','f','v','th','TH','t','d','n','s','z','l','sh','zh','ch','dg','y','r','k','g','ng','h'];
export const vowels = ['ee','I','A','E','a','ah','uh','aw','o','oo','ow','eye','oi'];

export const consonantCanSayPersistenceKey = "consonantCanSay";
export const consonantCanHearPersistenceKey = "consonantCanHear";
export const vowelCanSayPersistenceKey = "vowelCanSay";
export const vowelCanHearPersistenceKey = "vowelCanHear";

export const setupPrompts = [prompt1, prompt2, prompt3, prompt4];
export const setupPersistenceKeys = [consonantCanSayPersistenceKey, consonantCanHearPersistenceKey, vowelCanSayPersistenceKey, vowelCanHearPersistenceKey];
export const setupPageElements = [consonants, consonants, vowels, vowels]