import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

import getStyles from './getStyles'

const FluidGridItem = (props, context) => {
	// Do not pass along props that are part of FluidGrid
	const itemProps = omit(props, [
		'item',
		'component',
		'columnDivider',
		'rowDivider',
		'flexGrow',
		'flexShrink',
		'flexBasis',
		'minWidth',
		'maxWidth',
		'placeholder',
		'style'
	])
	const Component = props.component
	const config = merge({}, context.config, props)
	const styles = getStyles(config)
	// If a style prop was passed, merge it into item - allow style override!
	const itemStyles = merge({}, styles.item, props.style)

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
	style: object,
	component: oneOfType([func, string]),
	item: bool,
	// Flexbox-logic props
	flexGrow: number,
	flexShrink: number,
	flexBasis: string,
	maxWidth: string,
	minWidth: string,
	// Prop for 'dummy items'; prevents padding on item-wrapper
	placeholder: bool
}

FluidGridItem.defaultProps = {
	component: 'div',
	item: true
}

export default FluidGridItem
