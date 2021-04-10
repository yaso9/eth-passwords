<script>
    export let entries;
</script>

<div id="entries" class="m-4 ml-2 flex-1">
    {#each entries as entry, idx}
        <div
            class:border-b={idx < entries.length - 1}
            class:rounded-t-md={idx === 0}
            class:rounded-b-md={idx === entries.length - 1}
            class="entry py-3 px-2 border-blue-500 bg-blue-400">
            {entry}
        </div>
    {/each}
</div>
