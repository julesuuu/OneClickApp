import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-lg border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white pb-8 pt-10 px-8">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold">Personal Information</CardTitle>
            <span className="text-sm font-medium opacity-90">Step 1 of 3</span>
          </div>
          <CardDescription className="text-indigo-100 text-lg">
            Let's start with some basic details about you.
          </CardDescription>

          <Progress value={33} className="mt-8 h-2 bg-indigo-800/50" indicatorClassName="bg-white" />
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <form onSubmit={handleContinue} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Juan Dela Cruz"
                className="h-12 text-base focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                required
                {...name.attributes}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912 345 6789"
                className="h-12 text-base focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                required
                {...phone.attributes}
              />
            </div>

            {/* Birthdate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Birthdate */}
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-base font-medium text-gray-700">
                  Birthdate
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  className="h-12 text-base focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                  required
                  {...birthdate.attributes}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-medium text-gray-700">
                  Gender
                </Label>
                <Select
                  value={gender.attributes.value}
                  onValueChange={(val) => gender.attributes.onChange({ target: { value: val } })}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Save & Continue to Student Info
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Step1