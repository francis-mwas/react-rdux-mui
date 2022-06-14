module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    studentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_active: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  });
  return Student;
};
