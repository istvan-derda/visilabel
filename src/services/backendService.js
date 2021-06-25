import uuid from "uuid-random";

let all_batches
let i = 0;

export async function fetchAllBatches() {
    let batches_dto = await fetch("https://visilable-backend.herokuapp.com/toRate").then(response => response.json())
    all_batches = batches_dto.batchesK
}

export function saveChecks(checks) {
    for (let check in checks) {
        saveCheck(check)
    }
}

function saveCheck({id, userId, designId, colorHexString, visibilityRating}) {
    //todo
}

export function getNextToCheck() {
    let nextToCheck = all_batches[i]
    i++;
    return nextToCheck.background_colors.map(color=>({id: uuid(), designId: nextToCheck.design_id, background: color}))
}