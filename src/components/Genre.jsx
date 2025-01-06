import "./Genre.css";
import { useNavigate } from "react-router-dom";

function genre(props) {
  const navigate = useNavigate();

  function genrePage(id) {
    navigate(`genre/${id}`);
  }

  return (
    <div className="genre-container">
      <h className="genre-title">Genres</h>
      <ol className="ordered-list">
        {props.genreList.map((item) => (
          <li key={item.id} className="genre-list" onClick={() => genrePage(item.id)}>
            {item.genre}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default genre;