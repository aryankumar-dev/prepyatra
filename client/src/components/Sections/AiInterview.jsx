import { useNavigate } from "react-router-dom";
import { Bot, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";

function AiInterview() {
    const navigate = useNavigate();

    return (
        <section className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-3xl font-extrabold text-primary">🤖 AI Interview Buddy</p>
            <p className="mt-2 text-muted-foreground">Practice interview questions, get unstuck on tricky topics, and stay motivated — powered by AI.</p>

            <Card className="mt-6">
                <CardContent className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot className="size-6" />
                        </div>
                        <div>
                            <p className="font-bold">Ready for a mock round?</p>
                            <p className="text-sm text-muted-foreground">Ask interview questions and get instant AI feedback, anytime.</p>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/chat')}>
                        Start Chatting <ArrowRight />
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
}

export default AiInterview;
