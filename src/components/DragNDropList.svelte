<script>
    import {flip} from 'svelte/animate';
    import ImageContainer from './ImageContainer.svelte';
    import {dndzone} from 'svelte-dnd-action';
    import {getContext} from 'svelte'
    import {getModalImageSizePx, getPreviewImageSizePx} from "../services/sizingLogic";

    const {open} = getContext('simple-modal');

    export let description = ""
    export let color = "#fff"
    export let images = []

    let flipDurationMs = 300;
    let previewImageSizePx = 200
    let detailImageSizePx = previewImageSizePx * 3

    let windowHeight = 0
    let windowWidth = 0
    $: previewImageSizePx = getPreviewImageSizePx(windowHeight, windowWidth)
    $: listMinHeight = previewImageSizePx + 20;
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

<div class="drag-n-drop-list-container"
     style="background:{color}">
    <div class=description>{description}</div>
    <section class="drag-n-drop-list"
             style="min-height:{listMinHeight}px"
             use:dndzone={{items: images}}
             on:consider={handleDndConsider}
             on:finalize={handleDndFinalize}>
        {#each images as image (image.id)}
            <div class=drag-n-drop-item animate:flip="{{duration: flipDurationMs}}" on:click={()=>handleImageClick(image)}>
                <ImageContainer image={image} imageSizePx={previewImageSizePx}/>
            </div>
        {/each}
    </section>
</div>

<style>
    .drag-n-drop-list-container {
        border: solid 1px lightgrey;
        border-radius: 5px;
        box-shadow: 0 0 8px lightgrey;
        margin: 8px;
        position: relative;
    }

    .drag-n-drop-list {
        padding-bottom: 8px;
        padding-top: 16px;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .drag-n-drop-item {
        margin: 0.5rem;
    }

    .description {
        position: absolute;
        top: 4px;
        left: 4px;
        font-weight: bold;
    }
</style>