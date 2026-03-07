import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '../store/userStore'

export const useUserSync = () => {
  const setProfile = useUserStore((state) => state.setProfile)
  const clearUser = useUserStore((state) => state.clearUser)
  const profile = useUserStore((state) => state.profile)

  const syncUserWithBackend = async ({ email, username }) => {
    const token = await window.Clerk.session.getToken()
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || ''}/api/users/sync`,
      { email, username },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  }

  const mutation = useMutation({
    mutationFn: syncUserWithBackend,
    onSuccess: (data) => {
      setProfile(data)
    },
    onError: (error) => {
      console.error('User sync failed:', error)
    },
  })

  return {
    profile,
    loading: mutation.isPending,
    error: mutation.error,
    syncUser: mutation.mutate,
    clearUser,
  }
}
