import { PiLockKeyDuotone } from 'react-icons/pi'

export default function ResetPasswordRequest() {
  return (
    <>
      <PiLockKeyDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">Password reset link sent</h2>
        <p className="text-foreground">
          Please check your email and follow the instructions to reset your password.
        </p>
      </div>
    </>
  )
}
