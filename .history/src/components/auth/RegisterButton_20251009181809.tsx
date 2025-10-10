import Button from '@/components/ui/Button'

interface RegisterButtonProps {
  loading: boolean
}

export default function RegisterButton({ loading }: RegisterButtonProps) {
  return (
    <Button
      type="submit"
      loading={loading}
      disabled={loading}
    >
      {loading ? 'Creating account...' : 'Create Account'}
    </Button>
  )
}