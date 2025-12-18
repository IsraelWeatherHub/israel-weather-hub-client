# Israel Weather Hub

A comprehensive platform designed specifically for weather professionals in Israel. This application provides real-time data, advanced meteorological models, and collaborative tools for creating accurate forecasts.

## Features

- **Dashboard**: Central hub for quick access to all tools.
- **Models**: Direct access to global (ECMWF, GFS, ICON) and regional (COSMO-IL, WRF) weather models.
- **Observations**: Real-time data from IMS and private weather stations across Israel.
- **Alerts**: Official weather warnings and advisories with severity levels and safety instructions.
- **Interactive Maps**: Visualizations for synoptic charts, radar, and satellite imagery.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Runtime**: [Bun](https://bun.sh/)

## Getting Started

This project uses [Bun](https://bun.sh) as the package manager and runtime.

1. **Install dependencies:**

```bash
bun install
```

2. **Run the development server:**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

You can also run the application using Docker.

1. **Build the image:**

```bash
docker build -t israel-weather-hub-client .
```

2. **Run the container:**

```bash
docker run -p 3000:3000 israel-weather-hub-client
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app`: App Router pages and layouts.
  - `page.tsx`: Main dashboard.
  - `models/`: Weather models page.
  - `observations/`: Station observations page.
  - `alerts/`: Weather alerts page.
- `src/components`: Reusable UI components (Header, Footer, etc.).

## License

MIT
