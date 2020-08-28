<script context="module" lang="ts">
  import { path } from "../../../services/url";

  export function preload({ params }: {params: {lang: string, slug: string}}): Promise<void> {
    const {slug, lang} = params;
    return this.redirect(301, path(slug, lang));
  }
</script>