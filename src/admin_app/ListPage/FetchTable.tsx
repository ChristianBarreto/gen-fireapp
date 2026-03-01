import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHeaderItem } from './types';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationFooter from './TablePaginationFooter/index';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function FetchTable({
  tableHeader,
  data,
  isLoading,
  isError,
  resourceName,
}: {
  tableHeader: TableHeaderItem[],
  data: { data: Array<{ id: string | number;[key: string]: unknown }>, pagination: unknown },
  isLoading: boolean
  isError: boolean
  resourceName?: string
}) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader?.map((header) => (
              <TableCell align="left" key={header?.name}>{header?.name}</TableCell>
            ))}
            <TableCell align="left">Created On</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell align="left">...loading</TableCell>
            </TableRow>
          )}
          {isError ? (
            <TableRow>
              <TableCell align="left">Error fetching data!</TableCell>
            </TableRow>
          ) : (
            <>
              {data?.data?.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {tableHeader?.map((header, index) => (
                    <TableCell
                      align="left"
                      key={`${index}-${item.id}`}
                    >
                      {
                        <>
                          {/* {header.component &&  (<div className={String(item.id)}>{header.component}</div>)} */}
                          {header?.type === "text" && item[header.field]}
                          {header?.type === "number" && item[header.field]}
                          {(header?.type === "fk") && (item[header.field] as Record<string, unknown>)?.[header.fkField]}
                          {/* {(header.type === "fk") && "FK"} */}
                        </>
                      }
                    </TableCell>
                  ))}
                  <TableCell align="left">
                    {item.timestamp ? dayjs(item.timestamp as string | number | Date).format('YYYY-MM-DD HH:mm:ss') : '-'}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/admin/${resourceName}/${item.id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginationFooter pagination={data.pagination} />
          </TableRow>
        </TableFooter>
      </Table>
      {/* <div style={{padding: '6px'}}>
        Qty: {data?.pagination?.total}
      </div> */}
    </TableContainer>
  );
}
