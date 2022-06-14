import Util from '../utils/Utils';
import SubjectService from '../services/SubjectService';

let util = new Util();

class SubjectController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns string message
   */
  static async createNewSubject(req, res) {
    const { title, subjectCode } = req.body;
    try {
      const subjectData = req.body;
      const subjectTitleExists = await SubjectService.getSubjectByTitle(title);
      const subjectCodeExists = await SubjectService.getSubjectByCode(
        subjectCode
      );
      if (subjectTitleExists) {
        util.setError(
          400,
          `Cannot create subject with this title, subject with this ${title} title already exists`
        );
        return util.send(res);
      }
      if (subjectCodeExists) {
        util.setError(
          400,
          `Cannot create subject with this code, subject with this ${subjectCode} subject code already exists`
        );
        return util.send(res);
      }
      await SubjectService.createSubject(subjectData);
      util.setSuccess(201, 'Subject Created Successfully');
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
   * @returns List of all subjects
   */
  static async getAllSubjects(req, res) {
    try {
      const subjects = await SubjectService.getSubjects();
      if (subjects.length > 0) {
        util.setSuccess(200, 'subjects list returned successfully', subjects);
      } else {
        util.setError(404, 'No subjects found at the moment');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns subject details
   */

  static async getSubjectDetails(req, res) {
    const { subjectId } = req.params;
    if (!Number(subjectId)) {
      util.setError(
        400,
        'Invalid subject id, please input valid numeric number'
      );
      return util.send(res);
    }
    try {
      const subject = await SubjectService.getOneSubject(subjectId);

      if (!subject) {
        util.setError(
          404,
          `Invalid subject id, subject with this id does not exist ${subjectId}`
        );
      } else {
        util.setSuccess(200, 'subject details returned successfully', subject);
      }
      return util.send(res);
    } catch (error) {
      console.log('The error is here: ', error);
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Subject updated details
   */
  static async updatedSsubject(req, res) {
    console.log('Incoming request to update subject');
    const subjectToUpdate = req.body;
    const { subjectId } = req.params;
    if (!Number(subjectId)) {
      util.setError(
        400,
        'Invalid subject id, please input valid numeric number'
      );
      return util.send(res);
    }
    try {
      const updateSubjectDetails = await SubjectService.updateSubjectDetails(
        subjectId,
        subjectToUpdate
      );
      if (!updateSubjectDetails) {
        util.setError(
          404,
          `Unable to update subject details, subject with this id does not exist: ${subjectId}`
        );

        return util.send(res);
      } else {
        util.setSuccess(
          200,
          'subject details updated successfully',
          updateSubjectDetails
        );
        return util.send(res);
      }
    } catch (error) {
      console.log('Update sub error', error);
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default SubjectController;
