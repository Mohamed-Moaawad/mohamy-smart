import './Table.css';
import { useMemo, useState } from 'react';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { Link } from 'react-router-dom';


type Column = {
    key: string;
    label: string;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column[];
};

const CustomTable = <T extends { key: string }>({ data, columns }: DataTableProps<T>) => {
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    return (
        <>
            <Table
                aria-label="Example table with client side pagination"
                className='custom-table'
                color={'primary'}
                defaultSelectedKeys={["2"]}
                selectionMode="single"
            >
                <TableHeader>
                    {columns.map((col) => (
                        <TableColumn key={col.key}>{col.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.key} >
                            {(columnKey) => <TableCell><Link to={`/legal-contracts/${item.key}`} className='bg-red-0 flex w-full h-full'>{getKeyValue(item, columnKey)}</Link></TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="pagination-box flex mt-8 justify-end">
                <Pagination initialPage={1}
                    // isCompact
                    // showControls
                    // showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </>
    );
};

export default CustomTable;