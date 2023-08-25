'use client'

import { useAccount } from '@/hooks/useAccount'
import { useAuth } from '@/stores/auth.store'
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
  const { logout } = useAuth()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Skeleton
          className="rounded-full h-12 w-12 grid place-content-center"
          isLoaded={!isLoadingUser}
        >
          <Avatar as="button" className="transition-transform" name={user?.email} isBordered />
        </Skeleton>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions" disabledKeys={['email']} variant="flat">
        <DropdownItem key="email">{user?.email}</DropdownItem>
        <DropdownItem key="logout" onClick={() => logout()} startContent={<PiDoorOpenDuotone />}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
