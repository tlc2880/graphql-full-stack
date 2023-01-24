const UserList = [
  {
      id: 1,
      name: "Joe",
      username: "joe",
      age: 20,
      nationality: "USA",
      friends: [
        {
          id: 2,
          name: "James",
          username: "JamesTech",
          age: 20,
          nationality: "BRAZIL",
        },
        {
          id: 5,
          name: "Kelly",
          username: "kelly2019",
          age: 5,
          nationality: "CANADA",
        },
      ],
    },
    {
      id: 2,
      name: "James",
      username: "JamesTech",
      age: 20,
      nationality: "BRAZIL",
    },
    {
      id: 3,
      name: "Sarah",
      username: "cameron",
      age: 25,
      nationality: "MEXICO",
      friends: [
        {
          id: 2,
          name: "James",
          username: "JamesTech",
          age: 20,
          nationality: "BRAZIL",
        },
      ],
    },
    {
      id: 4,
      name: "Rafe",
      username: "rafe123",
      age: 60,
      nationality: "GERMANY",
    },
    {
      id: 5,
      name: "Kelly",
      username: "kelly2019",
      age: 5,
      nationality: "CANADA",
    },
  ];
  
  const MovieList = [
    {
      id: 1,
      name: "Avengers Endgame",
      yearOfPublication: 2019,
      rating: "PG",
      isInTheaters: true,
    },
    {
      id: 2,
      name: "Interstellar",
      yearOfPublication: 2007,
      rating: "PG-13",
      isInTheaters: true,
    },
    {
      id: 3,
      name: "Top Gun: Maverick",
      yearOfPublication: 2022,
      rating: "Restricted",
      isInTheaters: true,
    },
    {
      id: 4,
      name: "JamesTech The Movie",
      yearOfPublication: 2035,
      rating: "General",
      isInTheaters: false,
    },
  ];

module.exports = { UserList, MovieList };
