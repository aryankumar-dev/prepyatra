import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, LayoutDashboard, LogOut, Bot, UserCog, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useAuth } from "#context/AuthContext.jsx";
import ProfileDialog from "#components/Auth/ProfileDialog.jsx";

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        logout().then(() => navigate('/'));
    };

    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <div>
                    <span className="text-xl font-extrabold text-primary">PrepYatra</span>
                    <p className="text-xs text-muted-foreground">By Aryan Kumar</p>
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Button
                                variant={location.pathname === '/dashboard' ? 'default' : 'outline'}
                                onClick={() => navigate('/dashboard')}
                            >
                                <LayoutDashboard /> Dashboard
                            </Button>
                            <Button
                                variant={location.pathname === '/chat' ? 'default' : 'outline'}
                                onClick={() => navigate('/chat')}
                            >
                                <Bot /> AI Interview
                            </Button>
                            {user.role === 'admin' && (
                                <Button
                                    variant={location.pathname === '/admin' ? 'default' : 'outline'}
                                    onClick={() => navigate('/admin')}
                                >
                                    <ShieldCheck /> Admin
                                </Button>
                            )}
                            <Button variant="outline" onClick={() => setProfileOpen(true)}>
                                <UserCog /> Profile
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOut /> Logout
                            </Button>
                            <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
                        </>
                    ) : (
                        <Button onClick={() => navigate('/login')}>
                            <LogIn /> Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Nav;
