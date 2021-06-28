<script>
    import DragNDropList from './DragNDropList.svelte';
    import InfoModal from './InfoModal.svelte'
    import EndModal from './EndModal.svelte'
    import NotVisibleDefinition from './NotVisibleDefinition.svelte'
    import VisibleDefinition from './VisibleDefinition.svelte'
    import {userIdFromCookie} from "../services/userIdService";
    import {fetchAllBatches, saveLabeledCombinations} from "../services/backendService";
    import {convertToLabeledCombinations} from '../services/checkMapper'
    import {getContext, onMount} from "svelte";
    import {Pulse} from 'svelte-loading-spinners'
    import uuid from "uuid-random";

    const {open} = getContext('simple-modal');

    const userId = userIdFromCookie()

    let visible = []
    let toCheck = []
    let notVisible = []

    let all_batches = []
    let i = 0;

    function onClickSubmit() {
        if (toCheck.length > 0) {
            return
        }
        if (!hasNextToCheck()) {
            open(EndModal)
        }
        let labeledCombinations = convertToLabeledCombinations(userId, {visibleItems: visible, notVisibleItems: notVisible})
        saveLabeledCombinations(labeledCombinations)
        visible = []
        toCheck = getNextToCheck()
        notVisible = []
    }

    function sendUp() {
        if (toCheck.length <= 0) {
            return
        }
        visible = visible.concat(toCheck)
        toCheck = []
    }

    function reset() {
        toCheck = toCheck.concat(visible.concat(notVisible))
        visible = []
        notVisible = []
    }

    function sendDown() {
        if (toCheck.length <= 0) {
            return
        }
        notVisible = notVisible.concat(toCheck)
        toCheck = []
    }

    function getNextToCheck() {
        let nextToCheck = all_batches[i]
        i++;
        return nextToCheck.background_colors.map(color => ({id: uuid(), designId: nextToCheck.design_id, background: color}))
    }

    function hasNextToCheck() {
        return all_batches.length > i + 1
    }

    let batchPromise
    onMount(() => {
        open(InfoModal, {})
        batchPromise = fetchAllBatches()
                .then(batches => all_batches = batches)
                .then(() => toCheck = getNextToCheck())
    })
</script>

<div class=header>
	<span class=title>
		Visi<b>lable</b><img alt="info" on:click={()=>open(InfoModal)} class=info src="https://img.icons8.com/material-outlined/24/000000/info.png"/>
	</span>
    <span>your id is: {userId}</span>
</div>

<div class=drag-n-drop-lists-container>
    <DragNDropList bind:configurations={visible} color={"#dcf5de"}>
        <div slot=description>
            Visible <img alt="info" on:click={()=>open(VisibleDefinition)} style="height:15px" class=info
                         src="https://img.icons8.com/material-outlined/24/000000/info.png"/>
        </div>
    </DragNDropList>
    <div style="position:relative">
        <DragNDropList bind:configurations={toCheck} color={"#ccc"}>
            <div slot=description>
                To Check
            </div>
        </DragNDropList>
        <div class="send-up-down">
            <button class="send up" on:click={sendUp}>send up</button>
            <button class="send" on:click={reset}>reset</button>
            <button class="send down" on:click={sendDown}>send down</button>
        </div>
        {#await batchPromise}
            <div class=loading-spinner>
                <Pulse/>
            </div>
        {/await}
    </div>
    <DragNDropList bind:configurations={notVisible} color={"#f2ac9d"}>
        <div slot=description>
            (Partially) Not Visible <img alt="info" on:click={()=>open(NotVisibleDefinition)} style="height:15px" class=info
                                         src="https://img.icons8.com/material-outlined/24/000000/info.png"/>
        </div>
    </DragNDropList>
</div>
<div class=controls>
    <button class=submit class:enabled={toCheck.length===0} on:click={onClickSubmit}>next</button>
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
        position: relative;
        display: grid;
        grid-template-rows: auto auto auto;
    }

    .controls {
        display: flex;
        justify-content: flex-end;
    }

    .info {
        cursor: pointer;
        filter: opacity(50%);
    }

    .info:hover {
        cursor: pointer;
        filter: opacity(100%);
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
        left: 16px;
        top: 50%;
        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 110px;
    }

    .send {
        margin: 0;
    }

    .send.up {
        background: #dcf5de;
    }

    .send.down {
        background: #f2ac9d;
    }

    .loading-spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>