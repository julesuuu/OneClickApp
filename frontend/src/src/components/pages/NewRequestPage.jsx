import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { FileText, Upload, CreditCard, Banknote, Check, ArrowLeft, ArrowRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NavBar from '@/components/ui/NavBar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const NewRequestPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [step, setStep] = useState(1)

  const [documentType, setDocumentType] = useState('')
  const [purpose, setPurpose] = useState('')
  const [otherPurpose, setOtherPurpose] = useState('')
  const [copies, setCopies] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [attachments, setAttachments] = useState([])

  const documentTypes = [
    { value: 'tor', label: 'Transcript of Records (TOR)', price: 500 },
    { value: 'diploma', label: 'Diploma', price: 300 },
    { value: 'good-moral', label: 'Certificate of Good Moral Character', price: 100 },
    { value: 'coe', label: 'Certificate of Enrollment', price: 200 },
    { value: 'cog', label: 'Certificate of Grades', price: 150 },
    { value: 'hd', label: 'Honorable Dismissal', price: 250 },
  ]

  const purposes = [
    'Employment',
    'Further studies/Admission',
    'Scholarship application',
    'Transfer to another school',
    'Visa/Immigration',
    'Board exam',
    'Other',
  ]

  const selectedDoc = documentTypes.find((d) => d.value === documentType)
  const totalAmount = selectedDoc ? selectedDoc.price * copies : 0

  const handleSubmit = () => {
    const newRequest = {
      id: Date.now().toString(),
      type: selectedDoc?.label || '',
      purpose: purpose === 'Other' ? otherPurpose : purpose,
      copies,
      status: 'pending',
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'unpaid',
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
    }

    const existingRequests = localStorage.getItem(`requests_${user?.id}`)
    const requests = existingRequests ? JSON.parse(existingRequests) : []
    requests.unshift(newRequest)
    localStorage.setItem(`requests_${user?.id}`, JSON.stringify(requests))

    navigate('/requests')
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const steps = [
    { num: 1, label: 'Document' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Attachments' },
    { num: 4, label: 'Payment' },
  ]

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">New Document Request</h1>
          <p className="text-muted-foreground">Fill out the form to request your credentials</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative flex justify-between">
            {/* Background Connecting Line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-muted -z-0" />
            
            {steps.map((s, index) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-background transition-colors duration-300 ${
                    s.num < step
                      ? 'bg-teal-500 text-white'
                      : s.num === step
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s.num < step ? <Check className="w-5 h-5" /> : s.num}
                </div>

                {/* Label - Positioned absolutely or with margin to ensure center alignment */}
                <div className="absolute top-12 text-center w-32">
                  <span className={`text-xs font-bold uppercase tracking-tighter ${
                    s.num === step ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {s.label}
                  </span>
                </div>

                {/* Completed Line Overlay (Optional: Makes the line turn green as you progress) */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-[50%] w-full h-1 -z-10 ${
                      s.num < step ? 'bg-teal-500' : 'bg-transparent'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="max-w-2xl mx-auto">
          {/* Step 1: Select Document */}
          {step === 1 && (
            <CardHeader>
              <CardTitle>Select Document Type</CardTitle>
            </CardHeader>
          )}
          {step === 1 && (
            <CardContent className="space-y-4">
              {documentTypes.map((doc) => (
                <label
                  key={doc.value}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    documentType === doc.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="documentType"
                    value={doc.value}
                    checked={documentType === doc.value}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{doc.label}</p>
                    <p className="text-sm text-muted-foreground">₱{doc.price}</p>
                  </div>
                </label>
              ))}

              <Button
                onClick={() => setStep(2)}
                disabled={!documentType}
                className="w-full mt-6"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
          )}
          {step === 2 && (
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {purpose === 'Other' && (
                <div className="space-y-2">
                  <Label>Please specify</Label>
                  <Input
                    value={otherPurpose}
                    onChange={(e) => setOtherPurpose(e.target.value)}
                    placeholder="Enter your purpose"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Number of Copies</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={copies}
                  onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
                />
                {copies > 1 && (
                  <p className="text-sm text-muted-foreground">
                    Additional copies: +₱{(copies - 1) * 50}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!purpose || (purpose === 'Other' && !otherPurpose)}
                  className="flex-1"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          )}

          {/* Step 3: Attachments */}
          {step === 3 && (
            <CardHeader>
              <CardTitle>Upload Attachments (Optional)</CardTitle>
            </CardHeader>
          )}
          {step === 3 && (
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  You may upload relevant documents such as valid ID, proof of payment, or other supporting files.
                </p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <Label className="cursor-pointer">
                    <span className="text-primary hover:underline">Click to upload</span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </Label>
                  <p className="text-sm text-muted-foreground mt-2">
                    PDF, JPG, PNG up to 10MB each
                  </p>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Uploaded files:</p>
                    <ul className="space-y-2">
                      {attachments.map((file, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{file.name}</span>
                          <button onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}>
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          )}

          {/* Step 4: Payment Method */}
          {step === 4 && (
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
          )}
          {step === 4 && (
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-sm font-medium mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Document:</span>
                    <span>{selectedDoc?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Copies:</span>
                    <span>{copies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per copy:</span>
                    <span>₱{selectedDoc?.price}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-primary">₱{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'online'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <p className="font-medium">Pay Online via PayMongo</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Credit/Debit Card, GCash, PayMaya, and other online payment methods.
                    </p>
                  </div>
                </Label>

                <Label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="w-5 h-5 text-primary" />
                      <p className="font-medium">Cash on Pickup</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pay when you collect your documents at the registrar's office.
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

export default NewRequestPage
