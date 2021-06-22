<script>
    import {designImageUrl} from '../services/imageService.js'

    export let image;
    export let imageSizePx
</script>

<div class=image-container style="height:{imageSizePx}px;width:{imageSizePx}px;background:{image.background};">
    <!--suppress HtmlUnknownTarget -->
    <img alt="design"
         src={designImageUrl(image.designId, imageSizePx)}>
</div>

<style>
    .image-container {
        border-radius: 10px;
        box-shadow: 1px 2px 8px #0007;

        display: grid;
        place-items: center;
    }

    img {
        /* necessary because imageserver cannot handle height and width constraint together */
        object-fit: contain;
        height: 100%;
        width: 100%;
        /* --- */
    }
</style>