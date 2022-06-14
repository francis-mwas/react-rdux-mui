import db from '../src/models/index';

class SubjectService {
  /**
   *
   * @param {*} subject
   * @returns Newly created subject
   */
  static async createSubject(subject) {
    try {
      const subjectData = await db.Subject.create(subject);
      return subjectData;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @returns all subjects
   */
  static async getSubjects() {
    try {
      return await db.Subject.findAll();
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} subjectId
   * @returns Subject details
   */
  static async getOneSubject(subjectId) {
    try {
      const subject = await db.Subject.findOne({
        where: { id: Number(subjectId) },
      });
      return subject;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} subjectCode
   * @returns Subject
   */
  static async getSubjectByCode(subjectCode) {
    try {
      const subject = await db.Subject.findOne({
        where: { subjectCode: subjectCode },
      });
      return subject;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} title
   * @returns Subject
   */
  static async getSubjectByTitle(title) {
    try {
      const subject = await db.Subject.findOne({
        where: { title },
      });
      return subject;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} subjectId
   * @param {*} subjectData
   * @returns subject updated details
   */
  static async updateSubjectDetails(subjectId, subjectData) {
    try {
      const subjectToUpdate = await db.Subject.findOne({
        where: { id: Number(subjectId) },
      });

      if (subjectToUpdate) {
        await subjectToUpdate.update(subjectData, {
          where: { id: Number(subjectId) },
        });
        return subjectToUpdate;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectService;
