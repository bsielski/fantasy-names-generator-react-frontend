export async function sortNames(sortingOptions, selectedOptionIndex, names) {
    const sort = sortingOptions[selectedOptionIndex].sort;
    return sort(names);
}
