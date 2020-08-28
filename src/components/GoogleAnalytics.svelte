<script>
    const url = 'https://www.google-analytics.com/analytics.js';
    export let stores: () => any;
    export let id: string;

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
<svelte:head>
	<link href={url} rel="preload" as="script">
    <script src={url} async></script>
</svelte:head>