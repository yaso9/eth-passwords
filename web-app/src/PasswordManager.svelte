<script>
    import { passwordStore } from "./stores";
    import EntryList from "./EntryList.svelte";
</script>

{#if $passwordStore}
    <EntryList />
{/if}
