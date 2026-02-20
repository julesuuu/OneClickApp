import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Progress } from '../ui/progress'

const Step1 = ({ name, phone, birthdate, gender, onNext }) => {
  const handleContinue = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 pb-12 pt-24 font-mono">
      <Card className="mx-auto max-w-md rounded-2xl border-none shadow-xl shadow-slate-200/50">
        {/* Header */}
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-indigo-600">
              Personal Information
            </CardTitle>
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600 text-center">
              Step 1/3
            </span>
          </div>
          <CardDescription className="font-sans text-slate-500">
            Let's start with some basic details about you.
          </CardDescription>

          <Progress
            value={33}
            className="mt-8 h-2 bg-indigo-800/50"
            indicatorclassname="bg-white"
          />
        </CardHeader>

        <CardContent>
          <form id="step1-form" onSubmit={handleContinue} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Juan Dela Cruz"
                className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                required
                {...name.attributes}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912 345 6789"
                className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                required
                {...phone.attributes}
              />
            </div>

            {/* Birthdate */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Birthdate */}
              <div className="space-y-2">
                <Label
                  htmlFor="birthdate"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Birthdate
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                  required
                  {...birthdate.attributes}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Gender
                </Label>
                <Select
                  onValueChange={(val) => gender.attributes.onChange({ target: { value: val } })}
                  defaultValue={gender.attributes.value}
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex gap-3 px-6 pb-8">
          {/* Submit */}
          <Button
            type="submit"
            form="step1-form"
            className="h-12 flex-1 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
          >
            Save & Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step1
