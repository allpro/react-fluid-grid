import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

import FluidGrid from '@allpro/react-fluid-grid'
import ExampleHeader from './ExampleHeader'

// Verbose config options as a sample; often just `spacing` is needed
const gridConfig = {
	justify: 'flex-start',
	alignContent: 'stretch',
	alignItems: 'stretch',

	// spacing: 0,

	columnSpacing: 16,
	rowSpacing: 32,
	rowDivider: {
		width: 1,
		color: 'blue',
	},
}

const contentProps = {
	variant: 'subtitle1',
	style: {
		flex: 'auto', // so inner-element will stretch vertically
		border: '1px solid #CCC',
		background: '#F9F9F9',
		padding: '20px',
	},
}

const cosmeticContainerStyle = {
	border: '1px dashed #fdd',
	marginTop: '1rem',
}

function ReactFluidGridExample() {
	return (
		<Fragment>
			<ExampleHeader
				title="Mixed Item Widths"
				description="Grid items have various width configurations."
			/>

			<FluidGrid
				container
				style={cosmeticContainerStyle}
				{...gridConfig}
			>
				<FluidGrid item flexBasis="400px" minWidth="50%" flexGrow={99}>
					<Typography {...contentProps}>
						400px/50% minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item flexBasis="400px" minWidth="50%" flexGrow={99}>
					<Typography {...contentProps}>
						400px/50% minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item flexBasis="250px" minWidth="33%">
					<Typography {...contentProps}>
						250px/33% minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item flexBasis="250px" minWidth="33%">
					<Typography {...contentProps}>
						250px/33% minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item flexBasis="250px" minWidth="33%">
					<Typography {...contentProps}>
						250px/33% minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item minWidth="150px" flexGrow={99}>
					<Typography {...contentProps}>
						150px minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item minWidth="150px" flexGrow={99}>
					<Typography {...contentProps}>
						150px minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item minWidth="150px" flexGrow={99}>
					<Typography {...contentProps}>
						150px minWidth
					</Typography>
				</FluidGrid>

				<FluidGrid item minWidth="150px" flexGrow={99}>
					<Typography {...contentProps}>
						150px minWidth
					</Typography>
				</FluidGrid>
			</FluidGrid>
		</Fragment>
	)
}

export default ReactFluidGridExample
