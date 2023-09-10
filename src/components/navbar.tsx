'use client'

import { User, logOut } from '@/lib/auth/actions'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { PiDoorOpenDuotone, PiRainbowDuotone, PiStarDuotone } from 'react-icons/pi'
import { Navbar as UINavbar } from './ui/navbar'

export type NavbarProps = {
  user: User
}

export const Navbar = ({ user }: Partial<NavbarProps>) => {
  return (
    <UINavbar
      brand={
        <>
          <PiRainbowDuotone size={30} />
          <p className="font-bold text-inherit">PALS</p>
        </>
      }
      itemsMenu={<>Holiwis :D</>}
      itemsEnd={<NavbarItem>{user ? <NavUser user={user} /> : <LogInLink />}</NavbarItem>}
    />
  )
}

const NavUser = ({ user }: NavbarProps) => {
  const { push } = useRouter()

  const handleLogOut = async () => {
    await logOut()
    push('/')
  }

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger className="flex gap-2 align-items-center">
        <div>
          <Badge
            isOneChar
            placement="bottom-right"
            isInvisible={!user.attrs.admin}
            content={<PiStarDuotone size={10} />}
            color="warning"
          >
            <Avatar
              src={user.picture}
              getInitials={(n) => n.slice(0, 2).toUpperCase()}
              as="button"
              className="transition-transform"
              name={user.name}
              isBordered
            />
          </Badge>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions" disabledKeys={['name']} variant="flat">
        <DropdownItem key="name">{user.name}</DropdownItem>
        <DropdownItem key="logout" onClick={handleLogOut} startContent={<PiDoorOpenDuotone />}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

const LogInLink = () => (
  <Button as={NextLink} href="/login" color="primary" variant="shadow">
    Login
  </Button>
)
