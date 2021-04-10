<script>
    import { createEventDispatcher } from "svelte";
    import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
    import { passwordStore } from "./stores";

    const dispatch = createEventDispatcher();

    let url = "";
    let username = "";
    let password = "";

    const createEntry = async (e) => {
        e.preventDefault();

        const toast = toasts.add({
            title: "Adding Entry",
            description: "Waiting for user to approve the transaction",
            duration: 0,
            type: "info",
        });

        try {
            const entryText = JSON.stringify({
                url,
                username,
                password,
            });
            url = "";
            username = "";
            password = "";

            const transaction = await $passwordStore.addEntry(entryText);

            toast.update({
                description: "Waiting for the transaction to be mined",
            });
            await transaction.wait();

            toast.update({
                title: "Entry Added",
                description: "Entry successfully added",
                type: "success",
            });

            dispatch("created");
        } catch {
            toast.update({
                title: "Failed To Add Entry",
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

<div class="flex-1">
    <form
        on:submit={createEntry}
        class="m-4 mr-2 py-3 px-2 bg-blue-400 rounded-md text-white">
        <div class="flex items-center mb-2">
            <label for="url-input" class="w-32 mr-2 font-bold">URL:</label>
            <input
                type="url"
                id="url-input"
                name="url"
                bind:value={url}
                class="text-gray-600 rounded w-full px-4 py-2" />
        </div>

        <div class="flex items-center mb-2">
            <label
                for="username-input"
                class="w-32 mr-2 font-bold">Username:</label>
            <input
                type="text"
                id="username-input"
                name="username"
                bind:value={username}
                class="text-gray-600 rounded w-full px-4 py-2" />
        </div>

        <div class="flex items-center mb-2">
            <label
                for="password-input"
                class="w-32 mr-2 font-bold">Password:</label>
            <input
                type="password"
                id="password-input"
                name="password"
                bind:value={password}
                class="text-gray-600 rounded w-full px-4 py-2" />
        </div>

        <button
            type="submit"
            class="rounded-md bg-green-300 px-4 py-2 text-black">Add</button>
    </form>
</div>
