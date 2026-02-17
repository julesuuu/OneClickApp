/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", 
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          // light: '#a5b4fc',    // indigo-300
          // DEFAULT: '#6366f1',  // indigo-500
          // dark: '#4338ca',     // indigo-700
        },

        // Background & surface colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          foreground: 'hsl(var(--surface-foreground))',
        },

        // Card, popover
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        // Secondary & muted
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // Accent
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        // Destructive
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // Border & input
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Custom education-specific colors
        success: {
          DEFAULT: '#16a34a',   // green-600 – completed/approved
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',   // amber-500 – pending/payment due
          foreground: '#ffffff',
        },
        info: {
          DEFAULT: '#3b82f6',   // blue-500 – info/notifications
          foreground: '#ffffff',
        },

        // Chart colors
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',               // shadcn default
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        oneclick: '1.5rem',                
      },

      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
  ],
}