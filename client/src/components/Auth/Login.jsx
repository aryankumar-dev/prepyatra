"use client";

import { useState } from 'react'
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog.jsx";
import apiClient from '@/services/apiClient';
import { useAuth } from '@/context/AuthContext.jsx';
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [blocked, setBlocked] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [reviewMessage, setReviewMessage] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const router = useRouter();
    const { refresh } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        setBlocked(false);

        apiClient.login(email, password)
            .then(async (response) => {
                setLoading(false);
                toast.success(response.message || "Logged in successfully");
                setEmail("");
                setPassword("");
                await refresh();
                router.push('/dashboard');
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.status === 403) {
                    setBlocked(true);
                }
                setFieldErrors(getFieldErrors(err));
                toast.error(getErrorMessage(err));
            });
    }

    async function handleReviewSubmit(e) {
        e.preventDefault();
        setReviewLoading(true);
        try {
            const response = await apiClient.submitUnblockRequest(email, reviewMessage);
            toast.success(response.message || "Request submitted");
            setShowReview(false);
            setReviewMessage('');
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to submit request."));
        } finally {
            setReviewLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Welcome back — sign in to continue your prep journey.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
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

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        {blocked && (
                            <Button type="button" variant="destructive" className="w-full" onClick={() => setShowReview(true)}>
                                Apply for Review
                            </Button>
                        )}

                        <p className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <span className="cursor-pointer font-semibold text-primary hover:underline" onClick={() => router.push('/registration')}>
                                Create account
                            </span>
                        </p>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={showReview} onOpenChange={setShowReview}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apply for Review</DialogTitle>
                        <DialogDescription>
                            Tell us why your account should be unblocked. An admin will review your request.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleReviewSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="reviewMessage">Your message</Label>
                            <Textarea
                                id="reviewMessage"
                                rows={4}
                                value={reviewMessage}
                                onChange={(e) => setReviewMessage(e.target.value)}
                                placeholder="Explain why you should be unblocked..."
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={reviewLoading}>
                            {reviewLoading && <Loader2 className="animate-spin" />}
                            Submit Request
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Login