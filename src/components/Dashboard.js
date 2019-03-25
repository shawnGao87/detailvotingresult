import React, { Fragment } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
class Dashboard extends React.Component {
	state = {
		open: true,
		topbarStyle: {
			height: 100,
			backgroundColor: "black"
		}
	};
	render() {
		return (
			<Fragment>
				<Navbar id="dvrTop" style={this.state.topbarStyle}>
					<Navbar.Brand href="#home" style={{ color: "white" }}>
						Detail Voting Result
					</Navbar.Brand>
				</Navbar>
				<Container>
					<Row>
						<Col sm={12} md={6}>
							<Card1 />
						</Col>
						<Col sm={12} md={6}>
							<Card2 />
						</Col>
						<Col sm={12} md={6}>
							<Card3 />
						</Col>
						<Col sm={12} md={6}>
							<Card4 />
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
	}
}

export default Dashboard;
