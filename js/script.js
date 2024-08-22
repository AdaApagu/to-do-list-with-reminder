document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const reminderInput = document.getElementById('reminderInput');
    const taskList = document.getElementById('taskList');
    const beepSound = document.getElementById('beepSound');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value;
        const reminderTime = new Date(reminderInput.value);

        if (taskText && reminderTime) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText} (Reminder: ${reminderTime.toLocaleString()})</span>
                <button class="remove">Remove</button>
                <button class="stop">Stop Sound</button> <!-- Add Stop button -->
            `;
            
            const removeButton = taskItem.querySelector('button.remove');
            removeButton.addEventListener('click', () => {
                taskItem.remove();
            });

            const stopButton = taskItem.querySelector('button.stop');
            stopButton.addEventListener('click', () => {
                beepSound.pause();         // Stop the beep sound
                beepSound.currentTime = 0; // Reset the sound
            });

            taskList.appendChild(taskItem);

            const now = new Date();
            if (reminderTime > now) {
                const timeUntilReminder = reminderTime - now;
                setTimeout(() => {
                    beepSound.play(); // Play the beep sound
                    alert(`Reminder: ${taskText}`);
                }, timeUntilReminder);
            } else {
                alert(`Reminder time is in the past. Please set a future time.`);
            }

            // Clear input fields
            taskInput.value = '';
            reminderInput.value = '';
        }
    });
});
