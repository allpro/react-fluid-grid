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

We tried making it work by adding custom logic, 
but all the variables made it very complicated.
It was also brittle because any changes to other elements could
break the grid sizing logic.

The problem with ALL "grids" is that they rely on 
**spanning columns of a virtual grid**. 
This means that the column-span values must be changed in order to reflow the
grid items. The developer is responsible for figuring out all the 
math and breakpoints required to make things work decently at all resolutions.


## How is FluidGrid different?

**FluidGrid does NOT rely on an imaginary grid with imaginary column.** 
It's really a **fluid-flow layout** rather than a fluid-grid,
but I named it FluidGrid because it _emulates_ a grid layout,
and can be used in place of them.
It's structure and props also deliberately emulate
**[Material-UI Grid](https://material-ui.com/api/grid/)**.

Like MUI Grid, FluidGrid used flexbox to create the layout.
Unlike MUI Grid, it does _not_ use media-queries,
so it is _not_ reliant on "screen width".

**FluidGrid generates 100% static CSS.** 
It does not manipulate or modify the grid once it is rendered.
Responsiveness is controlled solely by the CSS, which makes it FAST.
If you expand or collapse a sidebar, the grid will _immediately_ reflow to 
suit the new container size. 

**NOTE: FluidGrid does NOT use or require Material UI.**


## How does FluidGrid work?

Configuring a FluidGrid is as simple as adding props like `minWidth`.
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

The code above means no card will ever be less than 300px wide (unless the 
grid itself is), and the cards will be spaced 20px apart both vertically and 
horizontally, but with no space at the top or sides of the grid. As many cards
 as possible will be shown on each 'row'. Each card will grow proportionally to 
_fill_ the grid-row. The options shown could be enhanced to make the sizing 
more refined.

## Grid Structure

A FluidGrid consists of an outer-wrapper (Container), and inner-wrapper,
plus any number of grid-cells (Items). 
The _content_ of each grid-cell is wrapped by FluidGrid Item element. 
_Only_ the FluidGrid wrappers have CSS applied.
The contents of the grid are never touched.

By default, a DIV is used for both the Container and Item wrappers. 
However any element type can be specified, including a React component. 
In some scenarios, this can eliminate unnecessary element nesting. 
For example, instead of putting a MUI Typography component 
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
are customizable using standard CSS border rules.

Additional flexbox CSS rules can also be added to customize both the flex 
container and the flex items. Use normal CSS-in-Javascript syntax to add styles 
to the grid configuration. The component will calculate and generate the final 
CSS to achieve the 'goal' specified. This means the generated CSS may not be 
the same as the props passed in!

**See the [FluidGrid API](#fluidgrid-api) section below.**

## Responsive FluidGrid Sample

The sample below is from the **"Mixed Width Columns"** demo available at:
[allpro.github.io/react-fluid-grid](https://allpro.github.io/react-fluid-grid)
<br>(Cosmetic props and styles removed for brevity.)

<details>
  <summary>
    <b>Mixed-Width Sample Code</b> (click to show)
    <br />&nbsp;
  </summary>

```jsx harmony
import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import FluidGrid from '@allpro/react-fluid-grid'

// Verbose config options as a sample; often just `spacing` is needed
const gridConfig = {
  justify: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch',

  columnSpacing: 16,
  rowSpacing: 32,
  rowDivider: {
    width: 1,
    color: 'blue',
  },
}

function ReactFluidGridExample() {
  return (
    <FluidGrid container {...gridConfig}>

      <FluidGrid item flexBasis="400px" minWidth="50%" flexGrow={99}>
        <Typography>{'flexBasis="400px" minWidth="50%"'}</Typography>
      </FluidGrid>

      <FluidGrid item flexBasis="400px" minWidth="50%" flexGrow={99}>
        <Typography>{'flexBasis="400px" minWidth="50%"'}</Typography>
      </FluidGrid>

      <FluidGrid item flexBasis="250px" minWidth="33%">
        <Typography>{'flexBasis="250px" minWidth="33%"'}</Typography>
      </FluidGrid>

      <FluidGrid item flexBasis="250px" minWidth="33%">
        <Typography>{'flexBasis="250px" minWidth="33%"'}</Typography>
      </FluidGrid>

      <FluidGrid item flexBasis="250px" minWidth="33%">
        <Typography>{'flexBasis="250px" minWidth="33%"'}</Typography>
      </FluidGrid>

      <FluidGrid item minWidth="150px" flexGrow={99}>
        <Typography>{'minWidth="150px"'}</Typography>
      </FluidGrid>

      <FluidGrid item minWidth="150px" flexGrow={99}>
        <Typography>{'minWidth="150px"'}</Typography>
      </FluidGrid>

      <FluidGrid item minWidth="150px" flexGrow={99}>
        <Typography>{'minWidth="150px"'}</Typography>
      </FluidGrid>

      <FluidGrid item minWidth="150px" flexGrow={99}>
        <Typography>{'minWidth="150px"'}</Typography>
      </FluidGrid>

    </FluidGrid>
  )
}

export default ReactFluidGridExample
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
    <summary><b>Special Props</b> (expand)</summary>

<p> &nbsp; &nbsp; <em>These props are unique to the FluidGrid container
.</em></p>

- **`component`** &nbsp; {Component|string} `["div"]`
  <br>The wrapper-element generated by FluidGrid. 

- **`containerOverflow`** &nbsp; {string} `[""]`
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br>This increases the container size to contain visual effects that extend
     beyond the boundary of items, like a drop-shadow or glow effect. 

- **`columnSpacing`** &nbsp; {integer|string} `[0]`
  <br>Horizontal spacing between items
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br> See [Spacing and Divider Logic](#spacing-and-divider-logic)

- **`rowSpacing`** &nbsp; {integer|string} `[0]`
  <br>Vertical spacing between items
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br> See [Spacing and Divider Logic](#spacing-and-divider-logic)

- **`spacing`** &nbsp; {integer|string} `[0]`
  <br>Horizontal <em>and</em> Vertical spacing between items.
  <br>Value must be a valid CSS measurement, like "4px" or "1em"
  <br>Is overridden by `columnSpacing` or `rowSpacing` props.
  <br> See [Spacing and Divider Logic](#spacing-and-divider-logic)

- **`columnDivider`** &nbsp; {object} `[{ width: 0, style: 'solid', color: '#CFCFCF' }]`
  <br>CSS attributes for `border` to display between columns:
    - `width` MUST be an **integer**, representing a pixel value
    - `style` can be any valid CSS border-style value
    - `color` can be any valid CSS color value
    - Any key other than these 3 will be ignored
    - Unset keys will use the default values shown

- **`rowDivider`** &nbsp; {object} `[{ style: 'solid' color: '#CFCFCF' }]`
  <br>CSS attributes for `border` to display between rows
  <br>Same attributes as shown above for **columnDivider**
  <br>Also see [Spacing and Divider Logic](#spacing-and-divider-logic)
</details>


<details>
    <summary><b>Extra Flexbox Props</b> (expand)</summary>

<p> &nbsp; &nbsp; <em>These props are <b>not</b> used for grid logic,
but FluidGrid does set logical defaults for them.
You can use these props to override these defaults.</em></p>

- **`justifyContent`** _or_ **`justify`** &nbsp; {string} `["flex-start"]`
  <br>Flexbox rule for grid-container.
  <br>The `justify` alias is for consistency with Material-UI Grid.

- **`alignContent`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-container.

- **`alignItems`** &nbsp; {string} `["stretch"]`
  <br>Flexbox rule for grid-container.
</details>


<details>
    <summary><b><em>Default</em> Flexbox-Item Props</b> (expand)</summary>

<p> &nbsp; &nbsp; <em>Flexbox-logic props for grid-items can 
be set on the grid-container as 'defaults' for all items.
These defaults can be overridden on individual grid-items.</em></p>

- **`flexGrow`** &nbsp; {integer} `[null]`
  <br>See [`FluidGrid item` Props](#fluidgrid-items-props) for description

- **`flexShrink`** &nbsp; {integer} `[null]`
  <br>See [`FluidGrid item` Props](#fluidgrid-items-props) for description

- **`flexBasis`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid item` Props](#fluidgrid-items-props) for description

- **`minWidth`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid item` Props](#fluidgrid-items-props) for description

- **`maxWidth`** &nbsp; {string} `[""]`
  <br>See [`FluidGrid item` Props](#fluidgrid-items-props) for description
</details>


<details>
    <summary><b>Styling Props</b> (expand)</summary>

- **`className`** &nbsp; {string} `[null]`
  <br>Class to apply to grid-container.

- **`style`** &nbsp; {object} `[null]`
  <br>Styles that will be assigned to the grid-container.
</details>


### `FluidGrid item` Props

<details>
    <summary><b>Special Props</b> (expand)</summary>

<p> &nbsp; &nbsp; <em>These props are unique to FluidGrid items.</em></p>

- **`component`** &nbsp; {Component|string} `["div"]`
  <br>The wrapper-element for the grid-item generated by FluidGrid. 
</details>


<details>
    <summary><b>Flexbox-Logic Props</b> (expand)</summary>

<p> &nbsp; &nbsp; <b>These props are used as inputs to FluidGrid logic for the final CSS.</b>
  They may <em>or may not</em> translate directly to a CSS rule.
  For example, setting <code>minWidth="300px"</code> can generate CSS like 
  <code>flex: 1 0 300px;</code>, depending on what other props are set.
</p>

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
</details>


<details>
    <summary><b>Styling Props</b> (expand)</summary>

- **`className`** &nbsp; {string} `[null]`
  <br>Class to apply to grid-item wrapper.

- **`style`** &nbsp; {object} `[null]`
  <br>Styles that will be assigned to the grid-item wrapper.
</details>


## Spacing and Divider Logic

FluidGrid items can have 'spacing' between them, both vertically and 
horizontally. Row and column spacing can be different.
The same applies for 'divider rules' between columns and/or rows in the grid.

FluidGrid adds spacing only _between_ items. 
**There is never any spacing on the top, bottom, or sides of the grid.** 
If you want outer spacing, add margins to the 'container' element 
using a 'style' or 'class' prop.

The width of Divider rules are _in addition to_ any spacing specified.
Dividers are displayed _in the middle_ of the spacing.
For example:

```jsx harmony
<FluidGrid
  container
  columnSpacing="10px"
  columnDivider={{ width: '4px', color: 'red' }}
>
```

These props result in items _spaced_ a total of 14px apart,
(10px-spacing + 4px-divider). 
The spacing and divider are distributed like this:

- Item #1 &ndash; right-edge
- **5px spacing** (1/2 of 10px)
- **4px divider**
- **5px spacing** (1/2 of 10px)
- Item #2 &ndash; left-edge

#### Effect of spacing on width props

When you specify a minWidth or flexBasis props, 
it affects the width of the _FluidGrid Item-wrapper_. 
**Spacing also must be taken into account because it too is
_inside_ the Item-wrapper.**
It's not possible to _perfectly_ calculate the inner-width of item-wrappers,
due to how FluidGrid generates the layout. 
However FluidGrid is still far more accurate than a standard grid.

_As a general guideline_, you should _add_ the spacing to the desired 
min-width of your component. 
However there is no spacing at either end of each row, 
so this is only an approximation.

##### Example

Goals for this example:

- `<MyCard>` components should _always_ be at least 300px wide
- Have 30px spacing _between each card_
- Have a 2px divider-rule, (at the _center_ of the item spacing)

To achieve this, **_add_ the 30px spacing to the 300px 'card' min-width**. 
This will provide _slightly more than_ 300px card-width 
because grid-items at the start and end of each row 
only have spacing on the _inside_.
We will ignore the _extra spacing_ created by the 2px divider-rule.

```jsx harmony
<FluidGrid container
  columnSpacing="30px"
  columnDivider={{ width: '2px' }}
  minWidth="330px" // DEFAULT item minWidth
>
  <FluidGrid item><MyCard id="1" /></FluidGrid>
  <FluidGrid item><MyCard id="2" /></FluidGrid>
  <FluidGrid item><MyCard id="3" /></FluidGrid>
</FluidGrid>
```

###### 3 cards per row

_At least_ 990px width is needed to fit 3 cards (3 x 330px).
This table shows widths when container is **_exactly_ 990px wide**:

**1st Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|  308.67px | MyCard #1             |
|      15px | spacing (1/2 of 30px) |
|       2px | divider-rule          |
|      15px | spacing (1/2 of 30px) |
|  308.67px | MyCard #2             |
|      15px | spacing (1/2 of 30px) |
|       2px | divider-rule          |
|      15px | spacing (1/2 of 30px) |
|  308.67px | MyCard #3             |
| **990px** |  **Container Width**      |

NOTE that the cards are _slightly more_ than 300px wide.

###### 2 cards per row

_At least_ 660px width is needed to fit 2 cards (2 x 330px).
This table shows widths when container is **_exactly_ 660px wide**:

**1st Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|     314px | MyCard #1             |
|      15px | spacing (1/2 of 30px) |
|       2px | divider-rule          |
|      15px | spacing (1/2 of 30px) |
|     314px | MyCard #2             |
| **660px** |  **Container Width**      |

**2nd Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|     660px | MyCard #3             |
| **660px** |  **Container Width**      |

NOTE that 1st-row cards are _even wider_ because there are fewer across,
which means fewer 'spaces' between cards.

###### 1 card per row

When container is _less than_ 660px width, only 1 card can fit per row.
This table shows widths when container is **659px wide**:

**1st Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|     659px | MyCard #1             |
| **659px** |  **Container Width**      |

**2nd Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|     659px | MyCard #2             |
| **659px** |  **Container Width**      |

**3rd Row**

|   Width   | Item                  | 
|----------:|:----------------------| 
|     659px | MyCard #3             |
| **659px** |  **Container Width**      |


##### Layout Reflow

As the last example shows, when the container becomes **just 1px narrower** 
than the _sum_ of item minWidths, the grid will _reflow_ all items.
It does not matter _why_ the container width changed!

**FluidGrid reflow is more automatic and precise because
it is NOT reliant on screen-width breakpoints.**
If there is an expandable sidebar that affects container width,
this will trigger a reflow the same as changing the window size.
**All that matters is the container width.**

FluidGrid is especially helpful in apps with _multiple grid layouts_, 
with varying content width requirements. 
It's very difficult to set media-query breakpoints that work optimally 
in such scenarios, if you care about the minimum-width of items.


## Layout Tips & Tricks

This section provides tips for refining your layout,
including advanced use of flexbox rules.


### Using `flexBasis` + `minWidth`

Setting _either_ `flexBasis` _or_ `minWidth` props 
will generate _identical_ CSS for a FluidGrid item.
_Both_ these rules affect 'min-width', so FluidGrid considers them equivalent.
However, setting **_both_** `flexBasis` _and_ `minWidth` props is different.

It can be useful to _combine_ percentage widths with pixel-widths
to prevent _packing_ many small componenets into a row 
when the container is very wide, like on a high-resolution monitor.

Assume these goals for a grid:

- Cards should _always_ be at least **250px wide**
- Should have **24px spacing** between each item
- Should show **3-items per row _MAX_**, regardless of container width

To achieve this, set _both_ pixel and percentage min-widths.
As suggested in 
[Effect of spacing on width-props](effect-of-spacing-on-width-props),
we'll _add_ the spacing to our desired inner-width: **250 + 24 = 274px**:

```jsx harmony
<FluidGrid container
  columnSpacing="36px"
  columnDivider={{ width: '2px' }}
  flexBasis="274px" // DEFAULT item flexBasis
  minWidth="33%"    // DEFAULT item minWidth
>
  <FluidGrid item><MyCard id="1" /></FluidGrid>
  <FluidGrid item><MyCard id="2" /></FluidGrid>
  <FluidGrid item><MyCard id="3" /></FluidGrid>
  <FluidGrid item><MyCard id="4" /></FluidGrid>
  <FluidGrid item><MyCard id="5" /></FluidGrid>
  <FluidGrid item><MyCard id="6" /></FluidGrid>
</FluidGrid>
```

Setting `flexBasis="448px"` provides our _absolute_ min-width,
(_unless_ container-width is less).
The `minWidth="33%"` becomes a _secondary_ min-width.
This means _no more than 3 cards_ can ever appear on a single row.

_Without_ `minWidth="33%"`, a container 1400px wide would display
5 items-per-row (5 x 274 (min) = 1370px).
This may look more _crowded_ than is desired.
**_Minimum_ width is not always the same as _optimal_ width!**


### Maintain Consistent Column Widths

A grid of equal-width items usually _should not_
have items on the last row that _span_ multiple 'columns'.
Instead, the width of last-row items should be consistent with those above.
_After the last item_, remaining columns should display as 'empty'.
If vertical dividers are displayed, these should all display equally.

An old CSS trick for such scenarios is to use **'dummy items'** to fill
_gaps_ in the last row of wrapped items.
This is easily achieved by adding _empty_ FluidGrid items.
The `placeholder` flag should be passed so FluidGrid does not pad these.

This example is similar to one above, **but with 2 placeholder-items added**:

```jsx harmony
<FluidGrid container
  columnSpacing="36px"
  flexBasis="274px" // DEFAULT item flexBasis
  minWidth="33%"    // DEFAULT item minWidth
>
  <FluidGrid item><MyCard id="1" /></FluidGrid>
  <FluidGrid item><MyCard id="2" /></FluidGrid>
  <FluidGrid item><MyCard id="3" /></FluidGrid>
  <FluidGrid item><MyCard id="4" /></FluidGrid>
  <FluidGrid item placeholder />
  <FluidGrid item placeholder />
</FluidGrid>
```

The `minWidth="33%"` prop means there will never be more than 3 items per row.
If the container is wide enough, the 1st row contains 3 cards,
leaving only MyCard #4 in the 2nd row. 
**By default, MyCard #4 would _stretch_ to fill the entire 2nd row.**

The 2 placeholder-items prevent this.
There are now 3 items on the 2nd row, so MyCard #4 will be the same width
as MyCard #1 above it.
The column-divider rules will also extend between these placeholders,
creating a more refined look. (This can be changed though.)

When using placeholders, add enough to handle the 
_maximum_ number of 'blank columns' your grid may ever have at the end.
<br>**It's OK to have extra placeholders &mdash; unneeded ones are invisible.**


### Control Item Expansion

By default, every item will _stretch_ to fill each row.
All items grow proportionally &mdash; as flexbox specifies.
This behaviour can be changed by adding a `flexGrow` prop.

By default, FluidGrid applies `flexGrow: 1` to all items,
(unless a maxWidth is set). 
This causes all item items to grow/stretch equally.
The flexGrow values affect _proportionality_, so an item with `flexGrow={2}`
will grow beyond its min-width at _twice_ the rate of the default.
For example:

```jsx harmony
<FluidGrid container
  columnSpacing="0"
  minWidth="300px" // DEFAULT item minWidth
  style={{ width: '1200px' }}
>
  <FluidGrid item><CardA /></FluidGrid>
  <FluidGrid item><CardB flexGrow={3} /></FluidGrid>
  <FluidGrid item><CardC flexGrow={6} /></FluidGrid>
</FluidGrid>
```

_Without_ the `flexGrow` props shown, all items would stretch equally,
so _each_ would become 400px wide to _fill_ the 1200px container-width.

However with the `flexGrow` props shown above:

- CardB will grow 3x as fast as CardA
- CardC will grow 2x as fast as CardB; and 6x as fast as CardA

This is how the grid would auto-size items:

|   Width    | Item (minWidth + Growth) | 
|-----------:|:-------------------------| 
|      330px | CardA (300 + 30)         |
|      390px | CardB (300 + 90)         |
|      480px | CardC (300 + 180)        |
| **1200px** | **Container Width**      |

What if you want some cards to **not grow at all**, &mdash;
_except_ when necessary to fill the grid?
Instead, _other cards_ should grow to fill the row.
This can be achieved by using large flexGrow numbers, like this:

```jsx harmony
<FluidGrid container columnSpacing="30px">
  <FluidGrid item minWidth="240px">
  	<CardA_Small />
  </FluidGrid>

  <FluidGrid item minWidth="500px" flexGrow={99}>
  	<CardB_Large />
  </FluidGrid>

  <FluidGrid item minWidth="300px">
  	<CardC_Small />
  </FluidGrid>

  <FluidGrid item minWidth="600px" flexGrow={99}>
  	<CardD_Large />
  </FluidGrid>
</FluidGrid>
```

If the container is only **700px wide**, _CardA_Small_ will grow to fill row-1,
because there is not enough room to also fit _CardB_Large_.

If the container is **900px wide**, both _CardA_Small_ and _CardB_Large_ 
will fit on row-1, **with 160px of extra room**.
Because _CardB_Large_ has `flexGrow={99}`, it will grow **99-times faster** than
_CardA_Small_. 
This means _CardA_Small_ will stretch **just 1.6px** (1% of 160px), 
while _CardB_Large_ will stretch **158.4px** (99% of 160px).

Normally most items in a grid should be able to stretch, 
or else they cannot _fill the row_ when the container is narrow, like on mobile.
If you want **-0- stretching**, add a maxWidth prop like 
`minWidth="240px" maxWidth="240px"`. 
However, this prevent _any_ stretching even when the item is on a row all by 
itself, which will leave _gaps_ in the grid. 


### Max-Width and Flex-Shrink

FluidGrid logic also handles props for `maxWidth` and `flexShrink`.
These work exactly as you'd expect them to.
This Readme does not include examples for these because they
are not commonly needed for grid layouts.


### Justification and Alignment Props

FluidGrid applies reasonable flexbox defaults to container elements
so that items _stretch_ both horizontally and vertically.
This provides a grid-like appearance.
You can override these defaults at the container level &mdash; see the API.


### Other Flexbox props

FluidGrid is primarily concerned with props that affect its calculations.
If you need additional flexbox rules for FluidGrid items,
like `alignSelf`, use a `style` or `class` prop to add them normally.

Be careful to not apply styles that conflict with those
auto-generated by FluidGrid. 
For example, do not apply margins to items as it may cause unexpected results.


### Media-Query Integration

FluidGrid is _not_ designed to work directly with media-queries.
However, if using a helper that provides breakpoint 'props' &mdash; like the 
[Material-UI withWidth() HOC](https://material-ui.com/layout/breakpoints/#withwidth) 
&mdash; then you can use this to _dynamically_ calculate FluidGrid props.
This is not normally necessary, but is simple to do:

```jsx harmony
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const minWidth = isWidthUp('md', this.props.width) ? '400px' : '300px'

return (
  <FluidGrid container>
    <FluidGrid item minWidth={minWidth}><MyCardA /></FluidGrid>
    <FluidGrid item minWidth={minWidth}><MyCardB /></FluidGrid>
    <FluidGrid item minWidth="600px"><MyCardC /></FluidGrid>
  </FluidGrid>
)

```


### Unexpected or Inadequate Results

If you use FluidGrid and find a usecase it can't handle well,
create a sample and share it with me.
If practical, I'll update FluidGrid to better address it.

---

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
