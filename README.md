# React FluidGrid Component

[TOC]

## Overview

This component simplifies creating a "responsive grid" in React. Grid 
configuration is specified as props on the grid-wrapper, and individual 
grid-cell options are props on each cell-wrapper. Each grid-cell is 
constrained by minWidth and/or maxWidth options. All the required CSS is
auto-generated to achieve the desired effect.
 
**FluidGrid uses static CSS.** Javascript is used _only_ to generate the CSS - it 
does not manipulate or modify the grid once it is rendered. Therefore you _could_ 
write ordinary CSS to create the same result. However, there are numerous 
calculations necessary to achieve a perfect result, so this component is a 
major time-saver and bug-avoider!

## Why Use FluidGrid?

FluidGrid was inspired by 
**[Material-UI Grid](https://material-ui.com/layout/grid/)** ("**MUI Grid**"), 
and uses option syntax as similar as possible. However the sizing methodology
is completely different, so there are only a few options in common. 
FluidGrid was created to handle usecases that MUI Grid could not.

Like most grid systems, the MUI Grid item-widths are based on _spanning_ the 
imaginary columns of a fixed grid. The number of columns spanned by each cell
can be changed based on media-query breakpoints. Therefore the width of each 
cell changes based on screen width, **as well as other elements like sidebars**. 
If these other elements are also responsive to screen-width, the sizing logic
of the grid becomes dependent on them, making it complex and brittle.
 
**FluidGrid does NOT rely on an imaginary grid with imaginary column.** Instead it
 uses flexbox-wrapping to position elements. The result _emulates a grid_, 
 while allowing ordinary measurements for min-width, max-width, flex-basis, etc. 
 ANY valid CSS measurements can be used, like `300px`, `20em`, `25%`, etc.

Because FluidGrid is based on cell-content width instead of screen-width, it 
cares only about the width of the grid container. If you expand or collapse a 
sidebar, the grid will _immediately_ reflow to suit the resized container. No 
media queries, special state-classes, or re-rendering is needed - its automatic.

I created this helper for a layout with 'cards' that had a minimum width. 
It was a highly responsive UI, with various factors affecting the grid/content 
width at each media breakpoint. With FluidGrid, this became dead simple. Note 
that the example below is COMPLETE - no additional CSS or media-queries are
required, and the number and order of grid-items does not matter.

```jsx harmony
<FluidGrid container spacing="20px">
    <FluidGrid item minWidth="320px">
        <CustomCardOne />
    </FluidGrid>

    <FluidGrid item minWidth="320px">
        <CustomCardTwo />
    </FluidGrid>

    <FluidGrid item minWidth="320px">
        <CustomCardThree />
    </FluidGrid>

    <FluidGrid item minWidth="320px">
        <CustomCardFour />
    </FluidGrid>
</FluidGrid>
```

The code above means no card will ever be less than 320px wide (unless the 
grid itself is), and the cards will be spaced 20px apart both vertically and 
horizontally, but with no space at the top or sides of the grid. As many cards
 as possible will be shown on each 'row'. Each card will grow proportionally to 
_fill_ the grid-row. The options shown could be enhanced to make the sizing 
more refined.

## Grid Stucture

A FluidGrid consists of an outer wrapper (Container), with any number 
of grid-cells (Items). The content of each grid-cell is wrapped by an Item 
element. _Only_ these generated wrappers have CSS applied.

By default, a DIV is used for the Item container. However any element type 
can be specified, including a React component. This avoids unnecessary 
element nesting. For example, instead of putting a MUI Typography component 
_inside_ a FluidGrid Item DIV, the Typography component can _be_ the Item 
component. This example shows both structures.

```jsx harmony
<FluidGrid container>
    <FluidGrid item minWidth="33%">
        <Typography variant="subheading">
            Text Content
        </Typography>
    </FluidGrid>

    <FluidGrid item minWidth="33%" component="Typogarphy" variant="subheading">
        Text Content
    </FluidGrid>
    
    ...

</FluidGrid>
```

## Basic Grid Properties

Both the Container and Item wrappers are created using the same FluidGrid 
component. This follows the style of the MUI Grid component. The syntax is:

```jsx harmony
// Grid Container syntax - default is to be a container
<FluidGrid spacing="20px">
<FluidGrid container spacing="20px">

// Grid Item syntax
<FluidGrid item minWidth="400px">
```

## Customizing the Grid

A FluidGrid can have vertical and/or horizontal spacing between grid-cells. It 
can also generate divider-borders between rows and/or columns. These borders 
are fully customizable using standard CSS values.

Additional flexbox CSS rules can be added to customize both the flex 
container and the flex items. Use normal CSS-in-Javascript syntax to add styles 
to the grid configuration. The component will calculate and generate the final 
CSS to achieve the 'goal' specified. This means the generated CSS may not be 
the same as the props passed in!

**See the FluidGrid API section below.**

## Example of a Responsive FluidGrid

Resize window width to see flow change.

```jsx harmony
import React from 'react'
import Typography from '@material-ui/core/Typography'

// Verbose config options as a sample; often just `spacing` is needed
const gridConfig = {
	justify: 'flex-start',
	alignContent: 'stretch',
	alignItems: 'stretch',

	// spacing: 0,

	rowSpacing: 24,
	rowDivider: {
		width: 1,
		color: 'blue',
		style: 'dotted'
	},

	columnSpacing: 26,
	columnDivider: {
		width: 3,
		color: 'blue'
	},
}

const itemProps = {
    item: true,
    component: Typography,
    variant:"subheading",
}

const contentProps = {
	flex: 'auto', // so inner-element will stretch vertically
	variant: 'subheading',
	style: {
		border: '1px solid #CCC', 
        background: '#F9F9F9', 
        padding: '20px'
	}
}

;
<FluidGrid container {...gridConfig}>
    <FluidGrid {...itemProps} flexBasis="400px" minWidth="50%" flexGrow="99">
        400px/50% minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} flexBasis="400px" minWidth="50%" flexGrow="99">
        400px/50% minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} flexBasis="250px" minWidth="33%">
        250px/33% minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} flexBasis="250px" minWidth="33%">
        250px/33% minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} flexBasis="250px" minWidth="33%">
        250px/33% minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} minWidth="150px" flexGrow="99">
        150px minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} minWidth="150px" flexGrow="99">
        150px minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} minWidth="150px" flexGrow="99">
        150px minWidth
    </FluidGrid>

    <FluidGrid {...itemProps} minWidth="150px" flexGrow="99">
        150px minWidth
    </FluidGrid>
</FluidGrid>
```

## FluidGrid API

**Coming Soon...**
