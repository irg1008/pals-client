'use client'

import { Navbar as UINavbar } from '@/components/ui/navbar'
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
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { PiDoorOpenDuotone, PiRainbowDuotone, PiStarDuotone } from 'react-icons/pi'

export type NavbarProps = {
  user: User
}

export const Navbar = ({ user }: Partial<NavbarProps>) => {
  const t = useTranslations()

  return (
    <UINavbar
      brand={
        <>
          <PiRainbowDuotone size={30} />
          <p className="font-bold text-inherit uppercase">{t('brand')}</p>
        </>
      }
      itemsMenu={<>Holiwis :D</>}
      itemsEnd={<NavbarItem>{user ? <NavUser user={user} /> : <LogInLink />}</NavbarItem>}
    />
  )
}

const NavUser = ({ user }: NavbarProps) => {
  const t = useTranslations('Home')
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
          {t('logout')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

const LogInLink = () => {
  const t = useTranslations('Home')

  return (
    <Button as={NextLink} href="/login" color="primary" variant="shadow">
      {t('logInLink')}
    </Button>
  )
}
