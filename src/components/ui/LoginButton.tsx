import Button from '@/components/ui/Button'

interface LoginButtonProps {
  loading: boolean
}

export default function LoginButton({ loading }: LoginButtonProps) {
  return (
    <Button
      type="submit"
      loading={loading}
      disabled={loading}
    >
      {loading ? 'Signing in...' : 'Sign In'}
    </Button>
  )
}