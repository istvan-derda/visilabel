const backendUrl = "https://visilable-backend.isde.dev"

export async function fetchAllBatches() {
    return fetch(`${backendUrl}/toRate`).then(response => response.json())
            .then(batchesDto=>batchesDto.batches)
}

export function saveLabeledCombinations(labeledCombinations) {
    for (let labeledCombination of labeledCombinations) {
        saveLabeledCombination(labeledCombination)
    }
}

function saveLabeledCombination({userId, designId, backgroundColor, visibilityScore}) {
    fetch(`${backendUrl}/submitRating`, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ratings": [
                {
                    "user_id": userId, "design_id": designId, "background_color": backgroundColor, "rating": visibilityScore
                }
            ]
        })
    })
}
