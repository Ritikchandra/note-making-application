# YourNotes App

## Overview

YourNotes is a simple note-taking application built using React. It allows users to add, view, edit, and delete notes in a card-based interface. The application utilizes local storage to persist user data.

## Features

- **Add Note**: Users can easily add new notes by clicking the "Add Note" button.

- **View/Edit Note**: Clicking on the "View/Edit" button on a note card opens a modal where users can view or edit the note's title and content.

- **Delete Note**: Users can delete a note by clicking the "Delete" button on the note card.

- **Persistent Storage**: Notes are stored locally, ensuring that users can access their notes even after closing the browser.

## Code Structure

### App Component

The `App` component is the main entry point of the application. It manages the state of notes, opens a modal for viewing/editing notes, and handles various user interactions.

- **Add Note**: `handleAddNote` function adds a new note to the state and local storage.

- **View/Edit Note**: `handleView` function sets the selected note for viewing/editing and opens the modal.

- **Delete Note**: `handleDelete` function removes a note from the state and local storage.

- **Save Note Text**: `handleSaveNoteText` function updates the note text and title and saves them to local storage.

- **Sanitize HTML**: The `sanitizeHtml` function removes HTML tags from a given text.

### Modal Component

The `Modal` component provides a modal interface for viewing and editing notes. It includes a title, text area, and buttons for editing and saving.

- **Edit Mode**: `editMode` state toggles between viewing and editing modes.

- **Handle Edit Click**: `handleEditClick` function switches to edit mode.

- **Handle Save Click**: `handleSaveClick` function saves the edited note and switches back to view mode.

- **Handle Close Click**: `handleCloseClick` function closes the modal.

- **Local Storage**: The component uses local storage to persist the edited note's title and text.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application with `npm start`.

## Dependencies

- React: JavaScript library for building user interfaces.
- Swiper: Touch-enabled slider library for React.
- React Quill: Rich Text Editor component for React.



---
