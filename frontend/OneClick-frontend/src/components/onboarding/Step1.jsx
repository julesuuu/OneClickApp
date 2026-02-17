// src/pages/onboarding/Step1.jsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"

const Step1 = ({ nextStep, updateFormData, name, phone, birthdate, gender }) => {

  const handleNext = (e) => {
    e.preventDefault()
    // 1. Pass the data to the Parent's central state
    updateFormData({
      name: name.attributes.value,
      phone: phone.attributes.value,
      birthdate: birthdate.attributes.value,
      gender: gender.attributes.value,
    })
    // 2. Move to the next component (Step 2)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-mono">
      <div className="bg-gray-50 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">

        <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center space-y-1 bg-white pb-8">
            <CardTitle className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">
              Personal Info
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Step 1 of 3 • Let's complete your profile
            </CardDescription>
          </CardHeader>

          <CardContent className="bg-white px-6 sm:px-10 pb-10">
            <form onSubmit={handleNext} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Juan Dela Cruz"
                  className="rounded-xl border-gray-200 h-11 focus-visible:ring-indigo-500"
                  {...name.attributes}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="09123456789"
                  className="rounded-xl border-gray-200 h-11 focus-visible:ring-indigo-500"
                  {...phone.attributes}
                  required
                />
              </div>

              {/* Birthdate & Gender Group */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="text-xs font-bold uppercase tracking-wider text-gray-400">Birthdate</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    max={format(new Date(), "yyyy-MM-dd")}
                    className="rounded-xl border-gray-200 h-11 focus-visible:ring-indigo-500"
                    {...birthdate.attributes}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Gender</Label>
                  <Select
                    onValueChange={(val) => gender.attributes.onChange({ target: { value: val } })}
                    defaultValue={gender.attributes.value}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 h-11 focus:ring-indigo-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Step1