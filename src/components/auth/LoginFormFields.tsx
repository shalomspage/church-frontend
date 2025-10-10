import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '@/components/ui/Input'

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginFormData>
  errors: FieldErrors<LoginFormData>
  showPassword: boolean
  onTogglePassword: () => void
}

export default function LoginFormFields({
  register,
  errors,
  showPassword,
  onTogglePassword
}: LoginFormFieldsProps) {
  return (
    <>
      <Input
        {...register('email')}
        label="Email Address"
        type="email"
        id="email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <Input
        {...register('password')}
        label="Password"
        type="password"
        id="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />
    </>
  )
}