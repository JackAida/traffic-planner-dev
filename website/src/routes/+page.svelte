<script lang="ts">
    import TrafficCone from './traffic-cone.svelte';
</script>

<body>
    <div class="flex justify-center">
        <div class="mt-9"><svelte:component this={TrafficCone} /> </div>
        <div class="mt-5">
            <h1 class="text-6xl font-bold p-4 w-full">Traffic Planner Dev</h1>
        </div>
    </div>
    <div class="content">
        <div class="border-slate-400 border-b-2 p-1 border-opacity-75 grid grid-cols-4 gap-4 mb-5 pb-3 pl-4 pr-4">
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300 p-1">Plans</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">Tools</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">Updates</button>
            <button class="text-xl bg-orange-700 hover:bg-orange-500 rounded transition-all duration-300">About</button>
        </div>
        <div class="h-56 grid grid-cols-2 gap-4 content-start">
            <div class="border-slate-400 border-r-2 border-opacity-75 text-xl">
                <p class="text-xl underline underline-offset-4 hover:text-blue-400 duration-150"> <a data-sveltekit-preload-data="tap" href="https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil">Mobile Roads Enhanced</a></p>
            </div>
            <div class="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at imperdiet turpis, vestibulum aliquam tortor. Integer faucibus neque quam, sit amet euismod nulla egestas sed. Nullam iaculis sapien ut ullamcorper pretium. Vivamus eleifend felis maximus tortor malesuada accumsan. Donec ac posuere felis, eu sodales leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius.</div>
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
</style>