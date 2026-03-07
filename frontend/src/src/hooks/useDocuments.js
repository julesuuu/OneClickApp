import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = '/api/documents'

const getDocuments = async () => {
  const token = await window.Clerk.session.getToken()
  const response = await axios.get(`${API_URL}/my-request`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

const createDocument = async (documentData) => {
  const token = await window.Clerk.session.getToken()
  const response = await axios.post(API_URL, documentData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })
}

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}
