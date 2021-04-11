<script>
    import { createEventDispatcher } from "svelte";
    import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
    import { passwordStore } from "./stores";

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

<div id="entries" class="m-4 ml-2 flex-1">
    {#each entries as entry, idx}
        <div
            class:border-b={idx < entries.length - 1}
            class:rounded-t-md={idx === 0}
            class:rounded-b-md={idx === entries.length - 1}
            class="entry py-3 px-2 border-blue-500 bg-blue-400 flex justify-between">
            <span>{entry}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 inline"
                viewBox="0 0 20 20"
                fill="white"
                on:click={removeEntryClosure(idx)}>
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    {/each}
</div>
