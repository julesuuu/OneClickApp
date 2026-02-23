import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { FileText, Clock, CheckCircle, Calendar, DollarSign, Plus, Eye, CreditCard, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NavBar from '@/components/ui/NavBar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const Dashboard = () => {
  const { user } = useUser()
  const [requests] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedRequests = localStorage.getItem(`requests_${user?.id}`)
      if (savedRequests) {
        return JSON.parse(savedRequests)
      }
      const demoRequests = [
        {
          id: '1',
          type: 'Transcript of Records',
          status: 'processing',
          paymentStatus: 'paid',
          date: '2026-02-15',
          amount: 150,
        },
        {
          id: '2',
          type: 'Good Moral Character',
          status: 'ready',
          paymentStatus: 'paid',
          date: '2026-02-10',
          amount: 50,
        },
      ]
      localStorage.setItem(`requests_${user?.id}`, JSON.stringify(demoRequests))
      return demoRequests
    }
    return []
  })

  const stats = {
    pending: requests.filter(r => r.status === 'pending' || r.status === 'processing').length,
    completed: requests.filter(r => r.status === 'completed').length,
    upcomingAppointments: 2,
    balanceDue: requests.filter(r => r.paymentStatus === 'unpaid').reduce((sum, r) => sum + r.amount, 0),
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'ready':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName || user?.username}!
          </h1>
          <p className="text-muted-foreground">Here's an overview of your credential requests.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-3xl font-bold text-foreground">{stats.pending}</span>
              </div>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-3xl font-bold text-foreground">{stats.completed}</span>
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-bold text-foreground">{stats.upcomingAppointments}</span>
              </div>
              <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-3xl font-bold text-foreground">₱{stats.balanceDue}</span>
              </div>
              <p className="text-sm text-muted-foreground">Balance Due</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Requests</CardTitle>
              <Button variant="outline" size="sm" disabled>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No requests yet</p>
                <Button disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Request
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.slice(0, 5).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            request.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }`}>
                            {request.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{request.date}</TableCell>
                        <TableCell className="font-mono">₱{request.amount}</TableCell>
                        <TableCell>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" disabled>
                              <Eye className="w-4 h-4" />
                            </Button>
                            {request.paymentStatus === 'unpaid' && (
                              <Button variant="ghost" size="icon" disabled>
                                <CreditCard className="w-4 h-4" />
                              </Button>
                            )}
                            {request.status === 'pending' && (
                              <Button variant="ghost" size="icon" disabled>
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Need a Document?</h3>
              <p className="text-primary-foreground/80 mb-4">Submit a new request and get your credentials in just a few days.</p>
              <Button variant="secondary" disabled>
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Schedule Pickup</h3>
              <p className="text-teal-100 mb-4">Choose a convenient time to collect your ready documents.</p>
              <Button variant="secondary" disabled>
                <Calendar className="w-4 h-4 mr-2" />
                View Appointments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
