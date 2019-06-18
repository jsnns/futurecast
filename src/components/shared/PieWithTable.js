import React from "react";
import {Box, Table, TableBody, TableRow, TableCell, Tabs, Tab} from "grommet";
import { Pie } from "react-chartjs-2";
import {toCurrency} from "../../data/helpers"

const PieWithTable = ({ pieData, tableData, tabs }) => (
	<Box flex={"grow"}>
		<Box pad={{ top: "small" }} height="medium">
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
		<Box flex={"grow"}>
			<Tabs>
				<Tab title="Data">
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
				</Tab>
				{tabs}
			</Tabs>
		</Box>
	</Box>
);

export default PieWithTable;
