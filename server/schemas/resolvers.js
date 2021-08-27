const { User, Book } = require('../models');

const resolvers = {
    Query: {

        user: async (parent, user) => {
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: user.username }],
            }).populate('savedBooks');
            if (!foundUser){
                return 'User not found!';
            }
            return foundUser;
        },

        users: async () => {
            return User.find().populate('savedBooks');
        },

        login: async (parent, user) => {
            const exUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email}] });
            
            const correctPW = await exUser.isCorrectPassword(user.password);

            if (!correctPW) {
                return 'Wrong Password!';
            }
            const token = signToken(user);
            return { token, user };
        },

    },

    Mutation: {

        createUser: async (parent, newUser) => {
            return User.create(newUser);
        },

        saveBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $push: { savedBooks: book}},
                { new: true }
            );
        },

        deleteBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId},
                { $pull: { savedBooks: book }},
                { new: true }
            );
        },

    },
};

module.exports = resolvers;