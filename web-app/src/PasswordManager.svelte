<script>
    import CryptoJS from "crypto-es";

    import { passwordStore, key } from "./stores";
    import EntryList from "./EntryList.svelte";
    import NewEntryForm from "./NewEntryForm.svelte";

    const getEntries = async () => {
        entries = (await $passwordStore.getEntries()).map((entry) =>
            JSON.parse(
                CryptoJS.AES.decrypt(entry, $key).toString(CryptoJS.enc.Utf8)
            )
        );
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
