import useField from '../../hooks/useField'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend } from '../../redux/userSlice'
import { useAuth } from '@clerk/clerk-react'

const Step3 = () => {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const { profile } = useSelector((state) => state.user)

  // Academic Fields
  const lrn = useField('text')
  const studentNumber = useField('text')
  const course = useField('select', 'BSIT')
  const yearLevel = useField('select', '1st Year')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = await getToken()

      const academicData = {
        lrn: lrn.attributes.value,
        studentNumber: studentNumber.attributes.value,
        course: course.attributes.value,
        yearLevel: yearLevel.attributes.value,
        profileCompleted: true
      }

      await axios.patch(
        'http://localhost:3001/api/users/profile',
        academicData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      dispatch(syncUserWithBackend({
        email: profile.email,
        username: profile.username
      }))

    } catch (err) {
      console.error("Final step failed:", err.response?.data || err.message)
    }
  }

  return (
    <div className="form-card">
      <h2>Step 3: Academic Information</h2>
      <p>Almost done! Provide your school details.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>LRN (12 Digits)</label>
          <input {...lrn.attributes} placeholder="123456789012" required />
        </div>

        <div className="input-group">
          <label>Student Number</label>
          <input {...studentNumber.attributes} placeholder="2024-0001" required />
        </div>

        <div className="input-group">
          <label>Course</label>
          <select {...course.attributes}>
            <option value="BSIT">BS Information Technology</option>
            <option value="BSBA">BS Business Administration</option>
            <option value="BSCrim">BS Criminology</option>
            <option value="BSHM">BS Hotel Management</option>
            <option value="BSE">BS Education</option>
          </select>
        </div>

        <div className="input-group">
          <label>Year Level</label>
          <select {...yearLevel.attributes}>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <button type="submit" className="btn-finish">Complete Registration</button>
      </form>
    </div>
  )
}

export default Step3