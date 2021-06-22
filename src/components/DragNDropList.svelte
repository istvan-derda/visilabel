<script>
    import {flip} from 'svelte/animate';
    import ImageContainer from './ImageContainer.svelte';
    import {dndzone} from 'svelte-dnd-action';
    import {getContext} from 'svelte'
    import {getModalImageSizePx, getPreviewImageSizePx} from "../services/sizingService";

    const {open} = getContext('simple-modal');

    export let images = []
    export let color = "#fff"

    let flipDurationMs = 300;
    let previewImageSizePx = 200
    let detailImageSizePx = previewImageSizePx * 3

    let windowHeight = 0
    let windowWidth = 0
    let listMinHeight
    $: listMinHeight = getPreviewImageSizePx(windowHeight, windowWidth) + 20;
    $: previewImageSizePx = getPreviewImageSizePx(windowHeight, windowWidth)
    $: detailImageSizePx = getModalImageSizePx(windowHeight, windowWidth)

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

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}/>

<section class="drag-n-drop-list"
         style="background:{color};min-height:{listMinHeight}px"
         use:dndzone={{items: images}}
         on:consider={handleDndConsider}
         on:finalize={handleDndFinalize}>
    {#each images as image (image.id)}
        <div class=drag-n-drop-item animate:flip="{{duration: flipDurationMs}}" on:click={()=>handleImageClick(image)}>
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

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .drag-n-drop-item {
        margin: 0.5rem;
    }
</style>