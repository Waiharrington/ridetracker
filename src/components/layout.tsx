import { Outlet, useLocation, Link } from "react-router-dom"
import { LayoutDashboard, CarFront, Banknote, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Layout() {
    const location = useLocation()

    const navItems = [
        { href: "/", label: "Balance", icon: LayoutDashboard },
        { href: "/rides", label: "Carreras", icon: CarFront },
        { href: "/payments", label: "Pagos", icon: Banknote },
    ]

    return (
        <div className="flex min-h-screen flex-col bg-background pb-16">
            {/* Top Header */}
            <header className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        RideTracker
                    </h1>
                    <button className="text-muted-foreground hover:text-foreground">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 container max-w-md mx-auto">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background px-6 py-3">
                <div className="mx-auto flex max-w-md items-center justify-around">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
