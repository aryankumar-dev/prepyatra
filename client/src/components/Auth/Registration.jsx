import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.jsx";
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
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

function Registration() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("student");
    const [courseId, setCourseId] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.getCourses()
            .then((response) => setCourses(response.data.courses))
            .catch((error) => console.error("Failed to load courses:", error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});

        apiClient.register({ fullName, email, password, username, role, courseId: role === 'student' && courseId ? courseId : undefined })
            .then((response) => {
                setLoading(false);
                toast.success(response.message || "Registered successfully");
                setFullName("");
                setEmail("");
                setPassword("");
                setUsername("");
                navigate('/login');
            })
            .catch((err) => {
                setLoading(false);
                setFieldErrors(getFieldErrors(err));
                toast.error(getErrorMessage(err));
            });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>Join PrepYatra and start tracking your interview prep.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                aria-invalid={!!fieldErrors.fullName}
                                required
                            />
                            {fieldErrors.fullName && <p className="text-sm text-destructive">{fieldErrors.fullName}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                aria-invalid={!!fieldErrors.username}
                                required
                            />
                            {fieldErrors.username && <p className="text-sm text-destructive">{fieldErrors.username}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={!!fieldErrors.email}
                                required
                            />
                            {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-invalid={!!fieldErrors.password}
                                required
                            />
                            {fieldErrors.password && <p className="text-sm text-destructive">{fieldErrors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>I am a</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="tutor">Tutor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {role === 'student' && (
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
                                {fieldErrors.courseId && <p className="text-sm text-destructive">{fieldErrors.courseId}</p>}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            {loading ? "Registering..." : "Register"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <span className="cursor-pointer font-semibold text-primary hover:underline" onClick={() => navigate('/login')}>
                                Login
                            </span>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Registration
