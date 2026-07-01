import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "#config/db.js";
import { Course } from "#models/course.models.js";
import { Resource } from "#models/resource.models.js";

dotenv.config();

const COURSES = [
    {
        title: "MERN Stack",
        description: "MongoDB, Express, React, and Node.js — full-stack JavaScript development.",
        resources: [
            { title: "The Odin Project - Full Stack JavaScript", url: "https://www.theodinproject.com/paths/full-stack-javascript", type: "course" },
            { title: "React Documentation", url: "https://react.dev/learn", type: "article" },
            { title: "MDN - Express Web Framework", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs", type: "article" },
            { title: "freeCodeCamp - MERN Stack Course", url: "https://www.freecodecamp.org/news/tag/mern/", type: "video" },
        ],
    },
    {
        title: "Java Development",
        description: "Core Java, OOP, Spring Boot, and backend development with Java.",
        resources: [
            { title: "roadmap.sh - Java Developer Roadmap", url: "https://roadmap.sh/java", type: "practice" },
            { title: "Java Documentation (Oracle)", url: "https://docs.oracle.com/en/java/", type: "article" },
            { title: "Spring Boot Guides", url: "https://spring.io/guides", type: "article" },
            { title: "freeCodeCamp - Java Programming", url: "https://www.freecodecamp.org/news/learn-java-full-course/", type: "video" },
        ],
    },
    {
        title: "Python Development",
        description: "Python fundamentals, Django/Flask, and backend development with Python.",
        resources: [
            { title: "roadmap.sh - Python Developer Roadmap", url: "https://roadmap.sh/python", type: "practice" },
            { title: "Python Official Documentation", url: "https://docs.python.org/3/", type: "article" },
            { title: "Django Documentation", url: "https://docs.djangoproject.com/en/stable/", type: "article" },
            { title: "freeCodeCamp - Python for Everybody", url: "https://www.freecodecamp.org/news/python-for-everybody/", type: "video" },
        ],
    },
    {
        title: "Data Science & ML",
        description: "Data analysis, machine learning, and Python for data science.",
        resources: [
            { title: "roadmap.sh - AI and Data Scientist Roadmap", url: "https://roadmap.sh/ai-data-scientist", type: "practice" },
            { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", type: "course" },
            { title: "scikit-learn Documentation", url: "https://scikit-learn.org/stable/", type: "article" },
            { title: "freeCodeCamp - Machine Learning with Python", url: "https://www.freecodecamp.org/learn/machine-learning-with-python/", type: "video" },
        ],
    },
    {
        title: "Frontend Development",
        description: "HTML, CSS, JavaScript, and modern frontend frameworks like React and Vue.",
        resources: [
            { title: "roadmap.sh - Frontend Developer Roadmap", url: "https://roadmap.sh/frontend", type: "practice" },
            { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web", type: "article" },
            { title: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" },
            { title: "CSS-Tricks", url: "https://css-tricks.com/", type: "article" },
        ],
    },
    {
        title: "DevOps",
        description: "CI/CD, containers, cloud infrastructure, and automation.",
        resources: [
            { title: "roadmap.sh - DevOps Roadmap", url: "https://roadmap.sh/devops", type: "practice" },
            { title: "Docker Documentation", url: "https://docs.docker.com/", type: "article" },
            { title: "Kubernetes Documentation", url: "https://kubernetes.io/docs/home/", type: "article" },
            { title: "freeCodeCamp - DevOps Course", url: "https://www.freecodecamp.org/news/tag/devops/", type: "video" },
        ],
    },
    {
        title: "Android Development",
        description: "Kotlin, Android SDK, and mobile app development for Android.",
        resources: [
            { title: "roadmap.sh - Android Developer Roadmap", url: "https://roadmap.sh/android", type: "practice" },
            { title: "Android Developers - Official Docs", url: "https://developer.android.com/docs", type: "article" },
            { title: "Kotlin Documentation", url: "https://kotlinlang.org/docs/home.html", type: "article" },
            { title: "freeCodeCamp - Android Development for Beginners", url: "https://www.freecodecamp.org/news/tag/android/", type: "video" },
        ],
    },
    {
        title: "Data Structures & Algorithms",
        description: "Core DSA concepts and interview problem-solving practice.",
        resources: [
            { title: "roadmap.sh - Computer Science Roadmap", url: "https://roadmap.sh/computer-science", type: "practice" },
            { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
            { title: "freeCodeCamp - Data Structures and Algorithms", url: "https://www.freecodecamp.org/news/tag/data-structures/", type: "video" },
            { title: "GeeksforGeeks - DSA", url: "https://www.geeksforgeeks.org/data-structures/", type: "article" },
        ],
    },
    {
        title: "Cloud Computing (AWS)",
        description: "AWS core services, cloud architecture, and certifications.",
        resources: [
            { title: "roadmap.sh - AWS Roadmap", url: "https://roadmap.sh/aws", type: "practice" },
            { title: "AWS Documentation", url: "https://docs.aws.amazon.com/", type: "article" },
            { title: "AWS Skill Builder (Free Training)", url: "https://skillbuilder.aws/", type: "course" },
            { title: "freeCodeCamp - AWS Certified Cloud Practitioner", url: "https://www.freecodecamp.org/news/tag/aws/", type: "video" },
        ],
    },
];

async function seed() {
    await connectDB();

    for (const { title, description, resources } of COURSES) {
        let course = await Course.findOne({ title });
        if (!course) {
            course = await Course.create({ title, description });
            console.log(`Created course: ${title}`);
        } else {
            console.log(`Course already exists: ${title}`);
        }

        for (const resource of resources) {
            const exists = await Resource.findOne({ courseId: course._id, url: resource.url });
            if (!exists) {
                await Resource.create({ ...resource, courseId: course._id });
                console.log(`  Added resource: ${resource.title}`);
            }
        }
    }

    console.log("Seeding complete.");
    await mongoose.connection.close();
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});
