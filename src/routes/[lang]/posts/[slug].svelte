<script context="module">
  import { path } from "../../../services/models";

  export async function preload({ params, query }) {
    const {slug, lang} = params;
    this.redirect(302, path(slug, lang));
  }
</script>