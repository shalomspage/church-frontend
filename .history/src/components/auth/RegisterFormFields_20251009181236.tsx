import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '@/components/ui/Input'

interface RegisterFormData {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormFieldsProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  showPassword: boolean
  showConfirmPassword: boolean
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
}

export default function RegisterFormFields({
  register,
  errors,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword
}: RegisterFormFieldsProps) {
  return (
    <>
      <Input
        {...register('username')}
        label="Username"
        type="text"
        id="username"
        placeholder="Choose a username"
        error={errors.username?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('firstName')}
          label="First Name"
          type="text"
          id="firstName"
          placeholder="First name"
          error={errors.firstName?.message}
        />

        <Input
          {...register('lastName')}
          label="Last Name"
          type="text"
          id="lastName"
          placeholder="Last name"
          error={errors.lastName?.message}
        />
      </div>

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
        placeholder="Create a password"
        error={errors.password?.message}
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />

      <Input
        {...register('confirmPassword')}
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        showPasswordToggle
        showPassword={showConfirmPassword}
        onTogglePassword={onToggleConfirmPassword}
      />
    </>
  )
}