<svelte:head>
    <script src="https://www.google-analytics.com/analytics.js" async></script>
</svelte:head>
<script>
    export let stores;
    export let id;

    if (typeof window !== "undefined") {
        window.ga=window.ga||function(){
            (window.ga.q=window.ga.q||[]).push(arguments)
        };
        window.ga.l=+new Date;
        window.ga('create', id, 'auto');
        window.ga('set', 'transport', 'beacon'); 
    }

    const { page } = stores();
    $: {
        if (typeof ga !== "undefined"){
            window.ga('set', 'page', $page.path);
            window.ga('send', 'pageview');
        }
    }
</script>
