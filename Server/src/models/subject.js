module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    title: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    subjectCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Subject;
};
