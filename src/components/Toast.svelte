<script lang="ts">
    export let text = "";
</script>

<div>
    <p>{text}</p>
</div>

<style>
    div {
        background-color: var(--reset);
        padding: 0.1em 0.25em;
        border-radius: 5px;
    }

    p {
        margin: 0em;
        color: var(--text);
    }
</style>
