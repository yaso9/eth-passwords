<script>
    import { createEventDispatcher } from "svelte";
    import { toasts, ToastContainer, FlatToast } from "svelte-toasts";

    import { passwordStore, key } from "./stores";
    import Entry from "./Entry.svelte";

    export let entries;

    const dispatch = createEventDispatcher();

    const removeEntryClosure = (idx) => async () => {
        const toast = toasts.add({
            title: "Removing Entry",
            description: "Waiting for user to approve the transaction",
            duration: 0,
            type: "info",
        });

        try {
            const transaction = await $passwordStore.removeEntry(idx);

            toast.update({
                description: "Waiting for the transaction to be mined",
            });
            await transaction.wait();

            toast.update({
                title: "Entry Removed",
                description: "Entry successfully removed",
                type: "success",
            });

            dispatch("removed");
        } catch {
            toast.update({
                title: "Failed To Remove Entry",
                description: "The user did not approve the transaction",
                type: "error",
            });
        }

        setTimeout(() => toast.remove(), 3000);
    };
</script>

<ToastContainer placement="top-right" let:data>
    <FlatToast {data} />
</ToastContainer>

<div id="entries" class="m-4 md:ml-2 flex-1">
    {#each entries as entry, idx}
        <Entry
            isFirst={idx === 0}
            isLast={idx === entries.length - 1}
            removeEntry={removeEntryClosure(idx)}
            {entry} />
    {/each}
</div>
