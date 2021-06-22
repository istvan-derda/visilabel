import uuid from "uuid-random";

export function saveChecks(checks) {
    for (let check in checks) {
        saveCheck(check)
    }
}

function saveCheck({id, userId, designId, colorHexString, visibilityRating}) {
    //todo
}

export function getNextToCheck(userId) {
    return [
        {id: uuid(), designId: 122644386, background: "#000000"},
        {id: uuid(), designId: 122644386, background: "#ffffff"},
        {id: uuid(), designId: 122644386, background: "#aaa"},
        {id: uuid(), designId: 122644386, background: "#abc"},
        {id: uuid(), designId: 126295421, background: "#000000"},
        {id: uuid(), designId: 126295421, background: "#ffffff"},
        {id: uuid(), designId: 126295421, background: "#aaa"},
        {id: uuid(), designId: 126295421, background: "#abc"}]
}