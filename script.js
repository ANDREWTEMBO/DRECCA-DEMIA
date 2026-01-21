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
