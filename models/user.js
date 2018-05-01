export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'The firstname can only be alphabets.',
        },
        len: {
          args: [3, 20],
          msg: 'The firstname must be atleast 3 characters and no less than 20 characters.',
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'The lastname can only be alphabets.',
        },
        len: {
          args: [3, 20],
          msg: 'The lastname must be atleast 3 characters and no less than 20 characters.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'That email has already been used.',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address.',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: 'The phone number must only contain numbers.',
        },
      },
      notEmpty: {
        args: true,
        msg: 'The phone number is required.',
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The status is required.',
        },
      },
    },
  });

  return User;
};
