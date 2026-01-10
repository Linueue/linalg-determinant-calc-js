<script lang="ts">
    export let name = "";
    export let onClick: () => void;
    export let color = "white";
</script>

<div>
    <button type="button" on:click={onClick} style="background-color: {color}">{name}</button>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    button {
        width: 7em;
        padding: 0.5em 1em;
        margin: 0.25em;
        border-radius: 5px;
        color: var(--text);
        border: none;
        font: inherit;
        transition: filter 0.05s ease-in;
    }

    button:active {
        filter: brightness(50%);
    }
</style>
