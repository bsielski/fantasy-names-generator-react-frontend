import {sort} from 'ramda';
import {comparator} from 'ramda';
import {lt} from 'ramda';
import {curry} from 'ramda';
import {negate} from 'ramda';
import {pipe} from 'ramda';
import {clone} from 'ramda';
import {reverse} from 'ramda';

export function sortAlphabeticallyAsc(list) {
    return sort(comparator(lt), list)
}
export function sortAlphabeticallyDesc(list) {
    return sort(pipe(comparator(lt), negate), list)
}
function _shortenThan(a, b) {
    return a.length < b.length;
}
const byLength = comparator(curry(_shortenThan));

export function sortByLengthAsc(list) {
    return sort(byLength, list)
}
export function sortByLengthDesc(list) {
    return sort(pipe(byLength, negate), list)
}
export function unsortAsc(list) {
    return clone(list);
}
export function unsortDesc(list) {
    return reverse(list);
}
