<svelte:head>
    <script src="https://www.google-analytics.com/analytics.js" async></script>
</svelte:head>
<script>
    export let stores;
    export let id;

    if (typeof window !== "undefined") {
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', id, 'auto');
        ga('set', 'transport', 'beacon'); 
    }

    const { page } = stores();
    $: {
        if (typeof ga !== "undefined"){
            ga('set', 'page', $page.path);
            ga('send', 'pageview');
        }
    }
</script>
