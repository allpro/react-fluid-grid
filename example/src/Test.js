import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'

import ExampleHeader from './ExampleHeader'


const colors = ['red', 'blue', 'green'] //, 'magenta', 'grey'

const getRandomData = (rows = 10, cols = 10) => {
	const data = new Array(rows)

	for (let x = 0; x < rows; x++) {
		const row = data[x] = new Array(cols)
		for (let y = 0; y < cols; y++) {
			row[y] = colors[Math.floor(Math.random() * colors.length)]
		}
	}

	return data
}

const getLargestBlockSize = data => {
	const numRows = data.length
	const numCols = data[0].length

	const getCell = (r, c) => (
		r < numRows && c < numCols ? data[r][c] : null
	)

	// Create map to track every CONTIGUOUS BLOCK (2 or more cells)
	const blocks = new Map()

	// Create map for cell-to-block associations
	const cellMap = new Map()

	// Init value for largest block so-far; updated many times!
	let largestBlock = 1

	// Loop all rows
	for (let row = 0; row < numRows; row++) {
		// Track adjacent-cells so process each row-cell just ONCE
		const processedCells = new Set()

		// Loop cells in THIS ROW
		for (let col = 0; col < numCols; col++) {
			const cellId = `${row}.${col}`

			// If already processed this cell, skip it
			if (processedCells.has(cellId)) continue

			const color = getCell(row, col)
			let blockId = cellMap.get(cellId)

			const matchingCells = new Set()

			// SUBROUTINE - processes a single cell
			const checkAdjacentCell = (row2, col2, isOnSameRow) => {
				const adjColor = getCell(row2, col2)

				// ONLY process this cell if it is the SAME COLOR
				if (adjColor === color) {
					const adjId = `${row2}.${col2}`
					const adjBlockId = cellMap.get(adjId) // May be undefined

					// Adjacent Cell was mapped to a block by cell above it
					if (adjBlockId) {
						if (!blockId) {
							// USE this blockId - was set from row-above
							blockId = adjBlockId
						}
						else if (adjBlockId !== blockId) {
							// Not the same block, so MERGE THEM
							const oldBlock = blocks.get(adjBlockId)
							for (let id of oldBlock) {
								cellMap.set(id, blockId)
								matchingCells.add(id)
							}
							// Remove old, partial block now
							blocks.delete(adjBlockId)
						}
					}
					else {
						// Just add this cell to matches
						matchingCells.add(adjId)
					}

					// Also process the cell BELOW any cell that matches
					// This is how we continue blocks between rows
					if (isOnSameRow) {
						// Check cell BELOW this one
						checkAdjacentCell(row2 + 1, col2)

						// Add this row-cell to list so can SKIP
						processedCells.add(adjId)
					}

					// Adjacent cell IS the same color
					return true
				}

				// Adjacent cell IS NOT the same color
				return false
			}

			// Check cell BELOW this one
			checkAdjacentCell(row + 1, col)

			// Check all cells to RIGHT - until one does not match
			for (let col2 = col + 1; col2 < numCols; col2++) {
				const match = checkAdjacentCell(row, col2, true)
				if (!match) break
			}

			// IF at least 1 adjacent cell matched, update the block
			if (matchingCells.size) {
				// An adjacent cell MAY have set the blockId
				let block = blockId ? blocks.get(blockId) : null

				// Create new block IF no adjacent cells are in one yet
				if (!blockId) {
					blockId = cellId // used in cellMap, below
					block = new Set()
					blocks.set(blockId, block)
				}

				// Add THIS CELL to block
				cellMap.set(cellId, blockId)
				block.add(cellId)

				// Add all matching cells to block
				for (const id of matchingCells) {
					cellMap.set(id, blockId)
					block.add(id)
				}

				// Update the largestBlock var
				largestBlock = Math.max(largestBlock, block.size)
			}
		}
	}

	return { largestBlock, blocks }
}

const styles = {
	wrapper: {
		border: '1px solid #666',
		padding: '1px'
	},
	container: {
		display: 'flex',
		alignItems: 'stretch',
		alignContent: 'stretch'
	},
	item: {
		flex: '1 0 auto',
		padding: '10px 0',
		borderRadius: '4px',
		border: '1px solid white',
		color: 'white',
		textAlign: 'center',
		fontFamily: 'Arial, "san-serif"'
	},
	button: {
		margin: '0 16px 16px 0'
	}
}


class ReactFluidGridExample extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: this.getData()
		}

		this.refresh = this.refresh.bind(this)
		this.calculate = this.calculate.bind(this)
		this.ColorMap = this.ColorMap.bind(this)
	}

	componentDidMount() {
		this.calculate()
	}

	// noinspection JSCheckFunctionSignatures
	componentDidUpdate() {
		this.calculate()
	}

	// noinspection JSMethodCanBeStatic
	getData() {
		return getRandomData(100, 100)
	}

	refresh() {
		this.setState({
			data: this.getData()
		})
	}

	calculate() {
		const { data } = this.state

		const start = performance.now() // eslint-disable-line
		const { largestBlock, blocks } = getLargestBlockSize(data)
		const end = performance.now() // eslint-disable-line
		const time = Math.round((end - start) * 100) / 100 + 'ms'

		console.log({ largestBlock, time, blocks })
	}

	ColorMap() {
		const { data } = this.state
		const numCells = data.length * data[0].length

		if (numCells > 10000) {
			return <h1>Not Rendering {numCells.toLocaleString()} Cells</h1>
		}

		return (
			<div style={styles.wrapper}>
				{data.map((row, x) => (
					<div style={styles.container} key={x}>
						{row.map((cell, y) => (
							<div
								key={y}
								style={{
									...styles.item,
									background: cell
								}}
							>
								{`${x}.${y}`}
							</div>
						))}
					</div>
				))}
			</div>
		)
	}

	render() {
		const { ColorMap } = this

		return (
			<Fragment>
				<ExampleHeader
					title="Google Question Algorithm"
					description={`
					All grid items use the same configuration.
					Empty grid-items added at end so last row retains spaces.
				`}
				/>

				<Button
					onClick={this.calculate}
					color="primary"
					variant="contained"
					style={styles.button}
				>
					Recalculate
				</Button>
				<Button
					onClick={this.refresh}
					color="secondary"
					variant="contained"
					style={styles.button}
				>
					Refresh Data
				</Button>

				<ColorMap />
			</Fragment>
		)
	}
}


export default ReactFluidGridExample
