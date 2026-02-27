import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { User, Lock, Bell, Save, GraduationCap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import NavBar from '@/components/ui/NavBar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const SettingsPage = () => {
  const { user } = useUser()
  const [saved, setSaved] = useState(false)

  const [fullName, setFullName] = useState(user?.firstName + ' ' + (user?.lastName || ''))
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')

  const [lrn, setLrn] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [course, setCourse] = useState('')
  const [yearLevel, setYearLevel] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [statusUpdates, setStatusUpdates] = useState(true)

  const courses = ['BSIT', 'BSBA', 'BSCrim', 'BSHM', 'BSE']
  const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduating', 'Graduate']

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-100 px-4 py-3 rounded-lg flex items-center">
            <Save className="w-5 h-5 mr-2" />
            <span>Changes saved successfully!</span>
          </div>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-4">
                  <TabsList className="flex flex-col w-full bg-transparent h-auto space-y-1">
                    <TabsTrigger
                      value="profile"
                      className="justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Personal Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <GraduationCap className="w-4 h-4 mr-3" />
                      Academic Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className="justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Lock className="w-4 h-4 mr-3" />
                      Password
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="justify-start px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Bell className="w-4 h-4 mr-3" />
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="md:w-3/4">
              {/* Personal Info Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0912 345 6789"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Birthdate</Label>
                        <Input
                          type="date"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input value={user?.username || ''} disabled />
                        <p className="text-xs text-muted-foreground">Username cannot be changed</p>
                      </div>
                    </div>

                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Academic Info Tab */}
              <TabsContent value="academic">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Learner Reference Number (LRN)</Label>
                        <Input
                          value={lrn}
                          onChange={(e) => setLrn(e.target.value)}
                          placeholder="12-digit number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Student Number</Label>
                        <Input
                          value={studentNumber}
                          onChange={(e) => setStudentNumber(e.target.value)}
                          placeholder="2024-XXXXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Course</Label>
                        <Select value={course} onValueChange={setCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Year Level</Label>
                        <Select value={yearLevel} onValueChange={setYearLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year level" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearLevels.map((y) => (
                              <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Password Tab */}
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Ensure your password is at least 6 characters long
                    </p>

                    <div className="max-w-md space-y-4">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      <Button
                        onClick={handleSave}
                        disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Choose how you want to receive updates about your requests
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive updates and announcements via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Get text messages for important updates
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={smsNotifications}
                          onChange={(e) => setSmsNotifications(e.target.checked)}
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Request Status Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Be notified when your request status changes
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={statusUpdates}
                          onChange={(e) => setStatusUpdates(e.target.checked)}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default SettingsPage
