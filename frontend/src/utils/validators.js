import { z } from 'zod'

export const step1Schema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .trim(),
  email: z.string()
    .email({ message: 'Invalid email address' })
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contatin at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number'})
}).strict()

export const step2Schema = z.object({
  name: z.string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .trim(),
  birthdate: z.coerce.date({
    required_error: 'Birthdate is required',
    invalid_type_error: 'Birthdate must be a valid date'
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 15 && age <= 100
  }, {
    message: 'Please enter a valid birthdate (age between 15 and 100)'
  }),
  phone: z.string()
  .transform((val) => val.replace(/[\s-]/g, ''))
  .pipe(
    z.string().regex(
      /^(09|\+639)\d{9}$/,
      { message: "Invalid PH mobile number. Must start with 09 or +639." }
    ))
}).strict()

export const step3Schema = z.object({
  lrn: z.string()
    .trim()
    .optional(),
  studentNumber: z.string()
    .trim()
    .optional(),
  course: z.enum([
    'BSIT', 'BSBA', 'BSCrim', 'BSHM', 'BSE'], {
    required_error: 'Course is required',
      invalid_type_error: 'Invalid course selected'
    }),
  yearLevel: z.enum([
    '1st Year', '2nd Year', '3rd Year', '4th Year',
    'Graduating', 'Graduate'
  ], {
    required_error: 'Year level is required',
    invalid_type_error: 'Invalid year level selected'
  })
}).strict()
