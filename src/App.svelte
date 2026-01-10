<script lang="ts">
  import Input from './components/Input.svelte'
  import Separator from './components/Separator.svelte'
  import MatrixInput from './components/MatrixInput.svelte'
  import Button from './components/Button.svelte'
  import Output from './components/Output.svelte'
  import { slide, fade } from 'svelte/transition'
  import { Matrix } from './lib/matrix'
  import { determinant } from './lib/determinant'
  import { theme } from './theme'

  let currentTheme: string;
  $: $theme, currentTheme = $theme;

  function parseMatrixSize(size: string): number
  {
      if(!size)
          return 1;
      const parsed = parseInt(size);

      if(Number.isNaN(parsed))
          return 1;

      return Math.min(parsed, 10);
  }

  let matrixSize = "3";
  $: matrixSizeInt = parseMatrixSize(matrixSize);
  let matrixInputs: Array<Array<string>> = [];
  let matrixInputsElement: HTMLInputElement[] = [];
  let calculated = 0;
  let isCalculated = false;

  function reset()
  {
      matrixInputsElement.forEach((x) => x.value = "0");
      isCalculated = false;
  }

  function calcDeterminant()
  {
      const n = matrixSizeInt;
      let matrix = new Matrix(n, n);

      for(let i = 0; i < n; i++)
      {
          for(let j = 0; j < n; j++)
          {
              const str = matrixInputs[i][j];
              const parsed = parseFloat(str);
              matrix.set(i, j, parsed);
          }
      }

      calculated = determinant(matrix);
      isCalculated = true;
  }

  function changeMode()
  {
      theme.set(currentTheme == "light" ? "dark" : "light");
  }
</script>

<main>
    <div class="content-container">
        <h1 class="title">Determinant</h1>
        <div class="content">
            <div class="content-center">
                <div class="input-container">
                    <Input prefix="Size of the matrix (n) = " bind:value={matrixSize} hint="Supports up to n <= 10" />
                </div>
                <Separator />
                <div class="matrix-container">
                    <MatrixInput n={matrixSizeInt} bind:matrix={matrixInputs} bind:inputs={matrixInputsElement} />
                </div>
                <Separator />
                <div class="calculation-container">
                    <Button name="Calculate" onClick={calcDeterminant} color="var(--secondary)" />
                    <Button name="Reset" onClick={reset} color="var(--reset)" />
                </div>
                {#if isCalculated}
                    <div in:slide={{ duration: 200 }} out:fade={{ duration: 200 }}>
                        <div class="calculation-container">
                            <Output determinant={calculated} />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        text-align: left;
        align-self: start;
        margin: 0.1em 0.5em;
        font-weight: normal;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        height: 100%;
    }

    .content-center {
        display: flex;
        flex-direction: column;
        align-items: start;
        background-color: var(--background1);
        border-radius: 5px;
        max-width: 50rem;
        width: 100%;
        height: 100%;
    }

    .matrix-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .calculation-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .input-container {
        margin: 1em;
        margin-bottom: 0.5em;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 85vh;
        padding: 1em;
    }
</style>
