import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import EqualColumnsExample from './EqualColumnsExample'
import MixedItemWidthsExample from './MixedItemWidthsExample'


function TabContainer(props) {
	return (
		<div style={{ padding: '16px' }}>
			{props.children}
		</div>
	)
}

class ReactFluidGridDemo extends Component {
	state = {
		currentTab: 0,
	};

	onChangeTab = (event, currentTab) => {
		this.setState({ currentTab });
	};

	render() {
		const { currentTab } = this.state;

		return (
			<Fragment>
				<Typography variant="headline">
					React Fluid-Grid Examples
				</Typography>
				<Typography variant="body1" style={{ margin: '4px 0 16px' }}>
					Use tabs to select a demo. (Loads the corresponding demo file.)
					Resize window width to see responsive flow of grid.
				</Typography>

				<AppBar position="static" color="default">
					<Tabs
						value={currentTab}
						onChange={this.onChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="Equal Columns" />
						<Tab label="Mixed Item Widths" />
					</Tabs>
				</AppBar>

				{currentTab === 0 && (
					<TabContainer><EqualColumnsExample /></TabContainer>
				)}
				{currentTab === 1 && (
					<TabContainer><MixedItemWidthsExample /></TabContainer>
				)}
			</Fragment>
		);
	}
}

render( <ReactFluidGridDemo />, document.querySelector( '#demo' ) )
