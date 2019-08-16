import React from "react";
import {Box, Table, TableBody, TableCell, TableRow} from "grommet";
import {Pie} from "react-chartjs-2";
import {toCurrency} from "../../data/helpers";

const PieWithTable = ({pieData, tableData, tabs}) => (
    <Box animation={{
        "type": "fadeIn",
        "delay": 1000,
        "duration": 2000
    }}>
        <Box pad={{top: "small"}} height="medium">
            {pieData && (
                <Pie
                    data={pieData}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            position: "right",
                            labels: {
                                boxWidth: 12
                            }
                        }
                    }}
                />
            )}

        </Box>
        {tableData && (
            <Table>
                <TableBody>
                    {tableData.map(row => (
                        <TableRow key={row.value + row.category}>
                            <TableCell
                                style={{
                                    fontFamily: "Lato",
                                    fontSize: "12pt",
                                    textTransform: "uppercase",
                                    opacity: 0.6
                                }}
                            >
                                {row.category}
                            </TableCell>
                            <TableCell
                                style={{
                                    fontFamily: "Roboto Mono",
                                    fontSize: "14pt"
                                }}
                            >
                                {toCurrency(Math.abs(row.value))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </Box>
);

export default PieWithTable;
