<script lang="ts">
    import TrafficCone from "$lib/components/traffic-cone.svelte";
    import MenuIcon from "./menu-icon.svelte";
    import { onMount } from "svelte";
    class ButtonModel {
        href: string;
        label: string;
        constructor(href: string, label: string){
            this.href = href;
            this.label = label;
        }
    }
    export let buttons: ButtonModel[] = [];
    export let screenWidth = 0;

    onMount(()=>{
        screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        onresize = () => {
            screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }
    })

    function toggleMenu(){
        let menu = document.getElementsByClassName("popup-menu")[0] as HTMLElement;
        if(menu.style.display == "none" || menu.style.display == ""){
            menu.style.display = "block";
            setTimeout(()=>{
                menu.style.width = "350px";
            }, 1);
        }else{
            menu.style.width = "0px";
            menu.style.display = "hidden";
            setTimeout(()=>{
                menu.style.display = "none";
            }, 250);
        }
    }

</script>



<div class="headContainer">
    <div class="flex w-full">
        <TrafficCone size={Math.min(Math.max(screenWidth*0.05, 25), 50)}/> Traffic Planner Dev <div class="headButtonDiv">
            {#if screenWidth > 520}
                {#each buttons as buttonModel}
                    <a href={buttonModel.href}>{buttonModel.label}</a>
                {/each}
            {/if}
            {#if screenWidth <= 520}
                <a href="#" on:click={()=>(toggleMenu())}><MenuIcon scale={0.15} /></a>
                <div class="popup-menu">
                    <a href="#" id="menu-icon" on:click={()=>(toggleMenu())}><MenuIcon scale={0.15} /></a>
                    <ol>
                        {#each buttons as buttonModel}
                        <li>
                            <a href={buttonModel.href}>{buttonModel.label}</a>
                        </li>
                        {/each}
                    </ol>
                </div>
            {/if}
        </div>
    </div>
</div>
<div class="noOverflow">
    <div class="whiteCircle"></div>
    <div class="orangeCircle"></div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600&family=Zen+Maru+Gothic&display=swap');

    #menu-icon{
        right: 0;
        top: 0;
        position: absolute;
    }

    .noOverflow{
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .popup-menu{
        position: absolute;
        background-color: rgba(48, 41, 60, 0.752);
        border-radius: 5px;
        padding: 0.5rem;
        top: 2rem;
        right: 2rem;
        font-size: 30px;
        text-align: right;
        align-content: end;
        padding-top: 5rem;
        transition: 250ms;
        overflow: hidden;
        display: none;
    }

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
            overflow-x: hidden;
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
            overflow-x: hidden;
            font-size: 10px;
            transition-duration: 100ms;
        }
        .headContainer{
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }

    @media screen and (max-width: 620px) {
        :global(html){
            overflow-x: hidden;
            font-size: 8px;
            transition-duration: 100ms;
        }
        .headContainer{
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }
</style>