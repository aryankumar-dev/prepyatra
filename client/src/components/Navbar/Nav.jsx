"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogIn, LayoutDashboard, LogOut, Bot, UserCog, ShieldCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import ProfileDialog from "@/components/Auth/ProfileDialog.jsx";

function Nav() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setMenuOpen(false);
        logout().then(() => router.push('/'));
    };

    const goTo = (path) => {
        setMenuOpen(false);
        router.push(path);
    };

    const navButtons = user ? (
        <>
            <Button
                className="w-full justify-start md:w-auto md:justify-center"
                variant={pathname === '/dashboard' ? 'default' : 'outline'}
                onClick={() => goTo('/dashboard')}
            >
                <LayoutDashboard /> Dashboard
            </Button>
            <Button
                className="w-full justify-start md:w-auto md:justify-center"
                variant={pathname === '/chat' ? 'default' : 'outline'}
                onClick={() => goTo('/chat')}
            >
                <Bot /> AI Interview
            </Button>
            {user.role === 'admin' && (
                <Button
                    className="w-full justify-start md:w-auto md:justify-center"
                    variant={pathname === '/admin' ? 'default' : 'outline'}
                    onClick={() => goTo('/admin')}
                >
                    <ShieldCheck /> Admin
                </Button>
            )}
            <Button
                className="w-full justify-start md:w-auto md:justify-center"
                variant="outline"
                onClick={() => { setMenuOpen(false); setProfileOpen(true); }}
            >
                <UserCog /> Profile
            </Button>
            <Button
                className="w-full justify-start md:w-auto md:justify-center"
                variant="outline"
                onClick={handleLogout}
            >
                <LogOut /> Logout
            </Button>
            <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
        </>
    ) : (
        <Button className="w-full md:w-auto" onClick={() => goTo('/login')}>
            <LogIn /> Login
        </Button>
    );

    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <div>
                    <span className="text-xl font-extrabold text-primary">PrepYatra</span>
                    <p className="text-xs text-muted-foreground">By Aryan Kumar</p>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                    {navButtons}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <X /> : <Menu />}
                </Button>
            </div>
            {menuOpen && (
                <div className="flex flex-col gap-2 border-t border-border/60 px-6 py-3 md:hidden">
                    {navButtons}
                </div>
            )}
        </header>
    )
}

export default Nav;