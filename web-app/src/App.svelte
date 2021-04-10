<script>
	import NoEthereum from "./NoEthereum.svelte";
	import PasswordManager from "./PasswordManager.svelte";
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

{#if window.ethereum}
	<PasswordManager />
{:else}
	<NoEthereum />
{/if}
