import { Router } from 'express';
import SubjectController from '../controllers/Subject';

const router = Router();

router.post('/', SubjectController.createNewSubject);
router.get('/', SubjectController.getAllSubjects);
router.get('/:subjectId', SubjectController.getSubjectDetails);
router.patch('/:subjectId', SubjectController.updatedSsubject);

export default router;
