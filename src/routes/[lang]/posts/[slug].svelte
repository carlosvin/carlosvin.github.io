<script context="module">
  import { path } from "../../../services/url.ts";

  export async function preload({ params }) {
    const {slug, lang} = params;
    this.redirect(301, path(slug, lang));
  }
</script>