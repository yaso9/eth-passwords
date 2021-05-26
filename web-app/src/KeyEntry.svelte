<script>
    import CryptoJS from "crypto-es";
    import { passwordStore, key } from "./stores";

    let keyIn = "";
    let error = "";

    const handleKey = async (e) => {
        e.preventDefault();

        if (!keyIn) {
            error = "Key can not be empty";
            return;
        }

        const entries = await $passwordStore.getEntries();

        if (entries.length === 0) {
            key.set(keyIn);
            return;
        }

        try {
            for (const entry of entries)
                JSON.parse(
                    CryptoJS.AES.decrypt(entry, keyIn).toString(
                        CryptoJS.enc.Utf8
                    )
                );

            key.set(keyIn);
        } catch (e) {
            error = "Key is incorrect";
        }
    };
</script>

<div class="flex justify-center" on:submit={handleKey}>
    <div class="w-1/2 m-4 mr-2 py-3 px-2 bg-blue-400 rounded-md text-white">
        <h1>Enter Your Key</h1>
        <small>If you haven't used this app before, choose a key.</small>

        {#if error}
            <div class="m-2 p-2 bg-red-600 rounded-lg">{error}</div>
        {/if}

        <form class="mt-3">
            <div class="flex items-center mb-2">
                <label for="key" class="w-32 mr-2 font-bold">Key:</label>
                <input
                    type="password"
                    id="key"
                    name="key"
                    bind:value={keyIn}
                    class="text-gray-600 rounded w-full px-4 py-2" />
            </div>

            <button
                type="submit"
                class="rounded-md bg-green-300 px-4 py-2 text-black">Go</button>
        </form>
    </div>
</div>
