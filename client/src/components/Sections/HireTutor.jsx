import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GraduationCap, Loader2, Check, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import apiClient from '#services/apiClient';
import { useAuth } from '#context/AuthContext.jsx';
import { getErrorMessage } from '@/lib/form-errors.js';

const STATUS_VARIANT = {
    open: "secondary",
    offered: "default",
    accepted: "default",
    rejected: "destructive",
};

function HireTutor() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [respondingId, setRespondingId] = useState(null);

    const fetchRequests = () => {
        apiClient.getMyTuitionRequests()
            .then((response) => setRequests(response.data))
            .catch((error) => console.error("Error fetching tuition requests:", error));
    };

    useEffect(() => { fetchRequests(); }, []);

    useEffect(() => {
        if (show) {
            apiClient.getCourses()
                .then((response) => setCourses(response.data.courses))
                .catch((error) => console.error("Failed to load courses:", error));
            setCourseId(user?.courseId || '');
        }
    }, [show, user?.courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseId) {
            toast.error("Please select a course.");
            return;
        }
        setLoading(true);
        try {
            const response = await apiClient.createTuitionRequest({ courseId, message });
            toast.success(response.message || "Request sent");
            setMessage('');
            setShow(false);
            fetchRequests();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to send request."));
        } finally {
            setLoading(false);
        }
    };

    const handleRespond = async (id, accept) => {
        setRespondingId(id);
        try {
            const response = await apiClient.respondTuition(id, accept);
            toast.success(response.message || "Response submitted");
            fetchRequests();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to respond."));
        } finally {
            setRespondingId(null);
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-3xl font-extrabold text-primary">🎓 Hire a Tutor</p>
            <p className="mt-2 text-muted-foreground">Request a tutor for any course — we'll notify you when one is found.</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="font-bold">{requests.length} Requests</p>
                <Button onClick={() => setShow(true)}>
                    <GraduationCap /> Hire a Tutor
                </Button>
            </div>

            <div className="mt-4 space-y-3">
                {requests.map((req) => (
                    <Card key={req._id}>
                        <CardContent className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="font-bold">{req.courseId?.title}</p>
                                {req.message && <p className="text-sm text-muted-foreground">{req.message}</p>}
                                {req.status === "offered" && (
                                    <p className="mt-1 text-sm">
                                        Offer from <strong>{req.tutorId?.fullName}</strong> — ₹{req.price}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={STATUS_VARIANT[req.status]}>{req.status}</Badge>
                                {req.status === "offered" && (
                                    <>
                                        <Button
                                            size="sm"
                                            disabled={respondingId === req._id}
                                            onClick={() => handleRespond(req._id, true)}
                                        >
                                            <Check /> Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            disabled={respondingId === req._id}
                                            onClick={() => handleRespond(req._id, false)}
                                        >
                                            <X /> Reject
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={show} onOpenChange={setShow}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hire a Tutor</DialogTitle>
                        <DialogDescription>
                            Pick a course and we'll find a tutor for you.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label>Course</Label>
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">What do you need help with? (optional)</Label>
                            <Textarea
                                id="message"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g. Need help with React hooks and system design"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            Submit Request
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default HireTutor;
