import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

const Step3 = ({ formData, onBack, onFinalSubmit, isLoading }) => {
  return (
    <div className='min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 font-mono'>
      <Card className='max-w-md mx-auto border-none shadow-xl shadow-slate-200/50 rounded-2xl'>
        <CardHeader className='space-y-1 pb-6 rounded-t-2xl'>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black tracking-tighter text-indigo-600">
              Review Information
            </CardTitle>
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600 text-center">
              Step 3/3
            </span>
          </div>
          <CardDescription className='font-sans'>
            Verify your details before submitting
          </CardDescription>
          <Progress
            value={100}
            className="mt-8 h-2 bg-indigo-800/50"
            indicatorclassname="bg-white" 
            />
        </CardHeader>

        <CardContent className='bg-white px-6 sm:px-10 space-y-6 pt-6'>
          {/* Personal Summary */}
          <div className='space-y-3'>
            <h4 className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest'>
              Personal Info
            </h4>
            <div className='grid grid-cols-2 gap-y-2 text-sm font-sans space-between'>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Name</span>
              <span className='text-right font-bold'>{formData.name}</span>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Phone Number</span>
              <span className='text-right font-bold'>{formData.phone}</span>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Gender</span>
              <span className='text-right font-bold capitalize'>
                {formData.gender}
              </span>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Birthday</span>
              <span className='text-right font-bold'>{formData.birthdate}</span>
            </div>
          </div>

          <Separator className='bg-gray-100' />

          {/* Academic Summary */}
          <div className='space-y-3'>
            <h4 className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest'>
              Academic Info
            </h4>
            <div className='grid grid-cols-2 gap-y-2 text-sm font-sans'>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>LRN</span>
              <span className='text-right font-bold'>{formData.lrn}</span>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Course</span>
              <span className='text-right font-bold'>{formData.course}</span>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Year</span>
              <span className='text-right font-bold'>{formData.yearLevel}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='bg-white px-6 sm:px-10 pb-10 flex gap-3 pt-6 rounded-b-2xl'>
          <Button
            variant='outline'
            onClick={onBack}
            disabled={isLoading}
            className='flex-1 h-12 rounded-xl border-gray-200 font-bold text-gray-400'
          >
            Edit
          </Button>
          <Button
            onClick={onFinalSubmit}
            disabled={isLoading}
            className='flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-95'
          >
            {isLoading ? 'Saving...' : 'Finish'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step3