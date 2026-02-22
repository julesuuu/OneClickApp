import { FileText, CreditCard, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Landing() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Easy Request',
      description: 'Submit your document requests online in just a few clicks. No more waiting in lines.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: 'Hybrid Payment',
      description: 'Pay online via PayMongo or choose cash on pickup. Flexible options for your convenience.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Real-Time Tracking',
      description: 'Track your request status in real-time. Get notified when your documents are ready.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Schedule Pickup',
      description: 'Choose a convenient time and location to pick up your documents.',
    },
  ]

  const documents = [
    'Transcript of Records (TOR)',
    'Diploma',
    'Certificate of Good Moral Character',
    'Certificate of Enrollment',
    'Certificate of Grades',
    'Honorable Dismissal',
  ]

  const pricing = [
    { name: 'Transcript of Records (TOR)', price: 150 },
    { name: 'Diploma', price: 200 },
    { name: 'Good Moral Character', price: 50 },
    { name: 'Certificate of Enrollment', price: 50 },
    { name: 'Certificate of Grades', price: 50 },
    { name: 'Honorable Dismissal', price: 100 },
  ]

  const faqs = [
    {
      question: 'How long does it take to process my request?',
      answer: 'Regular processing takes 5-7 business days, while rush processing takes 2-3 business days.',
    },
    {
      question: 'Can I request multiple documents at once?',
      answer: 'Yes! You can request as many documents as you need in a single transaction.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept online payments via PayMongo (credit/debit cards, GCash, PayMaya) or cash on pickup.',
    },
    {
      question: 'How will I know when my documents are ready?',
      answer: 'You will receive email and SMS notifications, and you can track the status in your dashboard.',
    },
    {
      question: 'Can I cancel or modify my request?',
      answer: 'Yes, you can cancel requests before they are processed. Contact support for modifications.',
    },
  ]

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <FileText className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-teal-500" />
            </div>
            <span className="text-xl font-bold">OneClick Credentials</span>
          </div>
          <nav className="flex items-center gap-4">
            {isSignedIn ? (
              <Button variant="ghost" onClick={handleGetStarted}>
                Dashboard
              </Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Log In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up Free</Button>
                </SignUpButton>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Request School Credentials Online - Fast & Secure
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            No more lines at the registrar. Pay online or cash, track status, and schedule pickup.
            Your academic documents, delivered with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isSignedIn ? (
              <Button size="lg" variant="secondary" onClick={handleGetStarted}>
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary">
                    Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                    Log In
                  </Button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose OneClick Credentials?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We make requesting your academic documents simple, fast, and hassle-free
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Available Documents</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We offer a wide range of academic credentials to meet your needs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {documents.map((doc, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{doc}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            No hidden fees. Simple and transparent pricing for all documents
          </p>
          <Card className="max-w-md mx-auto overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-bold w-full">Document Type</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricing.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right font-mono">₱{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            * Additional copies: ₱50 each
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Got questions? We have answers.
          </p>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-bold">OneClick Credentials</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making credential requests fast, secure, and hassle-free for students.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <SignInButton mode="modal">
                    <Button variant="link" className="h-auto p-0">Login</Button>
                  </SignInButton>
                </li>
                <li>
                  <SignUpButton mode="modal">
                    <Button variant="link" className="h-auto p-0">Sign Up</Button>
                  </SignUpButton>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="h-auto p-0">Help Center</Button></li>
                <li><Button variant="link" className="h-auto p-0">Contact Us</Button></li>
                <li><Button variant="link" className="h-auto p-0">FAQs</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="h-auto p-0">Privacy Policy</Button></li>
                <li><Button variant="link" className="h-auto p-0">Terms of Service</Button></li>
                <li><Button variant="link" className="h-auto p-0">Data Protection</Button></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 OneClick Credentials. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
