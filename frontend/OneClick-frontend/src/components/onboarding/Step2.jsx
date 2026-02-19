import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Progress } from '../ui/progress'

const Step2 = ({ lrn, studentNumber, course, yearLevel, onNext, onBack }) => {
  const handleContinue = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 pb-12 pt-24 font-mono">
      <Card className="mx-auto max-w-md rounded-2xl border-none shadow-xl shadow-slate-200/50">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-indigo-600">
              Student Information
            </CardTitle>
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
              Step 2/3
            </span>
          </div>
          <CardDescription className="font-sans text-slate-500">
            Now, your student info.
          </CardDescription>
          <Progress
            value={66}
            className="mt-8 h-2 bg-indigo-800/50"
            indicatorclassname="bg-white"
          />
        </CardHeader>

        <CardContent>
          <form id="step2-form" onSubmit={handleContinue} className="space-y-6">
            {/* LRN */}
            <div className="space-y-2">
              <Label
                htmlFor="lrn"
                className="text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                LRN (Learner Reference Number)
              </Label>
              <Input
                id="lrn"
                placeholder="12-digit number"
                className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                required
                {...lrn.attributes}
              />
            </div>

            {/* Student ID */}
            <div className="space-y-2">
              <Label
                htmlFor="studentId"
                className="text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Student ID Number
              </Label>
              <Input
                id="studentId"
                placeholder="2024-XXXXX"
                className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                required
                {...studentNumber.attributes}
              />
            </div>

            {/* Course */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="course"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Course
                </Label>
                <Select
                  onValueChange={(val) => course.attributes.onChange({ target: { value: val } })}
                  defaultValue={course.attributes.value}
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="BSIT">BSIT</SelectItem>
                    <SelectItem value="BSBA">BSBA</SelectItem>
                    <SelectItem value="BSCrim">BSCrim</SelectItem>
                    <SelectItem value="BSHM">BSHM</SelectItem>
                    <SelectItem value="BSE">BSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Year Level
                </Label>
                <Select
                  onValueChange={(val) => yearLevel.attributes.onChange({ target: { value: val } })}
                  defaultValue={yearLevel.attributes.value}
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select year level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
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

        <CardFooter className="flex gap-3 px-6 pb-8">
          {/* Back */}
          <Button
            variant="outline"
            onClick={onBack}
            className="h-12 flex-1 rounded-xl border-slate-200 font-bold text-slate-500"
          >
            Back
          </Button>
          {/* Submit */}
          <Button
            type="submit"
            form="step2-form"
            className="h-12 flex-1 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
          >
            Review Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step2
