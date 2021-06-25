export function convertToChecks(userId, {visibleItems, notVisibleItems}) {
    let checks = [];
    checks += visibleItems.map((item) => convertToCheck(userId, item, 2))
    checks += notVisibleItems.map((item) => convertToCheck(userId, item, 1))
    return checks
}

function convertToCheck(userId, {id, designId, colorHexString}, visibilityScore) {
    return {id: id, designId: designId, colorHexString: colorHexString, userId: userId, visibilityScore: visibilityScore}
}