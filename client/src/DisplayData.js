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
      id
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
  query User($name: String!) {
    findUserName(name: $name) {
      name
      username
      age
      nationality
    }
  }
`;

const GET_USER_BY_ID = gql`
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
  const [userSearchedName, setUserSearchedName] = useState("James");
  const [movieSearched, setMovieSearched] = useState("Interstellar");
  const [userSearched, setUserSearched] = useState("2");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [
    fetchUserName,
    { data: userSearchedNameData, error: userError },
  ] = useLazyQuery(GET_USER_BY_NAME);
  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [
    fetchUser,
    { data: userSearchedData, error: userError2 },
  ] = useLazyQuery(GET_USER_BY_ID);

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
            <div key={user.id}>
              <h3>Name: {user.name}</h3>
              <h3>Username: {user.username}</h3>
              <h3>Age: {user.age}</h3>
              <h3>Nationality: {user.nationality}</h3>
            </div>
          );
        })}

<div>
        <input
          type="text"
          placeholder="James..."
          onChange={(event) => {
            setUserSearchedName(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchUserName({
              variables: {
                name: userSearchedName,
              },
            });
          }}
        > 
          Fetch User Name
        </button>
        <div>
          {console.log(userSearchedNameData)}
          {userSearchedNameData && (
            <div>
              <h3>Name: {userSearchedNameData.findUserName.name}</h3>
              <h3>
                username: {userSearchedNameData.findUserName.username}
              </h3>
              <h3>
                Age: {userSearchedNameData.findUserName.age}
              </h3>
              <h3>
                Nationality: {userSearchedNameData.findUserName.nationality}
              </h3>{" "}
            </div>
          )}
          {userError && <h3> There was an error fetching the data</h3>}
        </div>
      </div>

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
          Fetch User Id
        </button>
        <div>
          {userSearchedData && (
            <div>
              <h3>Name: {userSearchedData.user.name}</h3>
              <h3>
                username: {userSearchedData.user.username}
              </h3>
              <h3>
                Age: {userSearchedData.user.age}
              </h3>
              <h3>
                Nationality: {userSearchedData.user.nationality}
              </h3>{" "}
            </div>
          )}
          {userError2 && <h3> There was an error fetching the data</h3>}
        </div>
      </div>

      {console.log(movieData)}
      {movieData &&
        movieData.movies.map((movie) =>
          <h3 key={movie.id}>Movie Name: {movie.name}</h3>
      )}

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
          Fetch Movie Name
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h3>MovieName: {movieSearchedData.movie.name}</h3>
              <h3>
                Year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h3>
              <h3>
                Rating: {movieSearchedData.movie.rating}
              </h3>
              <h3>
                Is in Theaters: {JSON.stringify(movieSearchedData.movie.isInTheaters)}
              </h3>{" "}
            </div>
          )}
          {movieError && <h3> There was an error fetching the data</h3>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
