<script context="module" lang="ts">
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  export async function preload() {
    return this.redirect(301, '/');
  }
</script>