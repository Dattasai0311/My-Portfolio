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
    },
    {
      id: 3,
      title: "Network Anomaly Detection System",
      desc: "Intelligent full-stack monitoring application that identifies real-time network anomalies using unsupervised machine learning. Built with a Python Flask backend, ML-driven detection engine, and containerized deployment architecture.",
      tech: ["Python", "Flask", "Scikit-Learn", "Pandas", "NumPy", "Docker", "Docker Compose", "Bcrypt"],
      features: [
        "Isolation Forest-based anomaly detection achieving 99.7% accuracy across multi-dimensional telemetry data (CPU, latency, throughput).",
        "High-throughput processing engine evaluating 76,000+ requests/sec using Pandas and NumPy stress-testing pipelines.",
        "Secure Flask REST API with bcrypt authentication and automated alerting (SNS-style trigger simulation at 80%+ threat confidence).",
        "Docker & Docker Compose-based microservice deployment for isolated, zero-dependency execution."
      ],
      gallery: ["/NAD.png", "/NAD-1.png", "/NAD-2.png"],
      image: "/NAD-cover.jpg"
    }
  ],
  badgesAndCertificates: [
    {
      id: 1,
      type: "badge",
      title: "AWS - ML Foundations",
      issuer: "AWS Academy",
      date: "2024",
      image: "/cert/aws-academy-graduate-machine-learning-foundations-t.png",
      skills:
        "SageMaker pipelines, Autopilot, Forecast, Rekognition, Comprehend, Polly, Translate, Lex, Amazon Q Developer (gen-AI)",
      link: "https://www.credly.com/earner/earned/badge/1fc79f81-df10-4f9a-a733-4199737b4b55"
    },
    {
      id: 2,
      type: "badge",
      title: "AWS - Cloud Architecting",
      issuer: "AWS Academy",
      date: "2024",
      image: "/cert/aws-academy-graduate-cloud-architecting-training-ba.png",
      skills:
        "S3, IAM, Lambda, API Gateway, DynamoDB, Elastic Beanstalk, ECS, ElastiCache, CloudFront, SNS/SQS, Kinesis, CI/CD (CloudFormation, SAM)",
      link: "https://www.credly.com/earner/earned/badge/5bbedbfc-16e4-4a0b-b48f-c34978548496"
    },
    {
      id: 3,
      type: "badge",
      title: "Cisco - Data Analytics",
      issuer: "Cisco Networking Academy",
      date: "2024",
      image: "/cert/data-analytics-essentials.png",
      skills: "Data Analysis, Data Storytelling, Data Visualization, Tableau, Dashboard, Excel, SQL",
      link: "https://www.credly.com/badges/42fb14ce-7089-4526-8d15-1137cf9577ff/public_url"
    },
    {
      id: 4,
      type: "certificate",
      title: "Cisco - IT Customer Support",
      issuer: "Cisco Networking Academy",
      date: "2024",
      image: "/cert/it-customer-support-basics.png",
      skills:
        "Customer Service, Effective Communication, Remote Troubleshooting, Documentation and Reporting, Help Desk, Concepts, Technical Problem Solving",
      link: "https://www.credly.com/badges/bcef1ffc-cf09-46c7-9d8b-a90af7eec8d2/public_url"
    }
  ],
  contact: {
    email: "vinjamuri.dsa1@gmail.com",
    location: "Camarillo, CA 93010",
    phone: "626-737-4304"
  }
};
