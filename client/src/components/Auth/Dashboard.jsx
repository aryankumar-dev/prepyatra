import { useNavigate } from "react-router-dom";
import { Bot, ArrowRight } from "lucide-react";
import Recruiter from "#components/Sections/Recruiter.jsx"
import PrepLogs from "#components/Sections/PrepLogs.jsx"
import Resource from "#components/Sections/Resource.jsx"
import Progress from "#components/Sections/Progress.jsx"
import AiInterview from "#components/Sections/AiInterview.jsx"
import HireTutor from "#components/Sections/HireTutor.jsx"
import TutorRequests from "#components/Sections/TutorRequests.jsx"
import Nav from '#components/Navbar/Nav.jsx';
import Footer from '#components/Footer/Footer.jsx';
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useAuth } from '#context/AuthContext.jsx';

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isTutor = user?.role === 'tutor';

    return (
        <div className="min-h-screen bg-background">
            <Nav />
            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-3xl font-extrabold">Welcome to the Dashboard</h1>

                <Card className="mt-6">
                    <CardContent className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Bot className="size-6" />
                            </div>
                            <div>
                                <p className="font-bold">AI Interview Buddy</p>
                                <p className="text-sm text-muted-foreground">Practice interview questions and get instant AI feedback.</p>
                            </div>
                        </div>
                        <Button onClick={() => navigate('/chat')}>
                            Start Chatting <ArrowRight />
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-16 pb-16">
                {isTutor ? (
                    <TutorRequests />
                ) : (
                    <>
                        <Recruiter />
                        <PrepLogs />
                        <Resource />
                        <Progress />
                        <HireTutor />
                    </>
                )}
                <AiInterview />
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
