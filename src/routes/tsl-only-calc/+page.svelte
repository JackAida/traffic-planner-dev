<script lang="ts">
    import BasePage from "$lib/components/BasePage.svelte";
    export let data;
    let postedSpeedLimit: number;
    let temporarySpeedLimit: number;
    let distance: number;

    function removeNonNumbers(this: HTMLInputElement){
        this.value = this.value.replace(/[^0-9.]/g, '');
    }

    function valueToRemainLessThanOrEqual(this: HTMLInputElement){
        if(!postedSpeedLimit){
            this.value = "";
            return;
        }

        if(Number(this.value) > postedSpeedLimit){
            this.value = postedSpeedLimit.toString();
        }
    }

</script>

<BasePage userBarData={data} pageName="TSL Implementation Calculator"
buttons={[{href: "/", label: "Home"},
{href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}/>

<div class="container">
    <div class="inputContainer">
        <input type="number" on:input={removeNonNumbers} placeholder="Enter PSL" bind:value={postedSpeedLimit}/><span>Posted Speed (km/h)</span>
    </div>
    <div class="inputContainer">
        <input type="number" on:input={removeNonNumbers} on:input={valueToRemainLessThanOrEqual} placeholder="Enter TSL" bind:value={temporarySpeedLimit}/><span>Temporary Speed (km/h)</span>
    </div>
    <div class="inputContainer">
        <input type="number" on:input={removeNonNumbers} placeholder="Enter Distance" bind:value={distance}/><span>Distance (m)</span>
    </div>
    <div class="output">
        <p>Time to travel distance at posted speed limit: <span>{(postedSpeedLimit && distance) ? Math.round( distance / (postedSpeedLimit / 3.6) ) : 0}</span> seconds</p>
        <p>Time to travel distance at temporary speed limit: <span>{(temporarySpeedLimit && distance) ? Math.round( distance / (temporarySpeedLimit / 3.6) ) : 0}</span> seconds</p>
        <p>Time increased: <span>{(postedSpeedLimit && temporarySpeedLimit && distance) ? Math.abs( Math.round( (distance / (postedSpeedLimit / 3.6)) - (distance / (temporarySpeedLimit / 3.6)) ) ) : 0}</span> seconds</p>
        <p>Time increased as a percentage: <span>{(postedSpeedLimit && temporarySpeedLimit && distance) ? ( (postedSpeedLimit /temporarySpeedLimit * 100) - 100 ).toFixed(2) : 0}</span>%</p>
    </div>
</div>

<style>

    .output {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        background-color: #FFF;
        color: black;
        border-radius: 0.25rem;
        padding: 1rem;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

    .inputContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    input {
        color: black;
        margin-top: 1rem;
        margin-right: 1rem;
        padding: 0.25rem;
        padding-top: 0px;
        padding-bottom: 0.35rem;
        width: 55%;
        border-radius: 0.25rem;
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