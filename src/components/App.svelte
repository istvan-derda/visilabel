<script>
    import DragNDropList from './DragNDropList.svelte';
    import Modal from 'svelte-simple-modal';
    import {userIdFromCookie} from "../services/userIdService";
    import {getNextToCheck, saveChecks} from "../services/backendService";
    import {convertToChecks} from '../services/checkMapper'


    const userId = userIdFromCookie()

    let visible = []
    let notSureOrMedium = getNextToCheck(userId)
    let notVisible = []

    function onClickSubmit() {
        let checks = convertToChecks(userId, {visibleItems: visible, mediumItems: notSureOrMedium, notVisibleItems: notVisible})
        saveChecks(checks)
        visible = []
        notSureOrMedium = getNextToCheck(userId)
        notVisible = []
    }

</script>

<Modal>
	<span class=title>
		Visi<b>lable</b>
	</span>

    <div class=drag-n-drop-lists-container>
        <DragNDropList images={visible} color={"#dcf5de"}/>
        <DragNDropList images={notSureOrMedium} color={"#f5edb3"}/>
        <DragNDropList images={notVisible} color={"#f2ac9d"}/>
    </div>
    <div class=controls>
        <button class=button on:click={onClickSubmit}>next</button>
    </div>
</Modal>

<style>
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
        margin: 8px;
        cursor: pointer;
        display: inline-block;
        padding: 0.75rem 1.25rem;
        border-radius: 10rem;
        color: #fff;
        text-transform: uppercase;
        font-size: 1.5rem;
        background-color: #47f561;
        letter-spacing: 0.15rem;
    }
    .button:hover {
        color: #fff;
    }
    .button:active {
        background-color: #47f561;
        margin-top: 10px;
    }


</style>