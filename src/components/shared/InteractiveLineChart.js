import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Text, RangeInput } from "grommet";

const InteractiveLineChart = ({ value, updateValue, data }) => (
	<Box>
		<Box pad="small">
			<Text>Number of Days</Text>
			<Box pad="small">
				<RangeInput
					min={2}
					max={356 * 2}
					step={5}
					value={value}
					onChange={updateValue}
				/>
			</Box>
		</Box>
		<Box pad="small" height="medium" style={{ position: "relative" }}>
			<Line
				data={data}
				options={{
					pointHitDetectionRadius: 5,
					bezierCurve: false,
					scaleBeginAtZero: true,
					maintainAspectRatio: false
				}}
			/>
		</Box>
	</Box>
);

export default InteractiveLineChart;
