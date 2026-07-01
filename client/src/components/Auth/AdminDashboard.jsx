import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Users, GraduationCap, BookOpen, Handshake, Plus, Loader2, Ban, ShieldCheck, MailQuestion, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";
import Nav from '#components/Navbar/Nav.jsx';
import Footer from '#components/Footer/Footer.jsx';
import apiClient from '#services/apiClient';
import { useAuth } from '#context/AuthContext.jsx';
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

const ROLE_VARIANT = {
    admin: "default",
    tutor: "secondary",
    student: "outline",
};

function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [unblockRequests, setUnblockRequests] = useState([]);
    const [pendingOffers, setPendingOffers] = useState([]);
    const [openOffers, setOpenOffers] = useState([]);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [actioningId, setActioningId] = useState(null);

    const fetchAll = () => {
        apiClient.getAdminStats().then((res) => setStats(res.data)).catch((error) => console.error(error));
        apiClient.getAdminUsers().then((res) => setUsers(res.data)).catch((error) => console.error(error));
        apiClient.getAdminAppointments().then((res) => setAppointments(res.data)).catch((error) => console.error(error));
        apiClient.getCourses().then((res) => setCourses(res.data.courses)).catch((error) => console.error(error));
        apiClient.getUnblockRequests().then((res) => setUnblockRequests(res.data)).catch((error) => console.error(error));
        apiClient.getPendingOffers().then((res) => setPendingOffers(res.data)).catch((error) => console.error(error));
        apiClient.getOpenOffers().then((res) => setOpenOffers(res.data)).catch((error) => console.error(error));
    };

    useEffect(() => {
        if (user?.role === 'admin') fetchAll();
    }, [user?.role]);

    if (authLoading) return null;
    if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        try {
            const response = await apiClient.createCourse({ title, description });
            toast.success(response.message || "Course added");
            setTitle('');
            setDescription('');
            setShowAddCourse(false);
            fetchAll();
        } catch (error) {
            setFieldErrors(getFieldErrors(error));
            toast.error(getErrorMessage(error, "Failed to add course."));
        } finally {
            setLoading(false);
        }
    };

    const handleBlockToggle = async (targetUser) => {
        setActioningId(targetUser._id);
        try {
            if (targetUser.isBlocked) {
                await apiClient.unblockUser(targetUser._id);
                toast.success(`${targetUser.fullName} unblocked`);
            } else {
                await apiClient.blockUser(targetUser._id);
                toast.success(`${targetUser.fullName} blocked`);
            }
            fetchAll();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to update user."));
        } finally {
            setActioningId(null);
        }
    };

    const handleUnblockRequestUnblock = async (request) => {
        setActioningId(request._id);
        try {
            await apiClient.unblockUser(request.userId._id);
            toast.success("User unblocked");
            fetchAll();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to unblock user."));
        } finally {
            setActioningId(null);
        }
    };

    const handleDenyRequest = async (request) => {
        setActioningId(request._id);
        try {
            await apiClient.denyUnblockRequest(request._id);
            toast.success("Request denied");
            fetchAll();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to deny request."));
        } finally {
            setActioningId(null);
        }
    };

    const statCards = stats ? [
        { icon: Users, label: "Total Users", value: stats.totalUsers },
        { icon: GraduationCap, label: "Students", value: stats.totalStudents },
        { icon: Handshake, label: "Tutors", value: stats.totalTutors },
        { icon: BookOpen, label: "Courses", value: stats.totalCourses },
        { icon: Handshake, label: "Appointments", value: stats.totalAppointments },
        { icon: Handshake, label: "Pending Offers", value: stats.totalOfferedRequests },
        { icon: Ban, label: "Blocked Users", value: stats.totalBlockedUsers },
        { icon: MailQuestion, label: "Unblock Requests", value: stats.pendingUnblockRequests },
    ] : [];

    return (
        <div className="min-h-screen bg-background">
            <Nav />
            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
                <p className="mt-2 text-muted-foreground">Manage courses and monitor platform activity.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {statCards.map(({ icon: Icon, label, value }) => (
                        <Card key={label}>
                            <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
                                <Icon className="size-6 text-primary" />
                                <p className="text-2xl font-extrabold">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="mt-12">
                    <div className="flex items-center justify-between">
                        <p className="text-2xl font-extrabold text-primary">Courses</p>
                        <Button onClick={() => setShowAddCourse(true)}>
                            <Plus /> Add Course
                        </Button>
                    </div>
                    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course._id}>
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell>{course.description || "—"}</TableCell>
                                        <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>

                <section className="mt-12">
                    <p className="text-2xl font-extrabold text-primary">All Users</p>
                    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((u) => (
                                    <TableRow key={u._id}>
                                        <TableCell>{u.fullName}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell><Badge variant={ROLE_VARIANT[u.role]}>{u.role}</Badge></TableCell>
                                        <TableCell>{u.courseId?.title || "—"}</TableCell>
                                        <TableCell>
                                            <Badge variant={u.isBlocked ? "destructive" : "secondary"}>
                                                {u.isBlocked ? "blocked" : "active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {u.role !== 'admin' && (
                                                <Button
                                                    size="sm"
                                                    variant={u.isBlocked ? "outline" : "destructive"}
                                                    disabled={actioningId === u._id}
                                                    onClick={() => handleBlockToggle(u)}
                                                >
                                                    {u.isBlocked ? <ShieldCheck /> : <Ban />}
                                                    {u.isBlocked ? "Unblock" : "Block"}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>

                <section className="mt-12">
                    <p className="text-2xl font-extrabold text-primary">Open Offers</p>
                    <div className="mt-4 space-y-3">
                        {openOffers.length === 0 && (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    No open offers.
                                </CardContent>
                            </Card>
                        )}
                        {openOffers.map((offer) => (
                            <Card key={offer._id}>
                                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold">{offer.courseId?.title}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Student: {offer.studentId?.fullName} ({offer.studentId?.email})
                                        </p>
                                        {offer.message && (
                                            <p className="mt-1 text-sm text-muted-foreground">{offer.message}</p>
                                        )}
                                    </div>
                                    <Badge variant="outline">Open</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <p className="text-2xl font-extrabold text-primary">Pending Offers</p>
                    <div className="mt-4 space-y-3">
                        {pendingOffers.length === 0 && (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    No pending offers.
                                </CardContent>
                            </Card>
                        )}
                        {pendingOffers.map((offer) => (
                            <Card key={offer._id}>
                                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold">{offer.courseId?.title}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Student: {offer.studentId?.fullName} ({offer.studentId?.email})
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Tutor: {offer.tutorId?.fullName} ({offer.tutorId?.email})
                                        </p>
                                    </div>
                                    <Badge variant="secondary">₹{offer.price}</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <p className="text-2xl font-extrabold text-primary">Unblock Requests</p>
                    <div className="mt-4 space-y-3">
                        {unblockRequests.length === 0 && (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    No pending unblock requests.
                                </CardContent>
                            </Card>
                        )}
                        {unblockRequests.map((req) => (
                            <Card key={req._id}>
                                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold">{req.userId?.fullName} ({req.userId?.email})</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{req.message}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            disabled={actioningId === req._id}
                                            onClick={() => handleUnblockRequestUnblock(req)}
                                        >
                                            <Check /> Unblock
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            disabled={actioningId === req._id}
                                            onClick={() => handleDenyRequest(req)}
                                        >
                                            <X /> Deny
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <p className="text-2xl font-extrabold text-primary">Appointments</p>
                    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Tutor</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((a) => (
                                    <TableRow key={a._id}>
                                        <TableCell>{a.studentId?.fullName}</TableCell>
                                        <TableCell>{a.tutorId?.fullName}</TableCell>
                                        <TableCell>{a.courseId?.title}</TableCell>
                                        <TableCell>₹{a.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </div>

            <Dialog open={showAddCourse} onOpenChange={setShowAddCourse}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Course</DialogTitle>
                        <DialogDescription>Add a new course for students to select.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleAddCourse}>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                aria-invalid={!!fieldErrors.title}
                                required
                            />
                            {fieldErrors.title && <p className="text-sm text-destructive">{fieldErrors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            Add Course
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}

export default AdminDashboard;
