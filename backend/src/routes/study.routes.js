import { Router } from 'express';

import { regStudent, getStudents, getStudentPaymentStatus, updateStudentStatus, updateStudentPaymentStatus } from '../controllers/student.controller.js';

const router = Router();

router.post('/reg-student', [], regStudent);

router.put('/update-student/:id/payment', updateStudentPaymentStatus);

router.put('/update-student/:id/status', updateStudentStatus);

router.get('/get-students', [], getStudents);

router.get('/get-student/:id', getStudentPaymentStatus);

router.get('/get-student/:id/payment', getStudentPaymentStatus);


export default router;
