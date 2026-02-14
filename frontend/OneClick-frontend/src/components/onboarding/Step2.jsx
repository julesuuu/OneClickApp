import useField from '../../hooks/useField'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend } from '../../redux/userSlice'
import { useAuth } from '@clerk/clerk-react'

const Step2 = () => {
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-sans">

      {/* The "Hugging" Background */}
      <div className="bg-gray-50 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">

        {/* 1. Header Section */}
        <div className="w-full sm:max-w-md mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Student Information
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step 2 of 3 • Academic Details
          </p>
        </div>

        {/* 2. The Main Card */}
        <div className="w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 rounded-2xl sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* LRN Input (12 digits usually) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LRN (Learner Reference Number)</label>
                <input
                  {...lrn.attributes}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="12-digit number"
                  required
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Number</label>
                <input
                  {...studentNumber.attributes}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="2024-XXXXX"
                  required
                />
              </div>

              {/* Course & Year Level Group */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select
                    {...course.attributes}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  >
                    <option value="BSIT">BSIT</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIS">BSIS</option>
                    <option value="BSEMC">BSEMC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                  <select
                    {...yearLevel.attributes}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
                >
                  Proceed to Review
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