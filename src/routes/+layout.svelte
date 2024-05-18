<script lang="ts">
    
    //SUPABASE
	
	//END SUPABASE
	  
    import "../app.postcss";
    import Footer from "$lib/components/Footer.svelte";
</script>

    <slot></slot>
    <div class="footerbreak"></div>
    <Footer/>

<style>
    .footerbreak {
        height: 3rem;
    }
</style>