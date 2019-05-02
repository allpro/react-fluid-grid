import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import App from './App'

const isGitHubPages = /(github\.io|codesandbox\.io)/.test(window.location.hostname)


function FluidGridDemo() {
	return (
		<Router basename={isGitHubPages ? '/react-fluid-grid' : ''}>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/:tabL1" component={App} />
			</Switch>
		</Router>
	)
}

render(<FluidGridDemo />, document.getElementById('root'))
