import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Progress } from '../ui/progress'

const Step3 = ({ formData, onBack, onFinalSubmit, isLoading }) => {
  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Review Information
            </CardTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Step 3/3
            </span>
          </div>
          <CardDescription>
            Verify your details before submitting
          </CardDescription>
          <Progress value={100} className="mt-8" />
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Personal Info</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-right font-medium">{formData.name}</span>
              <span className="text-muted-foreground">Phone Number</span>
              <span className="text-right font-medium">{formData.phone}</span>
              <span className="text-muted-foreground">Gender</span>
              <span className="text-right font-medium capitalize">{formData.gender}</span>
              <span className="text-muted-foreground">Birthday</span>
              <span className="text-right font-medium">{formData.birthdate}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Academic Info</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-muted-foreground">LRN</span>
              <span className="text-right font-medium">{formData.lrn}</span>
              <span className="text-muted-foreground">Course</span>
              <span className="text-right font-medium">{formData.course}</span>
              <span className="text-muted-foreground">Year</span>
              <span className="text-right font-medium">{formData.yearLevel}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-6">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 h-12"
          >
            Edit
          </Button>
          <Button
            onClick={onFinalSubmit}
            disabled={isLoading}
            className="flex-1 h-12"
          >
            {isLoading ? 'Saving...' : 'Finish'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Step3
