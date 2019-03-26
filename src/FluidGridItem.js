import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import getStyles from './getStyles'

const FluidGridItem = (props, context) => {
	const itemProps = _.omit(props, [
		'item',
		'component',
		'columnDivider',
		'rowDivider',
		'flexGrow',
		'flexShrink',
		'flexBasis',
		'minWidth',
		'maxWidth',
		'style'
	])
	const Component = props.component
	const config = _.merge({}, context.config, props)
	const styles = getStyles(config)
	// If a style prop was passed, merge it into container
	const itemStyles = _.merge({}, styles.item, props.style)

	return (
		<Component style={itemStyles} {...itemProps}>
			{props.children}
		</Component>
	)
}

const { bool, func, node, number, object, oneOfType, shape, string } = PropTypes

FluidGridItem.contextTypes = {
	config: object
}

FluidGridItem.propTypes = {
	children: node,
	className: string,
	component: oneOfType([func, string]),
	item: bool,

	// Dividers set per-item affect dividers on the left & top of the item
	columnDivider: shape({
		color: string,
		width: number,
		style: string
	}),
	rowDivider: shape({
		color: string,
		width: number,
		style: string
	}),
	flexGrow: number,
	flexShrink: number,
	flexBasis: string,
	maxWidth: string,
	minWidth: string
}

FluidGridItem.defaultProps = {
	component: 'div',
	item: true
}

export default FluidGridItem
