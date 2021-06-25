<script>
    import DragNDropList from './DragNDropList.svelte';
    import Modal from 'svelte-simple-modal';
    import {userIdFromCookie} from "../services/userIdService";
    import {fetchAllBatches, getNextToCheck, saveChecks} from "../services/backendService";
    import {convertToChecks} from '../services/checkMapper'
    import {onMount} from "svelte";


    const userId = userIdFromCookie()

    let visible = []
    let to_check = []
    let notVisible = []

    function onClickSubmit() {
        if (to_check.length > 0) {
            return
        }
        let checks = convertToChecks(userId, {visibleItems: visible, notVisibleItems: notVisible})
        saveChecks(checks)
        visible = []
        to_check = getNextToCheck()
        notVisible = []
    }

    onMount(() => fetchAllBatches()
            .then(() => to_check = getNextToCheck()))

</script>

<Modal>
    <div class=header>
	<span class=title>
		Visi<b>lable</b>
	</span>
        <span>your id is: {userId}</span>
    </div>

    <div class=drag-n-drop-lists-container>
        <DragNDropList description="Visible" bind:configurations={visible} color={"#dcf5de"}/>
        <DragNDropList description="To Check" bind:configurations={to_check} color={"#ccc"}/>
        <DragNDropList description="(Partially) Not Visible" bind:configurations={notVisible} color={"#f2ac9d"}/>
    </div>
    <div class=controls>
        <button class=button class:enabled={to_check.length===0} on:click={onClickSubmit}>next</button>
    </div>
</Modal>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }

    .title {
        font-size: 2rem;
        font-family: sans-serif;
        line-height: 4rem;
    }

    .drag-n-drop-lists-container {
        display: grid;
        grid-template-rows: auto auto auto;
    }

    .controls {
        display: flex;
        justify-content: flex-end;
    }

    .button {
        all: unset;
        margin-right: 8px;
        margin-top: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        display: inline-block;
        padding: 0.75rem 1.25rem;
        border-radius: 10rem;
        color: #fff;
        text-transform: uppercase;
        font-size: 1.3rem;
        background-color: lightgray;
        letter-spacing: 0.15rem;
    }

    .button.enabled {
        background-color: #47f561;
    }

    .button.enabled:hover {
        color: #fff;
    }

    .button.enabled:active {
        background-color: #47f561;
        margin-top: 6px;
    }


</style>