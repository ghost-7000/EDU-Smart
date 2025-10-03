
"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { setLanguage } = useLanguage()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle language">
                <Globe className="h-5 w-5" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('ar')}>
                العربية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
