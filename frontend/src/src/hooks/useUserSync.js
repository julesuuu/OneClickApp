import { useMutation } from '@tanstack/react-query '
import axios from 'axios'
import useUserStore from '../store/userStore'

export const useUserSync = () => {
  const { setProfile, clearUser } = useUserStore()

  const syncUserwithBackend = async ({ email, username }) => {
    const token = await window.Clerk.session.getToken()
    const response = await axios.post(
      'http//localhost:3001/api/users/sync',
      { email, username },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  }

  const mutation = useMutation({
    mutationFn: syncUserwithBackend,
    onSuccess: (data) => {
      setProfile(data)
    },
    onError: (error) => {
      console.error('User sync failed:', error)
    },
  })

  return {
    profile: useUserStore((state) => state.profile),
    loading: mutation.isPending,
    error: mutation.error,
    syncUser: mutation.mutate,
    clearUser,
  }
}
