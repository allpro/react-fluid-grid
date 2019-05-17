import React from 'react'
import { render } from 'react-dom'

import DemoLayout from '@allpro/demo-layout'

import EqualColumnsExample from './EqualColumnsExample'
import MixedItemWidthsExample from './MixedItemWidthsExample'
// import Test from './Test'


function FluidGridDemo() {
	return (
		<DemoLayout
			packageName="react-fluid-grid"
			title="React FluidGrid Examples"
			readme="https://github.com/allpro/react-fluid-grid/blob/master/README.md"
			demo="https://codesandbox.io/s/github/allpro/react-fluid-grid/tree/master/example"
			pages={[
				{
					label: 'Equal Width Columns',
					path: '/equal-width',
					component: EqualColumnsExample
				},
				{
					label: 'Mixed Width Columns',
					path: '/mixed-widths',
					component: MixedItemWidthsExample
				}
				// {
				// 	label: 'Test',
				// 	path: '/test',
				// 	component: Test
				// }
			]}
		/>
	)
}

render(<FluidGridDemo />, document.getElementById('root'))
