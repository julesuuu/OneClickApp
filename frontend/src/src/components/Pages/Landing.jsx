import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, FileText, Send, ShieldCheck, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SignInButton, useAuth } from '@clerk/clerk-react'

export default function Landing() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  return (
    <div className='flex flex-col min-h-screen font-sans'>
      {/* Hero Section */}
      <section className='relative w-full py-20 md:py-32 lg:py-40 bg-white overflow-hidden'>
        {/* Decorative Background Blob */}
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50' />
        <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50' />

        <div className='container mx-auto px-4 md:px-6 text-center relative'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase font-mono'>
              OneClick <span className='text-indigo-600'>Credentials</span>
            </h1>
            <p className='mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto'>
              A seamless, secure, and efficient web-based appointment and
              payment system for student documents.
            </p>
            <div className='mt-10 flex flex-col sm:flex-row justify-center gap-4'>
              {isSignedIn ? (
                <Button 
                  size='lg' 
                  onClick={() => navigate('/dashboard')}
                  className='bg-indigo-600 hover:bg-indigo-700 h-14 px-8 rounded-xl text-lg font-bold shadow-xl shadow-indigo-200'
                >
                  Go to Dashboard <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button size='lg' className='bg-indigo-600 hover:bg-indigo-700 h-14 px-8 rounded-xl text-lg font-bold shadow-xl shadow-indigo-200'>
                      Get Started
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button size='lg' variant='outline' className='h-14 px-8 rounded-xl text-lg font-bold border-slate-200 text-slate-600'>
                      Sign In
                    </Button>
                  </SignInButton>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 bg-slate-50/50'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase font-mono'>
              How It Works
            </h2>
            <p className='text-slate-500 mt-2'>
              Requesting your credentials is a simple three-step process.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <FeatureCard 
              step="1"
              title="Submit Request"
              desc="Fill out a simple form with your details and specify the credentials you need."
            />
            <FeatureCard 
              step="2"
              title="Admin Approval"
              desc="Our team reviews your request for verification. You'll be notified in real-time."
            />
            <FeatureCard 
              step="3"
              title="Receive Docs"
              desc="Once approved, log in to your secure dashboard to download your official documents."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4 md:px-6 text-center'>
          <h2 className='text-3xl font-black tracking-tighter uppercase font-mono mb-16'>
            System Features
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
            <IconBox icon={<FileText />} title="Easy Forms" desc="Intuitive interface for document requests." />
            <IconBox icon={<Send />} title="Live Updates" desc="Instant status notifications via dashboard." />
            <IconBox icon={<CheckCircle />} title="Smooth Workflow" desc="Transparent process for students and staff." />
            <IconBox icon={<ShieldCheck />} title="Secure Access" desc="Encrypted handling of your private data." />
          </div>
        </div>
      </section>
    </div>
  )
}

/* Helper Components to keep code clean */
function FeatureCard({ step, title, desc }) {
  return (
    <Card className='border-none shadow-xl shadow-slate-200/50 rounded-3xl p-4 transition-transform hover:-translate-y-2'>
      <CardHeader>
        <div className='w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-indigo-200'>
          {step}
        </div>
        <CardTitle className='font-mono uppercase tracking-tight'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-slate-500 text-sm leading-relaxed'>{desc}</p>
      </CardContent>
    </Card>
  )
}

function IconBox({ icon, title, desc }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-indigo-50 p-4 rounded-2xl mb-4 text-indigo-600'>
        {icon}
      </div>
      <h3 className='font-bold text-slate-900 mb-1'>{title}</h3>
      <p className='text-sm text-slate-500 leading-tight'>{desc}</p>
    </div>
  )
}