import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/documents`

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

const calculateAmount = (credentialType, copies) => {
  const prices = {
    'Transcript of Records': 500,
    'Diploma': 300,
    'Form 138': 100,
    'Certificate of Enrollment': 100,
    'Course Description': 200,
    'Good Moral Character': 100,
    'Honorable Dismissal': 300,
  }
  return (prices[credentialType] || 100) * copies
}

const mapBackendToFrontend = (doc) => {
  if (!doc) return null
  
  const statusMap = {
    'Pending': 'pending',
    'Payment Pending': 'pending',
    'Processing': 'processing',
    'Ready for Pickup': 'ready',
    'Completed': 'completed',
    'Cancelled': 'cancelled',
    'Rejected': 'cancelled',
  }

  return {
    id: doc.id,
    type: doc.credentialType,
    purpose: doc.purpose === 'Other' && doc.customPurpose ? doc.customPurpose : doc.purpose,
    copies: doc.copies,
    status: statusMap[doc.status] || 'pending',
    paymentStatus: doc.payments?.length > 0 ? 'paid' : 'unpaid',
    paymentMethod: doc.payments?.length > 0 ? 'online' : 'cash',
    date: doc.createdAt ? new Date(doc.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    amount: calculateAmount(doc.credentialType, doc.copies),
    backendDoc: doc,
  }
}

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const data = await getDocuments()
      if (!Array.isArray(data)) {
        throw new Error('Invalid response')
      }
      return data.map(mapBackendToFrontend).filter(Boolean)
    },
    retry: false,
    throwOnError: false,
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

export const DEMO_DOCUMENTS = [
  {
    id: '1',
    type: 'Transcript of Records',
    purpose: 'Employment',
    copies: 1,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    date: '2026-02-15',
    amount: 500,
  },
  {
    id: '2',
    type: 'Good Moral Character',
    purpose: 'Transfer to another school',
    copies: 1,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    date: '2026-02-10',
    amount: 100,
  },
  {
    id: '3',
    type: 'Certificate of Enrollment',
    purpose: 'Scholarship application',
    copies: 2,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    date: '2026-02-05',
    amount: 200,
  },
  {
    id: '4',
    type: 'Diploma',
    purpose: 'Job application abroad',
    copies: 1,
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: 'cash',
    date: '2026-02-18',
    amount: 300,
  },
]
