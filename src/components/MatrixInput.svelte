<script lang="ts">
    export let n = 3;
    let matrix = Array(n).fill(Array(n).fill("0"))
    $: matrix = Array.from({ length: n }, () => Array(n).fill("0"))

    export { matrix };

    export let inputs: HTMLInputElement[] = [];

    function handleKeyDown(event: KeyboardEvent, i: number, j: number)
    {
        if(event.key == "Enter")
        {
            event.preventDefault();

            const idx = i * n + j;
            const nextInput = inputs[idx + 1];

            if(nextInput)
                nextInput.focus();
        }
    }
</script>

<div>
    <table>
        <tbody>
            {#each matrix as row, i}
                <tr>
                    {#each row as _, j}
                        <td>
                            <input type="number" bind:value={matrix[i][j]} bind:this={inputs[i * n + j]} on:keydown={e => handleKeyDown(e, i, j)} />
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow-x: auto;
        min-width: 0;
        max-width: 100%;
        padding: 0em 1em;
        scrollbar-width: thin;
    }

    table {
        border-collapse: collapse;
    }

    input {
        margin: 0.1em;
        width: 2.5em;
        padding: 0em;
        border-radius: 5px;
        border: 2px solid transparent;
        background-color: var(--background);
        text-align: center;
        color: var(--text);
        font: inherit;
        font-size: 1.25rem;
    }

    input:focus {
        outline: none;
        border-color: var(--primary);
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
