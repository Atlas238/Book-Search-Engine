// TODO: Define the query and mutation functionality to work with the Mongoose Models
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, email) => {
            return User.findOne({ email });
        }
    },

    Mutation: {

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No profile with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Incorrect Password!');
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({
                username, email, password
            });
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { saveBookContent, token }) => {
            return User.findOneAndUpdate(
                { token: token },
                { $addToSet: { savedBooks: saveBookContent} },
                { new: true }
            );
        },

        removeBook: async (parent, { bookId, token }) => {
            return User.findOneAndUpdate(
                { token: token },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        }
    },
}

module.exports = resolvers;