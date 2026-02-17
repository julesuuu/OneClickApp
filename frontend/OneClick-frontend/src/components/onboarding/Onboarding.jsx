import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import useField from '../../hooks/useField'
import { syncUserWithBackend } from '../../redux/userSlice'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.user)

  // 1. Initialize all hooks here (The "Source of Truth")
  const name = useField('text')
  const phone = useField('tel')
  const birthdate = useField('date')
  const gender = useField('select', 'male')

  const lrn = useField('text')
  const studentNumber = useField('text')
  const course = useField('select', 'BSIT')
  const yearLevel = useField('select', '1st Year')

  // 2. State to hold the combined data for Step 3 review
  const [formData, setFormData] = useState({})

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  // 3. The Final Submit (The only time we talk to the backend)
  const handleFinalSubmit = async () => {
    try {
      const token = await getToken()
      const finalPayload = {
        ...formData,
        profileCompleted: true // This triggers your controller logic
      }

      await axios.patch('http://localhost:3001/api/users/profile', finalPayload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update Redux so the app knows we are "done"
      dispatch(syncUserWithBackend({ email: profile.email, username: profile.username }))

    } catch (err) {
      console.error("Final submission failed:", err)
    }
  }

  // Navigation Logic
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // Render the correct step and PASS the props (Fixes your error!)
  switch (step) {
    case 1:
      return <Step1
        nextStep={nextStep}
        updateFormData={updateFormData}
        name={name}
        phone={phone}
        birthdate={birthdate}
        gender={gender}
      />
    case 2:
      return <Step2
        nextStep={nextStep}
        prevStep={prevStep}
        updateFormData={updateFormData}
        lrn={lrn}
        studentNumber={studentNumber}
        course={course}
        yearLevel={yearLevel}
      />
    case 3:
      return <Step3
        formData={formData}
        prevStep={prevStep}
        handleFinalSubmit={handleFinalSubmit}
      />
    default:
      return null
  }
}

export default Onboarding