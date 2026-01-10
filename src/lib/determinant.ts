import { Matrix } from './matrix';

const EPSILON = 1e-12;

function getSubmat(matrix: Matrix, row: number, column: number)
{
    const n = matrix.rows;
    const submatrix = new Matrix(n - 1, n - 1);

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

            submatrix.set(subRow, subCol, matrix.get(i, j));
            subCol++;
        }
        subRow++;
    }

    return submatrix;
}

export function determinant(matrix: Matrix): number
{
    if(matrix.rows != matrix.columns)
    {
        console.error("Determinant only supports square matrices");
        return 0.0;
    }

    const n = matrix.rows;

    if(n == 2)
    {
        const a = matrix.get(0, 0);
        const b = matrix.get(0, 1);
        const c = matrix.get(1, 0);
        const d = matrix.get(1, 1);

        return a * d - b * c;
    }

    if(n == 1)
        return matrix.get(0, 0)

    let det = 0;

    for(let i: number = 0; i < n; i++)
    {
        const submat: Matrix = getSubmat(matrix, 0, i);
        // -1^(i + j)
        const p = Math.pow(-1, (i + 2));
        const c = matrix.get(0, i);

        if(Math.abs(c) <= EPSILON)
            continue;

        det += p * c * determinant(submat);
    }

    return det;
}
