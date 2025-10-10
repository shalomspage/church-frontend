'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegisterMutation } from '@/services/authApi'
import { setCredentials } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

// Components
import FormHeader from '@/components/auth/FormHeader'
import FormFooter from '@/components/auth/FormFooter'
import FormError from '@/components/ui/FormError'
import RegisterButton from '@/components/auth/RegisterButton'
import RegisterFormFields from '@/components/auth/RegisterFormFields'

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
          <RegisterFormFields
            register={registerField}
            errors={errors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <FormError message={errors.root?.message} />

          <RegisterButton loading={isLoading} />
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