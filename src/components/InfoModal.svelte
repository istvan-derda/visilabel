<script>
    import VisibleDefinition from "./VisibleDefinition.svelte";
    import NotVisibleDefinition from "./NotVisibleDefinition.svelte";
</script>

<h1>Welcome to Visi<b>lable</b>!</h1>
Thank you for helping me out!
<br/><br/>
Please Read this introduction carefully, before starting to use this tool.
<h2>What is this about?</h2>
<p>
    I'm currently working on my bachelors-thesis in computer-science with the title "Rating the visibility of digital images with transparencies on plain backgrounds".
    <br/>
    <i>Visi<b>lable</b></i> is a Tool I built to gather Data on what Humans perceive as "visible". <br/>
    The Data will be used to evaluate my success in implementing an algorithm classifying designs as "Visible" or "(Partially) Not Visible".
</p>
<h2>What do I mean by "(Partially) Not Visible" and "Visible"</h2>
<p>
    The question is <b>not</b> about aesthetics or visual appeal.
</p>
<section>
    <VisibleDefinition/>
    <NotVisibleDefinition/>
</section>
<h2>How to use this Tool:</h2>
<ul>
    <li>Drag&Drop the designs into the classes <i>"Visible"</i> and <i>"(Partially) Not Visible"</i></li>
    <li>You can click a design to open it in a bigger view.</li>
    <li>The buttons on the left let you rate all designs left in the <i>"To Check"</i>-field at once.</li>
    <li>Click <i>"NEXT"</i> when you rated all designs.</li>
</ul>