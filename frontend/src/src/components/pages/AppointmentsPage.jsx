import { useState } from 'react'
import { Calendar, MapPin, Clock, Edit, X, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NavBar from '@/components/ui/NavBar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      requestId: '2',
      documentType: 'Good Moral Character',
      date: '2026-02-20',
      time: '10:00 AM',
      location: 'Registrar Office, Main Building',
      status: 'scheduled',
    },
    {
      id: '2',
      requestId: '1',
      documentType: 'Transcript of Records',
      date: '2026-02-25',
      time: '2:00 PM',
      location: 'Registrar Office, Main Building',
      status: 'scheduled',
    },
  ])

  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('main')

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const upcomingAppointments = appointments.filter((a) => a.status === 'scheduled')
  const pastAppointments = appointments.filter((a) => a.status !== 'scheduled')

  const handleConfirmAppointment = () => {
    const newAppointment = {
      id: Date.now().toString(),
      requestId: selectedRequest,
      documentType: 'Good Moral Character',
      date: selectedDate,
      time: selectedTime,
      location: selectedLocation === 'main' ? 'Registrar Office, Main Building' : 'Registrar Office, Annex Building',
      status: 'scheduled',
    }
    setAppointments([newAppointment, ...appointments])
    setShowNewAppointment(false)
    setSelectedRequest('')
    setSelectedDate('')
    setSelectedTime('')
    setSelectedLocation('main')
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Appointments</h1>
            <p className="text-muted-foreground">Schedule and manage your document pickup times</p>
          </div>
          <Button onClick={() => setShowNewAppointment(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="w-16 h-16 text-muted mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Button onClick={() => setShowNewAppointment(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{appointment.documentType}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">Request #{appointment.requestId}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="text-foreground">
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="text-foreground">{appointment.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="text-foreground">{appointment.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t">
                      <Button variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Past Appointments</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.documentType}</TableCell>
                        <TableCell className="text-muted-foreground">{appointment.date}</TableCell>
                        <TableCell className="text-muted-foreground">{appointment.time}</TableCell>
                        <TableCell className="text-muted-foreground">{appointment.location}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Appointment Dialog */}
        <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Select your preferred date and time for document pickup.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Request</Label>
                <Select value={selectedRequest} onValueChange={setSelectedRequest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a ready request" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Good Moral Character - Request #2</SelectItem>
                    <SelectItem value="1">Transcript of Records - Request #1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Pickup Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Registrar Office, Main Building</SelectItem>
                    <SelectItem value="annex">Registrar Office, Annex Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewAppointment(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAppointment}
                disabled={!selectedRequest || !selectedDate || !selectedTime}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AppointmentsPage
