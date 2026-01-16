<script lang="ts">
    import Hint from './Hint.svelte'

    export let prefix = "";
    export let value = "";
    export let hint = "";
</script>

<div>
    <p>{prefix}</p>
    <input type="number" min="1" max="10" step="1" inputmode="numeric" bind:value={value} />
    <Hint hint={hint} />
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    input {
        margin: 0em 0.5em;
        padding: 0em;
        border-radius: 5px;
        border: 2px solid var(--accent);
        background-color: var(--background);
        text-align: center;
        color: var(--text);
        font: inherit;
    }

    input:focus {
        outline: none;
        border-color: var(--primary);
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    p {
        margin: 0em;
    }
</style>
