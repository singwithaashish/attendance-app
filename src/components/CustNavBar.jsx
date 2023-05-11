import { Navbar } from 'flowbite-react'
import React from 'react'
import { useLocation } from 'react-router-dom';

function CustNavBar() {
    const location = useLocation();
  const { pathname } = location;

  const isActive = (path) => pathname === path;
  return (
    <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="https://flowbite.com/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      className="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Flowbite
    </span>
  </Navbar.Brand>
  {/* <div className="flex md:order-2">
    <Button>
      Get started
    </Button>
    <Navbar.Toggle />
  </div> */}
  <Navbar.Collapse>
    <Navbar.Link
      href="/dashboard"
      active={isActive("/dashboard")}
    >
      Dashboard
    </Navbar.Link>
    <Navbar.Link href="/attendance" active={isActive("/attendance")}>
      Attendance
    </Navbar.Link>
    <Navbar.Link href="/register" active={isActive("/register")}>
      Registration
    </Navbar.Link>
    {/* <Navbar.Link href="/navbars">
      Pricing
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link> */}
  </Navbar.Collapse>
</Navbar>
  )
}

export default CustNavBar