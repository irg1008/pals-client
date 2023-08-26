'use client'

import { LoginInForm } from '@/components/forms/login'
import { SignUpForm } from '@/components/forms/signup'
import { Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { Key, useState } from 'react'
import { PiUserDuotone } from 'react-icons/pi'

type Props = {
  params: { form: Selection }
}

enum Selection {
  signup = 'signup',
  login = 'login'
}

export default function Layout({ params: { form } }: Props) {
  const enumValues = Object.values(Selection)
  if (!enumValues.includes(form)) notFound()
  const [selected, setSelected] = useState<Key>(form)

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
          onSelectionChange={(s) => setSelected(s)}
        >
          <Tab key={Selection.login} title="Login">
            <Card>
              <CardBody className="overflow-hidden">
                <LoginInForm>
                  <Footer
                    label="Don't have an account?"
                    buttonLabel="Sign up"
                    selection={Selection.signup}
                    onPress={setSelected}
                  />
                </LoginInForm>
              </CardBody>
            </Card>
          </Tab>
          <Tab key={Selection.signup} title="Sign up">
            <Card>
              <CardBody className="overflow-hidden">
                <SignUpForm>
                  <Footer
                    label="Already have an account?"
                    buttonLabel="Login"
                    selection={Selection.login}
                    onPress={setSelected}
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
  onPress,
  selection
}: {
  label: string
  buttonLabel: string
  onPress: (s: Selection) => void
  selection: Selection
}) => (
  <p className="text-center text-small">
    {label}
    <Link className="ml-2" isBlock size="sm" onPress={() => onPress(selection)}>
      {buttonLabel}
    </Link>
  </p>
)
