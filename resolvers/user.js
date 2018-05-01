import formatErrors from '../formatErrors';

export default {
  Query: {
    allUsers: (parent, args, { models }) =>
      models.User.findAll(),
  },
  Mutation: {
    addUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    deleteUser: async (parent, { id }, { models }) => {
      try {
        await models.User.destroy({ where: { id } });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    updateUser: async (parent, {
      id, firstname, lastname, email, phone, status,
    }, { models }) => {
      try {
        await models.User.update({
          firstname,
          lastname,
          email,
          phone,
          status,
        }, {
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};

