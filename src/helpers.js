import {ifElse} from 'ramda';
import {contains} from 'ramda';
import {reject} from 'ramda';
import {equals} from 'ramda';
import {append} from 'ramda';

// function intersection(setA, setB) {
//     return new Set([...setA].filter(x => setB.has(x)))
// }
//

export function sortByLengthDown(array) {
    return array.slice().sort((a, b) => b.length - a.length )
}
//
// function sortByLengthUp(array) {
//     return array.slice().sort((a, b) => a.length - b.length )
// }

const addOrRemove = (arr, val) => {
  return ifElse(
    contains(val),
    reject(equals(val)),
    append(val)
  )(arr)
};

export function removeFromArray(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

export function getMedian(...args) {
  return args.slice().sort()[fairRound((args.length-1)/2)]
}

export const VOWELS = [
  "A","a", "O","o", "I","i", "E","e", "U","u", "Y","y",
  "Ó","ó", "Ę","ę", "Ą","ą",
  "Æ","æ", "Á","á", "À","à", "Ă","ă", "Ắ","ắ",
  "Â","â", "Ǎ","ǎ", "Ä","ä", "Ã","ã", "Ȧ","ȧ",
  "Ā","ā", "Ȃ","ȃ", "Å","å",
  "É","é", "È","è", "Ê","ê", "Ě","ě", "Ë","ë",
  "Ẽ","ẽ", "Ė","ė", "Ē","ē",
  "Ə","ə",
  "Í","í", "Ì","ì", "Î","î", "Ï","ï", "Ĩ","ĩ",
  "İ","İ", "Į","į", "Ī","ī",
  "Ò","ò", "Ô","ô", "Ö","ö", "Ő","ő", "Õ","õ",
  "Ø","ø", "Ǫ","ǫ", "Ō","ō", "Ơ","ơ", "Œ","œ",
  "Ú","ú", "Ù","ù", "Ŭ","ŭ", "Û","û", "Ů","ů",
  "Ü","ü", "Ű","ű", "Ũ","ũ", "Ų","ų", "Ū","ū",
  "Ư","ư",
  "Ý","ý", "Ỳ","ỳ", "Ÿ","ÿ"
]

export const CONSONANTS = [
  "q",
  "w",
  "r",
  "t",
  "p",
  "s","ś",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l","ł",
  "z","ż","ź",
  "x",
  "c","ć",
  "v",
  "b",
  "n","ń",
  "m",
]

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomElement(array) {
  return array[Math.floor((Math.random() * array.length))]
}

export function buildRegexToSplit(separators, caseless=true, where="after") {
  let sortedSeparators = sortByLengthDown(separators)
  let orPart = "("
  let norPart = "("
  let modPart = "ig"
  let oneChar = false
  if (!caseless) {
	  modPart = "g"
  }
  sortedSeparators.forEach(separator => {
  	if (separator.length > 1) {
  	  orPart += separator + "|"
  	  norPart += "^" + separator + "|"
  	}
  	else {
  	  if (!oneChar) {
  		  oneChar = true
  		  orPart += "[" + separator
  		  norPart += "[^" + separator
  	  }
  	  else {
  		  orPart += separator
  		  norPart += separator
  	  }
  	}
  })
  if (oneChar) {
	  orPart += "])"
	  norPart += "])"
  }
  else {
  	orPart = orPart.slice(0, -1)
  	orPart += ")"
  	norPart = norPart.slice(0, -1)
  	norPart += ")"
  }
  if (where === "after") {
	  return new RegExp(norPart + "{0,}" + orPart + "{0,}", modPart)
  }
  else if (where === "before") {
	  return new RegExp(orPart + "{0,}" + norPart + "{0,}", modPart)
  }
  else if (where === "instead") {
	  return new RegExp(norPart, modPart)
  }
  else {
	  throw new Error("unknown split method as an argument!");
  }
}

function fairRound(number) {
  if (number - Math.floor(number) === 0.5) {
    return parseInt(number, 10) + Math.round(Math.random())
  }
  else {
    return Math.round(number)
  }
}
