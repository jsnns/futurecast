import React from "react";
import { Box, Table, TableBody, TableRow, TableCell } from "grommet";
import { Pie } from "react-chartjs-2";

const PieWithTable = ({ pieData, tableData }) => (
	<Box flex="shrink" direction="row-responsive" wrap>
		<Box pad={{ left: "large", top: "small" }} height="medium">
			{pieData && (
				<Pie
					data={pieData}
					options={{
						maintainAspectRatio: false,
						legend: {
							position: "top",
							labels: {
								boxWidth: 12
							}
						}
					}}
				/>
			)}
		</Box>
		<Box pad="medium" direction="row" justify="center">
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
									fontFamily: "Abril Fatface",
									fontSize: "14pt"
								}}
							>
								{Math.abs(row.value)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	</Box>
);

export default PieWithTable;