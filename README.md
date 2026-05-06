# StudyMate KTU — Frontend

A production-ready React + Vite + Tailwind CSS frontend for the StudyMate KTU academic portal.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server automatically proxies `/api/*` requests to `http://localhost:5000`.

---

## 🗂 Project Structure

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Router configuration
├── index.css                   # Global styles + Tailwind
│
├── services/
│   └── api.js                  # Axios client + all API functions
│
├── hooks/
│   └── index.js                # useFetch, useDebounce, useLocalStorage, useInView
│
├── utils/
│   └── index.js                # Helpers: formatFileSize, getModuleColor, etc.
│
├── pages/
│   ├── HomePage.jsx            # Landing page with subject grid
│   ├── SubjectsPage.jsx        # Browse all subjects
│   ├── SubjectPage.jsx         # Subject detail with tabbed resources
│   └── NotFoundPage.jsx        # 404 page
│
└── components/
    ├── index.js                # Barrel exports
    ├── layout/
    │   ├── Layout.jsx          # Root layout (navbar + footer + bg)
    │   ├── Navbar.jsx          # Sticky header with mobile menu
    │   └── Footer.jsx
    │
    ├── ui/                     # Reusable primitives
    │   ├── Button.jsx          # Multi-variant button
    │   ├── Badge.jsx           # Status/label chips
    │   ├── SearchBar.jsx       # Search input with clear
    │   ├── Tabs.jsx            # Tab navigation + panel
    │   ├── Skeleton.jsx        # Loading skeletons
    │   └── EmptyState.jsx      # Empty + error states
    │
    └── features/               # Domain-specific components
        ├── SubjectCard.jsx     # Subject listing card
        ├── ModuleCard.jsx      # Module display with topics
        ├── NotesList.jsx       # Notes download list
        ├── VideoList.jsx       # YouTube video cards
        ├── QuestionPapers.jsx  # Papers grouped by year
        └── TrendAnalysis.jsx   # Charts + trend data
```

---

## 🔌 API Integration

The frontend connects to these backend endpoints:

| Endpoint | Used In |
|---|---|
| `GET /api/subjects` | HomePage, SubjectsPage |
| `GET /api/subject/:code` | SubjectPage |
| `GET /api/notes/:code/module/:moduleNo` | NotesTab |
| `GET /api/shortnotes/:code` | NotesTab |
| `GET /api/videos/:code` | VideosTab |
| `GET /api/questionpapers/:code` | PapersTab |
| `GET /api/trend/:code` | TrendTab |

All API calls are centralized in `src/services/api.js`.

---

## 🎨 Design System

**Aesthetic**: Dark academic — deep navy + amber gold accents  
**Fonts**: Playfair Display (headings) · DM Sans (body) · JetBrains Mono (code)

### Colors
| Token | Value | Use |
|---|---|---|
| `navy-950` | `#04070f` | Page background |
| `navy-800` | `#0c1530` | Card background |
| `amber-400` | `#fbbf24` | Primary accent |
| `slate-400` | `#94a3b8` | Secondary text |

### Components
- **Glass cards**: `glass-card` utility — semi-transparent with blur
- **Gradient text**: `text-gradient` — amber diagonal gradient
- **Skeleton loaders**: shimmer animation for all loading states
- **Module colors**: 5 distinct colors (M1–M5) via `getModuleColor()`

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` v6 | Client-side routing |
| `axios` | HTTP client with interceptors |
| Tailwind CSS v3 | Utility-first styling |
| Google Fonts | Playfair Display + DM Sans + JetBrains Mono |

---

## 🔧 Configuration

### API Proxy (Development)
Edit `vite.config.js` to change the backend URL:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5000', // ← change this
    changeOrigin: true,
  },
},
```

### Production Build
The app expects `/api` to be served from the same domain, or configure `VITE_API_URL`:
```env
VITE_API_URL=https://your-api.com/api
```

---

## 🧰 Adding a New Feature

1. **New API call** → Add to `src/services/api.js`
2. **New component** → `src/components/features/YourComponent.jsx`
3. **New page** → `src/pages/YourPage.jsx` + add route in `App.jsx`
4. **New hook** → `src/hooks/index.js`

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768px–1024px | 2-column grid |
| Desktop | > 1024px | 3-column grid, full nav |
