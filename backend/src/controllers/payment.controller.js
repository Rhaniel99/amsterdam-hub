import { Students, Payments } from '../models/study.js';
import { Op } from 'sequelize';

export const createPayment = async (req, res) => {
    const { studentId } = req.body;
    try {
      const student = await Students.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const payment = await Payments.create({ studentId });
      student.lastPaymentDate = payment.paymentDate;
      await student.save();
  
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getPendingPayments = async (req, res) => {
    try {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
      const students = await Students.findAll({
        where: {
          [Op.or]: [
            { lastPaymentDate: null },
            { lastPaymentDate: { [Op.lt]: firstDayOfMonth } }
          ]
        }
      });
  
      res.json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };