<script>
    export let href;
    export let target="_blank";
    export let icon = "github";
    export let title = `Me at ${icon}`;
</script>

<style>
.twitter::before {
  content: "\ea96";
}
.rss::before {
  content: "\ea9b";
}
.github::before {
  content: "\eab0";
}
.stackoverflow::before {
  content: "\ead0";
}
.icon {
    font-family: 'icomoon' !important;
    padding: 1em;
}
</style>

<a {href} {target} class='icon {icon}' {title}>
    <slot></slot>
</a>