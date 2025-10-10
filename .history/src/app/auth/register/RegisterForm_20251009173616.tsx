'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegisterMutation } from '@/services/authApi'
import { setCredentials } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

// Components
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import FormError from '@/components/ui/FormError'
import FormFooter from '../FormFooter'
import FormHeader from '../FormHeader'


const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface ApiError {
  data?: {
    message?: string
  }
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data
      console.log('Registration attempt:', registerData)
      const result = await register(registerData).unwrap()
      dispatch(setCredentials(result))
      router.push('/dashboard')
    } catch (error: unknown) {
      const apiError = error as ApiError
      setError('root', {
        type: 'manual',
        message: apiError?.data?.message || 'Registration failed. Please try again.',
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <FormHeader
          title="Create Account"
          subtitle="Join our church community"
          backHref="/auth/login"
          backText="Back to login"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...registerField('username')}
            label="Username"
            type="text"
            id="username"
            placeholder="Choose a username"
            error={errors.username?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              {...registerField('firstName')}
              label="First Name"
              type="text"
              id="firstName"
              placeholder="First name"
              error={errors.firstName?.message}
            />

            <Input
              {...registerField('lastName')}
              label="Last Name"
              type="text"
              id="lastName"
              placeholder="Last name"
              error={errors.lastName?.message}
            />
          </div>

          <Input
            {...registerField('email')}
            label="Email Address"
            type="email"
            id="email"
            placeholder="Enter your email"
            error={errors.email?.message}
          />

          <Input
            {...registerField('password')}
            label="Password"
            type="password"
            id="password"
            placeholder="Create a password"
            error={errors.password?.message}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <Input
            {...registerField('confirmPassword')}
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <FormError message={errors.root?.message} />

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <FormFooter
          question="Already have an account?"
          linkText="Sign in"
          linkHref="/auth/login"
        />
      </div>
    </div>
  )
}