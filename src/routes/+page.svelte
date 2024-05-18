<script>
    import BasePage from "$lib/components/BasePage.svelte";
    export let data;
</script>

<BasePage userBarData={data} buttons={[
                    {href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}/>

<div class="container">
    <p class="reallysmall">Bear with us, this website is under construction, it is planned to have a forum where planners from all over New Zealand / Aotearoa can come together and create something really special as a community and shape the future of traffic management.</p>
    <p>Welcome to Traffic Planner Dev</p>
    <p class="small">Your go-to destination for top-notch traffic management tools, calculations, and tips tailored for the Kiwi industry standards.</p>
    <p class="small">As a constantly evolving industry and community we're committed to equipping you with the essential resources and expert guidance needed to ace traffic planning. Our tools are precision-engineered to streamline processes and ensure seamless traffic flow and safety across New Zealand's roads.</p>
    <p class="small">Whether you're a seasoned pro or just starting out, our platform is your one-stop hub for industry-leading solutions. Dive in, explore, and master the art of efficient Traffic Management with us.</p>
    <p class="small">Join us on this journey towards smarter traffic solutions. 
        Let Traffic Planner Dev be your guide in navigating New Zealand's dynamic traffic landscape. Together, let's drive towards safer, more efficient roads.
    </p> 
    <p>Explore. Learn. Excel.</p>
    <p>
        For the future of Traffic Management, right here in Aotearoa.
    </p>
    <img style="width: min(70%, 800px);align-self: center; position: absolute; top: 10rem; z-index: -1;" src="./New_Zealand.svg" alt="Solid color map of New Zealand"/>

</div>

<style>
    .small {
        font-size: 1.75rem;
        padding: .75rem;
    }
    .reallysmall {
        font-size: 1.25rem;
        padding: 0;
        margin: 0;
        color: orange;
        text-decoration: underline;
        text-decoration-thickness: 0.05rem;
    }
    .container{
        font-family: 'Zen Maru Gothic', serif;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        padding-bottom: 5px;
        padding-left: 2rem;
        padding-right: 2rem;
        font-size: 2.5rem;
        color: #FFF;
        width: 1140px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    @media only screen and (max-width: 1140px) {
        .container{
            width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>