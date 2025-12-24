# 📸 Image to Speech App

This project uses **Optical Character Recognition (OCR)** to extract text from an uploaded image and then reads the text aloud using **Text-to-Speech (TTS)**. 

The application is structured with a Python/Flask backend for the image processing and a React frontend for the user interface.

---

## 🔗 Live Demo
You can check out the live version of the app here:  
**https://drive.google.com/drive/u/0/folders/1IvT5GcMkRuJ4n-KB8-HAWM1UMCIjFfvH**

---

## 🚀 Features
* **Image Upload:** Supports PNG, JPG, and JPEG.
* **OCR Extraction:** High-accuracy text extraction from images.
* **TTS Playback:** Instant audio readout of extracted text.
* **Responsive UI:** Built with React for a seamless user experience.

---

## 🛠️ Setup and Installation

You must set up the backend and frontend separately.

### 1. Backend (Flask)



```bash
# Navigate into the backend folder
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install the required Python packages
pip install -r requirements.txt

# Start the Flask server
python app.py
