# Convivencia - Community Coexistence Program Platform

A modern, interactive web application designed to facilitate and manage community coexistence programs with comprehensive evaluation tools, analytics, and resource management.

## Overview

**Convivencia** is a full-stack web application built with React and Express.js that enables facilitators and program coordinators to:

- Manage multi-session community programs focused on intercultural coexistence
- Conduct structured evaluations and assessments
- Analyze group dynamics and individual progress
- Access comprehensive program materials and facilitator guides
- Generate reports and comparative analyses
- Track participant data with persistent storage

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite | Modern, type-safe UI framework with fast build times |
| **Styling** | TailwindCSS, Radix UI | Utility-first CSS and accessible component library |
| **Routing** | Wouter | Lightweight client-side routing |
| **Data Visualization** | Recharts, D3.js | Interactive charts and custom visualizations |
| **Backend** | Express.js, Node.js | RESTful API for data persistence |
| **Data Storage** | JSON file-based | Simple, portable data persistence |
| **Analytics** | Simple-statistics, jstat | Statistical analysis and computations |

## Features

### Program Management (`/programa`)
- **Program Overview**: Complete program structure and objectives
- **Session Information**: Detailed three-session framework
- **Dynamics**: Interactive activities and exercises
- **Materials**: Access to all program materials and resources
- **Facilitator Guide**: Comprehensive guide for program facilitators

### Evaluation & Analysis (`/trabajo`)
- **Evaluation Registry**: Record and manage participant evaluations
- **Comparative Analysis**: Compare results across groups and sessions
- **Group Dashboard**: Monitor group-level metrics and progress
- **Data Persistence**: All evaluations are saved to the server

### Tools & Analytics (`/herramientas`)
- **Advanced Search**: Search across program data and evaluations
- **Calendar**: Session scheduling and timeline management
- **Analytics Dashboard**: Interactive visualizations and metrics
- **Executive Summary**: High-level overview of program performance

## Getting Started

### Prerequisites
- Node.js 18+ (with pnpm package manager)
- 512MB RAM minimum

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/convivencia-improved.git
cd convivencia-improved

# Install dependencies
pnpm install

# Create data directory (if not exists)
mkdir -p data
```

### Development

```bash
# Start development server with hot reload
pnpm dev

# Open browser to http://localhost:5173
```

### Production Build

```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start

# Server runs on http://localhost:3000 (or PORT env variable)
```

## Project Structure

```
convivencia-improved/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Page components (programa, trabajo, herramientas)
│   │   ├── contexts/                # React context providers
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utilities and API service
│   │   ├── App.tsx                  # Main app component with routing
│   │   └── main.tsx                 # Entry point
│   └── vite.config.ts               # Vite configuration
├── server/                          # Express.js backend
│   └── index.ts                     # Server entry point with API routes
├── data/                            # Data storage directory
│   └── evaluation.json              # Persistent evaluation data
├── docs/                            # Built documentation and assets
├── pdfs/                            # Program materials (PDFs)
└── package.json                     # Project dependencies and scripts
```

## API Endpoints

The backend provides RESTful endpoints for data persistence:

### Data Endpoints
- `GET /api/data` - Fetch all data
- `GET /api/data/evaluations` - Get all evaluations
- `POST /api/data/evaluations` - Create new evaluation
- `PUT /api/data/evaluations/:id` - Update evaluation
- `DELETE /api/data/evaluations/:id` - Delete evaluation
- `GET /api/data/groups` - Get all groups
- `POST /api/data/groups` - Create new group

### Static Files
- All other routes serve the React SPA for client-side routing

## Configuration

### Environment Variables

```bash
# Server port (default: 3000)
PORT=3000

# Node environment
NODE_ENV=production
```

### Data Storage

Evaluation data is stored in `data/evaluation.json` with the following structure:

```json
{
  "evaluations": [
    {
      "id": "timestamp",
      "participantName": "string",
      "groupId": "string",
      "sessionNumber": "number",
      "scores": { "dimension": "value" },
      "notes": "string",
      "timestamp": "ISO-8601"
    }
  ],
  "groups": [
    {
      "id": "timestamp",
      "name": "string",
      "facilitator": "string",
      "startDate": "ISO-8601",
      "participants": "number"
    }
  ],
  "sessions": []
}
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use component-based architecture

### Adding New Features
1. Create components in `client/src/components/`
2. Add pages in `client/src/pages/`
3. Use the API service (`client/src/lib/api.ts`) for backend communication
4. Add routes to `client/src/App.tsx`

### Running Tests
```bash
pnpm check      # TypeScript type checking
pnpm format     # Format code with Prettier
```

## Deployment

### Docker Deployment (Optional)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure `PORT` if needed
- Ensure `data/` directory is writable

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## Changelog

### Version 2.0.0 (Final Release)
- ✅ Added persistent data storage with Express.js API
- ✅ Enhanced data visualization capabilities
- ✅ Improved TypeScript type safety
- ✅ Updated all dependencies to latest stable versions
- ✅ Added comprehensive API documentation
- ✅ Improved error handling and logging
- ✅ Enhanced user interface and accessibility

### Version 1.0.0
- Initial release with core program management and evaluation tools

## Acknowledgments

This project was developed to support community coexistence and intercultural understanding programs. Special thanks to all facilitators and participants who contributed feedback and insights.
