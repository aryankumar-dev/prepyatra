import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Pencil, Trash2, Plus } from "lucide-react";
import RecruiterModal from '#components/Sections/RecruiterModal.jsx';
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";
import apiClient from '#services/apiClient';

const STATUS_VARIANT = {
    screening: "secondary",
    in_progress: "outline",
    interviewing: "default",
    offer_letter: "default",
    rejected: "destructive",
};

function Recruiter() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await apiClient.getMyRecruiterNetwork();
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            toast.error("Failed to load recruiter contacts.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiClient.deleteRecruiterNetwork(id);
            toast.success("Contact deleted");
            fetchContacts();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete contact.");
        }
    };

    const handleAddShow = () => {
        setEditMode(false);
        setSelectedContact(null);
        setShow(true);
    };

    const handleEditShow = (contact) => {
        setEditMode(true);
        setSelectedContact(contact);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setSelectedContact(null);
        fetchContacts();
    };

    useEffect(() => { fetchContacts(); }, []);

    return (
        <section className="mx-auto max-w-6xl px-6">
            <p className="text-3xl font-extrabold text-primary">📞 Recruiter Contacts</p>
            <p className="mt-2 text-muted-foreground">Never lose track of your valuable recruiter connections.</p>

            <div className="mt-6 flex items-center justify-between">
                <p className="font-bold">{contacts.length} Active Contacts</p>
                <Button onClick={handleAddShow}>
                    <Plus /> Add New Contact
                </Button>
                <RecruiterModal
                    show={show}
                    handleClose={handleClose}
                    editMode={editMode}
                    contact={selectedContact}
                />
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Follow Up</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Contacts</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map(contact => (
                            <TableRow key={contact._id}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.appliedFor}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.followUpDate || "N/A"}</TableCell>
                                <TableCell>
                                    <Badge variant={STATUS_VARIANT[contact.status] || "secondary"}>{contact.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button size="icon-sm" variant="outline" asChild>
                                            <a href={`mailto:${contact.email}`}><Mail /></a>
                                        </Button>
                                        {contact.phone ? (
                                            <Button size="icon-sm" variant="outline" asChild>
                                                <a href={`tel:${contact.phone}`}><Phone /></a>
                                            </Button>
                                        ) : (
                                            <Button size="icon-sm" variant="outline" disabled><Phone /></Button>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button size="icon-sm" variant="outline" onClick={() => handleEditShow(contact)}>
                                            <Pencil />
                                        </Button>
                                        <Button size="icon-sm" variant="destructive" onClick={() => handleDelete(contact._id)}>
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}

export default Recruiter;
