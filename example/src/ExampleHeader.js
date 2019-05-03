import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

function ExampleHeader(props) {
	return (
		<Fragment>
			<Typography variant="h6">
				{props.title}
			</Typography>

			<Typography variant="body2" style={{ margin: '8px 0 12px' }}>
				{props.description}
			</Typography>
		</Fragment>
	)
}

export default ExampleHeader
