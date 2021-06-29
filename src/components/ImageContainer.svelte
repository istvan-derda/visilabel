<script>
    import {designImageUrl} from '../services/imageService.js'

    export let configuration;
    export let imageSizePx

    $: src = designImageUrl(configuration.designId, imageSizePx)
    let error = false

    function handleImageError() {

    }
</script>

<div class=image-container style="background:#{configuration.background};">
    <!--suppress HtmlUnknownTarget -->
    <div style="height:{imageSizePx}px;width:{imageSizePx}px;">
        {#if !error}
            <img alt="design"
                 src={src}
                 on:error={()=>error=true}>
        {:else}
            An Error occurred when loading the image. Please reload the page or try again later.
        {/if}
    </div>
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