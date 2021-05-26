<script>
	import NoEthereum from "./NoEthereum.svelte";
	import PasswordManager from "./PasswordManager.svelte";
	import KeyEntry from "./KeyEntry.svelte";
	import { key } from "./stores";
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

{#if window.ethereum}
	{#if $key}
		<PasswordManager />
	{:else}
		<KeyEntry />
	{/if}
{:else}
	<NoEthereum />
{/if}
