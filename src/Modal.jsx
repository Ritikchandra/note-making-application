
import React, { useState, useEffect } from "react";
import plus from "../src/assets/eventsModalCloseButton.png";

const Modal = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState("Note text");
  const [title, setTitle] = useState("Note Title");
  const [isModalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const storedNoteText = localStorage.getItem(`noteText_${props.selectedSlide.id}`);
    const storedTitle = localStorage.getItem(`title_${props.selectedSlide.id}`);

    if (storedNoteText) {
      setNoteText(storedNoteText);
    }

    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, [props.selectedSlide.id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem(`noteText_${props.selectedSlide.id}`, noteText);
    localStorage.setItem(`title_${props.selectedSlide.id}`, title);
    setEditMode(false);
    props.onSaveNoteText(props.selectedSlide, noteText, title);
  };

  const handleCloseClick = () => {
    props.onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modalContainer">
          <div className="modalWrapper">
            <div className="modalTop">
              <div className="modalTitle">
                {editMode ? (
                  <input
                    type="text"
                    value={title}
                    maxLength={20}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  title
                )}
              </div>
              <div className="editBtn">
                {editMode ? (
                  <>
                    <button onClick={handleSaveClick} className="button">Save Note</button>
                    <button onClick={() => setEditMode(false)}className="button">Cancel</button>
                  </>
                ) : (
                  <button onClick={handleEditClick}className="button">Edit Note</button>
                )}
              </div>
            </div>
            <div className="textSection"onClick={handleEditClick}>
              {editMode ? (
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              ) : (
                <div>{noteText}</div>
              )}
            </div>
          </div>
          <img
            src={plus}
            alt="add"
            className="modalClose"
            onClick={handleCloseClick}
          />
        </div>
      )}
    </>
  );
};

export default Modal;