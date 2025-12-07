# Getting Started with Netflix Clone

## Quick Start

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Start the development server**:
   ```bash
   bun run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## First Time Setup

### Creating Your First Account

1. When you first open the app, you'll be redirected to the login page
2. Click on "Sign Up" to create a new account
3. Enter:
   - Your name
   - Email address
   - Password (any password for demo purposes)
4. Click "Sign Up" - you'll be automatically logged in and redirected to the home page

### Exploring the App

#### Home Page
- **Banner**: Features a random Netflix Original with a large background image
  - Click "Play" or "More Info" to view details
- **Movie Rows**: Scroll horizontally through different categories:
  - Trending Now
  - Netflix Originals
  - Top Rated
  - Action Movies
  - Comedy Movies
  - Horror Movies
  - Romance Movies
  - Documentaries
- **Movie Cards**: Hover over any movie to see:
  - Play button
  - Add to My List button (+ icon)
  - More Info button (i icon)
  - Match percentage
  - Release year

#### Search Functionality
1. Click the search icon (magnifying glass) in the header
2. Type your search query in the search box
3. Press Enter or wait for results to appear
4. Click on any movie to view details

#### My List
1. Add movies to your list by clicking the "+" icon on any movie card
2. Access your list by clicking "My List" in the navigation
3. Remove movies by clicking the checkmark icon
4. Your list is saved automatically and persists across sessions

#### Movie Details Modal
- Opens when you click on any movie card or "More Info"
- Shows:
  - YouTube trailer (if available)
  - Full description
  - Rating and match percentage
  - Release year and runtime/seasons
  - Genres
  - Status
- Actions:
  - Play button
  - Add to/Remove from My List

#### User Profile
- Click on the user icon in the header
- View your account details
- Sign out

## Demo Credentials

Since this uses local storage, you can create any account you want. Here are some example accounts you can create:

- Email: `demo@netflix.com`, Password: `demo123`
- Email: `test@example.com`, Password: `test123`

## Tips and Tricks

### Navigation
- Use the left/right arrows on movie rows to browse more content
- The header becomes solid black when you scroll down
- All routes are protected - you must be logged in to access them

### Search
- Search works across both movies and TV shows
- Results appear in a grid layout
- Click the search icon again to close the search box

### My List
- Your list is stored locally per user
- Different users have different lists
- Lists persist across browser sessions
- You can add/remove items from both the home page and detail modal

### Performance
- Images are lazy-loaded for better performance
- Movie rows scroll smoothly
- Modal dialogs have fade-in animations

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run linter
- `bun run format` - Format code

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port (5174, 5175, etc.)

### Build Warnings
You may see warnings about `crypto`, `stream`, and `buffer` modules during build. These are expected and don't affect functionality.

### Movies Not Loading
- Check your internet connection
- The app uses the TMDB API which requires internet access
- If issues persist, the API key might need to be refreshed

### Authentication Issues
- Clear your browser's localStorage if you experience login issues
- Open DevTools → Application → Local Storage → Clear

### Videos Not Playing
- YouTube trailers may not be available for all movies
- If a trailer isn't available, the backdrop image will be shown instead
- Some trailers may be region-restricted

## Development

### Adding New Features

1. **New Pages**: Add to `src/pages/` and update routes in `App.tsx`
2. **New Components**: Add to `src/components/`
3. **New API Calls**: Update `src/lib/tmdb.ts`
4. **New Types**: Add to `src/types/index.ts`

### Code Style
- The project uses Biome for linting and formatting
- Run `bun run lint` before committing
- Use TypeScript for all new files
- Follow the existing component structure

### State Management
- Authentication: `AuthContext`
- My List: `useMyList` hook
- Movie data: Component state with useState/useEffect

## Production Deployment

1. Build the project:
   ```bash
   bun run build
   ```

2. The output will be in the `dist/` folder

3. Deploy to your preferred hosting service:
   - Netlify (configured in `netlify.toml`)
   - Vercel
   - GitHub Pages
   - Any static hosting service

## Learn More

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TMDB API](https://www.themoviedb.org/documentation/api)

## Support

For issues or questions:
1. Check the main README.md
2. Review the code comments
3. Check the browser console for errors
4. Ensure all dependencies are installed

Enjoy your Netflix clone! 🎬🍿
