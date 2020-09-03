<script lang="ts">
  export let stores: () => any;
  const url = "https://www.google-analytics.com/analytics.js";
  const env = process.env.NODE_ENV;
  const isProd = env === undefined || env === "production";
  const { page } = stores();
  $: {
    if (typeof ga !== "undefined" && isProd) {
      window.ga("set", "page", $page.path);
      window.ga("send", "pageview");
    }
  }
</script>
