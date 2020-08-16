<script context="module">
    import {getFeedUrl} from '../../services/lang.ts';

    export async function preload() {

        return this.redirect(301, getFeedUrl());
    }
</script>
