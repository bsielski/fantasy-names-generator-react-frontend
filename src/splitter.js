import {randomInt} from './helpers';
import {buildRegexToSplit} from './helpers';
import {getMedian} from './helpers';


export class Splitter {

  constructor(separators, caseless=true, where="after") {
  	this._regex = buildRegexToSplit(separators, caseless, where)
  	// console.log(this._regex)
  	this._separators = separators
  	this._where = where
  	this._caseless = caseless
  }

  split(name) {
    if (this._caseless) {
      name = name.toLowerCase()
    }
	  return name.match(this._regex).slice(0, -1)
  }

  getFirstPart(name) {
	   let parts = this.split(name)
  	// console.log("PARTS:", parts)
  	let a = randomInt(0, parts.length - 1)
  	let b = randomInt(0, parts.length - 1)
  	let c = randomInt(0, parts.length - 1)
  	let lastPartIndex = Math.min(a, b, c)

  	// if (lastPartIndex == -1) {
  	//     return ""
  	// }
  	// else {
  	// console.log("NAME:", name, "WHERE:", this._where, "FIRST:", parts.slice(0, lastPartIndex + 1).join(""))
	  return parts.slice(0, lastPartIndex + 1).join("")
	  // }
  }

  getLastPart(name) {
  	let parts = this.split(name)
  	let a = randomInt(0, parts.length - 1)
  	let b = randomInt(0, parts.length - 1)
  	let c = randomInt(0, parts.length - 1)
  	let firstPartIndex = Math.max(a, b, c)
  	// console.log("NAME:", name, "WHERE:", this._where, "LAST:", parts.slice(firstPartIndex).join(""))
  	return parts.slice(firstPartIndex).join("")
  }

  getMiddlePart(name) {
  	let parts = this.split(name)
  	let a = randomInt(0, parts.length - 1)
  	let b = randomInt(0, parts.length - 1)
  	let c = randomInt(0, parts.length - 1)
  	let d = randomInt(0, parts.length - 1)
  	let e = randomInt(0, parts.length - 1)
  	let firstPartIndex = getMedian(a, b, c, d, e)
  	a = randomInt(0, parts.length - 1)
  	b = randomInt(0, parts.length - 1)
  	c = randomInt(0, parts.length - 1)
  	d = randomInt(0, parts.length - 1)
  	e = randomInt(0, parts.length - 1)
  	let lastPartIndex = getMedian(a, b, c, d, e)
  	let start = Math.min(firstPartIndex, lastPartIndex)
  	let end = Math.max(firstPartIndex, lastPartIndex)
  	if (start == end) {
	    return ""
  	}
  	else {
	    // console.log("NAME:", name, "WHERE:", this._where, "MIDDLE:", parts.slice(start, end + 1).join(""))
	    return parts.slice(start, end + 1).join("")
  	}

  }

}
