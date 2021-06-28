<script>
    import DragNDropList from './DragNDropList.svelte';
    import InfoModal from './InfoModal.svelte'
    import {userIdFromCookie} from "../services/userIdService";
    import {fetchAllBatches, getNextToCheck, saveChecks} from "../services/backendService";
    import {convertToChecks} from '../services/checkMapper'
    import {getContext, onMount} from "svelte";
    import {Pulse} from 'svelte-loading-spinners'

    const {open} = getContext('simple-modal');

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

    function sendUp() {
        if (to_check.length <= 0) {
            return
        }
        visible = visible.concat(to_check)
        to_check = []
    }

    function reset() {
        to_check = to_check.concat(visible.concat(notVisible))
        visible = []
        notVisible = []
    }

    function sendDown() {
        if (to_check.length <= 0) {
            return
        }
        notVisible = notVisible.concat(to_check)
        to_check = []
    }

    let promisedBatch
    onMount(() => {
        open(InfoModal, {})
        promisedBatch = fetchAllBatches()
                .then(() => to_check = getNextToCheck())
    })

</script>

<div class=header>
	<span class=title>
		Visi<b>lable</b>
	</span>
    <span>your id is: {userId}</span>
</div>

<div class=drag-n-drop-lists-container>
    <DragNDropList description="Visible" bind:configurations={visible} color={"#dcf5de"}/>
    <DragNDropList description="To Check" bind:configurations={to_check} color={"#ccc"}>
        <div class="send-up-down">
            <button class="send up" on:click={sendUp}>send up</button>
            <button class="send" on:click={reset}>reset</button>
            <button class="send down" on:click={sendDown}>send down</button>
        </div>
        {#await promisedBatch}
            <div class=loading-spinner>
                <Pulse/>
            </div>
        {/await}
    </DragNDropList>
    <DragNDropList description="(Partially) Not Visible" bind:configurations={notVisible} color={"#f2ac9d"}/>
</div>
<div class=controls>
    <button class=submit class:enabled={to_check.length===0} on:click={onClickSubmit}>next</button>
</div>

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

    .submit {
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

    .submit.enabled {
        background-color: #47f561;
    }

    .submit.enabled:hover {
        color: #fff;
    }

    .submit.enabled:active {
        background-color: #47f561;
        margin-top: 6px;
    }


    .send-up-down {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 150px;
    }

    .send {
        margin: 0;
    }

    .up {
        background: #dcf5de;
    }

    .down {
        background: #f2ac9d;
    }

    .loading-spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>