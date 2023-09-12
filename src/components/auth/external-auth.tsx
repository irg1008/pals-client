import { ExeternalAuthProviders, externalLogIn } from '@/lib/auth/actions'
import { Button } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'
import { GrApple } from 'react-icons/gr'

type ProviderConfig =
  | {
      label: string
      hidden?: false
    }
  | {
      label?: string
      hidden: true
    }

type ExternalAuthProps = Record<ExeternalAuthProviders, ProviderConfig>

export const ExternalAuth = ({ google, apple }: ExternalAuthProps) => {
  return (
    <>
      {!google.hidden && (
        <Button
          variant="shadow"
          onClick={() => externalLogIn('google')}
          className="bg-foreground-900 text-background"
        >
          <FcGoogle className="mr-2" size={20} />
          {google.label}
        </Button>
      )}
      {!apple.hidden && (
        <Button
          variant="shadow"
          onClick={() => externalLogIn('apple')}
          className="bg-foreground-900 text-background"
        >
          <GrApple className="mr-2" size={20} />
          {apple.label}
        </Button>
      )}
    </>
  )
}
