import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

function ExampleHeader(props) {
	return (
		<Fragment>
			<Typography variant="h6">
				{props.h6}
			</Typography>

			<Typography variant="body1" style={{ margin: '8px 0 12px' }}>
				{props.description}
			</Typography>
		</Fragment>
	)
}

export default ExampleHeader
