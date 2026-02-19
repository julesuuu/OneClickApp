import { useState } from 'react'
import useField from '../../hooks/useField'
import Step1 from './Step1'
import Step2 from './Step2'

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const name = useField('text')
  const phone = useField('tel')
  const birthdate = useField('date')
  const gender = useField('select', 'male')
  const lrn = useField('text')
  const studentNumber = useField('text')
  const course = useField('text')
  const yearLevel = useField('text')

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

  return (
    <div>
      {currentStep === 1 && (
        <Step1 name={name} phone={phone} birthdate={birthdate} gender={gender} onNext={nextStep} />
      )}
      {currentStep === 2 && (
        <Step2
          lrn={lrn}
          studentNumber={studentNumber}
          course={course}
          yearLevel={yearLevel}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
    </div>
  )
}

export default Onboarding
