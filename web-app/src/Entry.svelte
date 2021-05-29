<script>
    import Icon from "fa-svelte";
    import { faTimesCircle, faCopy } from "@fortawesome/free-solid-svg-icons";

    export let entry, isFirst, isLast, removeEntry;

    const copyPassword = () => {
        navigator.clipboard.writeText(entry.password);
    };
</script>

<div
    class:border-b={!isLast}
    class:rounded-t-md={isFirst}
    class:rounded-b-md={isLast}
    class="entry py-3 px-2 border-blue-500 bg-blue-400 flex flex-1 justify-between">
    <div>
        <div class="font-bold text-2xl text-white">{entry.url}</div>
        <div class="text-gray-50">{entry.username}</div>
    </div>
    <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 inline"
        viewBox="0 0 20 20"
        fill="white"
        on:click={removeEntry}>
        <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd" />
    </svg> -->

    <div class="flex flex-col justify-evenly">
        <span on:click={removeEntry} class="cursor-pointer">
            <Icon class="text-white" icon={faTimesCircle} />
        </span>
        <span on:click={copyPassword} class="cursor-pointer">
            <Icon class="text-white" icon={faCopy} />
        </span>
    </div>
</div>
