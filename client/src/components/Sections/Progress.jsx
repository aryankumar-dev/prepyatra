"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Flame, Clock, NotebookPen, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import apiClient from '@/services/apiClient';
import { PREP_LOGS_UPDATED } from "@/lib/events.js";

function computeStreak(logs) {
    const days = new Set(logs.map(log => new Date(log.createdAt).toDateString()));
    if (days.size === 0) return 0;

    const cursor = new Date();
    if (!days.has(cursor.toDateString())) {
        cursor.setDate(cursor.getDate() - 1);
    }

    let streak = 0;
    while (days.has(cursor.toDateString())) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
}

function formatMinutes(totalMinutes) {
    if (totalMinutes < 60) return `${totalMinutes}m`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function Progress() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = () => {
            apiClient.getMyPrepLogs()
                .then((response) => setLogs(response.data))
                .catch((error) => {
                    console.error("Error fetching prep logs for progress:", error);
                    toast.error("Failed to load progress.");
                });
        };

        fetchLogs();
        window.addEventListener(PREP_LOGS_UPDATED, fetchLogs);
        return () => window.removeEventListener(PREP_LOGS_UPDATED, fetchLogs);
    }, []);

    const totalLogs = logs.length;
    const totalMinutes = logs.reduce((sum, log) => sum + Number(log.timespend || 0), 0);
    const streak = computeStreak(logs);
    const activeDays = new Set(logs.map(log => new Date(log.createdAt).toDateString())).size;

    const stats = [
        { icon: NotebookPen, label: "Prep Logs", value: totalLogs },
        { icon: Clock, label: "Time Invested", value: formatMinutes(totalMinutes) },
        { icon: Flame, label: "Current Streak", value: `${streak} ${streak === 1 ? "day" : "days"}` },
        { icon: CalendarCheck, label: "Active Days", value: activeDays },
    ];

    return (
        <section className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-3xl font-extrabold text-primary">Track Your Progress</p>
            <p className="mt-2 text-muted-foreground">Stay motivated with streak counters and progress tracking based on your Prep Logs.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ icon: Icon, label, value }) => (
                    <Card key={label}>
                        <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Icon className="size-6" />
                            </div>
                            <p className="text-2xl font-extrabold">{value}</p>
                            <p className="text-sm text-muted-foreground">{label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {totalLogs === 0 && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Add your first Prep Log above to start tracking your progress.
                </p>
            )}
        </section>
    );
}

export default Progress;