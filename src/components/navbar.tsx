'use client'

import { useAccount } from '@/hooks/useAccount'
import { useAuth } from '@/hooks/useAuth'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  Skeleton
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { PiDoorOpenDuotone, PiRainbowDuotone } from 'react-icons/pi'
import { Navbar as UINavbar } from './ui/navbar'

export type NavbarProps = {
  isLogged: boolean
}

export const Navbar = ({ isLogged }: NavbarProps) => {
  return (
    <UINavbar
      itemsEnd={
        <>
          <NavbarItem>{isLogged ? <NavUser /> : <LogInLink />}</NavbarItem>
        </>
      }
      itemsMenu={<>Holiwis :D</>}
      brand={
        <>
          <PiRainbowDuotone size={30} />
          <p className="font-bold text-inherit">PALS</p>
        </>
      }
    />
  )
}

const LogInLink = () => (
  <Button as={NextLink} href="/login" color="primary" variant="shadow">
    Login
  </Button>
)

const NavUser = () => {
  const { user, isLoading: isLoadingUser } = useAccount()
  const { push } = useRouter()
  const { logout } = useAuth()

  const doLogout = async () => {
    await logout()
    push('/')
  }

  return (
    <Dropdown>
      <Skeleton
        className="rounded-full h-12 w-12 grid place-content-center"
        isLoaded={!isLoadingUser}
      >
        <DropdownTrigger>
          <Avatar as="button" className="transition-transform" name={user?.email} isBordered />
        </DropdownTrigger>
      </Skeleton>
      <DropdownMenu aria-label="User actions" disabledKeys={['email']} variant="flat">
        <DropdownItem key="email">{user?.email}</DropdownItem>
        <DropdownItem key="logout" onClick={doLogout} startContent={<PiDoorOpenDuotone />}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
