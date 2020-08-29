<script lang="ts">
  export let stores: () => any;
  export let id: string;
  const url = "https://www.google-analytics.com/analytics.js";
  const env = process.env.NODE_ENV;
  const isProd = env === undefined || env === "production";
  if (isProd) {
    if (typeof window !== "undefined") {
      window.ga =
        window.ga ||
        function () {
          (window.ga.q = window.ga.q || []).push(arguments);
        };
      window.ga.l = +new Date();
      window.ga("create", id, "auto");
      window.ga("set", "transport", "beacon");
    }
  }
  const { page } = stores();
  $: {
    if (typeof ga !== "undefined" && isProd) {
      window.ga("set", "page", $page.path);
      window.ga("send", "pageview");
    }
  }
  let isLoaded = false;
  function shouldLoad () {
      if (isProd && isLoaded === false) {
          isLoaded = true;
          return true;
      }
      return false;
  }
</script>

<svelte:head>
  {#if shouldLoad()}
    <link href={url} rel="preload" as="script" />
    <script src={url} async></script>
  {/if}
</svelte:head>
