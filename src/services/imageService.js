const imageServerBaseUrl = "https://image.spreadshirtmedia.net/image-server/v1/designs/"

export function designImageUrl(designId, imageSizePx = 300) {
    return `${imageServerBaseUrl}${designId}?width=${imageSizePx}&height=${imageSizePx}`
}