<script lang="ts">
    import "../../css/login.css";
    import BasePage from "$lib/components/BasePage.svelte";
    export let data;

    let email: string;
    let password: string;
    let confirm_password: string;

    function toggleRegisterButton(){
        const button = document.getElementById("registerButton");
        if (button?.attributes.getNamedItem("disabled")?.value == "true"){
            button.removeAttribute("disabled");
        } else {
            button?.setAttribute("disabled", "true");
        }
    }

    async function register() {
        console.log("button clicked");
        toggleRegisterButton()
        if (email == undefined || password == undefined || confirm_password == undefined){
            alert("Please fill in all fields!");
            toggleRegisterButton()
            return;
        }

        if (password.length == 0 || confirm_password.length == 0){
            alert("Please enter a password!");
            toggleRegisterButton()
            return;
        }

        if (password != confirm_password){
            alert("Passwords do not match!");
            toggleRegisterButton()
            return;
        }

        if (password.length < 8){
            alert("Password must be at least 8 characters long!");
            toggleRegisterButton()
            return;
        }

        if (!email.includes("@")){
            alert("Email must contain an @");
            toggleRegisterButton()
            return;
        }

        if (email.length == 0){
            alert("Email cannot be empty!");
            toggleRegisterButton()
            return;
        }

        const response = await fetch("/api/register", {
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
            response.redirected
        }

    }

</script>

<BasePage userBarData={data}/>

<div class="content">
    <form action="register">
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" bind:value={email}>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" bind:value={password}>
            <div style="height: 0.25rem;"></div>
            <label for="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" name="confirm_password" bind:value={confirm_password}>
        </div>
        <button id="registerButton" on:click={register}> Register </button>
        <p>Already have an account?</p>
        <a class="button" href="/login">Login!</a>
    </form>
</div>