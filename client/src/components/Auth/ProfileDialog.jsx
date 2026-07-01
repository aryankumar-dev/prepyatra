import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import apiClient from '#services/apiClient';
import { useAuth } from '#context/AuthContext.jsx';
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

function ProfileDialog({ open, onOpenChange }) {
    const { user, refresh } = useAuth();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileErrors, setProfileErrors] = useState({});

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setCourseId(user.courseId || '');
        }
    }, [user, open]);

    useEffect(() => {
        if (open) {
            apiClient.getCourses()
                .then((response) => setCourses(response.data.courses))
                .catch((error) => console.error("Failed to load courses:", error));
        }
    }, [open]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileErrors({});

        try {
            const response = await apiClient.updateProfile({ fullName, username, email, courseId: courseId || undefined });
            toast.success(response.message || "Profile updated");
            await refresh();
        } catch (error) {
            setProfileErrors(getFieldErrors(error));
            toast.error(getErrorMessage(error, "Failed to update profile."));
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        setPasswordLoading(true);
        setPasswordErrors({});

        try {
            const response = await apiClient.changePassword(currentPassword, newPassword);
            toast.success(response.message || "Password changed");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPasswordErrors(getFieldErrors(error));
            toast.error(getErrorMessage(error, "Failed to change password."));
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription>Manage your profile and password.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="profile">
                    <TabsList className="w-full">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <form className="space-y-4" onSubmit={handleProfileSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    aria-invalid={!!profileErrors.fullName}
                                    required
                                />
                                {profileErrors.fullName && <p className="text-sm text-destructive">{profileErrors.fullName}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    aria-invalid={!!profileErrors.username}
                                    required
                                />
                                {profileErrors.username && <p className="text-sm text-destructive">{profileErrors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={!!profileErrors.email}
                                    required
                                />
                                {profileErrors.email && <p className="text-sm text-destructive">{profileErrors.email}</p>}
                            </div>

                            {user?.role !== 'tutor' && (
                                <div className="space-y-2">
                                    <Label>Course you're preparing for</Label>
                                    <Select value={courseId} onValueChange={setCourseId}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course._id} value={course._id}>{course.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {profileErrors.courseId && <p className="text-sm text-destructive">{profileErrors.courseId}</p>}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={profileLoading}>
                                {profileLoading && <Loader2 className="animate-spin" />}
                                Save Changes
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="password">
                        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    aria-invalid={!!passwordErrors.currentPassword}
                                    required
                                />
                                {passwordErrors.currentPassword && <p className="text-sm text-destructive">{passwordErrors.currentPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    aria-invalid={!!passwordErrors.newPassword}
                                    required
                                />
                                {passwordErrors.newPassword && <p className="text-sm text-destructive">{passwordErrors.newPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    aria-invalid={!!passwordErrors.confirmPassword}
                                    required
                                />
                                {passwordErrors.confirmPassword && <p className="text-sm text-destructive">{passwordErrors.confirmPassword}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={passwordLoading}>
                                {passwordLoading && <Loader2 className="animate-spin" />}
                                Change Password
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileDialog;
