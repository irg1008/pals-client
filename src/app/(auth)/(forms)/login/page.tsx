'use client'

import { LoginInForm } from '@/components/forms/login'
import { SignUpForm } from '@/components/forms/signup'
import { Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'
import { PiUserDuotone } from 'react-icons/pi'

type SelectedTab = 'login' | 'sign-up'

export default function LogIn() {
  const [selected, setSelected] = useState<SelectedTab>('login')

  return (
    <>
      <div className="self-end flex flex-col items-center">
        <PiUserDuotone size={120} className="text-primary-500"></PiUserDuotone>
        <h2 className="text-3xl text-center text-balance">
          Sign into your <strong>Pals</strong> account
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <Tabs
          fullWidth
          aria-label="Log in tabs"
          selectedKey={selected}
          radius="full"
          variant="light"
          onSelectionChange={(s) => setSelected(s as SelectedTab)}
        >
          <Tab key="login" title="Login">
            <Card>
              <CardBody className="overflow-hidden">
                <LoginInForm>
                  <Footer
                    label="Don't have an account?"
                    buttonLabel="Sign up"
                    onPress={() => setSelected('sign-up')}
                  />
                </LoginInForm>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="sign-up" title="Sign up">
            <Card>
              <CardBody className="overflow-hidden">
                <SignUpForm>
                  <Footer
                    label="Already have an account?"
                    buttonLabel="Login"
                    onPress={() => setSelected('login')}
                  />
                </SignUpForm>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

const Footer = ({
  label,
  buttonLabel,
  onPress
}: {
  label: string
  buttonLabel: string
  onPress: () => void
}) => (
  <p className="text-center text-small">
    {label}
    <Link className="ml-2" isBlock size="sm" onPress={onPress}>
      {buttonLabel}
    </Link>
  </p>
)
