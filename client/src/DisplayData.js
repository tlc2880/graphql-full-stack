import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
      rating
      isInTheaters
    }
  }
`;

const GET_USER_BY_NAME = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      username
      age
      nationality
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");
  const [userSearched, setUserSearched] = useState("");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [
    fetchUser,
    { data: userSearchedData, error: userError },
  ] = useLazyQuery(GET_USER_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}

      <div>
        <input
          type="text"
          placeholder="2..."
          onChange={(event) => {
            setUserSearched(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchUser({
              variables: {
                id: userSearched,
              },
            });
          }}
        > 
          Fetch User
        </button>
        <div>
          {userSearchedData && (
            <div>
              <h1>Name: {userSearchedData.user.name}</h1>
              <h1>
                username: {userSearchedData.user.username}
              </h1>
              <h1>
                Age: {userSearchedData.user.age}
              </h1>
              <h1>
                Nationality: {userSearchedData.user.nationality}
              </h1>{" "}
            </div>
          )}
          {userError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>

      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Movie Name: {movie.name}</h1>;
      })}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        > 
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
              <h1>
                Rating: {movieSearchedData.movie.rating}
              </h1>
              <h1>
                Is in Theaters: {JSON.stringify(movieSearchedData.movie.isInTheaters)}
              </h1>{" "}
            </div>
          )}
          {movieError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
