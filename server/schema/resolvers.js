const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList;
    },
    findUserName: (parent, args) => {
      const name = args.name;
      const user = _.find(UserList, { name });
      return user;
    },
    findUserId: (parent, args) => {
      const id = args.id;
      console.log('id: ', id);
      const user2 = _.find(UserList, { id: Number(id) });
      console.log('user2; ', user2);
      return user2;
    },
    // findUser: (parent, args) => {
    //   const name = args.name;
    //   const user = _.find(UserList, { name });
    //   return user;
    // },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    findMovieName: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
    findMovieId: (parent, args) => {
      const id = args.id;
      const movie = _.find(MovieList, { id: Number(id) });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
