import React, { useState, useEffect } from "react";
import dotenv from 'dotenv';
import { API } from "../Network";


const validGenres = []

const validVotes = ["SKIP", "VOLUMEUP", "VOLUMEDOWN"];

function Dashboard({ data, setData }) {
  const [editedData, setEditedData] = useState(data);
  const [adminPassword, setAdminPassword] = useState(data.adminPassword);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validGenres, setValidGenres] = useState<Array<String>>([]); 
  const [validVotes, setValidVotes] = useState<Array<String>>([]); 

  useEffect(() => {
    setAdminPassword(adminPassword);
  }, [data.adminPassword]);

  useEffect( async () => {
    const genresResult  = await API.Enums.getValidGenres();
    if (genresResult){
      setValidGenres(genresResult);
    }
    const voteResult  = await API.Enums.getValidVotes();
    if (voteResult){
      setValidVotes(voteResult);
    }
  }, [])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    // Implement your API update logic here for each field
    try {
      setLoading(true);
      await API.Admin.setAppConfig(adminPassword, editedData);
      setLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure that the selected genre is one of the valid genres
    if (name === "genres" && !validGenres.includes(value)) {
      return;
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenresChange = (genre) => {
    const updatedGenres = editedData.genres.includes(genre)
      ? editedData.genres.filter((g) => g !== genre)
      : [...editedData.genres, genre];

    setEditedData((prevData) => ({
      ...prevData,
      genres: updatedGenres,
    }));
  };

  const handleVotesChange = (vote) => {
    const updatedVotes = editedData.votes.includes(vote)
      ? editedData.votes.filter((v) => v !== vote)
      : [...editedData.votes, vote];

    setEditedData((prevData) => ({
      ...prevData,
      votes: updatedVotes,
    }));
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-h1">Spotify Dashboard</h1>
      {isEditing ? (
        <div style={{ overflowY: "scroll" }}>
          <label className="label-admin-edit">
            Platform:
            <input
              type="text"
              className="input-text-admin"
              name="platform"
              value={editedData.platform}
              onChange={handleInputChange}
            />
          </label>
          <label className="label-admin-edit">
            Admin Password:
            <input
              type="text"
              className="input-text-admin"
              name="adminPassword"
              value={editedData.adminPassword}
              onChange={handleInputChange}
            />
          </label>
          <label className="label-admin-edit">
            Minutes Between Queue Adds:
            <input
              className="input-number-admin"
              type="number"
              name="minutes_between_queue_adds"
              value={editedData.minutes_between_queue_adds}
              onChange={handleInputChange}
            />
          </label>
          <label className="label-admin-edit">
            Votes:
            {validVotes.map((vote) => (
              <label className="label-admin-edit" key={vote}>
                <input
                  type="checkbox"
                  name="votes"
                  value={vote}
                  checked={editedData.votes.includes(vote)}
                  onChange={() => handleVotesChange(vote)}
                />{" "}
                {vote}
              </label>
            ))}
          </label>
          <label
            className="label-admin-edit scrollable-admin-label"
            style={{ overflowY: "scroll" }}
          >
            Genres:
            {validGenres.map((genre) => (
              <label className="label-admin-edit" key={genre}>
                <input
                  type="checkbox"
                  name="genres"
                  value={genre}
                  checked={editedData.genres.includes(genre)}
                  onChange={() => handleGenresChange(genre)}
                />{" "}
                {genre}
              </label>
            ))}
          </label>
          <button className="button-admin" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>
            Platform: <span className="data-value">{editedData.platform}</span>
          </p>
          <p>
            Admin Password:{" "}
            <span className="data-value">{editedData.adminPassword}</span>
          </p>
          <p>
            Minutes Between Queue Adds:{" "}
            <span className="data-value">
              {editedData.minutes_between_queue_adds}
            </span>
          </p>
          <p>
            Votes:{" "}
            <span className="data-value">{editedData.votes.join(", ")}</span>
          </p>
          <p>
            Genres:{" "}
            <span className="data-value">{editedData.genres.join(", ")}</span>
          </p>
          <button
            className="edit-button button-admin"
            onClick={handleEditClick}
          >
            Edit
          </button>
          {loading && <h2>Loading ...</h2>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
