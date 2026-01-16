import { Matrix } from './matrix';

const EPSILON = 1e-12;

function getMinorMatrix(matrix: Matrix, row: number, column: number)
{
    const n = matrix.rows;
    const minor = new Matrix(n - 1, n - 1);

    let subRow = 0;

    for(let i: number = 0; i < n; i++)
    {
        if(i == row)
            continue;

        let subCol = 0;

        for(let j: number = 0; j < n; j++)
        {
            if(j == column)
                continue;

            minor.set(subRow, subCol, matrix.get(i, j));
            subCol++;
        }
        subRow++;
    }

    return minor;
}

// Cofactor expansion
export function determinant(matrix: Matrix): number
{
    if(matrix.rows != matrix.columns)
    {
        console.error("Determinant only supports square matrices");
        return 0.0;
    }

    const n = matrix.rows;

    // If n == 2, we don't need another recursive call
    if(n == 2)
    {
        const a = matrix.get(0, 0);
        const b = matrix.get(0, 1);
        const c = matrix.get(1, 0);
        const d = matrix.get(1, 1);

        return a * d - b * c;
    }

    if(n == 1)
        return matrix.get(0, 0);

    let det = 0;

    for(let i: number = 0; i < n; i++)
    {
        const c = matrix.get(0, i);

        // Optimization trick
        // If c is 0, then we don't compute its minor matrix
        // We are doing EPSILON to account for floating point arithmetic error
        if(Math.abs(c) <= EPSILON)
            continue;

        const minor: Matrix = getMinorMatrix(matrix, 0, i);
        // Optimization trick
        // -1^(i + j)
        const p = (i % 2 == 0) ? 1 : -1;

        det += p * c * determinant(minor);
    }

    return det;
}
