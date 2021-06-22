export function getModalImageSizePx(windowHeight, windowWidth) {
    return getPossibleImageSize(
            Math.min(
                    windowHeight,
                    windowWidth) - 100 // will use maximum screen-space without scrolling. -100 for margins and paddings.
    )
}

export function getPreviewImageSizePx(windowHeight, windowWidth) {
    return getPossibleImageSize(
            Math.max(
                    Math.min(
                            (windowHeight-320) / 6,
                            windowWidth
                    ),
                    Math.min(
                            (windowHeight-320) / 3,
                            (windowWidth-200) / 8
                    ))
    )
}

function getPossibleImageSize(maxSize) {
    if (maxSize < 100) {
        return 100 //fallback. showing images smaller than 150px is useless for use-case
    }
    if (maxSize > 600) {
        return 600 //fallback. imageserver does not serve images bigger than 600px
    }
    return Math.floor(maxSize / 50) * 50 // imageserver does not serve any size. multiples of 50px are served.
}