# TileStacker

## Overview

This app allows users to interact with a grid of tiles, each containing a message and a date. The app supports sorting, drag-and-drop reordering, and adding new tiles. It is built using React, Vite, TypeScript, and styled with Tailwind CSS. Additionally, the app is tested using Vitest, and code quality is maintained with ESLint and Prettier. The app is deployed on Netlify.

## Features

1. Header with Buttons

- Initial Order: Resets the grid to the initial order of tiles.
- Sorted Order: Sorts the tiles in the grid by date.

2. Grid of Tiles

- Tiles are grouped by year and sorted by date.
- Each tile displays a message and a date.

3. Drag-and-Drop Functionality

- Tiles can be rearranged by dragging them within the grid.
- The grid visually updates the tile positions when rearranged.

4. Add New Tile

- A button opens a form to add a new tile.
- The form includes inputs for: Date (required, in YYYY-MM-DD format) and Message (required)
- After submitting, the new tile is added to the grid, grouped by year, and the form closes.

## Technologies Used

**React**: JavaScript library for building user interfaces.

**Vite**: Next-generation front-end tool for fast development.

**TypeScript**: JavaScript with static typing.

**Tailwind CSS**: Utility-first CSS framework for styling.

**Vitest**: Unit testing framework for TypeScript.

**ESLint**: JavaScript linting tool for code quality.

**Prettier**: Code formatter to enforce consistent styling.

**Netlify**: Platform for deploying the app.

## Setup Instructions

1. Clone the Repository:

```
git clone https://github.com/vaishali-purohit/TileStacker.git
cd TileStacker
```

2. Install Dependencies:

```
npm install
# or
yarn install
```

3. Run the Development Server:

```
npm run dev
# or
yarn dev
```

4. Run Tests

```
npm run test
# or
yarn test
```

5. Lint and Format Code

```
npm run lint
# or
yarn lint
```

To fix linting issues and format the code:

```
npm run lint:fix
# or
yarn lint:fix
```

## Deployment

The app is deployed on Netlify. You can view the live version at:

[Netlify Deployment Link](https://tilestacker.netlify.app/)

## Future Enhancements

1. Add filter option for user to choose sorting order ascending/desending, sort by year, sort by date
2. User can Delete/Edit the post
3. User can select to show only 1 year data (or more)
