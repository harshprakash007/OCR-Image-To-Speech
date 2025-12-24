# 📸 Image to Speech App

This project uses Optical Character Recognition (OCR) to extract text from an uploaded image and then reads the text aloud using Text-to-Speech (TTS).

The application is structured with a Python/Flask backend for the image processing and a React frontend for the user interface.

---

## Setup and Installation

You must set up the backend and frontend separately.

### 1. Backend (Flask)

```bash
# Navigate into the backend folder
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt
