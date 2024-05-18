<script lang="ts">
	import { onMount } from "svelte";
    export let data;
    async function logout(){
        const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ""
        });

        if (response.status == 200){
            window.location.href = "/";
        }
    }

    let curURL = "";

    onMount(()=>{
        curURL = window.location.href;
    })

</script>

<div class="user-bar">
    {#if data.token != "undefined"}
        {#if curURL.includes("/authed/dashboard")}
            <a href="/authed/profile">Profile</a>
        {:else}
            <a href="/authed/dashboard">Dashboard</a>
        {/if}
        {#if curURL != "/"}
        <a href="/delay-calculations">Delay Calculations</a>
        {/if}
        <a on:click={logout} href="/">Logout</a>
    {:else}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}
</div>

<style>
    .user-bar {
        background-image: linear-gradient(#ffffff25 0%, #FF660000 125%);
        padding: .5rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        border-radius: 0 0 1rem 1rem;
    }

    .user-bar a {
        margin-left: 1rem;
        color: #FFF;
        background-color: #ffffff25;
        border: #FFF 1px solid;
        padding: .25rem;
        border-radius: .25rem;
    }

    @media only screen and (max-width: 1140px) {
        .user-bar {
            justify-content: center;
            border-radius: 0 0 0 0;
        }
    }

    @media only screen and (min-width: 1140px) {
        .user-bar {
            width: 1140px;
            margin-left: auto;
            margin-right: auto;
            justify-content: flex-end;
        }
    }
</style>