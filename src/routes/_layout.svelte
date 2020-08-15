<script>
  import Nav from "../components/Nav.svelte";
  import { getSiteName, getFeedUrl} from "../services/lang.ts";
  import Social from "../components/Social.svelte";
  import IconLink from "../components/IconLink.svelte";
  import { GA_ID } from "../conf.ts";
  import GoogleAnalytics from "../components/GoogleAnalytics.svelte";
  import { stores } from "@sapper/app";

  export let segment;

  const siteName = getSiteName();
  const feedUrl = getFeedUrl();
  const feedTitle = `Subscribe to ${siteName}`;
</script>

<style>
  main {
    position: relative;
    max-width: 86%;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 32em) {
    main {
      max-width: unset;
    }
  }
</style>

<svelte:head>
  <link
    rel="alternate"
    type="application/atom+xml"
    title="{feedTitle}"
    href="{feedUrl}" />
    
</svelte:head>
<Nav {segment} {siteName}>
  <Social>
    <IconLink icon="rss" href="{feedUrl}" title="{feedTitle}" />
  </Social>
</Nav>

<main>
  <slot />
</main>

<GoogleAnalytics {stores} id={GA_ID}/>
