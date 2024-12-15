<div align="center">
    <img src="./public/logo.svg" alt="AlphaCharges" width="220">
  <h1>InternHub</h1>
  <p>A modern platform connecting students with internship opportunities</p>
</div>

## About

InternHub is a web application built to streamline the internship search process, providing a centralized platform where students can discover and apply for internships while companies can post opportunities and find talented candidates.

## Features

- 🔍 Advanced search with filtering and sorting capabilities
- 👤 Detailed user profiles for students
- 💼 Comprehensive company profiles
- 🎯 Targeted internship recommendations
- 🌙 Dark/Light theme support
- 📱 Responsive design for all devices
- 🔐 Secure authentication system

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Backend**: Supabase
- **Routing**: React Router
- **3D Effects**: Three.js/React Three Fiber
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Supabase account for backend services

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/internhub.git
cd internhub
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

### Building for Production

To create a production build:

```bash
npm run build
# or
pnpm build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── layouts/        # Page layout components
├── lib/           # Utility functions and configurations
├── pages/         # Route components/pages
└── types/         # TypeScript type definitions
```

## Environment Setup

The project requires the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run repopack` - Generate repository package

## License

This project is for educational purposes only.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.com/) for backend services
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for 3D effects