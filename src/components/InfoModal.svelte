<script>
    import VisibleDefinition from "./VisibleDefinition.svelte";
    import NotVisibleDefinition from "./NotVisibleDefinition.svelte";
</script>

<h1>Welcome to Visi<b>lable</b>!</h1>
Thank you for helping me out!
<br/><br/>
Please read this introduction carefully, before starting to use this tool.
<h2>What is this about?</h2>
<p>
    I'm currently working on my bachelors-thesis in computer-science with the title "Rating the visibility of digital images with transparencies on plain backgrounds".
    <br/>
    <i>Visi<b>lable</b></i> is a tool I built to gather data on what humans perceive as "visible". <br/>
    The data will be used to evaluate my success in implementing an algorithm classifying designs as "Visible" or "(Partially) Not Visible".
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
    <li>Use the buttons on the right to rate designs in bulk.</li>
    <li>Click <i>"NEXT"</i> when you rated all designs.</li>
</ul>
<h2>When am I done?</h2>
<p>
    Technically there is a finite list of designs to rate and it is possible to rate them all. But it is by no means required. You can stop
    anytime and come back later. Your ratings are saved every time you click on "NEXT". Of course more ratings are better :)
</p>