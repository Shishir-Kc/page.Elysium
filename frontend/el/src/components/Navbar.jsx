import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="animate-in fade-in slide-in-from-top-4 duration-1000">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/" 
                className="px-4 py-2 text-sm font-medium text-fog hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)] transition-all duration-300"
              >
                Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-fog hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)] transition-all duration-300 data-[open]:text-ivory data-[open]:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)]">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[440px] p-4 bg-void/95 backdrop-blur-2xl border border-ash/10 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="group flex flex-col gap-1.5 p-4 rounded-xl hover:bg-charcoal/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-ash/10">
                    <div className="size-8 rounded-lg bg-charcoal/50 flex items-center justify-center text-ivory group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                    </div>
                    <h3 className="text-sm font-semibold text-ivory mt-1">Analytics</h3>
                    <p className="text-xs text-fog leading-relaxed">Deep insights into your project's performance and growth.</p>
                  </div>
                  <div className="group flex flex-col gap-1.5 p-4 rounded-xl hover:bg-charcoal/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-ash/10">
                    <div className="size-8 rounded-lg bg-charcoal/50 flex items-center justify-center text-ivory group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    </div>
                    <h3 className="text-sm font-semibold text-ivory mt-1">Interface</h3>
                    <p className="text-xs text-fog leading-relaxed">Beautifully crafted UI components for your next big thing.</p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-fog hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)] transition-all duration-300 data-[open]:text-ivory data-[open]:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)]">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[280px] p-2 bg-void/95 backdrop-blur-2xl border border-ash/10 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-1">
                  <NavigationMenuLink href="/docs" className="flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/30 transition-all duration-300 group">
                    <div className="size-8 rounded-lg bg-charcoal/30 flex items-center justify-center text-fog group-hover:text-ivory transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ivory">Documentation</div>
                      <p className="text-[10px] text-fog">Guides and API references</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/changelog" className="flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/30 transition-all duration-300 group">
                    <div className="size-8 rounded-lg bg-charcoal/30 flex items-center justify-center text-fog group-hover:text-ivory transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ivory">Changelog</div>
                      <p className="text-[10px] text-fog">See what's new in the latest update</p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/pricing" 
                className="px-4 py-2 text-sm font-medium text-fog hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(245,245,245,0.6)] transition-all duration-300"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  )
}

export default Navbar
