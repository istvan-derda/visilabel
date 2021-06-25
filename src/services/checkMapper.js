export function convertToChecks(userId, {visibleItems, notVisibleItems}) {
    let checks = [];
    checks = checks.concat(visibleItems.map((item) => convertToCheck(userId, item, 2)))
    checks = checks.concat(notVisibleItems.map((item) => convertToCheck(userId, item, 1)))
    return checks
}

function convertToCheck(userId, {id, designId, background}, visibilityScore) {
    let check = {id: id, designId: designId, backgroundColor: background, userId: userId, visibilityScore: visibilityScore}
    console.log("convert to check")
    console.log(check)
    return check
}