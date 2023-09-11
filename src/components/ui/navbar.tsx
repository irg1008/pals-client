'use client'

import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as UINavbar
} from '@nextui-org/react'
import NextLink from 'next/link'
import { ReactNode, useState } from 'react'

type NavbarProps = {
  items?: ReactNode
  itemsEnd?: ReactNode
  itemsMenu?: ReactNode
  brand?: ReactNode
}

export const Navbar = ({ items, itemsEnd, itemsMenu, brand }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <UINavbar isMenuOpen={isOpen} onMenuOpenChange={setIsOpen} className="bg-inherit">
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NextLink href="/">
          <NavbarBrand className="gap-2">{brand}</NavbarBrand>
        </NextLink>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex gap-4">
        {items}
      </NavbarContent>

      <NavbarContent justify="end">{itemsEnd}</NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>{itemsMenu}</NavbarMenuItem>
      </NavbarMenu>
    </UINavbar>
  )
}
