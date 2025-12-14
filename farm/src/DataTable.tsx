import { ReactNode } from "react";

type Column<T> = {
    key: keyof T;
    header: string;
    headerRender?: (value: string) => ReactNode;
    render?: (value: T[keyof T]) => ReactNode;
}

export function GenerateColumns<T extends Record<string, unknown>>(
    sample: T, 
    headers?: Partial<Record<keyof T, string>>,
): Column<T>[] {
  return Object.keys(sample)
    .filter(key => {
      // Exclude relationship fields (objects with id/relationship metadata)
      const value = sample[key as keyof T];
      if (typeof value === 'function') {
        return false;
      }
      
      return true;
    })
    .map(key => ({
      key: key as keyof T,
      header: headers?.[key as keyof T] || key.toString(),
    }));
}

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
}

type TableHeaderProps<T> = {
    columns: Column<T>[];
}

function TableHeader<T>({ columns }: TableHeaderProps<T>) {
    return (
        <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
                {columns.map((col) => (
                    <th
                        key={String(col.key)}
                        style={{
                            padding: '16px',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#424242',
                            borderBottom: '2px solid #e0e0e0'
                        }}
                    >
                        {col.headerRender
                            ? col.headerRender(col.header)
                            : col.header
                        }
                    </th>
                ))}
            </tr>
        </thead>
    );
}

type TableRowProps<T> = {
    row: T;
    columns: Column<T>[];
}

function TableRow<T extends Record<string, unknown>>({ row, columns }: TableRowProps<T>) {
    return (
        <tr
            style={{
                borderBottom: '1px solid #e0e0e0',
                transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
            {columns.map((col) => (
                <td
                    key={String(col.key)}
                    style={{
                        padding: '16px',
                        fontSize: '14px',
                        color: '#616161'
                    }}
                >
                    {col.render
                        ? col.render(row[col.key as keyof T])
                        : String(row[col.key])
                    }
                </td>
            ))}
        </tr>
    );
}

type TableBodyProps<T> = {
    data: T[];
    columns: Column<T>[];
}

function TableBody<T extends Record<string, unknown>>({ data, columns }: TableBodyProps<T>) {
    return (
        <tbody>
            {data.map((row, idx) => (
                <TableRow key={idx} row={row} columns={columns} />
            ))}
        </tbody>
    );
}

function DataTable<T extends Record<string, unknown>>({ data, columns }: DataTableProps<T>) {
    return (
        <div style={{ padding: '24px' }}>
            <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'auto',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '100%',
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                    <TableHeader columns={columns} />
                    <TableBody data={data} columns={columns} />
                </table>
            </div>
        </div>
    );
}

export default DataTable;