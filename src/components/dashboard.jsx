import React, { useState, useEffect } from 'react';
import {API} from '../Network';

const validGenres = [
  "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", 
  "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", 
  "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", 
  "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", 
  "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", 
  "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", 
  "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", 
  "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", 
  "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", 
  "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", 
  "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", 
  "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", 
  "work-out", "world-music"
];

function Dashboard({ data, setData }) {
  const [editedData, setEditedData] = useState(data);
  const [adminPassword, setAdminPassword] = useState(data.adminPassword);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setAdminPassword(adminPassword);
  }, [data.adminPassword])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    // Implement your API update logic here for each field
    try {
      // Example: Update the 'platform' field
      // const updatedPlatform = await updatePlatform(editedData.platform);
      // setEditedData((prevData) => ({ ...prevData, platform: updatedPlatform }));

      // Repeat the same for other fields
      // ...

      // After updating all fields, you can update the data in the parent component
      // setData(editedData);
      setLoading(true); 
      await API.Admin.setAppConfig(adminPassword, editedData); 
      setIsEditing(false); 
      setLoading(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure that the selected genre is one of the valid genres
    if (name === 'genres' && !validGenres.includes(value)) {
      return;
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard">
      <h1>Spotify Dashboard</h1>
      {isEditing ? (
        <div>
          <label>
            Platform:
            <input
              type="text"
              name="platform"
              value={editedData.platform}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Admin Password:
            <input
              type="text"
              name="adminPassword"
              value={editedData.adminPassword}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Minutes Between Queue Adds:
            <input
              type="number"
              name="minutes_between_queue_adds"
              value={editedData.minutes_between_queue_adds}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Votes:
            <input
              type="text"
              name="votes"
              value={editedData.votes}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Genres:
            <input
              type="text"
              name="genres"
              value={editedData.genres}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>
            Platform: <span className="data-value">{editedData.platform}</span>
          </p>
          <p>
            Admin Password: <span className="data-value">{editedData.adminPassword}</span>
          </p>
          <p>
            Minutes Between Queue Adds:{' '}
            <span className="data-value">{editedData.minutes_between_queue_adds}</span>
          </p>
          <p>
            Votes:{' '}
            <span className="data-value">{editedData.votes}</span>
          </p>
          <p>
            Genres:{' '}
            <span className="data-value">{editedData.genres.map( genre => genre + " " )}</span>
          </p>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
          {loading && <h2>Loading ...</h2>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
