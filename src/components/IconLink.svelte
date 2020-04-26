<script>
    export let href;
    export let target="_blank";
    export let icon = "github";
    export let title = `Find me at ${icon}`;
    let rel = target === "_blank" ? "noopener" : undefined;
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
a {
  text-decoration: none;
}
a:hover {
  color: darkblue;
}
a:focus {
  color: blue;
}
</style>

<a {href} {target} class='icon {icon}' {title} {rel}>
    <slot></slot>
</a>