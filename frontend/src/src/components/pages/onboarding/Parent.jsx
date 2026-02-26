import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import useField from '../../../hooks/useField'
import { syncUserWithBackend } from '@/redux/userSlice'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const Onboarding = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { profile } = useSelector((state) => state.user)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const name = useField('text')
  const phone = useField('tel')
  const birthdate = useField('date')
  const gender = useField('select', 'male')
  const lrn = useField('text')
  const studentNumber = useField('text')
  const course = useField('select', 'BSIT')
  const yearLevel = useField('select', '1st Year')
  
  const formData = {
    name: name.attributes.value,
    phone: phone.attributes.value,
    birthdate: birthdate.attributes.value,
    gender: gender.attributes.value,
    lrn: lrn.attributes.value,
    studentNumber: studentNumber.attributes.value,
    course: course.attributes.value,
    yearLevel: yearLevel.attributes.value,
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const token = await getToken()
      
      const finalData = {
        ...formData,
        profileCompleted: true
      }

      await axios.patch('http://localhost:3001/api/users/profile', finalData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (profile) {
        dispatch(syncUserWithBackend({ email: profile.email, username: profile.username }))
      }
      
      navigate('/dashboard')
    } catch (err) {
      console.error('Submission failed', err)
    } finally {
      setIsLoading(false)
    }
  }


  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

  return (
    <div>
      {currentStep === 1 && (
        <Step1 name={name}
          phone={phone}
          birthdate={birthdate}
          gender={gender}
          onNext={nextStep} />
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
      {currentStep === 3 && (
        <Step3
          formData={formData}
          onBack={prevStep}
          onFinalSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default Onboarding
