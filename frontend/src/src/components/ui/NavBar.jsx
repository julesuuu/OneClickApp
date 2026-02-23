import { useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { SignOutButton, UserButton } from '@clerk/clerk-react'
import { FileText, Menu, X, Bell, Home, FileStack, Calendar, Settings, LogOut } from 'lucide-react'
import { Button } from './button'
import { ThemeToggle } from './theme-toggle'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'Requests', href: '#', icon: FileStack, current: false },
  { name: 'Appointments', href: '#', icon: Calendar, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <FileText className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-teal-500" />
            </div>
            <span className="text-xl font-bold text-foreground">OneClick</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`${item.current ? 'bg-muted' : ''} text-foreground`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="text-foreground">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="hidden md:block">
              <UserButton afterSignOutUrl="/" />
            </div>

            {/* Mobile menu button */}
            <UserButton afterSignOutUrl="/" />
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start ${item.current ? 'bg-muted' : ''} text-foreground`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
            <div className="pt-2 border-t">
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
