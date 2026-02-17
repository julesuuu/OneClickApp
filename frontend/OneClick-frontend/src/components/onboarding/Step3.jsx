// src/pages/onboarding/Step3.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const Step3 = ({ formData, prevStep, handleFinalSubmit }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-mono">
      <div className="bg-gray-50 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">

        <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center bg-white pb-6">
            <Badge className="w-fit mx-auto mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">
              Final Step
            </Badge>
            <CardTitle className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">
              Review
            </CardTitle>
            <CardDescription>Verify your details before submitting</CardDescription>
          </CardHeader>

          <CardContent className="bg-white px-6 sm:px-10 space-y-6">
            {/* Personal Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Personal Info</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">Name</span>
                <span className="text-right font-bold">{formData.name}</span>
                <span className="text-gray-500">Gender</span>
                <span className="text-right font-bold capitalize">{formData.gender}</span>
                <span className="text-gray-500">Birthday</span>
                <span className="text-right font-bold">{formData.birthdate}</span>
              </div>
            </div>

            <Separator className="bg-gray-100" />

            {/* Academic Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Academic Info</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">LRN</span>
                <span className="text-right font-bold">{formData.lrn}</span>
                <span className="text-gray-500">Course</span>
                <span className="text-right font-bold">{formData.course}</span>
                <span className="text-gray-500">Year</span>
                <span className="text-right font-bold">{formData.yearLevel}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-white px-6 sm:px-10 pb-10 flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1 h-12 rounded-xl border-gray-200 font-bold text-gray-400"
            >
              Edit
            </Button>
            <Button
              onClick={handleFinalSubmit}
              className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              Finish
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Step3