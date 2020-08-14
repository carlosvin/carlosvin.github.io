<script context="module">
    import {getFeedUrl} from '../../services/lang';
    export async function preload() {
        this.redirect(301, getFeedUrl());
    }
</script>
