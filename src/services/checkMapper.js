export function convertToLabeledCombinations(userId, {visibleItems, notVisibleItems}) {
    let checks = [];
    checks = checks.concat(visibleItems.map((item) => convertToLabeledCombination(userId, item, 2)))
    checks = checks.concat(notVisibleItems.map((item) => convertToLabeledCombination(userId, item, 1)))
    return checks
}

function convertToLabeledCombination(userId, {id, designId, background}, visibilityScore) {
    return {id: id, designId: designId, backgroundColor: background, userId: userId, visibilityScore: visibilityScore}
}