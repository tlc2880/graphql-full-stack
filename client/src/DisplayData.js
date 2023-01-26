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
    findUserId(id: $id) {
      name
      username
      age
      nationality
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    findMovieName(name: $name) {
      name
      yearOfPublication
      rating
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_ID = gql`
  query Movie($id: ID!) {
    findMovieId(id: $id) {
      name
      yearOfPublication
      rating
      isInTheaters
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
  const [userSearchedId, setUserSearchedId] = useState("2");
  const [movieSearchedName, setMovieSearchedName] = useState("Interstellar");
  const [movieSearchedId, setMovieSearchedId] = useState("1");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [
    fetchUserName,
    { data: userSearchedNameData, error: userErrorName },
  ] = useLazyQuery(GET_USER_BY_NAME);
  const [
    fetchUserId,
    { data: userSearchedIdData, error: userErrorId },
  ] = useLazyQuery(GET_USER_BY_ID);
  const [
    fetchMovieName,
    { data: movieSearchedNameData, error: movieErrorName },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [
    fetchMovieId,
    { data: movieSearchedIdData, error: movieErrorId },
  ] = useLazyQuery(GET_MOVIE_BY_ID);
    fetchMovie,
    { data: movieSearchedNameData, error: movieErrorName },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [
    fetchUserId,
    { data: userSearchedIdData, error: userErrorId },
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
          {userErrorName && <h3> There was an error fetching the data</h3>}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="2..."
          onChange={(event) => {
            setUserSearchedId(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchUserId({
              variables: {
                id: userSearchedId,
              },
            });
          }}
        > 
          Fetch User Id
        </button>
        <div>
          {userSearchedIdData && (
            <div>
              <h3>Name: {userSearchedIdData.findUserId.name}</h3>
              <h3>
                username: {userSearchedIdData.findUserId.username}
              </h3>
              <h3>
                Age: {userSearchedIdData.findUserId.age}
              </h3>
              <h3>
                Nationality: {userSearchedIdData.findUserId.nationality}
              </h3>{" "}
            </div>
          )}
          {userErrorId && <h3> There was an error fetching the data</h3>}
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
            setMovieSearchedName(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchMovieName({
              variables: {
                name: movieSearchedName,
              },
            });
          }}
        > 
          Fetch Movie Name
        </button>
        <div>
          {movieSearchedNameData && (
            <div>
              <h3>MovieName: {movieSearchedNameData.findMovieName.name}</h3>
              <h3>
                Year Of Publication: {movieSearchedNameData.findMovieName.yearOfPublication}
              </h3>
              <h3>
                Rating: {movieSearchedNameData.findMovieName.rating}
              </h3>
              <h3>
                Is in Theaters: {JSON.stringify(movieSearchedNameData.findMovieName.isInTheaters)}
              </h3>{" "}
            </div>
          )}
          {movieErrorName && <h3> There was an error fetching the data</h3>}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="1..."
          onChange={(event) => {
            setMovieSearchedId(event.target.value);
          }}
        />
         <button
          onClick={() => {
            fetchMovieId({
              variables: {
                id: movieSearchedId,
              },
            });
          }}
        > 
          Fetch Movie Id
        </button>
        <div>
        {console.log(movieSearchedIdData)}
          {movieSearchedIdData && (
            <div>
              <h3>MovieName: {movieSearchedIdData.findMovieId.name}</h3>
              <h3>
                Year Of Publication: {movieSearchedIdData.findMovieId.yearOfPublication}
              </h3>
              <h3>
                Rating: {movieSearchedIdData.findMovieId.rating}
              </h3>
              <h3>
                Is in Theaters: {JSON.stringify(movieSearchedIdData.findMovieId.isInTheaters)}
              </h3>{" "}
            </div>
          )}
          {movieErrorId && <h1> There was an error fetching the data</h1>}
            <div>
              <h3>MovieName: {movieSearchedNameData.findMovieName.name}</h3>
              <h3>
                Year Of Publication: {movieSearchedNameData.findMovieName.yearOfPublication}
              </h3>
              <h3>
                Rating: {movieSearchedNameData.findMovieName.rating}
              </h3>
              <h3>
                Is in Theaters: {JSON.stringify(movieSearchedNameData.findMovieName.isInTheaters)}
              </h3>{" "}
            </div>
          )}
          {movieErrorName && <h3> There was an error fetching the data</h3>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;