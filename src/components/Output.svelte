<script lang="ts">
    export let determinant = 0;
    $: nonsingular = determinant != 0;
</script>

<div>
    <h5>Determinant = {determinant}</h5>
    <h5 style="color: {nonsingular ? 'var(--primary)' : 'var(--reset)'}">{nonsingular ? "Nonsingular" : "Singular"}</h5>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        justify-content: center;
        align-self: stretch;
        padding: 2.1em;
        margin: 0.5em 1em 1em 1em;
        width: 100%;
        height: 100%;
        background-color: var(--background);
    }

    h5 {
        font-weight: normal;
        margin: 0;
        line-height: 1em;
    }
</style>
