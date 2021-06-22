<script>
    import DragNDropList from './DragNDropList.svelte';
    import Modal from 'svelte-simple-modal';

    let images = [
        {id: 1, designId: 122644386, background: "#000000"},
        {id: 2, designId: 122644386, background: "#ffffff"},
        {id: 4, designId: 122644386, background: "#aaa"},
        {id: 5, designId: 122644386, background: "#abc"},
        {id: 6, designId: 126295421, background: "#000000"},
        {id: 7, designId: 126295421, background: "#ffffff"},
        {id: 8, designId: 126295421, background: "#aaa"},
        {id: 9, designId: 126295421, background: "#abc"}]
</script>

<Modal>
	<span class=title>
		Visi<b>lable</b>
	</span>

    <div class=drag-n-drop-lists-container>
        <DragNDropList {images} color={"#dcf5de"}/>
        <DragNDropList color={"#f5edb3"}/>
        <DragNDropList color={"#f2ac9d"}/>
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
</style>