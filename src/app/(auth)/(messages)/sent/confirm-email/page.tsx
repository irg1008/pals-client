import { PiThumbsUpDuotone } from 'react-icons/pi'

export default function SignUpCompleted() {
  return (
    <>
      <PiThumbsUpDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">Confirmation Email Sent</h2>
        <p className="text-foreground-500">Please check your email to confirm your account.</p>
      </div>
    </>
  )
}
