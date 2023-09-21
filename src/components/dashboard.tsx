import React, { useState, useEffect } from "react";
import { API } from "../Network";
import { PiCaretCircleDoubleRightThin } from "react-icons/pi";

interface IDashboard {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

function Dashboard({ data, setData }: IDashboard) {
  const [editedData, setEditedData] = useState(data);
  const [adminPassword, setAdminPassword] = useState(data.adminPassword);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validGenres, setValidGenres] = useState<Array<string>>([]);
  const [validVotes, setValidVotes] = useState<Array<string>>([]);

  // New state variables for genre search
  const [genreSearchQuery, setGenreSearchQuery] = useState("");
  const [foundGenreIndex, setFoundGenreIndex] = useState(-1);

  useEffect(() => {
    setAdminPassword(adminPassword);
  }, [data.adminPassword]);

  useEffect(() => {
    const fetchData = async () => {
      const genresResult = await API.Enums.getValidGenres();
      if (genresResult) {
        setValidGenres(genresResult);
      }
      const voteResult = await API.Enums.getValidVotes();
      if (voteResult) {
        setValidVotes(voteResult);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    // Implement API update logic here for each field
    try {
      setLoading(true);
      await API.Admin.setAppConfig(adminPassword, editedData);
      setLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ensure that the selected genre is one of the valid genres
    if (name === "genres" && !validGenres.includes(value)) {
      return;
    }

    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenresChange = (genre: string) => {
    const updatedGenres = editedData.genres.includes(genre)
      ? editedData.genres.filter((g: any) => g !== genre)
      : [...editedData.genres, genre];

    setEditedData((prevData: any) => ({
      ...prevData,
      genres: updatedGenres,
    }));
  };

  const handleVotesChange = (vote: string) => {
    const updatedVotes = editedData.votes.includes(vote)
      ? editedData.votes.filter((v: any) => v !== vote)
      : [...editedData.votes, vote];

    setEditedData((prevData: any) => ({
      ...prevData,
      votes: updatedVotes,
    }));
  };

  // Function to search for a genre
  const searchGenre = () => {
    if (genreSearchQuery.trim() === "") {
      return;
    }

    const lowerCaseQuery = genreSearchQuery.toLowerCase();

    if (foundGenreIndex === -1) {
      setFoundGenreIndex(0);
    } else {
      const nextIndex = validGenres.findIndex(
        (genre, index) =>
          index > foundGenreIndex &&
          genre.toLowerCase().includes(lowerCaseQuery)
      );

      if (nextIndex !== -1) {
        setFoundGenreIndex(nextIndex);
      } else {
        // No more matching genres found, start from the beginning
        setFoundGenreIndex(0);
      }
    }

    // Scroll to the found genre
    const genreLabel = document.querySelector(
      `label[data-genre="${validGenres[foundGenreIndex]}"]`
    );
    if (genreLabel) {
      genreLabel.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goBackToPreviousGenre = () => {
    if (foundGenreIndex > 0) {
      const previousIndex = validGenres
        .slice(0, foundGenreIndex)
        .reverse()
        .findIndex((genre) =>
          genre.toLowerCase().includes(genreSearchQuery.toLowerCase())
        );

      if (previousIndex !== -1) {
        const newIndex = foundGenreIndex - (previousIndex + 1);
        setFoundGenreIndex(newIndex);

        // Scroll to the found genre
        const genreLabel = document.querySelector(
          `label[data-genre="${validGenres[newIndex]}"]`
        );
        if (genreLabel) {
          genreLabel.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const addAllGenres = () => {
    // Add all genres that match the search query
    const updatedGenres = validGenres.filter((genre) =>
      genre.toLowerCase().includes(genreSearchQuery.toLowerCase())
    );

    setEditedData((prevData: any) => ({
      ...prevData,
      genres: [...prevData.genres, ...updatedGenres],
    }));
  };

  const removeAllGenres = () => {
    // Remove all genres that match the search query
    const updatedGenres = editedData.genres.filter(
      (genre: string) =>
        !genre.toLowerCase().includes(genreSearchQuery.toLowerCase())
    );

    setEditedData((prevData: any) => ({
      ...prevData,
      genres: updatedGenres,
    }));
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-h1">{`${data.platform}`} Dashboard</h1>
      {isEditing ? (
        <div>
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
              <label className="label-admin-edit" key={vote.toString()}>
                <input
                  type="checkbox"
                  name="votes"
                  value={vote.toString()}
                  checked={editedData.votes.includes(vote)}
                  onChange={() => handleVotesChange(vote.toString())}
                />{" "}
                {vote}
              </label>
            ))}
          </label>
          <div className="binder-all-search">
            <button className="addall-button" onClick={addAllGenres}>
              Add All {genreSearchQuery} Genres
            </button>
            <input
              className="genres-search"
              type="text"
              placeholder="Search Genre"
              value={genreSearchQuery}
              onChange={(e) => setGenreSearchQuery(e.target.value)}
            />
            <button className="removeall-button" onClick={removeAllGenres}>
              Remove All {genreSearchQuery} Genres
            </button>
          </div>
          <button className="search-button" onClick={searchGenre}>
            Search
          </button>
          <button className="back-button" onClick={goBackToPreviousGenre}>
            Back
          </button>
          <button
            className="reset-button"
            onClick={() => setFoundGenreIndex(-1)}
          >
            Reset Search
          </button>
          <label
            className="label-admin-edit scrollable-admin-label"
            style={{ overflowY: "scroll" }}
          >
            Genres:
            {validGenres.map((genre) => (
              <label className="label-admin-edit" key={genre.toString()}>
                <input
                  type="checkbox"
                  name="genres"
                  value={genre.toString()}
                  checked={editedData.genres.includes(genre)}
                  onChange={() => handleGenresChange(genre.toString())}
                />{" "}
                <label data-genre={genre}>{genre}</label>
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
