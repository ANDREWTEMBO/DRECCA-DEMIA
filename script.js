// Tab Navigation
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
        level: "Intermediate",
        id: "course1"
    },
    { 
        title: "AI for Educators", 
        category: "Technology & Education", 
        img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
        description: "Integrate artificial intelligence in modern teaching",
        duration: "10 weeks",
        level: "Advanced",
        id: "course2"
    },
    { 
        title: "International Law", 
        category: "Social Sciences", 
        img: "https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w=600",
        description: "Understand global legal systems and regulations",
        duration: "12 weeks",
        level: "Intermediate",
        id: "course3"
    },
    { 
        title: "Data Science Fundamentals", 
        category: "Technology", 
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        description: "Master data analysis and visualization techniques",
        duration: "14 weeks",
        level: "Beginner",
        id: "course4"
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
                <button class="enroll-btn" data-course="${course.id}">Enroll Now</button>
            </div>
        </div>
    `).join('');
}

// Initialize courses
renderCourses();

// Enrollment function
function enrollCourse(courseId) {
    const course = courseData.find(c => c.id === courseId);
    if (!course) return;
    
    // Update progress
    const progressFill = document.querySelector('.progress-bar .fill');
    let currentWidth = parseInt(progressFill.style.width) || 45;
    currentWidth = Math.min(currentWidth + 15, 100);
    progressFill.style.width = `${currentWidth}%`;
    
    // Update student name
    document.getElementById('studentName').textContent = 
        `Enrolled in: ${course.title}`;
    
    // Show notification
    showNotification(`🎉 Successfully enrolled in "${course.title}"!`);
    
    // Save to local storage
    const courseProgress = new CourseProgress();
    courseProgress.enroll(courseId);
    
    // Switch to dashboard
    setTimeout(() => {
        document.querySelector('[data-tab="ldms"]').click();
    }, 1500);
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
    
    document.body.appendChild(notification);
    
    // Show
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Chat System
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
            </span>
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

// Enroll button event delegation
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('enroll-btn')) {
        const courseId = e.target.getAttribute('data-course');
        enrollCourse(courseId);
    }
});

// Sample questions for user
setTimeout(() => {
    appendMessage("System", "💡 Try asking about: 'courses', 'enrollment', 'business ethics', or 'help'");
}, 2000);

// Course Progress System
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
        console.log('Enrolled in course:', courseId);
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

// Simple User System
class UserSystem {
    constructor() {
        this.currentUser = localStorage.getItem('drecca_user') || null;
        this.init();
    }
    
    init() {
        this.updateUI();
    }
    
    login(username) {
        this.currentUser = username;
        localStorage.setItem('drecca_user', username);
        this.updateUI();
        showNotification(`Welcome back, ${username}!`);
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('drecca_user');
        this.updateUI();
        showNotification("Logged out successfully");
    }
    
    updateUI() {
        const nameElement = document.getElementById('studentName');
        if (this.currentUser) {
            nameElement.textContent = `Welcome back, ${this.currentUser}!`;
        }
    }
}

// Initialize user system
const userSystem = new UserSystem();

// Initialize course progress system
const courseProgress = new CourseProgress();

// Page load event
window.addEventListener('load', () => {
    // Add loading animation
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
    
    // Remove loading after 1.5 seconds
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 300);
    }, 1500);
    
    // Check for saved chat history
    const saved = localStorage.getItem('drecca_chat_history');
    if (saved && chatDisplay.children.length <= 2) {
        // Could restore chat history here
    }
});

// Course filtering (for future use)
function filterCourses(category) {
    const filtered = category === 'all' 
        ? courseData 
        : courseData.filter(course => course.category.includes(category));
    
    // Re-render filtered courses
    const list = document.getElementById('courseList');
    list.innerHTML = filtered.map(course => `
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
                <button class="enroll-btn" data-course="${course.id}">Enroll Now</button>
            </div>
        </div>
    `).join('');
}
