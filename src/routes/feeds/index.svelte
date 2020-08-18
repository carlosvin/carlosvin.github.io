<script context="module" lang="ts">
    import {getFeedUrl} from '../../services/lang';

    export const preload = async () => redirect(301, getFeedUrl());

</script>
