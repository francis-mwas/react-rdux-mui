import db from '../src/models/index';

class StudentService {
  /**
   *
   * @param {*} student
   * @returns student object
   */
  static async createStudent(student) {
    try {
      return await db.Student.create(student);
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @returns all students
   */
  static async getStudents() {
    try {
      return await db.Student.findAll({
        include: [
          {
            model: db.Subject,
            as: 'subjects',
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} studentId
   * @returns Student details
   */
  static async getOneStudent(studentId) {
    try {
      const student = await db.Student.findOne({
        where: {
          id: Number(studentId),
        },
        include: [
          {
            model: db.Subject,
            as: 'subjects',
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return student;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} email
   * @returns Student object
   */
  static async getStudentByEmail(email) {
    try {
      const student = await db.Student.findOne({
        where: {
          email,
        },
      });
      return student;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} sNumber
   * @returns Student object
   */
  static async getStudentByStudentNumber(sNumber) {
    try {
      const student = await db.Student.findOne({
        where: {
          studentNumber: sNumber,
        },
      });
      return student;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} studentId
   * @param {*} studentData
   * @returns Student updated details
   */
  static async updateStudentDetails(studentId, studentData) {
    try {
      const studentToUpdate = await db.Student.findOne({
        where: { id: Number(studentId) },
      });

      if (studentToUpdate) {
        await studentToUpdate.update(studentData, {
          where: { id: Number(studentId) },
        });
        return studentToUpdate;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {*} studentId
   * @returns student with status activated
   */
  static async activateStudent(studentId) {
    try {
      const studentToActive = await db.Student.findOne({
        where: { id: Number(studentId), status_active: false },
      });
      if (studentToActive) {
        const student = await studentToActive.update({
          status_active: true,
        });
        return student;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default StudentService;
