import useField from '../../hooks/useField'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend } from '../../redux/userSlice'
import { useAuth } from '@clerk/clerk-react'

const Step2 = () => {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const { profile } = useSelector((state) => state.user)

  // Your custom hooks
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

      await axios.patch('http://localhost:3001/api/users/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      dispatch(syncUserWithBackend({ email: profile.email, username: profile.username }))
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 ">
      {/* 1. Header Section */}
      <div className="bg-gray-50 rounded-[1.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">
        <div className="w-full sm:max-w-md mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Personal Information
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step 2 of 3 • Let's complete your profile
          </p>
        </div>

        {/* 2. The Main Card */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  {...name.attributes}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  {...phone.attributes}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="09123456789"
                  required
                />
              </div>

              {/* Birthday & Gender Group (Side by side on desktop) */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                  <input
                    {...birthdate.attributes}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    {...gender.attributes}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
                >
                  Save and Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2