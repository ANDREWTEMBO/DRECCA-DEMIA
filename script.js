// Tab Navigation
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Course Data
const courseData = [
    { title: "Global Business Ethics", category: "Business", img: "https://picsum.photos/id/1/300/200" },
    { title: "AI for Educators", category: "Technology", img: "https://picsum.photos/id/2/300/200" },
    { title: "International Law", category: "Social Sciences", img: "https://picsum.photos/id/3/300/200" }
];

function renderCourses() {
    const list = document.getElementById('courseList');
    list.innerHTML = courseData.map(course => `
        <div class="course-card">
            <img src="${course.img}" alt="${course.title}">
            <div class="p-15">
                <h4>${course.title}</h4>
                <p>${course.category}</p>
                <button class="enroll-btn">Enroll</button>
            </div>
        </div>
    `).join('');
}
renderCourses();

// SIMPLE Chat
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Welcome message
appendMessage("Drecca AI", "Welcome! I'm your study assistant. Ask me about courses or learning tips!");

function handleChat() {
    const text = userInput.value;
    if (!text) return;

    appendMessage("You", text);
    userInput.value = "";

    // Simple responses
    const response = "Thanks for your question! For detailed AI responses, please configure the Gemini API key in the future.";
    
    setTimeout(() => {
        appendMessage("Drecca AI", response);
    }, 500);
}

function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${sender}:</strong> <p>${text}</p>`;
    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// Add enroll button functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('enroll-btn')) {
        alert("Course enrollment successful! Check your dashboard.");
    }
});
// Tab Navigation (keep existing)
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        
        // Update browser title
        document.title = `DRECCA DEMIA | ${tab.textContent.trim()}`;
    });
});

// Enhanced Course Data
const courseData = [
    { 
        title: "Global Business Ethics", 
        category: "Business & Management", 
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
        description: "Navigate international business with ethical frameworks",
        duration: "8 weeks",
        level: "Intermediate"
    },
    { 
        title: "AI for Educators", 
        category: "Technology & Education", 
        img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
        description: "Integrate artificial intelligence in modern teaching",
        duration: "10 weeks",
        level: "Advanced"
    },
    { 
        title: "International Law", 
        category: "Social Sciences", 
        img: "https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w=600",
        description: "Understand global legal systems and regulations",
        duration: "12 weeks",
        level: "Intermediate"
    },
    { 
        title: "Data Science Fundamentals", 
        category: "Technology", 
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        description: "Master data analysis and visualization techniques",
        duration: "14 weeks",
        level: "Beginner"
    }
];

// Enhanced course rendering
function renderCourses() {
    const list = document.getElementById('courseList');
    list.innerHTML = courseData.map(course => `
        <div class="course-card">
            <img src="${course.img}" alt="${course.title}" loading="lazy">
            <div class="p-15">
                <div class="course-badge">${course.level}</div>
                <h4>${course.title}</h4>
                <p class="course-category">${course.category}</p>
                <p class="course-desc">${course.description}</p>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-users"></i> 250+ students</span>
                </div>
                <button class="enroll-btn" onclick="enrollCourse('${course.title}')">Enroll Now</button>
            </div>
        </div>
    `).join('');
}
renderCourses();

// Enrollment function
function enrollCourse(courseTitle) {
    // Update progress
    const progressFill = document.querySelector('.progress-bar .fill');
    let currentWidth = parseInt(progressFill.style.width) || 45;
    currentWidth = Math.min(currentWidth + 15, 100);
    progressFill.style.width = `${currentWidth}%`;
    
    // Update student name
    document.getElementById('studentName').textContent = 
        `Enrolled in: ${courseTitle}`;
    
    // Show notification
    showNotification(`🎉 Successfully enrolled in "${courseTitle}"!`);
    
    // Switch to dashboard
    document.querySelector('[data-tab="ldms"]').click();
}

// Notification system
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Show
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Enhanced Chat System
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Welcome message
appendMessage("Drecca AI", "Hello! I'm your AI study assistant at Drecca Demia. How can I help you with your studies today?");

// Chat responses database
const chatResponses = {
    "hello": "Hello! Welcome to Drecca Demia. What would you like to learn about today?",
    "courses": "We offer courses in Business, Technology, Law, and Data Science. Which area interests you?",
    "enroll": "To enroll, click any 'Enroll Now' button on a course card!",
    "dashboard": "Your dashboard shows progress and enrolled courses.",
    "help": "I can help with: course info, enrollment, study tips, and more!",
    "business": "Our Business Ethics course covers international standards and ethical decision-making.",
    "ai": "The AI for Educators course teaches practical AI integration in teaching.",
    "law": "International Law focuses on global legal systems and regulations.",
    "data": "Data Science Fundamentals covers analysis, visualization, and Python basics.",
    "thanks": "You're welcome! Let me know if you need anything else."
};

function handleChat() {
    const text = userInput.value.trim().toLowerCase();
    if (!text) return;

    // Add user message
    appendMessage("You", userInput.value);
    userInput.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Find best response
    setTimeout(() => {
        hideTypingIndicator();
        
        let response = "I'm here to help with Drecca Demia courses and learning! Could you be more specific?";
        
        // Check for keywords
        for (const [keyword, reply] of Object.entries(chatResponses)) {
            if (text.includes(keyword)) {
                response = reply;
                break;
            }
        }
        
        appendMessage("Drecca AI", response);
    }, 1000 + Math.random() * 500);
}

// Typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing">
            <strong>Drecca AI is typing</strong>
            <span class="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </div>
    `;
    chatDisplay.appendChild(typingDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.className = `message ${sender.toLowerCase().replace(' ', '-')}`;
    div.innerHTML = `<strong>${sender}:</strong> <p>${text}</p>`;
    chatDisplay.appendChild(div);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// Add typing dots animation
const typingStyle = document.createElement('style');
typingStyle.textContent = `
    .typing {
        opacity: 0.7;
        font-style: italic;
    }
    .dots span {
        animation: blink 1.4s infinite;
        animation-fill-mode: both;
    }
    .dots span:nth-child(2) { animation-delay: 0.2s; }
    .dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink {
        0% { opacity: 0.2; }
        20% { opacity: 1; }
        100% { opacity: 0.2; }
    }
`;
document.head.appendChild(typingStyle);

// Sample questions for user
setTimeout(() => {
    appendMessage("System", "💡 Try asking about: 'courses', 'enrollment', 'business ethics', or 'help'");
}, 2000);

// Auto-save chat on refresh
window.addEventListener('beforeunload', () => {
    const messages = Array.from(chatDisplay.children)
        .map(el => el.textContent)
        .join('\n');
    localStorage.setItem('drecca_chat_history', messages);
});

// Load previous chat if exists
window.addEventListener('load', () => {
    const saved = localStorage.getItem('drecca_chat_history');
    if (saved && chatDisplay.children.length <= 2) {
        // Could implement chat history restoration here
    }
});
// Gemini AI Integration
async function initializeGeminiAI() {
    const API_KEY = "gen-lang-client-0709456847"; // Replace with actual key
    
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        console.log("No Gemini API key configured");
        return null;
    }
    
    try {
        const genAI = new google.generativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });
        return model;
    } catch (error) {
        console.error("Failed to initialize Gemini:", error);
        return null;
    }
}
// Simple user system
class UserSystem {
    constructor() {
        this.currentUser = localStorage.getItem('drecca_user') || null;
    }
    
    login(username) {
        this.currentUser = username;
        localStorage.setItem('drecca_user', username);
        this.updateUI();
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('drecca_user');
        this.updateUI();
    }
    
    updateUI() {
        const nameElement = document.getElementById('studentName');
        if (this.currentUser) {
            nameElement.textContent = `Welcome back, ${this.currentUser}!`;
        }
    }
}

const userSystem = new UserSystem();

// Enhanced chat with AI
async function handleChatWithAI(text) {
    const model = await initializeGeminiAI();
    
    if (!model) {
        return "AI service is currently unavailable. Please try the basic chat.";
    }
    
    const prompt = `You are Drecca AI, a helpful academic tutor at DRECCA DEMIA International Learning Institute.
    
    Context: We offer courses in Business, Technology, Law, and Data Science.
    
    Student Question: "${text}"
    
    Provide a helpful, educational response. If relevant, mention our course offerings.
    Keep responses clear and concise.`;
    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Error:", error);
        return "I apologize, but I'm having trouble processing your request right now.";
    }
}
class CourseProgress {
    constructor() {
        this.enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses')) || [];
    }
    
    enroll(courseId) {
        this.enrolledCourses.push({
            id: courseId,
            enrolledAt: new Date(),
            progress: 0,
            completed: false
        });
        this.save();
    }
    
    updateProgress(courseId, progress) {
        const course = this.enrolledCourses.find(c => c.id === courseId);
        if (course) {
            course.progress = progress;
            course.completed = progress >= 100;
            this.save();
        }
    }
    
    save() {
        localStorage.setItem('enrolled_courses', JSON.stringify(this.enrolledCourses));
    }
}
/* Dark mode */
[data-theme="dark"] {
    --primary: #1e3a8a;
    --gold: #d4af37;
    --bg: #0f172a;
    --white: #f1f5f9;
}

.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    z-index: 1000;
}


