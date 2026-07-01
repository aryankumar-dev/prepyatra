import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Clock, Calendar } from "lucide-react";
import PrepModal from '#components/Sections/PrepModal.jsx';
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import apiClient from '#services/apiClient';
import { PREP_LOGS_UPDATED } from "@/lib/events.js";

function PrepLogs() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [logs, setLogs] = useState([]);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setSelectedLog(null);
    };

    const handleShow = () => {
        setEditMode(false);
        setSelectedLog(null);
        setShow(true);
    };

    const handleEditShow = (log) => {
        setSelectedLog(log);
        setEditMode(true);
        setShow(true);
    };

    const fetchLogs = async () => {
        try {
            const response = await apiClient.getMyPrepLogs();
            setLogs(response.data);
            window.dispatchEvent(new Event(PREP_LOGS_UPDATED));
        } catch (error) {
            console.error("Error fetching prep logs:", error);
            toast.error("Failed to load prep logs.");
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiClient.deletePrepLog(id);
            toast.success("Prep log deleted");
            fetchLogs();
        } catch (error) {
            console.error("Error deleting prep log:", error);
            toast.error("Failed to delete prep log.");
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6">
            <p className="text-3xl font-extrabold text-primary">📝 Prep Logs</p>
            <p className="mt-2 text-muted-foreground">Track your preparation journey, monitor progress, and never lose sight of your learning goals.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-bold">📊 Your Preparation Dashboard</p>
                    <p className="text-sm text-muted-foreground">Keep track of your daily prep sessions</p>
                </div>
                <Button onClick={handleShow}>
                    <Plus /> Add New Log
                </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {logs.map(log => (
                    <Card key={log._id}>
                        <CardContent>
                            <h5 className="font-bold">{log.title}</h5>
                            <p className="mt-1 text-sm text-muted-foreground">{log.description}</p>
                            <div className="mt-3 flex flex-col gap-1 text-sm">
                                <span className="flex items-center gap-1.5"><Clock className="size-4 text-primary" /> {log.timespend} mins</span>
                                <span className="flex items-center gap-1.5"><Calendar className="size-4 text-primary" /> {new Date(log.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button size="sm" variant="outline" className="w-full" onClick={() => handleEditShow(log)}>
                                    <Pencil /> Edit
                                </Button>
                                <Button size="sm" variant="destructive" className="w-full" onClick={() => handleDelete(log._id)}>
                                    <Trash2 /> Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <PrepModal
                show={show}
                handleClose={() => { handleClose(); fetchLogs(); }}
                editMode={editMode}
                log={selectedLog}
            />
        </section>
    );
}

export default PrepLogs;
