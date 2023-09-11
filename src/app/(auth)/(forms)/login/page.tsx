'use client'

import { LoginInForm } from '@/components/forms/login'
import { Card, CardBody, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PiUserCircleDuotone } from 'react-icons/pi'

export default function LogIn() {
  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiUserCircleDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">Log In</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <LoginInForm>
              <p className="text-center text-small">
                {"Don't have an account?"}
                <Link as={NextLink} className="ml-2" isBlock size="sm" href="/signup">
                  Sign Up
                </Link>
              </p>
            </LoginInForm>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
