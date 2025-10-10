'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLoginMutation } from '@/services/authApi'
import { setCredentials } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

// Components
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import FormError from '@/components/ui/FormError'

import FormHeader from '../../../components/auth/FormHeader'
import FormFooter from '../../../components/auth/FormFooter'
import LoginFormFields from './LoginFormFields'
import LoginButton from '@/components/ui/LoginButton'
import ForgotPasswordLink from '../../../components/auth/ForgotPasswordLink'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface ApiError {
  data?: {
    message?: string
  }
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap()
      dispatch(setCredentials(result))
      router.push('/dashboard')
    } catch (error: unknown) {
      const apiError = error as ApiError
      setError('root', {
        type: 'manual',
        message: apiError?.data?.message || 'Login failed. Please try again.',
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <FormHeader
          title="Welcome Back"
          subtitle="Sign in to your church account"
          backHref="/"
          backText="Back to home"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <LoginFormFields
            register={register}
            errors={errors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <ForgotPasswordLink />

          <FormError message={errors.root?.message} />

          <LoginButton loading={isLoading} />
        </form>

        <FormFooter
          question="Don't have an account?"
          linkText="Sign up"
          linkHref="/auth/register"
        />
      </div>
    </div>
  )
}