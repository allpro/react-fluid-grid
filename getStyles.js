const defaultDivider = {
	width: 0,
	style: 'solid',
	color: '#CFCFCF'
}

// Regex to test for a fixed width (not a percentage)
const reFixedWidth = /[0-9]+(px|em|rem)$/

/**
 * Helper to generate CSS for each component.
 * Even static container CSS is here to ensure not overridden by a passed class.
 *
 * @param {Object} props
 * @returns {{ outerContainer: {Object}, innerContainer: {Object}, item: {Object}} }}
 */
const getStyles = props => {
	const {
		alignContent,
		alignItems,
		justify,
		flexGrow,
		flexShrink,
		flexBasis,
		maxWidth
	} = props
	let { minWidth } = props

	const columnSpacing = props.columnSpacing || props.spacing || 0
	const rowSpacing = props.rowSpacing || props.spacing || 0
	const columnDivider = { ...defaultDivider, ...props.columnDivider }
	const rowDivider = { ...defaultDivider, ...props.rowDivider }

	// Add column-spacing to minWidth so is accurate to the inner element
	if (reFixedWidth.test(minWidth) && columnSpacing) {
		minWidth = `calc(${minWidth} + ${columnSpacing}px)`
	}

	// If content has a 'shadow', the grid container must be ENLARGED to show
	// it because overflow is hidden so that external 'dividers' don't show.
	const containerOverflow = props.containerOverflow || '0'

	const outerContainer = {
		boxSizing: 'border-box',
		position: 'relative',
		display: 'block',
		overflow: 'hidden',
		padding: `0 ${containerOverflow} ${containerOverflow}`,
		margin: `0 -${containerOverflow}`
	}

	const innerContainer = {
		boxSizing: 'border-box',
		position: 'relative',
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: justify,
		alignContent,
		alignItems
	}

	// Automatically set grid-item flex rules based on width props received.
	// OR layout can be fully customized by passing props for every flex rule.
	const item = {
		boxSizing: 'border-box',
		// Use min- or max-width as flex-basis, if one specified
		flexBasis: flexBasis || minWidth || maxWidth || 'auto',
		// If basis is maxWidth, then do NOT allow grow
		flexGrow: flexGrow >= 0 ? flexGrow : maxWidth && !minWidth ? 0 : 1,
		// If basis is minWidth, then do NOT allow shrink
		flexShrink: flexShrink >= 0 ? flexShrink : minWidth ? 0 : 1,

		margin: '0 !important', // Prevent overriding this as will break layout

		// Make grid-item a flex-container for its contents
		display: 'flex',
		flexFlow: 'column nowrap'
	}

	// Add width CSS rules not implemented above as a flex-basis
	if (flexBasis && minWidth) {
		item.minWidth = minWidth
	}

	if ((flexBasis || minWidth) && maxWidth) {
		item.maxWidth = maxWidth
	}
	else if (minWidth) {
		// If flexBasis = minWidth, add maxWidth to prevent overflow;
		//	when flex-shrink = 0, maxWidth allows it to 'shrink' below minWidth.
		item.maxWidth = '100%'
	}

	// Add row & column dividers as borders on grid-items
	if (columnDivider.width) {
		const { width, style, color } = columnDivider
		item.borderLeft = `${width}px ${style} ${color}`
	}
	if (rowDivider.width) {
		const { width, style, color } = rowDivider
		item.borderTop = `${width}px ${style} ${color}`
	}

	// Add row & column spacing to grid-items and the container
	if (columnSpacing > 0) {
		const halfSpacing = columnSpacing / 2
		Object.assign(item, {
			paddingLeft: `${halfSpacing}px`,
			paddingRight: `${halfSpacing}px`
		})
		Object.assign(innerContainer, {
			marginLeft: `-${halfSpacing + columnDivider.width}px`,
			marginRight: `-${halfSpacing}px`
		})
	}
	if (rowSpacing > 0) {
		const halfSpacing = rowSpacing / 2
		Object.assign(item, {
			paddingTop: `${halfSpacing}px`,
			paddingBottom: `${halfSpacing}px`
		})
		Object.assign(innerContainer, {
			marginTop: `-${halfSpacing + rowDivider.width}px`,
			marginBottom: `-${halfSpacing}px`
		})
	}

	return { innerContainer, outerContainer, item }
}

export default getStyles
