<script context="module">
  export async function preload({ params, query }) {    const {slug, lang} = params;
    this.redirect(302, '/');
  }
</script>