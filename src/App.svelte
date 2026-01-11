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
      matrixInputsElement.forEach((x) => { if(x) x.value = "0" });
      matrixInputs = Array.from({ length: matrixSizeInt }, () => Array(matrixSizeInt).fill("0"))
      isCalculated = false;
  }

  function calcDeterminant()
  {
      isCalculated = false;

      const n = matrixSizeInt;
      let matrix = new Matrix(n, n);

      for(let i = 0; i < n; i++)
      {
          for(let j = 0; j < n; j++)
          {
              const str = matrixInputs[i][j];
              const parsed = parseFloat(str);

              if(Number.isNaN(parsed))
              {
                  console.error("Handle this");
              }

              matrix.set(i, j, parsed);
          }
      }

      const ROUND_UP_TO = 5;
      const ROUND_MULTIPLIER = Math.pow(10, ROUND_UP_TO);
      calculated = Math.round((determinant(matrix) + Number.EPSILON) * ROUND_MULTIPLIER) / ROUND_MULTIPLIER;
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
                    <Input prefix="Size of the matrix (n) = " bind:value={matrixSize} hint="Supports n <= 10" />
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
                    <div transition:slide={{ duration: 200 }} class="calculation-container">
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
    main {
        display: flex;
        flex: 1;
    }

    .title {
        text-align: left;
        align-self: stretch;
        margin: 0.1em 0.5em;
        margin-bottom: 0.1em;
        font-weight: normal;
    }

    @media only screen and (max-width: 570px) {
        .title {
            text-align: center;
            font-size: 2rem;
            margin: 1em;
        }
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        width: 100%;
    }

    .content-center {
        display: flex;
        flex-direction: column;
        align-items: start;
        flex: 1;
        padding: 0.5em;
        background-color: var(--background1);
        border-radius: 5px;
        max-width: 50rem;
        width: 100%;
    }

    .matrix-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 0;
    }

    .calculation-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 0;
    }

    .input-container {
        margin: 0.5em 1em;
        margin-bottom: 0.5em;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 1em;
    }
</style>
