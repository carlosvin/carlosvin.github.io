<svelte:head>
    <script defer src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>
<script>
    export let stores;
    export let id;

    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag("js", new Date());
        window.gtag("config", id, { 
            'send_page_view': false, 
            transport_type: 'beacon', 
        });
    }

    const { page } = stores();
    $: {
        if (typeof gtag !== "undefined"){
            window.gtag('event', 'page_view', {
                page_title: document.title,
                // page_location: '<Page Location>',
                page_path: $page.path,
                send_to: id,
                // useBeacon: true
            });
        }
    }
</script>
