<script lang="ts">
    import "../../css/login.css";
    import BasePage from "$lib/components/BasePage.svelte";
    let email: string;
    let password: string;
    export let data;
    async function login(){
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status == 200){
            const data = await response.json();
            console.log("Login successful");
            window.location.href = "/authed/dashboard";
        }
    }


    
</script>

<BasePage userBarData={data}/>

<div class="content">
    <form>
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" bind:value={email}>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" bind:value={password}>
        </div>
        <button class="button" on:click={login}>Login</button>
        <a class="button" style="width: auto; padding-left: .5rem; padding-right: .5rem;" href="/forgot-password">Forgot Password</a>
        <p>Don't have an account?</p>
        <a class="button" href="/register">Register</a>
    </form>
</div>