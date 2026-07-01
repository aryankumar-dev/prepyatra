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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import apiClient from '#services/apiClient';
import { getErrorMessage, getFieldErrors } from '@/lib/form-errors.js';

const AvailableStatus = [
    "screening",
    "in_progress",
    "interviewing",
    "offer_letter",
    "rejected",
];

function RecruiterModal({ show, handleClose, editMode, contact }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [appliedFor, setAppliedFor] = useState('');
    const [status, setStatus] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [lastInterviewDate, setLastInterviewDate] = useState('');
    const [link, setLink] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (editMode && contact) {
            setName(contact.name || '');
            setEmail(contact.email || '');
            setPhone(contact.phone || '');
            setCompany(contact.company || '');
            setAppliedFor(contact.appliedFor || '');
            setStatus(contact.status || '');
            setFollowUpDate(contact.followUpDate ? contact.followUpDate.slice(0, 10) : '');
            setLastInterviewDate(contact.lastInterviewDate ? contact.lastInterviewDate.slice(0, 10) : '');
            setLink(contact.link || '');
            setComments(contact.comments || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setCompany('');
            setAppliedFor('');
            setStatus('');
            setFollowUpDate('');
            setLastInterviewDate('');
            setLink('');
            setComments('');
        }
        setFieldErrors({});
    }, [editMode, contact, show]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});

        const formData = {
            name,
            email,
            phone,
            company,
            appliedFor,
            status,
            followUpDate,
            lastInterviewDate,
            link,
            comments,
        };

        try {
            if (editMode) {
                await apiClient.updateRecruiterNetwork(contact._id, formData);
                toast.success("Contact updated");
            } else {
                await apiClient.createRecruiterNetwork(formData);
                toast.success("Contact added");
            }
            handleClose();
        } catch (error) {
            console.error("Error saving recruiter contact:", error);
            setFieldErrors(getFieldErrors(error));
            toast.error(getErrorMessage(error, "Failed to save contact."));
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={show} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editMode ? "Edit Recruiter Contact" : "Add Recruiter Contact"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" aria-invalid={!!fieldErrors.name} />
                        {fieldErrors.name && <p className="text-sm text-destructive">{fieldErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" aria-invalid={!!fieldErrors.email} />
                        {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" aria-invalid={!!fieldErrors.phone} />
                        {fieldErrors.phone && <p className="text-sm text-destructive">{fieldErrors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter company name" aria-invalid={!!fieldErrors.company} />
                        {fieldErrors.company && <p className="text-sm text-destructive">{fieldErrors.company}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="appliedFor">Applied For</Label>
                        <Input id="appliedFor" value={appliedFor} onChange={(e) => setAppliedFor(e.target.value)} placeholder="Applied Position" aria-invalid={!!fieldErrors.appliedFor} />
                        {fieldErrors.appliedFor && <p className="text-sm text-destructive">{fieldErrors.appliedFor}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full" aria-invalid={!!fieldErrors.status}>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {AvailableStatus.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldErrors.status && <p className="text-sm text-destructive">{fieldErrors.status}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="followUpDate">Follow Up Date</Label>
                        <Input id="followUpDate" type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} aria-invalid={!!fieldErrors.followUpDate} />
                        {fieldErrors.followUpDate && <p className="text-sm text-destructive">{fieldErrors.followUpDate}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastInterviewDate">Last Interview Date</Label>
                        <Input id="lastInterviewDate" type="date" value={lastInterviewDate} onChange={(e) => setLastInterviewDate(e.target.value)} aria-invalid={!!fieldErrors.lastInterviewDate} />
                        {fieldErrors.lastInterviewDate && <p className="text-sm text-destructive">{fieldErrors.lastInterviewDate}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link">Link</Label>
                        <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Profile Link" aria-invalid={!!fieldErrors.link} />
                        {fieldErrors.link && <p className="text-sm text-destructive">{fieldErrors.link}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comments">Comments</Label>
                        <Textarea id="comments" rows={3} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Comments" aria-invalid={!!fieldErrors.comments} />
                        {fieldErrors.comments && <p className="text-sm text-destructive">{fieldErrors.comments}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="animate-spin" />}
                        {editMode ? "Update" : "Submit"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RecruiterModal;
