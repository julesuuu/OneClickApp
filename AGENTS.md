# AGENTS.md - Development Guidelines for OneClick Credentials

## Project Overview

OneClick Credentials is a React-based web application for requesting school documents online. It uses:
- **Frontend**: React 19 + Vite + Tailwind CSS + shadcn/ui
- **Auth**: Clerk for authentication
- **State**: Redux Toolkit
- **Backend**: Node.js/Express (in progress)

---

## Build & Development Commands

### Frontend (frontend/src)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (checks for errors)
npm run lint

# Fix lint errors automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

### Backend (backend/src)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Code Style Guidelines

### 1. Imports

- Use absolute imports with `@/` alias (e.g., `@/components/ui/button`)
- Order imports: React → External (Clerk, Redux, Router) → Internal Components → Utils
- Group imports with blank lines between groups

```jsx
// ✅ Correct order
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUser } from '@clerk/clerk-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTheme } from '@/components/ui/theme-provider'
import { syncUser } from '@/redux/userSlice'
import { cn } from '@/lib/utils'
```

### 2. Component Structure

- Use functional components with arrow functions or `function` keyword
- Props should be destructured
- Keep components focused and small (max ~200 lines)

```jsx
// ✅ Good component structure
const MyComponent = ({ title, onSubmit }) => {
  const [state, setState] = useState(null)
  
  const handleAction = () => {
    // logic
  }
  
  return (
    <div>
      {/* jsx */}
    </div>
  )
}
```

### 3. Naming Conventions

- **Components**: PascalCase (e.g., `DashboardPage`, `Step1`)
- **Files**: PascalCase for components (e.g., `Step1.jsx`), camelCase for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case (via Tailwind)

### 4. Types

- Use TypeScript types for props and interfaces when needed
- For simple JSX, type annotations are optional

```tsx
// Interface example
interface DashboardProps {
  userId: string
  onNavigate: (path: string) => void
}
```

### 5. Tailwind CSS

- Use semantic color tokens: `bg-primary`, `text-foreground`, `bg-muted/30`, etc.
- Use `text-primary` for accent text, `text-foreground` for body text
- Use `bg-muted/30` for section backgrounds
- Always include dark mode support: `text-foreground`, `text-muted-foreground`

```jsx
// ✅ Good examples
<div className="bg-background text-foreground">
  <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
  <p className="text-muted-foreground">
  <Card className="border-2 hover:border-primary/50">
```

### 6. State Management

- Use `useState` for local component state
- Use Redux for global state (user data, auth state)
- Use `useEffect` for side effects

```jsx
// Local state
const [isOpen, setIsOpen] = useState(false)

// Redux
const { user, loading } = useSelector((state) => state.user)
const dispatch = useDispatch()
```

### 7. Navigation

- Use `useNavigate` from react-router-dom for programmatic navigation
- Use `<Link>` for anchor navigation

```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/dashboard')
```

### 8. Authentication

- Use Clerk's `useUser` hook for user info
- Use `SignedIn`/`SignedOut` components for conditional rendering
- Wrap protected routes with auth checks

```jsx
import { useUser } from '@clerk/clerk-react'
const { isSignedIn, user } = useUser()
```

### 9. Error Handling

- Always wrap async operations in try/catch
- Provide user feedback for errors
- Log errors to console for debugging

```jsx
try {
  await apiCall()
} catch (error) {
  console.error('Operation failed:', error)
  // Show error toast/message
}
```

### 10. shadcn/ui Components

- Use provided UI components from `@/components/ui/`
- Available: Button, Card, Input, Select, Dialog, Accordion, Table, etc.
- Customize using className prop with Tailwind

---

## Project Structure

```
frontend/src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── pages/        # Page components (Landing, Dashboard)
│   └── onboarding/   # Onboarding flow (Step1, Step2, Step3)
├── hooks/            # Custom hooks
├── lib/              # Utilities (utils.ts)
├── redux/            # Redux store and slices
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

---

## Working with This Project

1. **Before making changes**: Run `npm run lint` to check for errors
2. **After making changes**: Verify the app still builds with `npm run build`
3. **Testing**: Currently no test framework configured
4. **Dark mode**: Use `useTheme()` hook from `theme-provider.jsx`
5. **Mobile responsive**: Always test with `md:`, `lg:` breakpoints

---

## Color Scheme

- **Primary**: Indigo (`--primary: 243.75 75.3% 58.6%`)
- Use `bg-primary`, `text-primary`, `bg-primary/10` for subtle backgrounds
- Text should use `text-foreground` (adapts to dark mode) or `text-muted-foreground`
- Backgrounds: `bg-background` for main, `bg-muted/30` for sections
