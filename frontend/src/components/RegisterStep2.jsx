import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { step2Schema } from '../utils/validators'
import { setNotification } from '../reducers/notificationReducer'
import { updateProfile } from '../reducers/authReducer'

const RegisterStep2 = () => {
  const dispatch = useDispatch()

  const { reset: resetName, ...name } = useField('text')
  const { reset: resetBirthdate, ...brithdate } = useField('date')
  const { reset: resetPhone, ...phone } = useField('text')

  const submitStep2 = async (event) => {
    event.preventDefault()

    const dataToValidate = {
      name: name.value,
      brithdate: brithdate.value,
      phone: phone.value
    }

    const result = step2Schema.safeParse(dataToValidate)

    if (!result.success) {
      return dispatch(setNotification(result.error.errors[0].message))
    }

    await dispatch(updateProfile(result.data))
    resetName(); resetBirthdate(); resetPhone();
  }

  return (
    <form onSubmit={submitStep2}>
      <input {...name} placeholder='full name' />
      <input {...brithdate} />
      <input {...phone} placeholder='phone number' />
      <button type='submit'>Continue</button>
    </form>
  )
}

export default RegisterStep2