# Netflix Clone

A fully functional Netflix clone built with React, TypeScript, Tailwind CSS, and shadcn/ui components. This project features user authentication, movie browsing, search functionality, and a personalized watchlist.

## Features

### Authentication
- **JWT-based Authentication**: Secure login and signup system
- **Mock API**: User data stored in localStorage for demonstration
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Persistent Sessions**: User sessions maintained across page refreshes

### Movie Data
- **TMDB API Integration**: Real movie and TV show data from The Movie Database
- **Multiple Categories**:
  - Trending
  - Netflix Originals
  - Top Rated
  - Action Movies
  - Comedy Movies
  - Horror Movies
  - Romance Movies
  - Documentaries

### Pages

#### Home/Browse Page
- Dynamic banner featuring a random Netflix Original
- Horizontally scrollable movie carousels for each category
- Smooth animations and transitions
- Hover effects on movie cards with quick actions

#### Movie/Show Detail Modal
- Full movie/show details (title, description, rating, genres)
- YouTube trailer playback using react-youtube
- Quick actions: Play, Add to List
- Genre tags and metadata display

#### Search Page
- Real-time search functionality
- Clean grid layout for search results
- Empty state for no results
- Automatic filtering of movies without images

#### My List Page
- Personal watchlist management
- Add/remove movies from your list
- Persistent storage per user
- Empty state when list is empty

### Design
- **Dark Theme**: Netflix-inspired modern dark UI
- **Responsive**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Custom Components**: Built with shadcn/ui for consistency
- **Accessible**: Keyboard navigation and ARIA labels

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **react-youtube** - YouTube video player
- **jsonwebtoken** - JWT token generation and verification
- **Lucide React** - Icon library

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- TMDB API key (free - already included in the project)

### Installation

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
bun run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Banner.tsx      # Hero banner
│   ├── Row.tsx         # Horizontal movie carousel
│   ├── MovieCard.tsx   # Individual movie card
│   ├── MovieModal.tsx  # Movie details modal
│   └── ProtectedRoute.tsx
├── pages/              # Main pages
│   ├── Home.tsx        # Browse page
│   ├── Login.tsx       # Authentication page
│   ├── Search.tsx      # Search results page
│   └── MyList.tsx      # User's watchlist
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   └── useMyList.ts    # Watchlist management
├── lib/                # Utilities and API
│   ├── auth.ts         # Authentication logic
│   ├── tmdb.ts         # TMDB API integration
│   └── utils.ts        # Helper functions
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Usage

### Authentication

1. **Sign Up**: Create a new account with email, name, and password
2. **Sign In**: Log in with existing credentials
3. **Sign Out**: Click on your profile icon and select "Sign out"

### Browsing Movies

- Scroll through different categories on the home page
- Hover over a movie card to see quick actions
- Click on a movie to view full details and trailer
- Use the navigation arrows to browse through movie rows

### Search

- Click the search icon in the header
- Type your search query
- View results in a grid layout
- Click on any result to see details

### My List

- Click the "+" icon on any movie card to add to your list
- Click the checkmark icon to remove from your list
- Access your full list by clicking "My List" in the navigation
- All changes are saved automatically

## API

This project uses the [TMDB API](https://www.themoviedb.org/documentation/api) for movie and TV show data. The API key is included for demonstration purposes.

### Endpoints Used
- `/trending/all/week` - Trending content
- `/discover/tv?with_networks=213` - Netflix Originals
- `/movie/top_rated` - Top rated movies
- `/discover/movie?with_genres={id}` - Movies by genre
- `/search/multi` - Search functionality
- `/movie/{id}` or `/tv/{id}` - Movie/show details

## Environment Variables

While not required for this demo, in production you should use environment variables:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

## Authentication System

The authentication system uses JWT tokens and localStorage for demonstration. In production, you should:

1. Use a real backend API
2. Store tokens securely (httpOnly cookies)
3. Implement proper password hashing (bcrypt)
4. Add refresh token rotation
5. Implement rate limiting
6. Add email verification

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes only. All movie data and images are property of their respective owners.

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- UI inspiration from Netflix
- Icons by [Lucide](https://lucide.dev/)
