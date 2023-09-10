'use client'

import { SignUpForm } from '@/components/forms/signup'
import { Card, CardBody, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'

export default function SignUp() {
  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiUserCirclePlusDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">Sign Up</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <SignUpForm>
              <p className="text-center text-small">
                {'Already have an account?'}
                <Link as={NextLink} className="ml-2" isBlock size="sm" href="/login">
                  Log In
                </Link>
              </p>
            </SignUpForm>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
