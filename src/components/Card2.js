import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
		const data = payload && payload[0].payload;
		if (data) {
			return (
				<Fragment>
					<div
						className="custom-tooltip"
						style={{
							fontSize: 12,
							backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.6})`,
							color: "white"
						}}
					>
						<p className="label">{data._id}</p>
						<p className="intro">Vote Count: {data.count}</p>
						{data.comments.map(i => {
							return <p className="desc">Comments: {i}</p>;
						})}
					</div>
				</Fragment>
			);
		}
	}

	return null;
};

const colors = [
	"rgba(35,100,170, 0.6)",
	"rgba(61,165,217, 0.6)",
	"rgba(115,191,184, 0.6)",
	"rgba(254,198,1, 0.6)",
	"rgba(234,115,23, 0.6)",
	"rgba(120,128,181, 0.6)",
	"rgba(238,108,77, 0.6)",
	"rgba(41,50,65, 0.6)",
	"rgba(192,169,176, 0.6)",
	"rgba(44,85,48, 0.6)",
	"rgba(115,158,130, 0.6)",
	"rgba(243,255,182, 0.6)",
	"rgba(211,139,93, 0.6)",
	"rgba(153,98,30, 0.6)",
	"rgba(189,107,115, 0.6)",
	"rgba(163,11,55, 0.6)",
	"rgba(198,200,238, 0.6)",
	"rgba(120,188,97, 0.6)",
	"rgba(233,128,110, 0.6)"
];

export default class Card2 extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		fetch("/api/question/2")
			.then(res => res.json())
			.then(data => {
				data.votes.name = data.votes._id;
				this.setState({ chartData: data.votes });
			});
	}

	render() {
		return (
			<Fragment>
				<Card>
					<Card.Body>
						<Card.Title>Question 2 Result</Card.Title>
						<ResponsiveContainer width="100%" height={500}>
							<PieChart>
								<Pie
									data={this.state.chartData}
									cx="50%"
									cy="50%"
									labelLine={true}
									dataKey="count"
									outerRadius="50%"
									label
								>
									{this.state.chartData &&
										this.state.chartData.map((entry, index) => (
											<Cell
												// name is for the legends
												name={entry._id}
												fill={colors[Math.floor(Math.random() * colors.length)]}
												key={`cell-${index}`}
											/>
										))}
								</Pie>
								<Tooltip content={<CustomTooltip />} />
								<Legend verticalAlign="top" height={36} />
							</PieChart>
						</ResponsiveContainer>
					</Card.Body>
				</Card>
			</Fragment>
		);
	}
}
