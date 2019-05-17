# React FluidGrid Component

[![npm package][npm-badge]][npm]
[![gzip-size][gzip-size-badge]][gzip-size]
[![install-size][install-size-badge]][install-size]
[![build][build-badge]][build]
[![coverage][coveralls-badge]][coveralls]
[![license][license-badge]][license]
[![donate][donate-badge]][donate]


[React FluidGrid](https://www.npmjs.com/package/@allpro/react-fluid-grid) 
creates a "responsive grid" layout.
FluidGrid was inspired by 
**[Material-UI Grid](https://material-ui.com/api/grid/)** ("**MUI Grid**").
It emulates the syntax and props of MUI Grid as closely as possible so devs 
familiar with that can learn FluidGrid quickly.

**Advantages of FluidGrid**

- Useful for anything async; not just 'prompt messages'.
- _Very easy_ to add asynchronous navigation blocking.
- Fully customizable by each component - _no limitations_.
- Does not require modifying the history object.
- Is compatible with React Native and server-side-rendering.

**Motivation**

FluidGrid was created for use-cases that MUI Grid could not handle well.
Once I created it, I realized that it handles _most layouts_ easier, 
even those that MUI Grid could handle as well.

The initial use-case was a container filled with 'cards' that required 
minimum widths to display correctly. 
This container was surrounded on both sides by collapsible sidebars, 
_plus_ a lot of responsive configuration in media queries.
Since MUI Grid can react _only_ to the full screen-width, 
it could not handle this complex layout automatically.

We tried to make it work by adding our own logic, 
but all the variables made it very complicated.
It was also brittle because any changes to other elements could
break the grid _column-span_ logic.

The problem with _all_ "grids" is that they rely on 
**spanning columns of a virtual grid**. 
This means that the column-span values must be changed in order to reflow the
grid items. This means the developer is responsible for figuring out the math
required to make things work.


## How is FluidGrid different?

**FluidGrid does NOT rely on an imaginary grid with imaginary column.** 
It's really a **fluid-flow layout** rather than a fluid-grid,
but I named it FluidGrid because it _emulates_ a grid layout,
and can be used in place of them.
It's structure and props also deliberately emulate
**[Material-UI Grid](https://material-ui.com/api/grid/)**.

Like MUI Grid, FluidGrid used flexbox to create the layout.
Unlike MUI Grid though, it does _not_ use media-queries.
**FluidGrid generates 100% static CSS.** 
It does _not_ manipulate or modify the grid once it is rendered.
The responsiveness is controlled solely by the CSS,
and is _not_ reliant on "screen width".
If you expand or collapse a sidebar, the grid will _immediately_ reflow to 
suit the resized container. 

**NOTE: FluidGrid does NOT use or require Material UI.**


## How does FluidGrid work?

Configuring a FluidGrid is as simple as adding props 
like `minWidth` or `maxWidth`.
Any valid CSS 'length' values work, including percentages.
FluidGrid has a rich API so it can be customized to handle almost any layout.

Because FluidGrid is based on cell-content width instead of screen-width, it 
cares only about the width of the grid container. If you expand or collapse a 
sidebar, the grid will _immediately_ reflow to suit the resized container. 
No media queries, special state-classes, or re-rendering is necessary.

Adding item spacing and divider rules is as simple as adding props;
for example:
```jsx harmony
<FluidGrid 
    container 
    spacing="20px"
    columnDivider={{ width: '2px', color: '#669' }}
>
    <FluidGrid item minWidth="320px">
        <CustomCardOne />
    </FluidGrid>

    <FluidGrid item minWidth="320px">
        <CustomCardTwo />
    </FluidGrid>

    <FluidGrid item minWidth="320px">
        <CustomCardThree />
    </FluidGrid>

    <FluidGrid item minWidth="600px">
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

## Grid Structure

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

    <FluidGrid item minWidth="33%" component="Typography" variant="subheading">
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

**See the [FluidGrid API](#fluidgrid-api) section below.**

## Responsive FluidGrid Sample

The sample below is from the **"Mixed Width Columns"** demo available at:
[allpro.github.io/react-fluid-grid](https://allpro.github.io/react-fluid-grid)

<details>
	<summary>
		<b>Mixed-Width Sample Code</b> (click to show)
		<br />&nbsp;
	</summary>

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
	variant: 'subheading',
	style: {
        flex: 'auto', // so inner-element will stretch vertically
		border: '1px solid #CCC', 
        background: '#F9F9F9', 
        padding: '20px'
	}
}

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
</details>


## Live Demos

Try the demos at: https://allpro.github.io/react-fluid-grid

Play with the demo code at:
https://codesandbox.io/s/github/allpro/react-fluid-grid/tree/master/example

If you pull or fork the repo, you can run the demo like this:
- In the root folder, run `npm start`
- In a second terminal, in the `/example` folder, run `npm start`
- The demo will start at http://localhost:3000
- Changes to the component _or_ the demo will auto-update the browser


## Installation

-   NPM: `npm install @allpro/react-fluid-grid`
-   Yarn: `yarn add @allpro/react-fluid-grid`
-   CDN: Exposed global is `FormManager`
    -   Unpkg: `<script src="https://unpkg.com/@allpro/react-fluid-grid/umd/@allpro/react-fluid-grid.min.js"></script>`
    -   JSDelivr: `<script src="https://cdn.jsdelivr.net/npm/@allpro/react-fluid-grid/umd/@allpro/react-fluid-grid.min.js"></script>`

---

## FluidGrid API

FluidGrid has 2 components, which are differentiated by setting either a 
`container` or `item` prop.

- **`container`** &nbsp; {boolean} `[true]`
  <br>Sets component to be a 'FluidGrid Container'

- **`item`** &nbsp; {boolean} `[false]`
  <br>Sets component to be a 'FluidGrid Item'

Sample of `container` and `item` use to differentiate component mode.

```javascript
<FluidGrid container spacing={24}>
    <FluidGrid item minWidth="300px">
        <ContentsOne />
    </FluidGrid>

    <FluidGrid item minWidth="300px">
        <ContentsTwo />
    </FluidGrid>
</FluidGrid>
```

The props for _each component-mode_ are categorized for clarity. 
**All props are optional**, but if _no props_ are specified, the generated
output will not be useful!


### `FluidGrid container` Props

<details>
<summary><h4>Special Props (click to show)</h4></summary>

    These props are unique to the FluidGrid container.

- **`component`** &nbsp; {Component|string} `["div"]`
  <br>The wrapper-element generated by FluidGrid. 

- **`containerOverflow`** &nbsp; {string} `[""]`
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br>This increases the container size to contain visual effects that extend
     beyond the boundary of items, like a drop-shadow or glow effect. 
</details>

#### Styling Props

- **`className`** &nbsp; {string} `[null]`
  <br>Class to apply to grid-container.

- **`style`** &nbsp; {object} `[null]`
  <br>Styles that will be assigned to the grid-container.

#### Flexbox Props

- **`justify`** &nbsp; {string} `["flex-start"]`
  <br>Flexbox rule for grid-container.

- **`alignContent`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-container.

- **`alignItems`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-container.

#### Item-Defaults Props

Some default props for grid-items can be set on the grid-container element.
They are overridden if set on any individual grid-item.

- **`columnSpacing`** &nbsp; {integer|string} `[0]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`rowSpacing`** &nbsp; {integer|string} `[0]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`spacing`** &nbsp; {integer|string} `[0]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`columnDivider`** &nbsp; {object} `[null]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`rowDivider`** &nbsp; {object} `[null]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`flexGrow`** &nbsp; {integer} `[null]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`flexShrink`** &nbsp; {integer} `[null]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`flexBasis`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`minWidth`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description

- **`maxWidth`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid container` Props](#fluidgrid-items-props) for description


### `FluidGrid item` Props

#### Special Props

These props are unique to FluidGrid items.

- **`component`** &nbsp; {Component|string} `["div"]`
  <br>The wrapper-element for the grid-item generated by FluidGrid. 

- **`containerOverflow`** &nbsp; {string} `[""]`
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br>This increases the container size to contain visual effects that extend
     beyond the boundary of items, like a drop-shadow or glow effect. 

- **`columnDivider`** &nbsp; {object} `[{ style: 'solid' color: '#CFCFCF' }]`
  <br>CSS attributes for `border` to display between columns

- **`rowDivider`** &nbsp; {object} `[{ style: 'solid' color: '#CFCFCF' }]`
  <br>CSS attributes for `border` to display between rows

#### Styling Props

- **`className`** &nbsp; {string} `[null]`
  <br>Class to apply to grid-item wrapper.

- **`style`** &nbsp; {object} `[null]`
  <br>Styles that will be assigned to the grid-item wrapper.

#### Flexbox Logic Props

**These props are used as inputs to FluidGrid logic for the final CSS.**
They may _or may not_ translate directly to a CSS rule.
For example, setting `minWidth="300px""` can generate CSS like 
`flex: 1 0 300px;`, depending on what other props are set.

- **`flexGrow`** &nbsp; {integer} `[null]`
  <br>Flexbox logic prop for grid-item.

- **`flexShrink`** &nbsp; {integer} `[null]`
  <br>Flexbox logic prop for grid-item.

- **`flexBasis`** &nbsp; {string} `[""]`
  <br>Flexbox logic prop for grid-item.

- **`minWidth`** &nbsp; {string} `[""]`
  <br>Flexbox logic prop for grid-item.

- **`maxWidth`** &nbsp; {string} `[""]`
  <br>Flexbox logic prop for grid-item.

#### Flexbox Props

These flexbox alignment props will translate directly to the corresponding 
CSS attribute. These can also be set a _item defaults_ on the grid-container.

- **`justify`** &nbsp; {string} `["flex-start"]`
  <br>Flexbox rule for grid-item.

- **`alignContent`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-item.

- **`alignItems`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-item.


## Built With

- [create-react-library](https://github.com/DimiMikadze/create-react-library) - 
A React component framework based on
[create-react-app](https://github.com/facebook/create-react-app)

## Contributing

Please read 
[CONTRIBUTING.md](https://github.com/allpro/react-fluid-grid/blob/master/CONTRIBUTING.md)
for details on our code of conduct, 
and the process for submitting pull requests to us.

## Versioning

We use SemVer for versioning. For the versions available, 
see the tags on this repository.

## License

MIT © [allpro](https://github.com/allpro)
<br>See
[LICENSE](https://github.com/allpro/react-fluid-grid/blob/master/LICENSE)
file for details


[gzip-size-badge]: http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@allpro/react-fluid-grid/umd/react-fluid-grid.min.js?compression=gzip
[gzip-size]: http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@allpro/react-fluid-grid/umd/react-fluid-grid.min.js

[install-size-badge]: https://packagephobia.now.sh/badge?p=@allpro/react-fluid-grid
[install-size]: https://packagephobia.now.sh/result?p=@allpro/react-fluid-grid

[npm-badge]: http://img.shields.io/npm/v/@allpro/react-fluid-grid.svg?style=flat-round
[npm]: https://www.npmjs.com/package/@allpro/react-fluid-grid

[build-badge]: https://travis-ci.org/allpro/react-fluid-grid.svg?branch=master
[build]: https://travis-ci.org/allpro/react-fluid-grid

[coveralls-badge]: https://coveralls.io/repos/github/allpro/react-fluid-grid/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/allpro/react-fluid-grid?branch=master

[license-badge]: https://badgen.now.sh/badge/license/MIT/blue
[license]: https://github.com/allpro/react-fluid-grid/blob/master/LICENSE

[donate-badge]: https://img.shields.io/badge/Donate-PayPal-green.svg?style=flat-round
[donate]: https://paypal.me/KevinDalman
