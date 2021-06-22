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
        console.log("submit")
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
    <button on:click={onClickSubmit}>submit</button>
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
</style>