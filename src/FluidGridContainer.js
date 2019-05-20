import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

import getStyles from './getStyles'

class FluidGridContainer extends React.Component {
	/**
	 * Pass down all options that affect a FluidGridItem - some are defaults.
	 * Each item can override _default options_ to customize themselves.
	 * @returns {Object}
	 */
	getChildContext() {
		const {
			// Container-specific options
			spacing,
			columnSpacing,
			rowSpacing,
			columnDivider,
			rowDivider,
			// Item-default options
			flexGrow,
			flexShrink,
			flexBasis,
			maxWidth,
			minWidth
		} = this.props

		return {
			config: {
				// Container-specific options
				spacing,
				columnSpacing,
				rowSpacing,
				columnDivider,
				rowDivider,
				// Item-default options
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
		// Do not pass along props that are part of FluidGrid
		const containerProps = omit(props, [
			'container',
			'component',
			'alignContent',
			'alignItems',
			'justifyContent',
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
			'placeholder',
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
	children: node,
	className: string,
	style: object,
	component: oneOfType([func, string]),
	container: bool,

	// Container-specific spacing & divider props
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
	spacing: number,
	columnSpacing: number,
	rowSpacing: number,
	// Container-specific flexbox props
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
	justifyContent: oneOf([
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'space-evenly'
	]),
	justify: oneOf([
		'center',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'space-evenly'
	]),
	// Default props for items
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
	justify: 'flex-start', // alias for justifyContent
	alignContent: 'stretch',
	alignItems: 'stretch',

	// Props from Grid parent that can be overridden per-item
	spacing: 0,
	columnDivider: {},
	rowDivider: {}
}

export default FluidGridContainer
