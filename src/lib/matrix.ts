export class Matrix
{
    rows: number;
    columns: number;
    data: Array<number>;

    constructor(rows: number, columns: number)
    {
        this.rows = rows
        this.columns = columns
        this.data = Array(rows * columns).fill(0);
    }

    static Identity(n: number): Matrix
    {
        let matrix = new Matrix(n, n);

        for(let i: number = 0; i < n; i++)
        {
            matrix.set(i, i, 1);
        }

        return matrix;
    }

    static From(data: Array<Array<number>>): Matrix
    {
        const rows = data.length;
        const columns = data[0].length;

        let matrix = new Matrix(rows, columns);

        for(let i: number = 0; i < rows; i++)
        {
            for(let j: number = 0; j < columns; j++)
            {
                matrix.set(i, j, data[i][j]);
            }
        }

        return matrix;
    }

    set(row: number, column: number, value: number)
    {
        this.data[row * this.columns + column] = value;
    }

    get(row: number, column: number): number
    {
        return this.data[row * this.columns + column];
    }

    debugprint()
    {
        let output = "[";
        for(let i: number = 0; i < this.rows; i++)
        {
            output += "[";
            for(let j: number = 0; j < this.columns; j++)
            {
                output += this.get(i, j) + ", ";
            }
            output = output.trimEnd()
            output += "]\n";
        }
        output += "]";
        console.log(output);
    }
}
