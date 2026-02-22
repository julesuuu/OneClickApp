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
    <div className="min-h-screen bg-muted/30 px-4 pb-12 pt-24">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Student Information
            </CardTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Step 2/3
            </span>
          </div>
          <CardDescription>
            Now, your student info.
          </CardDescription>
          <Progress value={66} className="mt-8" />
        </CardHeader>

        <CardContent>
          <form id="step2-form" onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lrn">LRN (Learner Reference Number)</Label>
              <Input
                id="lrn"
                placeholder="12-digit number"
                required
                {...lrn.attributes}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID Number</Label>
              <Input
                id="studentId"
                placeholder="2024-XXXXX"
                required
                {...studentNumber.attributes}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  onValueChange={(val) => course.attributes.onChange({ target: { value: val } })}
                  defaultValue={course.attributes.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BSIT">BSIT</SelectItem>
                    <SelectItem value="BSBA">BSBA</SelectItem>
                    <SelectItem value="BSCrim">BSCrim</SelectItem>
                    <SelectItem value="BSHM">BSHM</SelectItem>
                    <SelectItem value="BSE">BSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year Level</Label>
                <Select
                  onValueChange={(val) => yearLevel.attributes.onChange({ target: { value: val } })}
                  defaultValue={yearLevel.attributes.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year level" />
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

        <CardFooter className="flex gap-3 px-6 pb-8">
          <Button variant="outline" onClick={onBack} className="h-12 flex-1">
            Back
          </Button>
          <Button type="submit" form="step2-form" className="h-12 flex-1">
            Review Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step2
