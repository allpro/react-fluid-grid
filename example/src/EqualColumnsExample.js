import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

import FluidGrid from '@allpro/react-fluid-grid'

import ExampleHeader from './ExampleHeader'


const createArray = count => Array.apply(null, Array(count))

// Verbose config options as a sample; often just `spacing` is needed
const gridConfig = {
	// justify: 'flex-start',
	alignContent: 'stretch',
	alignItems: 'stretch',

	rowSpacing: 16,
	columnSpacing: 33,
	columnDivider: {
		width: 2,
		color: 'blue',
	},

	// Prevent box-shadow clipping of item content - SEE cosmeticContentProps
	containerOverflow: '4px',
}

const MIN_ITEM_WIDTH = '200px'
const MAX_COLUMNS = 4
const MIN_ITEM_PERCENT = `${100 / MAX_COLUMNS}%`
const NUM_DEMO_ITEMS = 9

// Grid-items - all identical so creates consistent columns at ANY	 screen-width
const itemProps = {
	item: true,
	flexBasis: MIN_ITEM_WIDTH,
	minWidth: MIN_ITEM_PERCENT
}

const cosmeticContainerStyle = {
	border: '1px dashed #fdd',
	marginTop: '1rem'
}

// Typography content inside each grid-item - COSMETIC ONLY
const cosmeticContentProps = {
	variant: 'subtitle1',
	style: {
		flex: 'auto', // so inner-element will stretch vertically
		// SEE containerOverflow option in gridConfig to prevent shadow clipping
		boxShadow: '4px 4px 4px 0px rgba(153,153,153,1)',
		border: '1px solid #CCC',
		background: '#F9F9F9',
		padding: '20px'
	}
}


function ReactFluidGridExample() {
	return (
		<Fragment>
			<ExampleHeader
				title="Equal-width Columns"
				description={`
					All grid items use the same configuration.
					Empty grid-items added at end so last row retains spaces.
				`}
			/>

			<FluidGrid
				container
				style={cosmeticContainerStyle}
				{...gridConfig}
			>
				{createArray(NUM_DEMO_ITEMS).map((x, idx) => (
					<FluidGrid {...itemProps} key={idx}>
						<Typography {...cosmeticContentProps}>
							{`flexBasis=${MIN_ITEM_WIDTH} minWidth=${MIN_ITEM_PERCENT}`}
						</Typography>
					</FluidGrid>
				))}

				{createArray(MAX_COLUMNS - 1).map((x, idx) => (
					<FluidGrid {...itemProps} placeholder={true} key={`ph${idx}`} />
				))}
			</FluidGrid>
		</Fragment>
	)
}

export default ReactFluidGridExample
