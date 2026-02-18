import { useState } from 'react'
import useField from '../../hooks/useField'
import Step1 from './Step1'

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const name = useField('text')
  const phone = useField('tel')
  const birthdate = useField('date')
  const gender = useField('select', 'male')

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  return (
    <div>
      {currentStep === 1 && (
        <Step1
          name={name}
          phone={phone}
          birthdate={birthdate}
          gender={gender}
          onNext={nextStep}
        />
      )}
    </div>
  )
}

export default Onboarding