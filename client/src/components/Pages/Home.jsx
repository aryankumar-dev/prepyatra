import { useState } from "react";
import './Home.css';

function Home() {
    return (
        <div>
            <div className="home_nav pt-3 pb-2">
                <div className="home_nav_cards d-flex mx-5 ">
                    <div className="footer-card yellowtext"><span className="home_nav_big_Text fw-bolder">PrepYatra</span>
                        <br></br> <span className="text-white pt-0 home_nav_small_Text">By Aryan Kumar</span>
                    </div>
                    <div className="footer-card text-end pt-1">
                        <button className="startbtn px-3 py-2">Get Started</button>
                    </div>
                </div>

            </div>
            <div className="firstcontainer_home " id="firstcontainer_home">
                <p className="display-3 fw-bolder">Turn <span className="yellowtext">Hustle</span><span className="linebreak"> Into <span className="yellowtext">Hires</span></span>
                </p>
                <p className="content mb-8 col-8 mx-auto">The ultimate community platform for job hunters to store recruiter contacts, share prep logs, and crowdsource resources together.<span className="yellowtext">Your journey to success starts here!</span></p>
                <button className="startbtn py-2 px-5 mt-2 mb-5">🚀 Start Your Journey Free</button>
                <div className="d-flex firstcontainer_home cards mx-3">
                    <card className=" firstcontainer_homecard card">
                        <svg class="w-8 h-8 text-primary-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <p className="fw-bolder">📞 Recruiter Network</p>
                        <p className="text-sm">Build and manage your professional recruiter contacts database</p>
                    </card>

                    <card className="firstcontainer_home card">
                        <svg class="w-8 h-8 text-primary-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="fw-bolder">📝 Prep Logs</p>
                        <p className="text-sm">Track your interview preparation progress and learnings</p>
                    </card>

                    <card className="firstcontainer_home card">
                        <svg class="w-8 h-8 text-primary-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>
                        <p className="fw-bolder">🔄 Resource Sharing</p>
                        <p className="text-sm">Share and discover valuable job search resources with the community</p>
                    </card>
                </div>
            </div>

            <div className="secondcontainer_home pt-5">

                <div className="secondcontainer_home_text">
                    <p className="display-5 fw-bolder">Everything You Need to <span className="yellowtext">Land Your Dream Job</span></p>
                    <p className="content col-6 mx-auto">PrepYatra brings together all the tools and community support you need for a successful job hunt.</p>
                </div>

                <div className="secondcontainer_home cards col-10 mx-auto">
                    <div className="secondcontainer_home card ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-8 h-8 text-primary-foregroundsquare"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>

                        <p className="fw-bolder secondcontainer_hometxt">Recruiter Contacts</p>
                        <p className="secondcontainer_hometxt2">Store and organize HR contacts with interview status, company details, and personal notes.</p>

                    </div>

                    <div className="secondcontainer_home card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-8 h-8 text-primary-foregroundsquare"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                        <p className="fw-bolder secondcontainer_hometxt">Prep Logs</p>
                        <p className="secondcontainer_hometxt2">Track your daily preparation hours, maintain streaks, and share your journey with the community.</p>

                    </div>

                    <div className="secondcontainer_home card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 w-8 h-8 text-primary-foregroundsquare"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                        <p className="fw-bolder secondcontainer_hometxt">Resource Sharing</p>
                        <p className="secondcontainer_hometxt2">Crowdsource interview questions, coding challenges, and career resources with fellow job hunters.</p>

                    </div>

                    <div className="secondcontainer_home card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target lucide-robot w-8 h-8 text-primary-foregroundsquare">
                            <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
                            <circle cx="7" cy="14" r="2"></circle>
                            <circle cx="17" cy="14" r="2"></circle>
                            <line x1="12" y1="2" x2="12" y2="8"></line>
                            <line x1="8" y1="2" x2="8" y2="5"></line>
                            <line x1="16" y1="2" x2="16" y2="5"></line>
                        </svg>

                        <p className="fw-bolder secondcontainer_hometxt">Community Driven</p>
                        <p className="secondcontainer_hometxt2">Connect with like-minded professionals, share experiences, and learn from each other's journeys.</p>

                    </div>
                </div>


            </div>

            <div className="footer  mx-0 pt-5">
                <div className="footer-cards d-flex mx-5 mb-5">
                    <div className="footer-card yellowtext text-start"><span className="footerBigText fw-bolder">PrepYatra</span>
                        <br></br> <span className="text-white ">By Aryan Kumar</span>
                    </div>
                    <div className="footer-card text-end">Our Products
                        <br></br> <span className="text-white ">By Aryan Kumar</span>
                    </div>
                </div>
                <p className="pb-2 mb-0">Built with ❤️ by  <span className="yellowtext fw-bolder">Aryan Kumar</span></p>
            </div>

        </div>
    );
}

export default Home;