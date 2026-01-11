<script lang="ts">
  import darkModeIcon from '../assets/dark_mode.svg'
  import lightModeIcon from '../assets/light_mode.svg'
  import { theme } from '../theme'

  let currentTheme: string;
  $: $theme, currentTheme = $theme;

  function changeMode()
  {
      theme.set(currentTheme == "light" ? "dark" : "light");
  }
</script>

<div>
    <img src={ (currentTheme == "light" ? darkModeIcon : lightModeIcon) } class="dark-mode-button" alt="Dark Mode" on:click={changeMode} width="25px" height="25px" />
</div>

<style>
    div {
        display: flex;
        align-items: center;
        padding: 1em;
    }

    @media only screen and (max-width: 570px) {
        div {
            margin-left: auto;
        }
    }

    img {
        cursor: pointer;
    }
</style>
