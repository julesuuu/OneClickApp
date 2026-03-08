import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Eye, CreditCard, X, Filter, Plus, Download } from 'lucide-react'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDocuments, DEMO_DOCUMENTS } from '@/hooks/useDocuments'

const RequestsPage = () => {
  const { user } = useUser()
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPayment, setFilterPayment] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [useDemoData, setUseDemoData] = useState(false)

  const { data: apiDocuments, isLoading, error } = useDocuments()

  const requests = useDemoData || (error || !apiDocuments || !Array.isArray(apiDocuments) || !apiDocuments.length) ? DEMO_DOCUMENTS : apiDocuments

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

  const filteredRequests = requests.filter((req) => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false
    if (filterPayment !== 'all' && req.paymentStatus !== filterPayment) return false
    return true
  })

  const totalAmount = filteredRequests.reduce((sum, r) => sum + r.amount, 0)
  const unpaidBalance = filteredRequests.filter(r => r.paymentStatus === 'unpaid').reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Requests</h1>
            <p className="text-muted-foreground">Manage and track all your document requests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setUseDemoData(!useDemoData)}>
              {useDemoData ? 'Using Demo Data' : 'Use Real API'}
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/new-request">
                <Plus className="w-4 h-4 mr-2" />
                New Request 
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {showFilters && (
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Payment:</span>
                    <Select value={filterPayment} onValueChange={setFilterPayment}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(filterStatus !== 'all' || filterPayment !== 'all') && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setFilterStatus('all')
                        setFilterPayment('all')
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}

              <div className="ml-auto text-sm text-muted-foreground">
                {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No requests found</p>
                <Button disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Request
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell className="text-muted-foreground">{request.purpose}</TableCell>
                        <TableCell>{request.copies}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className={`px-3 py-1 rounded-full text-xs inline-block mb-1 ${
                              request.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                            }`}>
                              {request.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {request.paymentMethod === 'online' ? 'Online' : 'Cash on pickup'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">₱{request.amount}</TableCell>
                        <TableCell className="text-muted-foreground">{request.date}</TableCell>
                        <TableCell>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" disabled>
                              <Eye className="w-4 h-4" />
                            </Button>
                            {request.status === 'completed' && (
                              <Button variant="ghost" size="icon" disabled>
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
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

        {/* Summary Cards */}
        {filteredRequests.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal text-muted-foreground">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{filteredRequests.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal text-muted-foreground">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">₱{totalAmount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal text-muted-foreground">Unpaid Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive">₱{unpaidBalance}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestsPage
