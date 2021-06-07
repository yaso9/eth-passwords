<script>
	import NoEthereum from "./NoEthereum.svelte";
	import PasswordManager from "./PasswordManager.svelte";
	import KeyEntry from "./KeyEntry.svelte";
	import NoContract from "./NoContract.svelte";
	import { key, passwordStore } from "./stores";

	let contractFound = true;

	$: if ($passwordStore)
		$passwordStore.getEntries().catch((err) => (contractFound = false));
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

<div class="w-screen h-screen bg-gray-700">
	{#if window.ethereum}
		{#if contractFound}
			{#if $key}
				<PasswordManager />
			{:else}
				<KeyEntry />
			{/if}
		{:else}
			<NoContract />
		{/if}
	{:else}
		<NoEthereum />
	{/if}
</div>
