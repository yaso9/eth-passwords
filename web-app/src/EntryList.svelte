<script>
    import { onMount } from "svelte";
    import { passwordStore } from "./stores";

    let entries = [];
    onMount(async () => {
        entries = await $passwordStore.getEntries();
    });
</script>

<div id="entries" class="m-4 bg-blue-400 rounded-md md:w-1/2">
    {#each entries as entry, idx}
        <div
            class:border-b={idx < entries.length - 1}
            class="entry py-3 px-2 border-blue-500">
            {entry}
        </div>
    {/each}
</div>
