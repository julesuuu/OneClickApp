import { useState } from 'react'

const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  
  return {
    attributes: {
      type,
      value,
      onChange
    },
    reset,
    value 
  }
}

export default useField