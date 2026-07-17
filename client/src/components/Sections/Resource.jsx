"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, PlayCircle, FileText, Target, GraduationCap, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import apiClient from '@/services/apiClient';
import { useAuth } from '@/context/AuthContext.jsx';
import { getErrorMessage } from '@/lib/form-errors.js';

const TYPE_ICON = {
    video: PlayCircle,
    article: FileText,
    practice: Target,
    course: GraduationCap,
};

function Resource() {
    const { user, refresh } = useAuth();
    const [resources, setResources] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user?.courseId) {
            apiClient.getCourses()
                .then((response) => setCourses(response.data.courses))
                .catch((error) => console.error("Failed to load courses:", error));
            return;
        }
        apiClient.getResourcesByCourse(user.courseId)
            .then((response) => setResources(response.data))
            .catch((error) => {
                console.error("Error fetching resources:", error);
                toast.error("Failed to load resources.");
            });
    }, [user?.courseId]);

    const handleSelectCourse = async () => {
        if (!courseId) return;
        setSaving(true);
        try {
            await apiClient.updateProfile({ courseId });
            await refresh();
            toast.success("Course updated");
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to set course."));
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-3xl font-extrabold text-primary">🔄 Resources for Your Course</p>
            <p className="mt-2 text-muted-foreground">Hand-picked resources based on the course you&apos;re preparing for.</p>

            {!user?.courseId ? (
                <Card className="mt-6">
                    <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                        <p className="font-bold">Select a course to see resources</p>
                        <p className="text-muted-foreground">Pick the course you&apos;re preparing for and we&apos;ll show tailored resources here.</p>
                        <div className="mt-2 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
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
                            <Button onClick={handleSelectCourse} disabled={!courseId || saving}>
                                {saving && <Loader2 className="animate-spin" />}
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource) => {
                        const Icon = TYPE_ICON[resource.type] || FileText;
                        return (
                            <Card key={resource._id}>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-5 text-primary" />
                                        <Badge variant="secondary">{resource.type}</Badge>
                                    </div>
                                    <h5 className="mt-3 font-bold">{resource.title}</h5>
                                    {resource.description && (
                                        <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
                                    )}
                                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                            Open <ExternalLink />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Resource;