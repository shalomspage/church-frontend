import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/homepage/hero-bg.avif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-white/30"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}