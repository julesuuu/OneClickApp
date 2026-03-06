import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '../store/userStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const useUserSync = () => {
  const setProfile = useUserStore((state) => state.setProfile)
  const clearUser = useUserStore((state) => state.clearUser)
  const profile = useUserStore((state) => state.profile)

  const fetchUserProfile = async () => {
    const token = await window.Clerk.session.getToken()
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  }

  const { isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!window.Clerk?.session,
    retry: 1,
    onSuccess: (data) => {
      setProfile(data)
    },
    onError: () => {
      clearUser()
    },
  })

  const syncUserWithBackend = async ({ email, username }) => {
    const token = await window.Clerk.session.getToken()
    const response = await axios.post(
      `${API_URL}/api/users/sync`,
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
    loading: isLoading || mutation.isPending,
    error: error || mutation.error,
    syncUser: mutation.mutate,
    refetchProfile: refetch,
    clearUser,
  }
}
