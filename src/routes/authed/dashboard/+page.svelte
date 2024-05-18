<script lang="ts">
    import BasePage from "$lib/components/BasePage.svelte";
	import { onMount } from "svelte";
    export let data;
    onMount(() => {
        if (!data || data.token === "undefined") {
            window.location.href = "/login";
        }else{
            console.log("data: " + JSON.stringify(data));
        }
    });
</script>

<BasePage userBarData={data} buttons={[{href: "/", label: "Home"},
{href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}
/>

<div class="content">
    Welcome: {data.userData?.email}
    {#if data.userData?.other?.weakPassword}
    <div class="flex items-center p-4 mb-4 text-sm m-0">
        <svg class="flex-shrink-0 w-4 h-4 fill-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="text-red-400">{data.userData?.other?.weakPassword?.message}</span>
    </div>
    {/if}
</div>

<style>
    .content{
        color: white;
        width: 1140px;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        background-color: rgba(0, 0, 0, 0.33);
        padding: .5rem;
    }
</style>