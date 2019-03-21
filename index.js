import React from 'react'

import FluidGridContainer from './FluidGridContainer'
import FluidGridItem from './FluidGridItem'

const FluidGrid = props => {
	if (props.container) {
		return <FluidGridContainer {...props} />
	}
	else {
		return <FluidGridItem {...props} />
	}
}

export default FluidGrid
