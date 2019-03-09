function areSortingsReversible(a, b) {
    return ((a - b === 1 || a - b === -1) && Math.min(a,b) % 2 === 0);
}

export async function optimizedSortNames(sortingOptions, selectedOptionIndex, previousOptionIndex, generated, sorted) {
    if (areSortingsReversible(selectedOptionIndex, previousOptionIndex)) {
	return sorted.slice().reverse();
    }
    else {
	const sort = sortingOptions[selectedOptionIndex].sort;
	return sort(generated);
    }
}
