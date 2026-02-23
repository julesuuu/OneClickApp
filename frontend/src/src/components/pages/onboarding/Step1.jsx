import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Progress } from '../../ui/progress'

const Step1 = ({ name, phone, birthdate, gender, onNext }) => {
  const handleContinue = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 pb-12 pt-24">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Personal Information
            </CardTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary text-center">
              Step 1/3
            </span>
          </div>
          <CardDescription>
            Let's start with some basic details about you.
          </CardDescription>
          <Progress value={33} className="mt-8" />
        </CardHeader>

        <CardContent>
          <form id="step1-form" onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Juan Dela Cruz"
                required
                {...name.attributes}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912 345 6789"
                required
                {...phone.attributes}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  id="birthdate"
                  type="date"
                  required
                  {...birthdate.attributes}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(val) => gender.attributes.onChange({ target: { value: val } })}
                  defaultValue={gender.attributes.value}
                >
                  <SelectTrigger>
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
          </form>
        </CardContent>

        <CardFooter className="flex gap-3 px-6 pb-8">
          <Button
            type="submit"
            form="step1-form"
            className="h-12 flex-1"
          >
            Save & Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step1
