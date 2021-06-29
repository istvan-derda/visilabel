<script>
    import {designImageUrl} from '../services/imageService.js'

    export let configuration;
    export let imageSizePx

    let src = designImageUrl(configuration.designId, imageSizePx)
    let error = false

    function handleImageError() {

    }
</script>

<div class=image-container style="height:{imageSizePx}px;width:{imageSizePx}px;background:#{configuration.background};">
    <!--suppress HtmlUnknownTarget -->
    {#if !error}
        <img alt="design"
             src={src}
             on:error={()=>error=true}>
    {:else}
        An Error occurred when loading the image. Please reload the page or try again later.
    {/if}
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