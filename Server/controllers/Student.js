import Util from '../utils/Utils';
import StudentService from '../services/StudentService';
import SubjectService from '../services/SubjectService';

let util = new Util();

class StudentController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns string message
   */
  static async createNewStudent(req, res) {
    try {
      const studentData = req.body;
      const { email, studentNumber } = req.body;
      const studentAlreadyExists = await StudentService.getStudentByEmail(
        email
      );
      const studentNumberRegistered =
        await StudentService.getStudentByStudentNumber(studentNumber);
      if (studentAlreadyExists) {
        util.setError(
          400,
          `Cannot create this student, student with this ${email} already exists`
        );
        return util.send(res);
      }
      if (studentNumberRegistered) {
        util.setError(
          400,
          `Cannot create this student, student with this ${studentNumber} number already exists`
        );
        return util.send(res);
      }
      await StudentService.createStudent(studentData);
      util.setSuccess(201, 'Student Created Successfully');
      return util.send(res);
    } catch (error) {
      console.log('The error is: ', error);
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Updated staudent object
   */
  static async activateStudentStatus(req, res) {
    console.log('Incoming request to activate student');
    const { studentId } = req.params;

    if (!Number(studentId)) {
      util.setError(
        400,
        'Invalid student id, please input valid numeric number'
      );
      return util.send(res);
    }

    try {
      const student = await StudentService.activateStudent(studentId);

      if (student) {
        util.setSuccess(200, 'Student status updated to active', student);
      } else {
        util.setError(
          404,
          `Student with this fact id ${studentId} does not exist`
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      console.log('error when updating student status: ', error);
      return util.send(res);
    }
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns List of all students
   */
  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getStudents();
      if (students.length > 0) {
        util.setSuccess(200, 'Students list returned successfully', students);
      } else {
        util.setError(404, 'No students found at the moment');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      console.log('The error when getting Students: ', error);
      return util.send(res);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Student details
   */

  static async getStudentDetails(req, res) {
    const { studentId } = req.params;
    if (!Number(studentId)) {
      util.setError(
        400,
        'Invalid student id, please input valid numeric number'
      );
      return util.send(res);
    }
    try {
      const student = await StudentService.getOneStudent(studentId);

      if (!student) {
        util.setError(
          404,
          `Invalid student id, student with this id does not exist ${studentId}`
        );
      } else {
        util.setSuccess(200, 'Student details returned successfully', student);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      console.log('The error when getting students details: ', error);
      return util.send(res);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Student updated details
   */
  static async updatedStudent(req, res) {
    console.log('Incoming request to update student');
    const studentToUpdate = req.body;
    const { studentId } = req.params;
    if (!Number(studentId)) {
      util.setError(
        400,
        'Invalid student id, please input valid numeric number'
      );
      return util.send(res);
    }
    try {
      const updateStudentDetails = await StudentService.updateStudentDetails(
        studentId,
        studentToUpdate
      );
      if (!updateStudentDetails) {
        util.setError(
          404,
          `Unable to update student details, student with this id does not exist: ${studentId}`
        );

        return util.send(res);
      } else {
        util.setSuccess(
          200,
          'Student details updated successfully',
          updateStudentDetails
        );
        return util.send(res);
      }
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Student object
   */
  static async assignSubjectToStudent(req, res) {
    const { subjectCode } = req.body;
    const { studentId } = req.params;
    try {
      const student = await StudentService.getOneStudent(studentId);
      if (!student) {
        util.setError(
          404,
          `Unable to find student, student with this id does not exist: ${studentId}`
        );
      }
      const subject = await SubjectService.getSubjectByCode(subjectCode);
      if (!subject) {
        util.setError(
          404,
          `Unable to find subject, subject with this id does not exist: ${subjectCode}`
        );
      }
      console.log('The student is here: ', student.subjects.title);

      if (!student.status_active) {
        util.setError(
          400,
          `Unable to assign the student subject, student status is not active: ${studentId}`
        );
        return util.send(res);
      }

      student.addSubjects(subject);
      util.setSuccess(200, `Student assigned to ${subject.title} successfully`);
      return util.send(res);
    } catch (error) {}
  }
}

export default StudentController;
