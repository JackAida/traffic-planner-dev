<script lang="ts">
    import TrafficCone from './traffic-cone.svelte';
</script>

<body>
    <div class="flex justify-center">
        <div class="mt-9 duration-300"><svelte:component this={TrafficCone} /> </div>
        <div class="mt-5 duration-300">
            <h1 class="text-6xl font-bold p-4 w-full header duration-300">Traffic Planner Dev</h1>
        </div>
    </div>
    <div class="content">
        <div class="border-slate-400 border-b-2 p-1 grid grid-cols-4 gap-4 mb-5 pb-3 pl-4 pr-4">
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">Plans</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">Tools</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">Updates</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">About</button>
        </div>
        <div class="h-56 grid grid-cols-2 gap-4 content-start duration-300">
            <div class="border-slate-400 border-r-2 text-xl duration-300">
                <p class="text-xl underline underline-offset-4 hover:text-blue-400 duration-300"> <a data-sveltekit-preload-data="tap" href="https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil">Mobile Roads Enhanced</a></p>
            </div>
            <div class="text-l">Mobile Roads Enhanced is a tool developed to assist Traffic Management Designers/Planners in New Zealand streamline their workflow. I am currently working on getting this to do various other things such as include the NSLR (National Speed Limit Register), TMC (Traffic Management Coordinator) details for each region, including both Local Roads and State Highways which will have to be constantly updated with the help of the Traffic Management Community.
            </div>
            <div class="border-slate-400 border-r-2 text-xl duration-300">
                <div class="horizontal-splitter duration-300"></div>
                agdsa
            </div>
            <div class="text-l horizontal-splitter duration-300">
                agdsa
            </div>
        </div>
    </div>

</body>


<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Armata&display=swap');
    :global(*){
        font-family: 'Armata', sans-serif;
    }
    :global(html){
        background-color: #1e293b;
    }
    body{
        color: #fff;
        width: 100%;
    }
    .content{
        width: 100%;
        display: grid;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }
    .horizontal-splitter{
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        padding-top: auto;
        border-top: 2px #94a3b8 dashed;
    }
    button{
        padding: .5rem;
    }
    @media (max-width: 720px) {
        .header {
            font-size: 2rem;
        }
        .text-l{
            font-size: .75rem;
        }
        .text-xl{
            font-size: 1rem;
        }
        .mt-9{
            margin-top: 1rem;
            height: 10px;
        }
        :global(svg){
            width: auto;
            height: 3rem;
            margin-top: .5rem;
        }
        button{
            padding: 0.01rem;
        }
    }
</style>