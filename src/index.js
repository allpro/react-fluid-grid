import React from 'react'

import Container from './FluidGridContainer'
import Item from './FluidGridItem'

const ReactFluidGrid = props => (
	props.container
		? <Container {...props} />
		: <Item {...props} />
)

export default ReactFluidGrid
