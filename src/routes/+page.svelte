<script>
    import BasePage from "$lib/components/base-page.svelte";
</script>

<BasePage buttons={[{href: "/delay-calculations", label: "Delay Calculators"},
                    {href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}/>

<div class="container">
    <p>Welcome to Traffic Planner Dev</p>
    <p class="small">Your go-to destination for top-notch traffic management tools, calculations, and insider tips tailored for the Kiwi industry standards.</p>
    <p class="small">We're committed to equipping you with the essential resources and expert guidance needed to ace traffic planning. Our tools are precision-engineered to streamline processes and ensure seamless traffic flow and safety across New Zealand's roads.</p>
    <p class="small">Whether you're a seasoned pro or just starting out, our platform is your one-stop hub for industry-leading solutions. Dive in, explore, and master the art of efficient Traffic Management with us.</p>
    <p class="small">Join us on this journey towards smarter traffic solutions. 
        Let Traffic Planner Dev be your guide in navigating New Zealand's dynamic traffic landscape. Together, let's drive towards safer, more efficient roads.
    </p> 
    <p class="small">Explore. Learn. Excel. Welcome to the future of Traffic Management, right here in Aotearoa.</p>
</div>

<style>
    .small {
        font-size: 1.75rem;
        padding: .75rem;
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