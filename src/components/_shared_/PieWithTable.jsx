import React from "react";
import {Box} from "grommet";
import {Pie} from "react-chartjs-2";

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
    </Box>
);

export default PieWithTable;
