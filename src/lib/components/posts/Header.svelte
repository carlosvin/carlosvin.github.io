
<script lang="ts">
  import { I18N } from "$lib/stores/lang";

  export let numPosts: number;
  export let lang: string;
  export let title = numPosts > 0 ? I18N.get(lang, 'RecentPosts') : I18N.get(lang, 'NoPosts');

</script>

<style>
  header {
    display: flex;
    flex-flow: row;
  }

  h1 {
    flex-grow: 1;
  }

  @media screen and (max-width: 640px) {
    header {
      flex-flow: column;
    }
  }
</style>

<header>
  <h1>{title}</h1>
  <slot></slot>
</header>
