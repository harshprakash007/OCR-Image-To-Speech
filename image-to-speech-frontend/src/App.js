import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We'll add some simple styling

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setAudioUrl(null); // Reset audio on new file selection

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setIsLoading(true);
      setError('');
      setAudioUrl(null);

      // Make sure the URL points to your Flask backend
      const response = await axios.post('http://localhost:5000/process-image', formData, {
        responseType: 'blob', // This is crucial for handling the audio file
      });

      // Create a URL for the audio blob
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

    } catch (err) {
      // Handle errors from the backend
      const errorMessage = err.response && err.response.status === 400
      ? "Could not detect any text. Please try a clearer image."
      : "An error occurred. Please try again.";
      setError(errorMessage);
      console.error('Error uploading image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
    <h1>📷 Image to Speech 🗣️</h1>
    <p>Upload an image containing text, and I'll read it back to you.</p>

    <div className="upload-section">
    <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} />
    <label htmlFor="file-upload" className="custom-file-upload">
    Choose Image
    </label>
    <button onClick={handleUpload} disabled={isLoading || !selectedFile}>
    {isLoading ? 'Processing...' : 'Generate Speech'}
    </button>
    </div>

    {error && <p className="error-message">{error}</p>}

    <div className="content-display">
    {preview && (
      <div className="image-preview">
      <h3>Preview</h3>
      <img src={preview} alt="Selected" />
      </div>
    )}

    {audioUrl && (
      <div className="audio-player">
      <h3>Listen to the Result</h3>
      <audio controls autoPlay src={audioUrl}>
      Your browser does not support the audio element.
      </audio>
      </div>
    )}
    </div>
    </div>
  );
}

export default App;
