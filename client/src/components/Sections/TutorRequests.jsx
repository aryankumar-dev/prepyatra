"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, HandCoins, CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import apiClient from '@/services/apiClient';
import { getErrorMessage } from '@/lib/form-errors.js';

function TutorRequests() {
    const [requests, setRequests] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRequests = () => {
        apiClient.getOpenTuitionRequests()
            .then((response) => setRequests(response.data))
            .catch((error) => console.error("Error fetching open requests:", error));
    };

    const fetchJobs = () => {
        apiClient.getMyTutoringJobs()
            .then((response) => setJobs(response.data))
            .catch((error) => console.error("Error fetching tutoring jobs:", error));
    };

    useEffect(() => { fetchRequests(); fetchJobs(); }, []);

    const handleOffer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiClient.offerTuition(selected._id, Number(price));
            toast.success(response.message || "Offer submitted");
            setSelected(null);
            setPrice('');
            fetchRequests();
            fetchJobs();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to submit offer."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-3xl font-extrabold text-primary">✅ Your Accepted Courses</p>
            <p className="mt-2 text-muted-foreground">Courses students have accepted you to tutor for.</p>

            <div className="mt-6 space-y-3">
                {jobs.length === 0 && (
                    <Card>
                        <CardContent className="py-8 text-center text-muted-foreground">
                            No accepted tutoring jobs yet.
                        </CardContent>
                    </Card>
                )}
                {jobs.map((job) => (
                    <Card key={job._id}>
                        <CardContent className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="font-bold">{job.courseId?.title}</p>
                                <p className="text-sm text-muted-foreground">Student: {job.studentId?.fullName} ({job.studentId?.email})</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge>₹{job.price}</Badge>
                                <Badge variant="secondary"><CheckCircle2 className="mr-1 size-3.5" /> accepted</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <p className="mt-12 text-3xl font-extrabold text-primary">🎓 Open Tuition Requests</p>
            <p className="mt-2 text-muted-foreground">Students looking for a tutor. Express interest with a price to make an offer.</p>

            <div className="mt-6 space-y-3">
                {requests.length === 0 && (
                    <Card>
                        <CardContent className="py-8 text-center text-muted-foreground">
                            No open requests right now — check back later.
                        </CardContent>
                    </Card>
                )}
                {requests.map((req) => (
                    <Card key={req._id}>
                        <CardContent className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="font-bold">{req.courseId?.title}</p>
                                <p className="text-sm text-muted-foreground">Requested by {req.studentId?.fullName}</p>
                                {req.message && <p className="mt-1 text-sm">{req.message}</p>}
                            </div>
                            <Button onClick={() => setSelected(req)}>
                                <HandCoins /> I&apos;m Interested
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Make an Offer</DialogTitle>
                        <DialogDescription>
                            Set your price for tutoring {selected?.studentId?.fullName} in {selected?.courseId?.title}.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleOffer}>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="1"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            Submit Offer
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default TutorRequests;