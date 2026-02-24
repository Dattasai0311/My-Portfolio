export const portfolioData = {
  name: "Datta Sai Adithya Vinjamuri",
  role: "ML Engineer & Full Stack Developer",
  bio: "Motivated Computer Science graduate student at CSU Channel Islands. I specialize in building and deploying machine-learning-based applications, with deep expertise in Python, AWS cloud architecture, and full-stack development.",
  skills: [
    "Python",
    "TensorFlow",
    "scikit-learn",
    "AWS (Lambda, S3, SageMaker)",
    "Docker",
    "React/Next.js",
    "Flask",
    "React Native",
    "Google Gemini API"
  ],
  education: [
    {
      degree: "Master of Science, Computer Science",
      school: "California State University, Channel Islands",
      year: "Expected 12/2025",
      gpa: "3.7"
    },
    {
      degree: "Bachelor of Science, Computer Science And Engineering",
      school: "Lovely Professional University, India",
      year: "08/2023"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Student Assistant",
      company: "CSUCI - Camarillo, CA",
      period: "04/2024 - 12/2025",
      description: "• Developed AI transcript analyzer (assist.org dataset) reducing manual review by 85%.\n• Built AI chatbot via prompt engineering, reducing departmental emails and calls by 35% in 4 months.\n• Managed 30+ daily student/staff inquiries via calls and email; supported recruitment of student assistants."
    },
    {
      id: 2,
      role: "ML Intern",
      company: "Trillion IT Services Pvt Ltd - Hyderabad, India",
      period: "01/2022 - 08/2023",
      description: "• Built ML model integrated into client web app, increasing user engagement by 25%.\n• Developed AI-powered features using Python, FastAPI, and React; designed REST APIs for real-time predictions.\n• Automated data workflows and supported AWS deployment and CI/CD setup."
    }
  ],
  projects: [
    {
      id: 1,
      title: "AI-Powered Penetration Testing Platform",
      desc: "A comprehensive cybersecurity app orchestrating Nmap, OWASP ZAP & SQLMap with Gemini 1.5 Pro for analysis. Features automated risk scoring via Random Forest.",
      tech: ["Python", "Flask", "Docker", "Gemini API", "scikit-learn"],
      features: [
        "One-click orchestration of Nmap, OWASP ZAP, and SQLMap with unified reporting.",
        "Gemini-driven risk narratives with automated Random Forest scoring.",
        "Containerized microservices for scans and analysis with async task queue."
      ],
      gallery: ["/pentest-1.png", "/pentest-2.png", "/pentest-3.png", "/pentest-4.png", "/pentest-5.png", "/pentest-6.png"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Movie Recommendation System",
      desc: "Dynamic full-stack web app delivering personalized film suggestions. Features interactive UI with smooth flip animations and TMDB API integration.",
      tech: ["Python", "Flask", "JavaScript", "SQLite", "TMDB API"],
      features: [
        "User preference capture with session-based similarity matching.",
        "Animated card flips and lazy-loaded posters for smooth browsing.",
        "TMDB-powered metadata enrichment with genre and cast filters."
      ],
      gallery: ["/movie-rec-1.png", "/movie-rec-2.png", "/movie-rec-3.png"],
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop"
    }
  ],
  contact: {
    email: "vinjamuri.dsa1@gmail.com",
    location: "Camarillo, CA 93010",
    phone: "626-737-4304"
  }
};
