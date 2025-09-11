class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentTaskId = this.getNextTaskId();
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.initializeSettings();
    }

    bindEvents() {
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const closeSettings = document.getElementById('closeSettings');
        const saveSettings = document.getElementById('saveSettings');
        const testConnection = document.getElementById('testConnection');

        // Existing event listeners
        addTaskBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Settings modal event listeners
        settingsBtn.addEventListener('click', () => this.openSettings());
        closeSettings.addEventListener('click', () => this.closeSettings());
        saveSettings.addEventListener('click', () => this.saveAISettings());
        testConnection.addEventListener('click', () => this.testAIConnection());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('settingsModal');
            if (e.target === modal) {
                this.closeSettings();
            }
        });

        // Auto-save on input changes
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('task-title') || e.target.classList.contains('subtask-title')) {
                this.saveTasks();
            }
        });
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const title = taskInput.value.trim();

        if (!title) {
            taskInput.focus();
            return;
        }

        const task = {
            id: this.currentTaskId++,
            title: title,
            completed: false,
            subtasks: []
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        taskInput.value = '';
        taskInput.focus();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            // If main task is completed, mark all subtasks as completed
            if (task.completed) {
                task.subtasks.forEach(subtask => subtask.completed = true);
            }
            this.saveTasks();
            this.renderTasks();
        }
    }

    updateTaskTitle(taskId, newTitle) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            this.saveTasks();
        }
    }

    addSubtask(taskId, subtaskTitle) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task && subtaskTitle.trim()) {
            const subtask = {
                id: Date.now(), // Simple ID for subtasks
                title: subtaskTitle.trim(),
                completed: false
            };
            task.subtasks.push(subtask);
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteSubtask(taskId, subtaskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
            this.saveTasks();
            this.renderTasks();
        }
    }

    toggleSubtask(taskId, subtaskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const subtask = task.subtasks.find(s => s.id === subtaskId);
            if (subtask) {
                subtask.completed = !subtask.completed;
                this.saveTasks();
                this.renderTasks();
            }
        }
    }

    updateSubtaskTitle(taskId, subtaskId, newTitle) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const subtask = task.subtasks.find(s => s.id === subtaskId);
            if (subtask) {
                subtask.title = newTitle;
                this.saveTasks();
            }
        }
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        
        if (this.tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks yet!</h3>
                    <p>Add your first task above to get started with your to-do list.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.tasks.map(task => this.renderTask(task)).join('');
        this.bindTaskEvents();
    }

    renderTask(task) {
        const subtasksHtml = task.subtasks.map(subtask => `
            <div class="subtask-item">
                <div class="subtask-checkbox ${subtask.completed ? 'checked' : ''}" 
                     onclick="todoApp.toggleSubtask(${task.id}, ${subtask.id})"></div>
                <input type="text" 
                       class="subtask-title ${subtask.completed ? 'completed' : ''}" 
                       value="${this.escapeHtml(subtask.title)}"
                       onblur="todoApp.updateSubtaskTitle(${task.id}, ${subtask.id}, this.value)"
                       onkeypress="if(event.key==='Enter') this.blur()">
                <button class="subtask-delete-btn" 
                        onclick="todoApp.deleteSubtask(${task.id}, ${subtask.id})"
                        title="Delete subtask">×</button>
            </div>
        `).join('');

        const isAIConfigured = this.isAIConfigured();

        return `
            <div class="task-item">
                <div class="task-header">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         onclick="todoApp.toggleTask(${task.id})"></div>
                    <input type="text" 
                           class="task-title ${task.completed ? 'completed' : ''}" 
                           value="${this.escapeHtml(task.title)}"
                           onblur="todoApp.updateTaskTitle(${task.id}, this.value)"
                           onkeypress="if(event.key==='Enter') this.blur()">
                    <div class="task-actions">
                        <button class="plan-for-me-btn" 
                                onclick="todoApp.planForMe(${task.id})"
                                ${!isAIConfigured ? 'disabled' : ''}
                                title="${isAIConfigured ? 'AI-generate subtasks' : 'Configure AI settings first'}">
                            <span class="magic-wand">🪄</span>
                            PlanForMe
                        </button>
                        <button class="add-subtask-btn" 
                                onclick="todoApp.showSubtaskInput(${task.id})"
                                title="Add subtask">+ Subtask</button>
                        <button class="delete-btn" 
                                onclick="todoApp.deleteTask(${task.id})"
                                title="Delete task">×</button>
                    </div>
                </div>
                <div class="subtasks-container">
                    ${subtasksHtml}
                    <div id="subtask-input-${task.id}" class="add-subtask-input" style="display: none;">
                        <input type="text" 
                               class="subtask-input" 
                               placeholder="Enter subtask title..."
                               onkeypress="if(event.key==='Enter') todoApp.confirmAddSubtask(${task.id})">
                        <button class="add-subtask-confirm" 
                                onclick="todoApp.confirmAddSubtask(${task.id})">Add</button>
                        <button class="cancel-subtask" 
                                onclick="todoApp.hideSubtaskInput(${task.id})">Cancel</button>
                    </div>
                </div>
            </div>
        `;
    }

    bindTaskEvents() {
        // Additional event binding if needed
    }

    showSubtaskInput(taskId) {
        const inputContainer = document.getElementById(`subtask-input-${taskId}`);
        const input = inputContainer.querySelector('.subtask-input');
        
        inputContainer.style.display = 'flex';
        input.focus();
    }

    hideSubtaskInput(taskId) {
        const inputContainer = document.getElementById(`subtask-input-${taskId}`);
        const input = inputContainer.querySelector('.subtask-input');
        
        inputContainer.style.display = 'none';
        input.value = '';
    }

    confirmAddSubtask(taskId) {
        const inputContainer = document.getElementById(`subtask-input-${taskId}`);
        const input = inputContainer.querySelector('.subtask-input');
        const title = input.value.trim();

        if (title) {
            this.addSubtask(taskId, title);
            this.hideSubtaskInput(taskId);
        } else {
            input.focus();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // AI-Powered "Plan for Me" functionality
    async planForMe(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task || !this.isAIConfigured()) {
            return;
        }

        const button = document.querySelector(`button[onclick="todoApp.planForMe(${taskId})"]`);
        const originalText = button.innerHTML;
        
        try {
            // Show loading state
            button.disabled = true;
            button.innerHTML = '<span class="magic-wand">⏳</span> Planning...';

            const subtasks = await this.generateSubtasks(task.title);
            
            if (subtasks && subtasks.length > 0) {
                // Add generated subtasks to the task
                subtasks.forEach(subtaskTitle => {
                    const subtask = {
                        id: Date.now() + Math.random(), // Ensure unique IDs
                        title: subtaskTitle.trim(),
                        completed: false
                    };
                    task.subtasks.push(subtask);
                });

                this.saveTasks();
                this.renderTasks();
                
                // Show success message
                this.showConnectionStatus('AI successfully generated subtasks!', 'success');
            } else {
                this.showConnectionStatus('No subtasks generated. Try a more specific task.', 'error');
            }
        } catch (error) {
            console.error('Error generating subtasks:', error);
            this.showConnectionStatus('Failed to generate subtasks. Please check your AI settings.', 'error');
        } finally {
            // Restore button state
            setTimeout(() => {
                const currentButton = document.querySelector(`button[onclick="todoApp.planForMe(${taskId})"]`);
                if (currentButton) {
                    currentButton.disabled = false;
                    currentButton.innerHTML = originalText;
                }
            }, 1000);
        }
    }

    async generateSubtasks(taskTitle) {
        const { endpoint, apiKey, apiVersion, deploymentName } = this.settings;

        if (!endpoint || !apiKey || !apiVersion || !deploymentName) {
            throw new Error('AI settings not configured');
        }

        const prompt = `Break down this task into smaller, actionable subtasks (max 10):

Task: "${taskTitle}"

Please respond with ONLY a JSON array of strings, each string being a subtask. No explanations, no formatting, just the JSON array. Example: ["subtask 1", "subtask 2", "subtask 3"]`;

        const requestBody = {
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that breaks down tasks into smaller, actionable subtasks. Always respond with a valid JSON array of strings."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_completion_tokens: 500,
            temperature: 1
        };

        const response = await fetch(`${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        
        if (!data || !data.choices || !data.choices[0].message.content) {
            throw new Error("No content in API response");
        }

        const content = data.choices[0]?.message?.content;
        
        if (!content) {
            throw new Error('No content in API response');
        }

        try {
            // Try to parse as JSON
            const subtasks = JSON.parse(content.trim());
            if (Array.isArray(subtasks)) {
                return subtasks.slice(0, 10); // Limit to 10 subtasks
            } else {
                throw new Error('Response is not an array');
            }
        } catch (parseError) {
            // If JSON parsing fails, try to extract tasks from text
            console.warn('Failed to parse JSON, attempting text extraction:', parseError);
            return this.extractSubtasksFromText(content);
        }
    }

    extractSubtasksFromText(text) {
        // Fallback method to extract subtasks from non-JSON text
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const subtasks = [];
        
        for (const line of lines) {
            // Remove common prefixes and clean up
            let cleaned = line.trim()
                .replace(/^\d+\.\s*/, '')  // Remove "1. "
                .replace(/^[-*•]\s*/, '')  // Remove "- " or "* " or "• "
                .replace(/^["']/, '')     // Remove leading quotes
                .replace(/["']$/, '')     // Remove trailing quotes
                .trim();
                
            if (cleaned.length > 0 && cleaned.length <= 100) {
                subtasks.push(cleaned);
                if (subtasks.length >= 10) break;
            }
        }
        
        return subtasks;
    }

    // Settings Management
    openSettings() {
        const modal = document.getElementById('settingsModal');
        modal.style.display = 'block';
        
        // Populate current settings
        document.getElementById('apiEndpoint').value = this.settings.endpoint || '';
        document.getElementById('apiKey').value = this.settings.apiKey || '';
        document.getElementById('apiVersion').value = this.settings.apiVersion || '2024-12-01-preview';
        document.getElementById('deploymentName').value = this.settings.deploymentName || 'gpt-4o';

        // Clear any previous status
        this.clearConnectionStatus();
    }

    closeSettings() {
        const modal = document.getElementById('settingsModal');
        modal.style.display = 'none';
        this.clearConnectionStatus();
    }

    saveAISettings() {
        const endpoint = document.getElementById('apiEndpoint').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const apiVersion = document.getElementById('apiVersion').value.trim() || '2024-12-01-preview';
        const deploymentName = document.getElementById('deploymentName').value.trim() || 'gpt-4o';

        if (!endpoint || !apiKey || !apiVersion || !deploymentName) {
            this.showConnectionStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Validate endpoint URL
        try {
            new URL(endpoint);
        } catch (error) {
            this.showConnectionStatus('Please enter a valid endpoint URL.', 'error');
            return;
        }

        this.settings = {
            endpoint: endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint,
            apiKey: apiKey,
            apiVersion: apiVersion,
            deploymentName: deploymentName
        };

        this.saveSettings();
        this.showConnectionStatus('Settings saved successfully!', 'success');
        
        // Re-render tasks to update button states
        this.renderTasks();
        
        setTimeout(() => {
            this.closeSettings();
        }, 1500);
    }

    async testAIConnection() {
        const endpoint = document.getElementById('apiEndpoint').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const apiVersion = document.getElementById('apiVersion').value.trim() || '2024-12-01-preview';
        const deploymentName = document.getElementById('deploymentName').value.trim() || 'gpt-4o';

        if (!endpoint || !apiKey || !apiVersion || !deploymentName) {
            this.showConnectionStatus('Please fill in all fields first.', 'error');
            return;
        }

        const testButton = document.getElementById('testConnection');
        const originalText = testButton.innerHTML;
        
        try {
            testButton.disabled = true;
            testButton.innerHTML = '⏳ Testing...';
            this.showConnectionStatus('Testing connection...', 'info');

            const testEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
            
            const response = await fetch(`${testEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: "Hello, this is a test connection."
                        }
                    ],
                    max_completion_tokens: 10
                })
            });

            if (response.ok) {
                this.showConnectionStatus('✅ Connection successful! Your AI settings are working.', 'success');
            } else {
                const errorText = await response.text();
                this.showConnectionStatus(`❌ Connection failed: ${response.status} ${response.statusText}`, 'error');
            }
        } catch (error) {
            this.showConnectionStatus(`❌ Connection error: ${error.message}`, 'error');
        } finally {
            testButton.disabled = false;
            testButton.innerHTML = originalText;
        }
    }

    showConnectionStatus(message, type) {
        const statusDiv = document.getElementById('connectionStatus');
        statusDiv.textContent = message;
        statusDiv.className = `connection-status ${type}`;
        statusDiv.style.display = 'block';
    }

    clearConnectionStatus() {
        const statusDiv = document.getElementById('connectionStatus');
        statusDiv.style.display = 'none';
        statusDiv.className = 'connection-status';
    }

    isAIConfigured() {
        return this.settings && this.settings.endpoint && this.settings.apiKey && this.settings.apiVersion && this.settings.deploymentName;
    }

    initializeSettings() {
        // Initialize settings UI state
        if (!this.isAIConfigured()) {
            console.log('AI not configured. Please set up your Azure AI Foundry settings.');
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('todoAppTasks', JSON.stringify(this.tasks));
            localStorage.setItem('todoAppCurrentId', this.currentTaskId.toString());
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('todoAppTasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    getNextTaskId() {
        try {
            const saved = localStorage.getItem('todoAppCurrentId');
            return saved ? parseInt(saved) : 1;
        } catch (error) {
            console.error('Error loading task ID:', error);
            return 1;
        }
    }

    // Settings Storage (with encryption for API key)
    saveSettings() {
        try {
            // Simple encryption for API key (base64 encoding)
            const settingsToSave = {
                ...this.settings,
                apiKey: this.settings.apiKey ? btoa(this.settings.apiKey) : ''
            };
            localStorage.setItem('todoAppAISettings', JSON.stringify(settingsToSave));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('todoAppAISettings');
            if (!saved) return {};
            
            const settings = JSON.parse(saved);
            // Decrypt API key
            if (settings.apiKey) {
                settings.apiKey = atob(settings.apiKey);
            }
            return settings;
        } catch (error) {
            console.error('Error loading settings:', error);
            return {};
        }
    }

    // Export/Import functionality (bonus feature)
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-todo-tasks.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = importedTasks;
                    this.saveTasks();
                    this.renderTasks();
                    alert('Tasks imported successfully!');
                }
            } catch (error) {
                alert('Error importing tasks. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when the page loads
let todoApp;

document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});

// Handle page visibility changes to save data
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && todoApp) {
        todoApp.saveTasks();
    }
});

// Handle page unload to save data
window.addEventListener('beforeunload', () => {
    if (todoApp) {
        todoApp.saveTasks();
    }
});
