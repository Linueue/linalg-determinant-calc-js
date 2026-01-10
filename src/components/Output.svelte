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
        margin: 1em;
        height: 100%;
        border: 1px solid var(--primary);
    }

    h5 {
        font-weight: normal;
        margin: 0;
    }
</style>
