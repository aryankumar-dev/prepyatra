"use client";

import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import apiClient from '@/services/apiClient';
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

function PrepModal({ show, handleClose, editMode, log }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timespend, setTimespend] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (editMode && log) {
            setTitle(log.title);
            setDescription(log.description);
            setTimespend(log.timespend);
        } else {
            setTitle('');
            setDescription('');
            setTimespend('');
        }
        setFieldErrors({});
    }, [editMode, log, show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        const formData = { title, description, timespend };

        try {
            if (editMode) {
                await apiClient.updatePrepLog(log._id, formData);
                toast.success("Prep log updated");
            } else {
                await apiClient.createPrepLog(formData);
                toast.success("Prep log added");
            }
            handleClose();
        } catch (error) {
            setFieldErrors(getFieldErrors(error));
            toast.error(getErrorMessage(error, "Failed to save prep log."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={show} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editMode ? "Edit Prep Log" : "Add New Prep Log"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
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
                            placeholder="Enter description"
                            aria-invalid={!!fieldErrors.description}
                            required
                        />
                        {fieldErrors.description && <p className="text-sm text-destructive">{fieldErrors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="timespend">Time Spent (mins)</Label>
                        <Input
                            id="timespend"
                            type="number"
                            value={timespend}
                            onChange={(e) => setTimespend(e.target.value)}
                            placeholder="Time spent"
                            aria-invalid={!!fieldErrors.timespend}
                            required
                        />
                        {fieldErrors.timespend && <p className="text-sm text-destructive">{fieldErrors.timespend}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="animate-spin" />}
                        {editMode ? "Update Log" : "Add Log"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default PrepModal;