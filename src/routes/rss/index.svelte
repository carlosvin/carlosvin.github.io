<script context="module" lang="ts">
    import {getFeedUrl} from '../../services/lang';

    export async function preload() {
        return this.redirect(301, getFeedUrl())
    }

</script>
