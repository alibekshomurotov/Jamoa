// CV Builder Main JavaScript
let currentTemplate = 'modern';
let cvData = {
    personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    updatePreview();
    
    // Check for selected template from landing page
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
        const templateMap = {
            '1': 'modern',
            '2': 'creative',
            '3': 'classic',
            '4': 'modern',
            '5': 'classic',
            '6': 'creative'
        };
        changeTemplate(templateMap[selectedTemplate] || 'modern');
        localStorage.removeItem('selectedTemplate');
    }
    
    // Auto-save every 30 seconds
    setInterval(saveToLocalStorage, 30000);
});

// Template Management
function changeTemplate(template) {
    currentTemplate = template;
    
    // Update template selection UI
    document.querySelectorAll('.template-option').forEach(option => {
        option.classList.remove('border-blue-500');
        option.classList.add('border-gray-200');
    });
    
    event.target.closest('.template-option').classList.remove('border-gray-200');
    event.target.closest('.template-option').classList.add('border-blue-500');
    
    updatePreview();
}

// Form Management
function updatePreview() {
    // Collect form data
    cvData.personalInfo = {
        name: document.getElementById('fullName')?.value || '',
        title: document.getElementById('jobTitle')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        summary: document.getElementById('summary')?.value || ''
    };
    
    renderPreview();
}

function renderPreview() {
    const previewContainer = document.getElementById('cv-preview');
    if (!previewContainer) return;
    
    let html = '';
    
    switch(currentTemplate) {
        case 'modern':
            html = renderModernTemplate();
            break;
        case 'classic':
            html = renderClassicTemplate();
            break;
        case 'creative':
            html = renderCreativeTemplate();
            break;
        default:
            html = renderModernTemplate();
    }
    
    previewContainer.innerHTML = html;
    
    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
        });
    }, 100);
}

// Template Renderers
function renderModernTemplate() {
    return `
        <div class="template-modern bg-white p-8" style="width: 210mm; min-height: 297mm;">
            <!-- Header -->
            <div class="border-b-2 border-blue-500 pb-6 mb-6">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">${cvData.personalInfo.name || 'Your Name'}</h1>
                <p class="text-xl text-blue-600 font-medium mb-3">${cvData.personalInfo.title || 'Your Title'}</p>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                    ${cvData.personalInfo.email ? `<span>📧 ${cvData.personalInfo.email}</span>` : ''}
                    ${cvData.personalInfo.phone ? `<span>📞 ${cvData.personalInfo.phone}</span>` : ''}
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="col-span-1">
                    <!-- Summary -->
                    ${cvData.personalInfo.summary ? `
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">SUMMARY</h2>
                            <p class="text-sm text-gray-700 leading-relaxed">${cvData.personalInfo.summary}</p>
                        </div>
                    ` : ''}
                    
                    <!-- Skills -->
                    ${cvData.skills.length > 0 ? `
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">SKILLS</h2>
                            ${cvData.skills.map(skill => `
                                <div class="mb-3">
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-700">${skill.name}</span>
                                        <span class="text-gray-500">${skill.level}/5</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="skill-bar bg-blue-500 h-2 rounded-full" data-width="${skill.level * 20}"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Right Column -->
                <div class="col-span-2">
                    <!-- Experience -->
                    ${cvData.experience.length > 0 ? `
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">EXPERIENCE</h2>
                            ${cvData.experience.map(exp => `
                                <div class="mb-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 class="font-semibold text-gray-800">${exp.position}</h3>
                                            <p class="text-blue-600 font-medium">${exp.company}</p>
                                        </div>
                                        <span class="text-sm text-gray-500">${exp.startDate} - ${exp.endDate}</span>
                                    </div>
                                    <p class="text-sm text-gray-700 leading-relaxed">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Education -->
                    ${cvData.education.length > 0 ? `
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">EDUCATION</h2>
                            ${cvData.education.map(edu => `
                                <div class="mb-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 class="font-semibold text-gray-800">${edu.degree}</h3>
                                            <p class="text-blue-600 font-medium">${edu.school}</p>
                                        </div>
                                        <span class="text-sm text-gray-500">${edu.startDate} - ${edu.endDate}</span>
                                    </div>
                                    <p class="text-sm text-gray-700">${edu.field}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderClassicTemplate() {
    return `
        <div class="template-classic bg-white p-8" style="width: 210mm; min-height: 297mm;">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">${cvData.personalInfo.name || 'Your Name'}</h1>
                <p class="text-lg text-gray-600 mb-4">${cvData.personalInfo.title || 'Your Title'}</p>
                <div class="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
                    ${cvData.personalInfo.email ? `<span>${cvData.personalInfo.email}</span>` : ''}
                    ${cvData.personalInfo.phone ? `<span>•</span><span>${cvData.personalInfo.phone}</span>` : ''}
                </div>
            </div>
            
            <!-- Professional Summary -->
            ${cvData.personalInfo.summary ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-3">PROFESSIONAL SUMMARY</h2>
                    <p class="text-sm text-gray-700 leading-relaxed">${cvData.personalInfo.summary}</p>
                </div>
            ` : ''}
            
            <!-- Experience -->
            ${cvData.experience.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">WORK EXPERIENCE</h2>
                    ${cvData.experience.map(exp => `
                        <div class="mb-4">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-gray-800">${exp.position}</h3>
                                <span class="text-sm text-gray-500">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <p class="text-gray-600 font-medium mb-2">${exp.company}</p>
                            <p class="text-sm text-gray-700 leading-relaxed">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <!-- Education -->
            ${cvData.education.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">EDUCATION</h2>
                    ${cvData.education.map(edu => `
                        <div class="mb-4">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-gray-800">${edu.degree}</h3>
                                <span class="text-sm text-gray-500">${edu.startDate} - ${edu.endDate}</span>
                            </div>
                            <p class="text-gray-600 font-medium mb-1">${edu.school}</p>
                            <p class="text-sm text-gray-700">${edu.field}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <!-- Skills -->
            ${cvData.skills.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">SKILLS</h2>
                    <div class="grid grid-cols-2 gap-4">
                        ${cvData.skills.map(skill => `
                            <div>
                                <span class="text-sm text-gray-700">${skill.name}</span>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="skill-bar bg-gray-600 h-2 rounded-full" data-width="${skill.level * 20}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderCreativeTemplate() {
    return `
        <div class="template-creative bg-white" style="width: 210mm; min-height: 297mm;">
            <!-- Header Banner -->
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
                <h1 class="text-4xl font-bold mb-2">${cvData.personalInfo.name || 'Your Name'}</h1>
                <p class="text-xl opacity-90">${cvData.personalInfo.title || 'Your Title'}</p>
                <div class="flex flex-wrap gap-4 text-sm mt-4 opacity-90">
                    ${cvData.personalInfo.email ? `<span>📧 ${cvData.personalInfo.email}</span>` : ''}
                    ${cvData.personalInfo.phone ? `<span>📞 ${cvData.personalInfo.phone}</span>` : ''}
                </div>
            </div>
            
            <div class="p-8">
                <!-- Summary -->
                ${cvData.personalInfo.summary ? `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">📝</span>
                            About Me
                        </h2>
                        <p class="text-gray-700 leading-relaxed">${cvData.personalInfo.summary}</p>
                    </div>
                ` : ''}
                
                <div class="grid grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div>
                        <!-- Experience -->
                        ${cvData.experience.length > 0 ? `
                            <div class="mb-6">
                                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm mr-3">💼</span>
                                    Experience
                                </h2>
                                ${cvData.experience.map(exp => `
                                    <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                                        <h3 class="font-bold text-gray-800">${exp.position}</h3>
                                        <p class="text-purple-600 font-medium mb-2">${exp.company}</p>
                                        <p class="text-sm text-gray-600 mb-2">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-sm text-gray-700">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Right Column -->
                    <div>
                        <!-- Education -->
                        ${cvData.education.length > 0 ? `
                            <div class="mb-6">
                                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span class="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm mr-3">🎓</span>
                                    Education
                                </h2>
                                ${cvData.education.map(edu => `
                                    <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                                        <h3 class="font-bold text-gray-800">${edu.degree}</h3>
                                        <p class="text-purple-600 font-medium mb-1">${edu.school}</p>
                                        <p class="text-sm text-gray-600 mb-1">${edu.startDate} - ${edu.endDate}</p>
                                        <p class="text-sm text-gray-700">${edu.field}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <!-- Skills -->
                        ${cvData.skills.length > 0 ? `
                            <div class="mb-6">
                                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">⚡</span>
                                    Skills
                                </h2>
                                ${cvData.skills.map(skill => `
                                    <div class="mb-3">
                                        <div class="flex justify-between text-sm mb-1">
                                            <span class="text-gray-700">${skill.name}</span>
                                            <span class="text-gray-500">${skill.level}/5</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-3">
                                            <div class="skill-bar bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" data-width="${skill.level * 20}"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Experience Management
function addExperience() {
    const experienceSection = document.getElementById('experience-section');
    const experienceId = Date.now();
    
    const experienceHTML = `
        <div class="experience-entry p-4 border border-gray-200 rounded-lg mb-4" data-id="${experienceId}">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Company Name" oninput="updateExperienceData(${experienceId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Job Title" oninput="updateExperienceData(${experienceId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="MM/YYYY" oninput="updateExperienceData(${experienceId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="MM/YYYY or Present" oninput="updateExperienceData(${experienceId})">
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Describe your responsibilities and achievements..." oninput="updateExperienceData(${experienceId})"></textarea>
            </div>
            <button onclick="removeExperience(${experienceId})" class="text-red-500 hover:text-red-600 text-sm">
                Remove Experience
            </button>
        </div>
    `;
    
    experienceSection.insertAdjacentHTML('beforeend', experienceHTML);
    
    // Add to data array
    cvData.experience.push({
        id: experienceId,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
    });
}

function updateExperienceData(id) {
    const entry = document.querySelector(`[data-id="${id}"]`);
    const inputs = entry.querySelectorAll('input, textarea');
    
    const experienceIndex = cvData.experience.findIndex(exp => exp.id === id);
    if (experienceIndex !== -1) {
        cvData.experience[experienceIndex] = {
            id: id,
            company: inputs[0].value,
            position: inputs[1].value,
            startDate: inputs[2].value,
            endDate: inputs[3].value,
            description: inputs[4].value
        };
    }
    
    updatePreview();
}

function removeExperience(id) {
    document.querySelector(`[data-id="${id}"]`).remove();
    cvData.experience = cvData.experience.filter(exp => exp.id !== id);
    updatePreview();
}

// Education Management
function addEducation() {
    const educationSection = document.getElementById('education-section');
    const educationId = Date.now();
    
    const educationHTML = `
        <div class="education-entry p-4 border border-gray-200 rounded-lg mb-4" data-id="${educationId}">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="School Name" oninput="updateEducationData(${educationId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Bachelor of Science" oninput="updateEducationData(${educationId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Computer Science" oninput="updateEducationData(${educationId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="2020" oninput="updateEducationData(${educationId})">
                </div>
            </div>
            <button onclick="removeEducation(${educationId})" class="text-red-500 hover:text-red-600 text-sm">
                Remove Education
            </button>
        </div>
    `;
    
    educationSection.insertAdjacentHTML('beforeend', educationHTML);
    
    cvData.education.push({
        id: educationId,
        school: '',
        degree: '',
        field: '',
        endDate: ''
    });
}

function updateEducationData(id) {
    const entry = document.querySelector(`[data-id="${id}"]`);
    const inputs = entry.querySelectorAll('input');
    
    const educationIndex = cvData.education.findIndex(edu => edu.id === id);
    if (educationIndex !== -1) {
        cvData.education[educationIndex] = {
            id: id,
            school: inputs[0].value,
            degree: inputs[1].value,
            field: inputs[2].value,
            endDate: inputs[3].value
        };
    }
    
    updatePreview();
}

function removeEducation(id) {
    document.querySelector(`[data-id="${id}"]`).remove();
    cvData.education = cvData.education.filter(edu => edu.id !== id);
    updatePreview();
}

// Skills Management
function addSkill() {
    const skillsSection = document.getElementById('skills-section');
    const skillId = Date.now();
    
    const skillHTML = `
        <div class="skill-entry p-4 border border-gray-200 rounded-lg mb-4" data-id="${skillId}">
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="e.g., JavaScript" oninput="updateSkillData(${skillId})">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Level (1-5)</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" onchange="updateSkillData(${skillId})">
                        <option value="1">1 - Beginner</option>
                        <option value="2">2 - Elementary</option>
                        <option value="3">3 - Intermediate</option>
                        <option value="4">4 - Advanced</option>
                        <option value="5">5 - Expert</option>
                    </select>
                </div>
            </div>
            <button onclick="removeSkill(${skillId})" class="text-red-500 hover:text-red-600 text-sm mt-2">
                Remove Skill
            </button>
        </div>
    `;
    
    skillsSection.insertAdjacentHTML('beforeend', skillHTML);
    
    cvData.skills.push({
        id: skillId,
        name: '',
        level: 3
    });
}

function updateSkillData(id) {
    const entry = document.querySelector(`[data-id="${id}"]`);
    const inputs = entry.querySelectorAll('input, select');
    
    const skillIndex = cvData.skills.findIndex(skill => skill.id === id);
    if (skillIndex !== -1) {
        cvData.skills[skillIndex] = {
            id: id,
            name: inputs[0].value,
            level: parseInt(inputs[1].value)
        };
    }
    
    updatePreview();
}

function removeSkill(id) {
    document.querySelector(`[data-id="${id}"]`).remove();
    cvData.skills = cvData.skills.filter(skill => skill.id !== id);
    updatePreview();
}

// Local Storage Management
function saveToLocalStorage() {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    localStorage.setItem('currentTemplate', currentTemplate);
    
    // Show save confirmation
    showNotification('CV saved successfully!', 'success');
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('cvData');
    const savedTemplate = localStorage.getItem('currentTemplate');
    
    if (savedData) {
        cvData = JSON.parse(savedData);
        
        // Populate form fields
        if (document.getElementById('fullName')) {
            document.getElementById('fullName').value = cvData.personalInfo.name || '';
            document.getElementById('jobTitle').value = cvData.personalInfo.title || '';
            document.getElementById('email').value = cvData.personalInfo.email || '';
            document.getElementById('phone').value = cvData.personalInfo.phone || '';
            document.getElementById('summary').value = cvData.personalInfo.summary || '';
        }
        
        // Recreate experience entries
        cvData.experience.forEach(exp => {
            if (!document.querySelector(`[data-id="${exp.id}"]`)) {
                addExperience();
                const entry = document.querySelector(`[data-id="${exp.id}"]`);
                if (entry) {
                    const inputs = entry.querySelectorAll('input, textarea');
                    inputs[0].value = exp.company;
                    inputs[1].value = exp.position;
                    inputs[2].value = exp.startDate;
                    inputs[3].value = exp.endDate;
                    inputs[4].value = exp.description;
                }
            }
        });
        
        // Recreate education entries
        cvData.education.forEach(edu => {
            if (!document.querySelector(`[data-id="${edu.id}"]`)) {
                addEducation();
                const entry = document.querySelector(`[data-id="${edu.id}"]`);
                if (entry) {
                    const inputs = entry.querySelectorAll('input');
                    inputs[0].value = edu.school;
                    inputs[1].value = edu.degree;
                    inputs[2].value = edu.field;
                    inputs[3].value = edu.endDate;
                }
            }
        });
        
        // Recreate skill entries
        cvData.skills.forEach(skill => {
            if (!document.querySelector(`[data-id="${skill.id}"]`)) {
                addSkill();
                const entry = document.querySelector(`[data-id="${skill.id}"]`);
                if (entry) {
                    const inputs = entry.querySelectorAll('input, select');
                    inputs[0].value = skill.name;
                    inputs[1].value = skill.level;
                }
            }
        });
    }
    
    if (savedTemplate) {
        currentTemplate = savedTemplate;
    }
}

// PDF Export
function exportToPDF() {
    const element = document.getElementById('cv-preview');
    
    // Show loading state
    showNotification('Generating PDF...', 'info');
    
    const opt = {
        margin: 0,
        filename: `${cvData.personalInfo.name || 'CV'}_CVPro.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
        showNotification('PDF exported successfully!', 'success');
    }).catch(error => {
        console.error('PDF export error:', error);
        showNotification('Error exporting PDF. Please try again.', 'error');
    });
}

// Preview Controls
function zoomPreview(direction) {
    const preview = document.getElementById('cv-preview');
    const currentScale = parseFloat(preview.style.transform.replace(/[^0-9.]/g, '')) || 0.7;
    
    let newScale;
    if (direction === 'in') {
        newScale = Math.min(currentScale + 0.1, 1.0);
    } else {
        newScale = Math.max(currentScale - 0.1, 0.5);
    }
    
    preview.style.transform = `scale(${newScale})`;
}

// Notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form Section Management
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for form sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.addEventListener('click', function() {
            // Remove active class from all sections
            document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
            // Add active class to clicked section
            this.classList.add('active');
        });
    });
});

// Auto-save on form changes
document.addEventListener('input', function() {
    // Debounce auto-save
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(saveToLocalStorage, 2000);
});