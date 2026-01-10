<script lang="ts">
    export let hint = "";
</script>

<div>
    <p>{hint}</p>
</div>

<style>
    div {
        background-color: var(--background);
        padding: 0.1em 0.25em;
        border-radius: 5px;
    }

    p {
        margin: 0em;
        color: var(--text50);
    }
</style>
