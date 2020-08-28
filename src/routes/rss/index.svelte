<script context="module" lang="ts">
    import {getFeedUrl} from '../../services/lang';

    export async function preload(): Promise<void> {
        return this.redirect(301, getFeedUrl())
    }
</script>
TT TODO https://github.com/Zimtir/SENT-template/blob/master/.eslintrc.json