import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import EqualColumnsExample from './EqualColumnsExample'
import MixedItemWidthsExample from './MixedItemWidthsExample'

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/equal-width" component={EqualColumnsExample} />
		<Route path="/mixed-widths" component={MixedItemWidthsExample} />

		{/* catch any invalid URLs */}
		<Redirect to="/" />
	</Switch>
)

export default Routes
