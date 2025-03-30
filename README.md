# SQL Query Runner and Data Visualization

A frontend application that enables data analysts to run SQL-like queries against CSV data files and visualize results through interactive charts and graphs.

## 📌 Overview

This project provides an intuitive interface for data analysts to query and visualize data without requiring a database backend. It processes CSV files directly in the browser, supports SQL-like query syntax, and offers powerful visualization tools to gain insights from the data.

## ✨ Features

### Query Execution
- Write and execute SQL-like queries in a user-friendly editor
- Process queries against CSV data files
- Support for common SQL operations (SELECT, WHERE, GROUP BY)

### Data Visualization
- Transform query results into interactive visualizations:
  - Bar Graphs
  - Pie Charts
  - Line Charts
- Configure charts based on selected columns

### Query Modes
- **SQL Editor Mode** (default): Enter custom queries
- **Predefined Queries Mode**: Access commonly used queries with a toggle switch

### Query History & Management
- Automatic storage of executed queries
- Delete functionality for managing history
- Search capability to find specific past queries
- Visualization support for all historical queries

### Data Export
- Download query results as CSV files
- Export functionality available for both current and previous query results

## 🛠️ Technology Stack

- **React**: Frontend UI library
- **Chart.js & react-chartjs-2**: Data visualization
- **PapaParse**: CSV file parsing and processing
- **Styled-components**: Component styling
- **React-icons**: UI icon elements

## Installation

### Clone the repository:

```bash
  git
  cd sql-query-runner
```

### Install dependencies:
```bash
  npm install
```

### Start the development server:
```bash
  npm start
```
## 📊 Usage Examples

### Basic Query
```bash
  SELECT * FROM customers;
```

### Filtered Query
```bash
  SELECT name, email FROM customers WHERE country = 'Germany';
```
### Aggregation Query
```bash
  SELECT country, COUNT(*) as count FROM customers GROUP BY country;
```

## 📦 Dependencies

This project relies on the following dependencies:

### Core Dependencies

- **react (`^19.0.0`)** 
  - JavaScript library for building user interfaces
  - Used as the foundation for the entire frontend application
  - Enables component-based architecture

- **react-dom (`^19.0.0`)**
  - React package for working with the DOM
  - Handles rendering of React components to the browser
  - Manages virtual DOM operations

### Data Handling

- **papaparse (`^5.5.2`)**
  - Powerful, in-browser CSV parser
  - Handles loading and parsing of CSV data files
  - Provides utilities for data transformation
  - Enables working with CSV data without a server

### Data Visualization

- **chart.js (`^4.4.8`)**
  - JavaScript charting library
  - Provides the core functionality for all data visualizations
  - Supports bar charts, pie charts, line charts, and more
  - Handles chart rendering and animations

- **react-chartjs-2 (`^5.3.0`)**
  - React wrapper for Chart.js
  - Makes Chart.js integration with React seamless
  - Provides React components for different chart types
  - Handles chart lifecycle and updates

### UI Enhancement

- **react-icons (`^5.5.0`)**
  - Includes popular icon packs as React components
  - Used for buttons, navigation, and UI elements

- **styled-components (`^6.1.16`)**
  - CSS-in-JS library for styling React components
  - Enables dynamic styling based on component props

### Package.json Example

```json
{
  "name": "sql-query-runner",
  "version": "1.0.0",
  "dependencies": {
    "chart.js": "^4.4.8",
    "papaparse": "^5.5.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-chartjs-2": "^5.3.0",
    "react-icons": "^5.5.0",
    "styled-components": "^6.1.16"
  },
  "devDependencies": {
    "vite": "^5.0.8",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "jest": "^29.7.0"
  }
}