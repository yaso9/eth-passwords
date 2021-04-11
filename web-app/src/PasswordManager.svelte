<script>
    import { passwordStore } from "./stores";
    import EntryList from "./EntryList.svelte";
    import NewEntryForm from "./NewEntryForm.svelte";

    const getEntries = async () => {
        $passwordStore
            .getEntries()
            .then((returnedEntries) => (entries = returnedEntries));
    };

    let loadedEntries = false;
    let entries = [];
    $: if (!loadedEntries && $passwordStore) {
        getEntries();
        loadedEntries = true;
    }
</script>

{#if $passwordStore}
    <div class="flex flex-col md:flex-row">
        <NewEntryForm on:created={getEntries} />
        <EntryList {entries} on:removed={getEntries} />
    </div>
{/if}
