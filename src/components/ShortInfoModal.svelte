<script>
    import VisibleDefinition from "./VisibleDefinition.svelte";
    import NotVisibleDefinition from "./NotVisibleDefinition.svelte";
</script>

<h1>Welcome to Visi<b>lable</b>!</h1>
Thank you for helping me out!
<br/><br/>
Please read this introduction carefully, before starting to use this tool.
<h2>How to use this Tool:</h2>
<ul>
    <li>Drag&Drop the designs into the classes <i>"Visible"</i> and <i>"(Partially) Not Visible"</i></li>
    <li>You can click a design to open it in a bigger view.</li>
    <li>Use the buttons on the right to rate designs in bulk.</li>
    <li>Click <i>"NEXT"</i> when you rated all designs.</li>
</ul>
<h2>What do I mean by "(Partially) Not Visible" and "Visible"</h2>
<p>
    The question is <b>not</b> about aesthetics or visual appeal.
</p>
<section>
    <VisibleDefinition/>
    <NotVisibleDefinition/>
</section>