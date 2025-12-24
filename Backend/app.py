import cv2
import easyocr
import numpy as np
import pyttsx3
from flask import Flask, request, send_file
from flask_cors import CORS
import io
import os
import uuid # To generate unique filenames

# Initialize Flask App and CORS
app = Flask(__name__)
CORS(app) # This allows your React frontend to make requests to the Flask backend

# Initialize the EasyOCR reader
# This is done once when the server starts to save time on each request
reader = easyocr.Reader(['en'], gpu=False)

# Initialize the text-to-speech engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)
engine.setProperty('volume', 0.9)

@app.route('/process-image', methods=['POST'])
def process_image():
    # 1. Check if an image was uploaded
    if 'image' not in request.files:
        return 'No image file provided', 400

    file = request.files['image']

    # Read the image file in memory
    in_memory_file = io.BytesIO()
    file.save(in_memory_file)
    in_memory_file.seek(0)

    # Convert the image data to an OpenCV image
    file_bytes = np.frombuffer(in_memory_file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # 2. Perform OCR on the image
    text_results = reader.readtext(img)

    paragraph = ''
    for t in text_results:
        bbox, detected_text, score = t
        paragraph += detected_text + ' '

    print("Detected Text:", paragraph)

    if not paragraph.strip():
        return "Could not detect any text in the image.", 400

    # 3. Convert the extracted text to an audio file
    # Generate a unique filename to avoid conflicts if multiple users access it
    output_filename = f"{uuid.uuid4()}.mp3"

    # Use save_to_file instead of say() and runAndWait()
    engine.save_to_file(paragraph, output_filename)
    engine.runAndWait()

    # 4. Send the audio file back to the frontend
    try:
        # send_file will send the file and then it can be deleted
        return send_file(
            output_filename,
            mimetype='audio/mpeg',
            as_attachment=True,
            download_name='speech.mp3' # The filename the user will see
        )
    finally:
        # Clean up by deleting the temporary audio file after it's sent
        os.remove(output_filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
