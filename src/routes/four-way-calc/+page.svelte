<script lang="ts">
    import BasePage from "$lib/components/BasePage.svelte";
    import Footer from "$lib/components/Footer.svelte";
    
    let maxCycleTimeTarget: number = 5;
    let totalCycleTime: number = 0;
    let inPeakHour: boolean = true;

    let approach1Name: string = "";
    let approach2Name: string = "";
    let approach3Name: string = "";
    let approach4Name: string = "";
    let approach1AADT: number;
    let approach2AADT: number;
    let approach3AADT: number;
    let approach4AADT: number;
    let approach1BiDirectional: boolean = true;
    let approach2BiDirectional: boolean = true;
    let approach3BiDirectional: boolean = true;
    let approach4BiDirectional: boolean = true;
    let approach1FurthestDistance: number;
    let approach2FurthestDistance: number;
    let approach3FurthestDistance: number;
    let approach4FurthestDistance: number;

    let outputString: string[];

    function clearOutputString(){
        outputString = [];
    }

    interface Approach {
        name: string;
        aadt: number;
        biDirectional: boolean;
        furthestDistance: number;
        approachQueueLength: number;
        approachGoTime: number;
        approachCycleTime: number;
    }

    function timeToTravelDistance(dist:number, speed:number): number{
        return dist / (speed/3.6);
    }

    function getVehiclesQueued(approach: Approach): number{
        return approach.approachQueueLength / ((inPeakHour) ? 8 : 12);
    }

    function removeNonNumbers(this: HTMLInputElement){
        this.value = this.value.replace(/[^0-9.]/g, '');
    }

    function doApproach(approach: string, aadt: number, biDirectional: boolean, furthestDistance: number): Approach{
        let peakHourDivider: number = (inPeakHour) ? 8 : 12;
        let approachMtcToMTCTime: number = timeToTravelDistance(furthestDistance, 30);
        let approachVehiclesPerSecond: number = biDirectional ? ((aadt / peakHourDivider) / 2) / 3600 : (aadt / peakHourDivider) / 3600;
        let approachVehiclesPerCycleTarget: number = approachVehiclesPerSecond * maxCycleTimeTarget * 60;
        let approachQueueLength: number = Math.ceil(approachVehiclesPerCycleTarget) * 8; //8 is the standard distance from rear of one vehicle to front of another
        let vehiclesInQueue: number = approachQueueLength / peakHourDivider;
        let approachGoTime: number = Math.ceil( ( approachQueueLength / (30/3.6) ) + vehiclesInQueue * 1.5 ); //can multiply it by 2 to include reaction time / speed up time
        let approachCycleTime: number = approachGoTime + approachMtcToMTCTime;
        return {
            name: approach,
            aadt: aadt,
            biDirectional: biDirectional,
            furthestDistance: furthestDistance,
            approachQueueLength: approachQueueLength,
            approachGoTime: approachGoTime,
            approachCycleTime: approachCycleTime
        };
    }

    function checkApproaches(approaches: Approach[]): string[]{

        let returnString: string[] = [];
        totalCycleTime = 0;

        for (let i = 0; i < approaches.length; i++){
            totalCycleTime += approaches[i].approachCycleTime;
        }

        if (totalCycleTime <= maxCycleTimeTarget * 60){
            returnString.push(`In the event traffic is held on stop for up to ${maxCycleTimeTarget} minutes, the following is expected to occur in order to clear queues and return to normal operation:`);
        }
            returnString.push("Total Cycle Time: ");
            returnString.push(Math.ceil(totalCycleTime).toString() + " seconds");
            returnString.push("OR");
            returnString.push((totalCycleTime / 60).toFixed(2).toString() + " minutes");

            for (let i = 0; i < approaches.length; i++){
                returnString.push(approaches[i].name + ":");
                returnString.push("Queue Length: " + approaches[i].approachQueueLength.toString() + " meters");
                returnString.push("Vehicles in Queue: " + getVehiclesQueued(approaches[i]).toString());
                returnString.push("Approx time on GO to clear queues: " + approaches[i].approachGoTime.toString() + " seconds");
                returnString.push("Approx time for a vehicle to travel from MTC to MTC(" + approaches[i].furthestDistance.toString() + " meters):" + Math.ceil(timeToTravelDistance(approaches[i].furthestDistance, 30)).toString() + " seconds");
            }

        if (totalCycleTime > maxCycleTimeTarget * 60){
            returnString.unshift("Not possible to clear queues in the target cycle time of " + maxCycleTimeTarget + " minutes. Total Cycle Time would be: " + (totalCycleTime / 60).toFixed(2) + " minutes, queues are expected to get larger each cycle.");
        }

        return returnString;
    }

    function lerp(a: number, b: number, t: number): number{
        return a + (b - a) * t;
    }

    function scrollToBottom(){
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    function calc() {
        let approaches: Approach[] = [];

        if (approach1Name != ""){
            if(!approach1AADT || !approach1FurthestDistance){
                alert(`Approach 1 "${approach1Name}" must have an AADT and Furthest Distance`);
                return;
            }
            approaches.push(doApproach(approach1Name+" ↓", approach1AADT, approach1BiDirectional, approach1FurthestDistance));
        }

        if (approach2Name != ""){
            if(!approach2AADT || !approach2FurthestDistance){
                alert(`Approach 2 "${approach2Name}" must have an AADT and Furthest Distance`);
                return;
            }
            approaches.push(doApproach(approach2Name+" ↑", approach2AADT, approach2BiDirectional, approach2FurthestDistance));
        }

        if (approach3Name != ""){
            if(!approach3AADT || !approach3FurthestDistance){
                alert(`Approach 3 "${approach3Name}" must have an AADT and Furthest Distance`);
                return;
            }
            approaches.push(doApproach(approach3Name+" →", approach3AADT, approach3BiDirectional, approach3FurthestDistance));
        }

        if (approach4Name != ""){
            if(!approach4AADT || !approach4FurthestDistance){
                alert(`Approach 4 "${approach4Name}" must have an AADT and Furthest Distance`);
                return;
            }
            approaches.push(doApproach(approach4Name+" ←", approach4AADT, approach4BiDirectional, approach4FurthestDistance));
        }        
        


        outputString = checkApproaches(approaches);

        setTimeout(() => {
            scrollToBottom();
        }, 150);
    }

    
</script>

<BasePage pageName="Four Way Stop Go Calculator"
buttons={[{href: "/", label: "Home"},
{href: "/delay-calculations", label: "Delay Calculators"},
{href: "https://chromewebstore.google.com/detail/mobile-roads-enhanced/epimgdnmjciljnceicmlijgkfbeidfil", label: "Mobile Roads Enhanced"}]}/>

<div class="container">
    <p>2 - 4 Way Stop Go Calculator</p>
    <br>
    <p>Enter Road Names</p>
    <div class="approachesContainer">
        <input class="small item1" type="text" placeholder="Approach 1 Name ↓" bind:value={approach1Name} on:click={clearOutputString}/>
        <input class="small item2" type="text" placeholder="Approach 2 Name ↑" bind:value={approach2Name} on:click={clearOutputString}/>
        <input class="small item3" type="text" placeholder="Approach 3 Name →" bind:value={approach3Name} on:click={clearOutputString}/>
        <input class="small item4" type="text" placeholder="← Approach 4 Name" bind:value={approach4Name} on:click={clearOutputString}/>
    </div>
    
    <div>
        <br>
        <p>Max Target Cycle Time (minutes)</p>
        <input style="color: black; text-align: center;" class="small" type="number" placeholder="Max Cycle Time" bind:value={maxCycleTimeTarget} on:click={clearOutputString} on:input={removeNonNumbers}/>
        <br>
        <button style="width: 50%;" on:click={()=>{inPeakHour = !inPeakHour;
            clearOutputString();
        }}>
        {#if !inPeakHour}
            Out of Peak Hour 📉
        {:else}
            Peak Hour 📈
        {/if}
        </button>
    </div>

    <br>

    {#if approach1Name != "" || approach2Name != "" || approach3Name != "" || approach4Name != ""}
        <p style="">Enter the AADT for each approach</p>
    {/if}

    <div class="small inputContainer">
        {#if approach1Name != ""}
        <div class="approachesContainer2">
            <span style="padding-right: 1rem;">{approach1Name + " ↓"}</span>
            <input class="items" type="number" placeholder="AADT" bind:value={approach1AADT} on:click={clearOutputString} on:input={removeNonNumbers}/>
            <span style="padding-left: 3rem;">Bi-Directional?</span> <input  class="items" style="padding-left: 0; width: 50%; padding-right: auto; margin-left: 0; margin-right: auto;" type="checkbox" bind:checked={approach1BiDirectional} on:click={clearOutputString}>
        </div>
        {/if}
        {#if approach2Name != ""}
        <div class="approachesContainer2">
            <span style="padding-right: 1rem;">{approach2Name + " ↑"}</span>
            <input class="items" type="number" placeholder="AADT" bind:value={approach2AADT} on:click={clearOutputString} on:input={removeNonNumbers}/>
            <span style="padding-left: 3rem;">Bi-Directional?</span> <input  class="items" style="padding-left: 0; width: 50%; padding-right: auto; margin-left: 0; margin-right: auto;" type="checkbox" bind:checked={approach2BiDirectional} on:click={clearOutputString}>
        </div>
        {/if}
        {#if approach3Name != ""}
        <div class="approachesContainer2">
            <span style="padding-right: 1rem;">{approach3Name + " →"}</span>
            <input class="items" type="number" placeholder="AADT" bind:value={approach3AADT} on:click={clearOutputString} on:input={removeNonNumbers}/>
            <span style="padding-left: 3rem;">Bi-Directional?</span> <input  class="items" style="padding-left: 0; width: 50%; padding-right: auto; margin-left: 0; margin-right: auto;" type="checkbox" bind:checked={approach3BiDirectional} on:click={clearOutputString}>
        </div>
        {/if}
        {#if approach4Name != ""}
        <div class="approachesContainer2">
            <span style="padding-right: 1rem;">{approach4Name + " ←"}</span>
            <input class="items" type="number" placeholder="AADT" bind:value={approach4AADT} on:click={clearOutputString} on:input={removeNonNumbers}/>
            <span style="padding-left: 3rem;">Bi-Directional?</span> <input  class="items" style="padding-left: 0; width: 50%; padding-right: auto; margin-left: 0; margin-right: auto;" type="checkbox" bind:checked={approach4BiDirectional} on:click={clearOutputString}>
        </div>
        {/if}    
    </div>

    {#if approach1Name != "" || approach2Name != "" || approach3Name != "" || approach4Name != ""}
        <p style="">Enter the Furthest Distance (meters) MTC to MTC</p>
        <div class="small inputContainer">
            {#if approach1Name != ""}
            <div class="approachesContainer2">
                <span style="padding-right: 1rem;">{approach1Name + " ↓"}</span>
                <input class="items" type="number" placeholder="Furthest Distance" bind:value={approach1FurthestDistance} on:click={clearOutputString} on:input={removeNonNumbers}/>
            </div>
            {/if}
            {#if approach2Name != ""}
            <div class="approachesContainer2">
                <span style="padding-right: 1rem;">{approach2Name + " ↑"}</span>
                <input class="items" type="number" placeholder="Furthest Distance" bind:value={approach2FurthestDistance} on:click={clearOutputString} on:input={removeNonNumbers}/>
                </div>
            {/if}
            {#if approach3Name != ""}
            <div class="approachesContainer2">
                <span style="padding-right: 1rem;">{approach3Name + " →"}</span>
                <input class="items" type="number" placeholder="Furthest Distance" bind:value={approach3FurthestDistance} on:click={clearOutputString} on:input={removeNonNumbers}/>
                </div>
            {/if}
            {#if approach4Name != ""}
            <div class="approachesContainer2">
                <span style="padding-right: 1rem;">{approach4Name + " ←"}</span>
                <input class="items" type="number" placeholder="Furthest Distance" bind:value={approach4FurthestDistance} on:click={clearOutputString} on:input={removeNonNumbers}/>
                </div>
            {/if}
        </div>
        <p>
            Output:
        </p>
        <div class="small" style="background-color: #FFFFFF; color: black; border-radius: 0.25rem; margin-bottom: 3rem;">
            {#if +(approach1Name != "") + +(approach2Name != "") + +(approach3Name != "") + +(approach4Name != "") > 1}

                <button on:click={calc}>Calculate</button>

                {#if (approach1AADT && approach1BiDirectional) || (approach2AADT && approach2BiDirectional) || (approach3AADT && approach3BiDirectional) || (approach4AADT && approach4BiDirectional)}
                    <p>AADTs divided by 2 are to estimate Bi-Directional Flow</p>
                {/if}
                {#if approach1Name != "" && approach1AADT}
                    <p>{approach1Name + " ↓"} has a {((inPeakHour) ? "Peak" : "Out of Peak")} hour flow of: {approach1BiDirectional ? Math.ceil((approach1AADT/((inPeakHour) ? 8 : 12))/2) : Math.ceil(approach1AADT/((inPeakHour) ? 8 : 12))}vph ({approach1BiDirectional ? "(" + approach1AADT.toString() + `÷2)÷${((inPeakHour) ? 8 : 12)}` : "" + approach1AADT.toString() + `÷${((inPeakHour) ? 8 : 12)}`})</p>
                {/if}
                
                {#if approach2Name != "" && approach2AADT}
                    <p>{approach2Name + " ↑"} has a {((inPeakHour) ? "Peak" : "Out of Peak")} hour flow of: {approach2BiDirectional ? Math.ceil((approach2AADT/((inPeakHour) ? 8 : 12))/2) : Math.ceil(approach2AADT/((inPeakHour) ? 8 : 12))}vph ({approach2BiDirectional ? "(" + approach2AADT.toString() + `÷2)÷${((inPeakHour) ? 8 : 12)}` : "" + approach1AADT.toString() + `÷${((inPeakHour) ? 8 : 12)}`})</p>
                {/if}
                    
                {#if approach3Name != "" && approach3AADT}
                    <p>{approach3Name + " →"} has a {((inPeakHour) ? "Peak" : "Out of Peak")} hour flow of: {approach3BiDirectional ? Math.ceil((approach3AADT/((inPeakHour) ? 8 : 12))/2) : Math.ceil(approach3AADT/((inPeakHour) ? 8 : 12))}vph ({approach3BiDirectional ? "(" + approach3AADT.toString() + `÷2)÷${((inPeakHour) ? 8 : 12)}` : "" + approach3AADT.toString() + `÷${((inPeakHour) ? 8 : 12)}`})</p>
                {/if}
                    
                {#if approach4Name != "" && approach4AADT}
                    <p>{approach4Name + " ←"} has a {((inPeakHour) ? "Peak" : "Out of Peak")} hour flow of: {approach4BiDirectional ? Math.ceil((approach4AADT/((inPeakHour) ? 8 : 12))/2) : Math.ceil(approach4AADT/((inPeakHour) ? 8 : 12))}vph ({approach4BiDirectional ? "(" + approach4AADT.toString() + `÷2)÷${((inPeakHour) ? 8 : 12)}` : "" + approach4AADT.toString() + `÷${((inPeakHour) ? 8 : 12)}`})</p>
                {/if}

                {#if outputString}
                    {#each outputString as item, index}
                        {#if index > 4}
                            {#if (index - 5) % 5 != 0}
                            <li style="text-align: left; font-size: 1.5rem;">{item}</li>
                            {:else}
                            <p style="text-align: left;">{item}</p>
                            {/if}
                            
                            {:else}
                            {#if totalCycleTime > maxCycleTimeTarget * 60}
                            <p style="color: darkred; font-weight: 600;">{item}</p>
                            {:else}
                            <p>{item}</p>
                            {/if}
                        {/if}
                    {/each}
                {/if}

                {:else}
                <p>Must have a minimum of 2 approaches</p>
            {/if}
        </div>
    {/if}
</div>

<Footer/>

<style>
    .approachesContainer{
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto auto;
        color: black;
    }
    .approachesContainer2{
        display: grid;
        grid-template-columns: auto 25% 25% 15%;
        background-color: #FFFFFF0F;
        padding: .15rem;
    }
    .items {
        font-size: 1.6rem;
        text-align: center;
        padding: 0;
        color: black;
    }

    button {
        font-size: 1.6rem;
        padding: .25rem .75rem;
        border-radius: .25rem;
        background-color: #0091ff;
        color: white;
        border: 2px solid rgba(0, 0, 0, 0.267);
        transition: 250ms ease;
        width: 100%;
    }

    button:hover {
        background-color: #0078d4;
        border: 2px solid rgba(255, 255, 255, 0.5);
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

    .inputContainer{
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto auto auto auto auto auto auto auto auto;
    }

    .item1 {
        grid-column: 2;
        grid-row: 1;
    }
    .item2 {
        grid-column: 2;
        grid-row: 3;
    }
    .item3 {
        grid-column: 1;
        grid-row: 2;
    }
    .item4 {
        grid-column: 3;
        grid-row: 2;
    }
    .small {
        font-size: 1.75rem;
        padding: .75rem;
    }
    input.small {
        font-size: 1.75rem;
        padding: .25rem .75rem;
        border-radius: .25rem;
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
        margin-bottom: 5rem;
    }
    .approachesContainer input{
        width: 100%;
    }
    @media only screen and (max-width: 600px) {
        .approachesContainer input{
            font-size: 1.45rem;
        }
        .small {
            font-size: 1.45rem;
        }
    }
    @media only screen and (max-width: 1140px) {
        .container{
            width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>