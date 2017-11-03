import {flatten} from './helpers';
import {CONSONANTS} from './helpers';
import {uniqueArray} from './helpers';
import {sortByLengthDown} from './helpers';


export class Filter {
  constructor(names) {
  	this._vetoed = false
  	this._changed = false
  	this._filterName = "unnamed filter"
  	// console.log("ARY:", names)
  	this._names = flatten(names)
  }

  get vetoed() {
	  return this._vetoed
  }

  get changed() {
	  return this._changed
  }

  filter(name) {
	  return this.afterFilter(this.onFilter(this.beforeFilter(name)))
  }

  beforeFilter(name) {
    this._changed = false
  	this._oldName = name
	  return name
  }

  onFilter(name) {
	  if (name === false) {
	    return false
	  }
  }

  afterFilter(name) {
	  if (name !== this._oldName) {
	    this._changed = true
	  }
	  // console.log(this._filterName + ": " + " " + this._oldName + " --> " + name )
	  return name
  }

  afterSuccess() {
  	this._vetoed = false
  	this._changed = false
  }

  afterFail() {
  	this._vetoed = false
  	this._changed = false
  }

  _veto() {
  	this._vetoed = true
  	return false
  }

}

export class ConsonantsPatternsFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "consonants patterns"
  	this._consonants = CONSONANTS
  	this._regex = new RegExp("[" + this._consonants.join("|") + "]+", "ig")
  	this._allowedGroups = []
  	this._names.forEach(name => {
	    let groups = name.match(this._regex)
	    if (groups) {
  		  this._allowedGroups = this._allowedGroups.concat(groups)
  	  }
  	  else {
  		  this._allowedGroups = this._allowedGroups.concat([""])
  	  }
  	})
  	this._allowedGroups = uniqueArray(this._allowedGroups).map(group => group.toLowerCase())
  	// console.log("ALLOWED GROUPS: ", this._allowedGroups.sort())
  }

  onFilter(name) {
	  if (super.onFilter(name) === false) {
	    return this._veto()
	  }
	  let groups = name.match(this._regex)
	  if (!groups) {
	    groups = [""]
	  }
	  // console.log("GROUPS: ", groups, "name:", name)
  	let isOk = true
  	groups.forEach(group => {
  	  if (!this._allowedGroups.includes(group.toLowerCase())) {
  		  isOk = false
  	  }
  	})
  	if (isOk) {
  	  return name
  	}
  	else {
  	  return this._veto()
  	}
  }
}


export class VowelsPatternsFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "vowels patterns"
  	this._vowels = [
	    "a","o","i","e","u","y",
	    "ó","ę","ą",
	    "æ","á","à","ă","ắ",
	    "â","ǎ","ä","ã","ȧ",
	    "ā","ȃ","å",
	    "é","è","ê","ě","ë",
	    "ẽ","ė","ē",
	    "ə",
	    "í","ì","î","ï","ĩ",
	    "İ","į","ī",
	    "ò","ô","ö","ő","õ",
	    "ø","ǫ","ō","ơ","œ",
	    "ú","ù","ŭ","û","ů",
	    "ü","ű","ũ","ų","ū",
	    "ư",
	    "ý","ỳ","ÿ",
  	]
  	this._regex = new RegExp("[" + this._vowels.join("|") + "]+", "ig")

  	this._allowedGroups = []
  	this._names.forEach(name => {
	    let groups = name.match(this._regex)
	    if (groups) {
  		  this._allowedGroups = this._allowedGroups.concat(groups)
  	  }
  	  else {
  		  this._allowedGroups = this._allowedGroups.concat([""])
  	  }
  	})
  	this._allowedGroups = uniqueArray(this._allowedGroups).map(group => group.toLowerCase())
  	// console.log("ALLOWED GROUPS: ", this._allowedGroups.sort())
  }

  onFilter(name) {
  	if (super.onFilter(name) === false) {
	    return this._veto()
  	}
  	let groups = name.match(this._regex)
  	if (!groups) {
	    groups = [""]
  	}
  	// console.log("GROUPS: ", groups, "name:", name)

  	let isOk = true
  	groups.forEach(group => {
	    if (!this._allowedGroups.includes(group.toLowerCase())) {
  		  isOk = false
  	  }
  	})
  	if (isOk) {
  	  return name
  	}
  	else {
  	  return this._veto()
  	}
  }

}

export class RepeatedLettersFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "repeating letters"
  	this._allowedRepeats = []
  	this._repeatsPattern = /(.)\1+|(.)/ig
  	this._names.forEach(name => {
      let repeats = name.match(this._repeatsPattern)
      if (repeats) {
  		  this._allowedRepeats = this._allowedRepeats.concat(repeats)
  	  }
  	})
  	this._allowedRepeats = uniqueArray(this._allowedRepeats)
  }

  onFilter(name) {
  	if (super.onFilter(name) === false) {
	    return this._veto()
  	}
  	let parts = name.match(this._repeatsPattern)
  	const cutAndCheck = (part) => {
	    if (part.length > 1) {
  		  if (!this._allowedRepeats.includes(part.toLowerCase())) {
  		    part = part.slice(0,-1)
  		    return cutAndCheck(part)
  		  }
  		  else {
  		    return part
  		  }
  	  }
  	  else {
  		  return part
  	  }
  	}
  	return parts.map(cutAndCheck).join("")
  }

}

export class UniquenessFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "uniquennes"
  	this._toAvoid = this._names.slice()
  }

  onFilter(name) {
  	if (super.onFilter(name) === false) {
      return this._veto()
  	}
  	if (this._toAvoid.includes(name)) {
  	  return this._veto()
  	}
  	else {
  	  return name
  	}
  }

  afterSuccess() {
  	super.afterSuccess()
  	// console.log("AFTER SUCCESS ", this._oldName )
  	this._toAvoid.push(this._oldName)
  }

}


export class NameLengthFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "length filter"
  	const sortedNames = sortByLengthDown(this._names)
  	const all = this._names.length
  	const ANOMALY_RATIO = 0.05

  	this._min = sortedNames[sortedNames.length - 1].length
  	this._max = sortedNames[0].length
  	while (sortedNames.filter(name => {return name.length <= this._min}).length / all <= ANOMALY_RATIO) {
  	  this._min++
  	}
  	while (sortedNames.filter(name => {return name.length >= this._max}).length / all <= ANOMALY_RATIO) {
  	  this._max--
  	}
  }

  onFilter(name) {
  	if (super.onFilter(name) === false) {
  	  return this._veto()
  	}
  	if (name.length >= this._min && name.length <= this._max) {
  	  return name
  	}
  	else {
  	  return this._veto()
  	}
  }

}

export class CapitalizeFilter extends Filter {

  constructor(names) {
  	super(names)
  	this._filterName = "capitalize filter"
  }

  onFilter(name) {
	  if (super.onFilter(name) === false) {
	    return this._veto()
	  }
	  return name.charAt(0).toUpperCase() + name.slice(1);
  }

}
