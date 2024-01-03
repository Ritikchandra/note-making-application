import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import plus from "../src/assets/eventsModalCloseButton.png";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [slides, setSlides] = useState([]);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedSlides = JSON.parse(localStorage.getItem("slides")) || [];
    setSlides(storedSlides);
  }, []);

  const saveSlidesToLocalStorage = (updatedSlides) => {
    localStorage.setItem("slides", JSON.stringify(updatedSlides));
  };

  // const handleAddNote = () => {
  //   const newSlides = [...slides, slides.length + 1];
  //   setSlides(newSlides);
  //   saveSlidesToLocalStorage(newSlides);
  // };
  const handleAddNote = () => {
    const newSlide = {
      id: Date.now(), // Use a unique identifier for each slide
      title: "Note Title",
      noteText: "Note Text",
    };
    const newSlides = [...slides, newSlide];
    setSlides(newSlides);
    saveSlidesToLocalStorage(newSlides);
  };
  const handleView = (slide) => {
    setSelectedSlide(slide);
    setModalOpen(true);
  };

  const handleDelete = (slide) => {
    const updatedSlides = slides.filter((s) => s !== slide);
    setSlides(updatedSlides);
    saveSlidesToLocalStorage(updatedSlides);
  };
  // const handleSaveNoteText = (slide, updatedNoteText) => {
  //   const updatedSlides = slides.map((s) =>
  //     s === slide ? { ...s, noteText: updatedNoteText } : s
  //   );

  //   setSlides(updatedSlides);
  //   saveSlidesToLocalStorage(updatedSlides);
  // };
  const handleSaveNoteText = (slide, updatedNoteText, updatedTitle) => {
    const updatedSlides = slides.map((s) =>
      s.id === slide.id ? { ...s, noteText: updatedNoteText, title: updatedTitle } : s
    );
  
    setSlides(updatedSlides);
    saveSlidesToLocalStorage(updatedSlides);
  };
  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  return (
    <>
      <div className="pageWrapper">
        <div className="topWrapper">
          <div className="heading">YourNotes</div>
          <div className="addNoteBtnWrapper">
            <button onClick={handleAddNote}>Add Note</button>
          </div>
        </div>
        <div className="cardsContainer">
          {slides.length === 0 ? (
            <p className="addNotesText">
              <img
                src={plus}
                alt="add"
                className="crossImage"
                onClick={handleAddNote}
              />
              Add Notes
            </p>
          ) : (
            // <Swiper
            //   effect={"cards"}
            //   grabCursor={true}
            //   modules={[EffectCards]}
            //   className="mySwiper"
            // >
            //   {slides.map((slide) => (
            //     <SwiperSlide key={slide.id}>
            //       <div>
            //         <p>{slide.title}</p>
            //         <p>{slide.noteText.length > 20
            //             ? `${slide.noteText.slice(0, 20)}...`
            //             : slide.noteText.length > 0
            //             ? slide.noteText.slice(3, slide.noteText.length - 4)
            //             : ''}</p>
            //         <button onClick={() => handleView(slide)}>View/Edit</button>
            //         <button onClick={() => handleDelete(slide)}>Delete</button>
            //       </div>
            //     </SwiperSlide>
            //   ))}
            // </Swiper>
            <Swiper
  effect={"cards"}
  grabCursor={true}
  modules={[EffectCards]}
  className="mySwiper"
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div>
        <p>{slide.title}</p>
        <p>{sanitizeHtml(slide.noteText).length > 15
            ? `${sanitizeHtml(slide.noteText).slice(0, 15)}...`
            : sanitizeHtml(slide.noteText).length > 0
            ? sanitizeHtml(slide.noteText).slice(0, sanitizeHtml(slide.noteText).length - 4)
            : ''}</p>
        <button onClick={() => handleView(slide)}>View/Edit</button>
        <button onClick={() => handleDelete(slide)}>Delete</button>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
          )}
        </div>
      </div>
      {isModalOpen && selectedSlide && (
        <Modal
          selectedSlide={selectedSlide}
          onSaveNoteText={handleSaveNoteText}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;