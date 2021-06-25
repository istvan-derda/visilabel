<script>
    import {designImageUrl} from '../services/imageService.js'

    export let configuration;
    export let imageSizePx
</script>

<div class=image-container style="height:{imageSizePx}px;width:{imageSizePx}px;background:{configuration.background};">
    <!--suppress HtmlUnknownTarget -->
    <img alt="design"
         src={designImageUrl(configuration.designId, imageSizePx)}>
</div>

<style>
    .image-container {
        border-radius: 10px;
        box-shadow: 1px 2px 8px #0007;

        display: grid;
        place-items: center;
        padding: 4px;
    }
</style>