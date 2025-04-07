"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Code, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 glassmorphism shadow-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-heading">CodeScale</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Solutions <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="#saas" className="w-full">
                    SaaS Development
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#landing" className="w-full">
                    Landing Pages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#portfolio" className="w-full">
                    Portfolio Sites
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#showcase" className="text-sm font-medium hover:text-primary transition-colors">
              Showcase
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button className="hidden md:flex">Start Project →</Button>
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism mt-2 py-4 px-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#saas"
              className="text-sm font-medium pl-4 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SaaS Development
            </Link>
            <Link
              href="#landing"
              className="text-sm font-medium pl-4 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Landing Pages
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium pl-4 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio Sites
            </Link>
            <Link
              href="#showcase"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Showcase
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              Start Project →
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

