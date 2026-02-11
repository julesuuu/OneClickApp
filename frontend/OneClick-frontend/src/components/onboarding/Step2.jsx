import useField from '../../hooks/useField'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { syncUserWithBackend } from '../../redux/userSlice'
import { useAuth } from '@clerk/clerk-react'

const Step2 = () => {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const { profile } = useSelector((state) => state.user)

  const name = useField('text')
  const phone = useField('tel')
  const birthdate = useField('date')
  const gender = useField('select', 'male')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = await getToken()

      const profileData = {
        name: name.attributes.value,
        phone: phone.attributes.value,
        birthdate: birthdate.attributes.value,
        gender: gender.attributes.value
      }

      await axios.patch(
        'http://localhost:3001/api/users/profile',
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      dispatch(syncUserWithBackend({
        email: profile.email,
        username: profile.username
      }))
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message)
    }
  }

  return (
    <div className="form-card">
      <h2>Step 2: Personal Information</h2>
      <p>Tell us a bit more about yourself.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input {...name.attributes} placeholder="e.g. Juan Dela Cruz" required />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input {...phone.attributes} placeholder="09123456789" required />
        </div>

        <div className="input-group">
          <label>Birthdate</label>
          <input {...birthdate.attributes} required />
        </div>

        <div className="input-group">
          <label>Gender</label>
          <select {...gender.attributes}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn-save">Save and Continue</button>
      </form>
    </div>
  )
}
export default Step2