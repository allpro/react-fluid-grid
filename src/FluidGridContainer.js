import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

import getStyles from './getStyles'

class FluidGridContainer extends React.Component {
	/**
	 * Pass down all options that affect a FluidGridItems - these are defaults.
	 * Each item can override _most_ of these options to customize themselves.
	 * @returns {Object}
	 */
	getChildContext() {
		const {
			spacing,
			columnSpacing,
			rowSpacing,
			columnDivider,
			rowDivider,
			flexGrow,
			flexShrink,
			flexBasis,
			maxWidth,
			minWidth
		} = this.props

		return {
			config: {
				spacing,
				columnSpacing,
				rowSpacing,
				columnDivider,
				rowDivider,
				flexGrow,
				flexShrink,
				flexBasis,
				maxWidth,
				minWidth
			}
		}
	}

	render() {
		const { props } = this
		const containerProps = omit(props, [
			'container',
			'component',
			'alignContent',
			'alignItems',
			'justify',
			'spacing',
			'columnSpacing',
			'rowSpacing',
			'columnDivider',
			'rowDivider',
			'flexGrow',
			'flexShrink',
			'flexBasis',
			'minWidth',
			'maxWidth',
			'containerOverflow',
			'style'
		])
		const Component = props.component
		const styles = getStyles(props)
		// If a style prop was passed, merge it into container
		const containerStyles = merge({}, props.style, styles.outerContainer)

		return (
			<Component style={containerStyles} {...containerProps}>
				<div id="inner" style={styles.innerContainer}>
					{props.children}
				</div>
			</Component>
		)
	}
}

const {
	bool,
	func,
	node,
	number,
	object,
	oneOf,
	oneOfType,
	shape,
	string
} = PropTypes

FluidGridContainer.childContextTypes = {
	config: object
}

FluidGridContainer.propTypes = {
	alignContent: oneOf([
		'stretch',
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around'
	]),
	alignItems: oneOf([
		'flex-start',
		'center',
		'flex-end',
		'stretch',
		'baseline'
	]),
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
	children: node,
	component: oneOfType([func, string]),
	className: string,
	container: bool,
	spacing: number,
	columnSpacing: number,
	rowSpacing: number,
	flexGrow: number,
	flexShrink: number,
	baseWidth: string,
	maxWidth: string,
	minWidth: string
}

FluidGridContainer.defaultProps = {
	component: 'div',
	container: false,

	// Container-only props
	justify: 'flex-start',
	alignContent: 'stretch',
	alignItems: 'stretch',

	// Props from Grid parent that can be overridden per-item
	spacing: 0,
	columnDivider: {},
	rowDivider: {}
}

export default FluidGridContainer
