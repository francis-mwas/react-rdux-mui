import { Router } from 'express';
import StudentController from '../controllers/Student';

const router = Router();

router.post('/', StudentController.createNewStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getStudentDetails);
router.patch('/:studentId', StudentController.updatedStudent);
router.post(
  '/assign-subject/:studentId',
  StudentController.assignSubjectToStudent
);
router.patch(
  '/update-status/:studentId',
  StudentController.activateStudentStatus
);

export default router;
