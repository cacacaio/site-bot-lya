import './Navbar.css'

import React from 'react'

export function NavBar(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
}) {
  return <nav className="navbar">{props.children}</nav>
}
