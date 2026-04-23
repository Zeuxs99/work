let lastSavedText = '';

window.addEventListener('DOMContentLoaded', async() => {
    const textarea = document.getElementById('note');
    const saveBtn = document.getElementById('save');
    const saveAsBtn = document.getElementById('save-as');
    const newNoteBtn = document.getElementById('new-note');
    const openBtn = document.getElementById('open'); // NEW
    const statusEl = document.getElementById('save_status');

    // Load default note
    const saved = await window.electronAPI.loadNote();
    textarea.value = saved;
    lastSavedText = saved;

    // Save
    saveBtn.addEventListener('click', async() => {
        await window.electronAPI.saveNote(textarea.value);
        lastSavedText = textarea.value;
        statusEl.textContent = 'Saved!';
    });

    // Save As
    saveAsBtn.addEventListener('click', async() => {
        await window.electronAPI.saveAs(textarea.value);
        statusEl.textContent = 'Saved as new file!';
    });
    //open file
    openBtn.addEventListener('click', async() => {
        if (textarea.value !== lastSavedText) {
            const result = await window.electronAPI.newNote();
            if (!result.confirmed) return;
        }

        const result = await window.electronAPI.openNote();

        if (result.success) {
            textarea.value = result.content;
            lastSavedText = result.content;
            statusEl.textContent = 'File opened!';
        }
    });

    // New note
    newNoteBtn.addEventListener('click', async() => {
        if (textarea.value !== lastSavedText) {
            const result = await window.electronAPI.newNote();
            if (!result.confirmed) return;
        }

        textarea.value = '';
        lastSavedText = '';
        statusEl.textContent = 'New note started';
    });

    // Auto-save
    let timer;
    textarea.addEventListener('input', () => {
        clearTimeout(timer);
        statusEl.textContent = 'Typing...';

        timer = setTimeout(async() => {
            await window.electronAPI.saveNote(textarea.value);
            lastSavedText = textarea.value;
            statusEl.textContent = 'Auto-saved!';
        }, 3000);
    });
});