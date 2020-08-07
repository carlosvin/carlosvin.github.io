<script context="module">
    import {getLangSimplified} from '../../services/lang';

    export async function preload() {
        this.redirect(302, `/rss/${getLangSimplified()}.xml`);
    }
</script>
