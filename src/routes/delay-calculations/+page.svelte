<script>
    import BasePage from "$lib/components/BasePage.svelte";
</script>

<BasePage buttons={[{href: "/", label: "Home"},
{href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}/>

<div class="container">
    <p>This page is underconstruction</p>
    <p class="small">This page will contain various delay calculation tools and explain the reasonings behind the methods and mathmatics it provides. You will be able to input your data on this page and it will calculate various items based on the type of calculation you want to use such as: Delays, Queues / Queue Lengths, Optimal Alternating Flow Timings and other items such as estimating traffic flow throughout the day with your provided AADT data using hourly percentages of traffic based off of a NZTA Research Report published in 2001: "<a style="color: #aaf;" href="https://www.nzta.govt.nz/assets/resources/research/reports/205/205-Guide-to-estimation-and-monitoring-of-traffic-counting-and-traffic-growth.pdf">Research Report 205 Guide to estimation and monitoring of traffic counting and traffic growth</a>".</p>
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