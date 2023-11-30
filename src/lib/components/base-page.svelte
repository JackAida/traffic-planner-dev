<script lang="ts">
    import TrafficCone from "$lib/components/traffic-cone.svelte";
    class ButtonModel {
        href: string;
        label: string;
        constructor(href: string, label: string){
            this.href = href;
            this.label = label;
        }
    }
    export let buttons: ButtonModel[] = [];
</script>

<div class="headContainer">
    <div class="flex w-full">
        <TrafficCone size={56}/> Traffic Planner Dev <div class="headButtonDiv">
            {#each buttons as buttonModel}
                <a href={buttonModel.href}>{buttonModel.label}</a>
            {/each}
        </div>
    </div>
</div>
<div class="whiteCircle"></div>
<div class="orangeCircle"></div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600&family=Zen+Maru+Gothic&display=swap');

    
    .headContainer{
        font-family: 'Barlow Condensed', sans-serif;
        display: flex;
        margin-top: 1.5rem;
        padding-bottom: 5px;
        font-size: 2.5rem;
        color: #FFF;
        width: 1140px;
        margin-left: auto;
        margin-right: auto;
        border-bottom: 2px solid #FFF;
    }
    
    .whiteCircle{
        position: absolute;
        width: 1200px;
        height: 1200px;
        background-image: radial-gradient(#ffffff46 0%, #ffffff00 66%);
        border-radius: 50%;
        z-index: -1;
        top: -600px;
        left: -600px;
    }
    
    .orangeCircle{
        position: absolute;
        width: 1320px;
        height: 1320px;
        background-image: radial-gradient(#ff6600d4 0%, #FF660000 66%);
        border-radius: 50%;
        z-index: -1;
        top: -350px;
        right: -1000px;
    }
    
    .headButtonDiv{
        font-family: 'Zen Maru Gothic', serif;
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: 0;
        margin-top: 0.5rem;
        font-size: 1.75rem;
        width: auto;
        align-items: center;
        align-content: flex-end;
        flex-flow: row;
    }
    .headButtonDiv a{
        width: auto;
        margin-left: 1rem;
        color: #FFF;
        flex: content;
        padding-right: 1rem;
    }
    
    :global(html) {
        background-color: #30293C;
        overflow-x: hidden;
        transition: 100ms;
    }
    
    @media screen and (max-width: 1140px) {
        :global(html){
            font-size: 12px;
            transition-duration: 100ms;
        }
        .headContainer{
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }

    @media screen and (max-width: 768px) {
        :global(html){
            font-size: 9px;
            transition-duration: 100ms;
        }
        .headContainer{
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }

    @media screen and (max-width: 480px) {
        :global(html){
            font-size: 6px;
            transition-duration: 100ms;
        }
        .headContainer{
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }
</style>