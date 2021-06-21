<script>
    import {flip} from 'svelte/animate';
    import ImageContainer from './ImageContainer.svelte';
    import {dndzone} from 'svelte-dnd-action';
    import {getContext} from 'svelte'

    const {open} = getContext('simple-modal');

    export let images = []
    export let color = "#fff"

    let flipDurationMs = 300;
    let previewImageSizePx = 200
    let detailImageSizePx = previewImageSizePx * 3

    let style = `background:${color}`

    function handleDndConsider(e) {
        images = e.detail.items
    }

    function handleDndFinalize(e) {
        images = e.detail.items
    }

    function handleImageClick(image) {
        open(ImageContainer, {image: image, imageSizePx: detailImageSizePx})
    }
</script>


<section class="drag-n-drop-list"
         use:dndzone={{items: images}}
         on:consider={handleDndConsider}
         on:finalize={handleDndFinalize}
         style={style}>
    {#each images as image (image.id)}
        <div animate:flip="{{duration: flipDurationMs}}" on:click={()=>handleImageClick(image)}>
            <ImageContainer image={image} imageSizePx={previewImageSizePx}/>
        </div>
    {/each}
</section>

<style>
    .drag-n-drop-list {
        border: solid 1px lightgrey;
        border-radius: 5px;
        box-shadow: 0 0 8px lightgrey;
        padding: 8px;
        margin: 8px;
        height: 240px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>