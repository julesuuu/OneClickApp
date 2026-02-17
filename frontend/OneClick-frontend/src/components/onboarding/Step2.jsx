// src/pages/onboarding/Step2.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Step2 = ({ nextStep, prevStep, updateFormData, lrn, studentNumber, course, yearLevel }) => {

  const handleNext = (e) => {
    e.preventDefault()
    // 1. Pass data to parent state
    updateFormData({
      lrn: lrn.attributes.value,
      studentNumber: studentNumber.attributes.value,
      course: course.attributes.value,
      yearLevel: yearLevel.attributes.value,
    })
    // 2. Move to Review (Step 3)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-mono">
      {/* The "Hugging" Background */}
      <div className="bg-gray-50 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">

        <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center space-y-1 bg-white pb-8">
            <CardTitle className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">
              Student Info
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Step 2 of 3 • Academic Background
            </CardDescription>
          </CardHeader>

          <CardContent className="bg-white px-6 sm:px-10">
            <form id="step2-form" onSubmit={handleNext} className="space-y-6">

              {/* LRN Field */}
              <div className="space-y-2">
                <Label htmlFor="lrn" className="text-xs font-bold uppercase tracking-wider text-gray-400">LRN</Label>
                <Input
                  id="lrn"
                  {...lrn.attributes}
                  placeholder="12-digit number"
                  className="rounded-xl border-gray-200 h-11 focus-visible:ring-indigo-500"
                  required
                />
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label htmlFor="studentNumber" className="text-xs font-bold uppercase tracking-wider text-gray-400">Student Number</Label>
                <Input
                  id="studentNumber"
                  {...studentNumber.attributes}
                  placeholder="2024-XXXXX"
                  className="rounded-xl border-gray-200 h-11 focus-visible:ring-indigo-500"
                  required
                />
              </div>

              {/* Course & Year Level Group */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Course</Label>
                  <Select
                    onValueChange={(val) => course.attributes.onChange({ target: { value: val } })}
                    defaultValue={course.attributes.value}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 h-11 focus:ring-indigo-500">
                      <SelectValue placeholder="Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BSIT">BSIT</SelectItem>
                      <SelectItem value="BSCS">BSCS</SelectItem>
                      <SelectItem value="BSIS">BSIS</SelectItem>
                      <SelectItem value="BSEMC">BSEMC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Year Level</Label>
                  <Select
                    onValueChange={(val) => yearLevel.attributes.onChange({ target: { value: val } })}
                    defaultValue={yearLevel.attributes.value}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 h-11 focus:ring-indigo-500">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-white px-6 sm:px-10 pb-10 flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1 h-12 rounded-xl border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
            >
              Back
            </Button>
            <Button
              type="submit"
              form="step2-form"
              className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              Proceed to Review
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Step2