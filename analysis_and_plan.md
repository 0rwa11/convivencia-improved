# Project Analysis and Improvement Plan: `convivencia-fixed-deployed`

## 1. Project Nature and Technology Stack

The `convivencia-fixed-deployed` repository hosts a web application for a "convivencia" (coexistence/community) program. The application is primarily a **Single Page Application (SPA)** built with a modern stack:

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React (v19), TypeScript, Vite | Core application framework and build tool. |
| **Styling** | TailwindCSS, Radix UI | Utility-first CSS framework and unstyled component library. |
| **Routing** | `wouter` | Minimalist routing library. |
| **Data/Stats** | `d3`, `recharts`, `simple-statistics`, `jstat` | Libraries for data manipulation, charting, and statistical analysis. |
| **Backend** | Express.js | Minimal server, currently only serving static files. |

The application's core functionality revolves around displaying program information (`/programa`), managing evaluation data (`/trabajo`), and providing analytical tools (`/herramientas`).

## 2. Proposed Fixes and Improvements

To create the "final, final version" that is robust, modern, and feature-rich, the following actions are proposed:

### 2.1. Codebase Modernization and Maintenance (Fixes)

| ID | Issue/Improvement | Rationale | Action |
| :--- | :--- | :--- | :--- |
| **F1** | **Dependency Update** | Ensure all packages are up-to-date for security, performance, and compatibility. | Update all dependencies in `package.json` to their latest stable versions. |
| **F2** | **Remove `wouter` Patch** | The custom patch in `patches/wouter@3.7.1.patch` is non-standard and complicates maintenance. | Update `wouter` to the latest version and verify if the patch's functionality (route collection) is still necessary or can be achieved natively. Remove the patch if possible. |
| **F3** | **Type Safety Review** | A comprehensive review of TypeScript files to ensure strict type checking and eliminate potential runtime errors. | Review key components and data structures for improved type definitions. |

### 2.2. Architectural and Feature Enhancements (Improvements & New Features)

| ID | Feature/Improvement | Rationale | Action |
| :--- | :--- | :--- | :--- |
| **I1** | **Persistent Data Storage** | The current client-side data processing is likely ephemeral or relies on `localStorage`. For a final version, data must be persistent and shareable. | **Implement a simple JSON file-based API** using Express.js to handle saving and loading evaluation data (e.g., to `data/evaluation.json`). This keeps the architecture simple while providing persistence. |
| **I2** | **Enhanced Data Visualization** | The user requested interactive visualizations. The existing charting components can be improved. | Enhance the `AnalyticsPage` and `ComparativeAnalysis` with more interactive features, such as filtering, drill-down capabilities, and better use of `d3` for custom, insightful charts. |
| **N1** | **GitHub Statistics Integration** | The user specifically requested "statics for github" to be included. | Fetch key statistics (e.g., commit count, contributors, file changes) from the original repository using the GitHub CLI and prepare this data for the final presentation webpage. |
| **N2** | **Final Presentation Webpage** | A dedicated, static webpage is required to present the project's results and improvements visually. | Develop a new static site (Phase 6) with a modern design, incorporating the GitHub statistics (N1) and interactive project data visualizations (I2). |

## 3. Next Steps (Phase 3)

The next phase will focus on implementing the necessary fixes and the new data persistence layer (I1) to ensure the core application is stable and ready for the feature enhancements (I2, N1). This involves:

1.  Installing dependencies.
2.  Updating and cleaning up the dependency list.
3.  Creating the `data` directory and a placeholder JSON file.
4.  Modifying `server/index.ts` to include API routes for data persistence.
5.  Updating client-side code to use the new API for saving and loading data.
