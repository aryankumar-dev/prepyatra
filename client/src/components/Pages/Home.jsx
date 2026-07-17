"use client";

import { useRouter } from "next/navigation";
import { Users, BookOpen, Share2, Bot, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import Nav from "@/components/Navbar/Nav.jsx";
import Footer from "@/components/Footer/Footer.jsx";

const heroFeatures = [
    { icon: Users, title: "Recruiter Network", desc: "Build and manage your professional recruiter contacts database" },
    { icon: BookOpen, title: "Prep Logs", desc: "Track your interview preparation progress and learnings" },
    { icon: Share2, title: "Resource Sharing", desc: "Share and discover valuable job search resources with the community" },
];

const detailFeatures = [
    { icon: Users, title: "Recruiter Contacts", desc: "Store and organize HR contacts with interview status, company details, and personal notes." },
    { icon: BookOpen, title: "Prep Logs", desc: "Track your daily preparation hours, maintain streaks, and share your journey with the community." },
    { icon: Share2, title: "Resource Sharing", desc: "Crowdsource interview questions, coding challenges, and career resources with fellow job hunters." },
    { icon: Bot, title: "Community Driven", desc: "Connect with like-minded professionals, share experiences, and learn from each other's journeys." },
];

function Home() {
    const router = useRouter();

    return (
        <div>
            <Nav />

            <section className="mx-auto max-w-5xl px-6 py-20 text-center">
                <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
                    Turn <span className="text-primary">Hustle</span>
                    <br />Into <span className="text-primary">Hires</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    The ultimate community platform for job hunters to store recruiter contacts, share prep logs, and crowdsource resources together.{" "}
                    <span className="text-primary">Your journey to success starts here!</span>
                </p>
                <Button size="lg" className="mt-8" onClick={() => router.push('/registration')}>
                    <Rocket /> Start Your Journey Free
                </Button>

                <div className="mt-16 grid gap-6 sm:grid-cols-3">
                    {heroFeatures.map(({ icon: Icon, title, desc }) => (
                        <Card key={title} className="text-left">
                            <CardContent>
                                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Icon className="size-6" />
                                </div>
                                <p className="font-bold">{title}</p>
                                <p className="text-sm text-muted-foreground">{desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="border-t border-border/60 bg-card/30 px-6 py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                        Everything You Need to <span className="text-primary">Land Your Dream Job</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                        PrepYatra brings together all the tools and community support you need for a successful job hunt.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {detailFeatures.map(({ icon: Icon, title, desc }) => (
                            <Card key={title} className="text-left">
                                <CardContent>
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                                        <Icon className="size-6" />
                                    </div>
                                    <p className="text-lg font-bold">{title}</p>
                                    <p className="mt-1 text-muted-foreground">{desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;