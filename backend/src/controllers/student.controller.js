import { Students, Payments } from '../models/study.js';

export const regStudent = async (req, res) => {
    let { name, nameResp, status, lastPaymentDate } = req.body;
    try {
        const students = await Students.create({ name, nameResp, status, lastPaymentDate });
        return res.json({
            success: true,
            msg: "Registrado com sucesso.",
            student: students
        });
    } catch (error) {
        return res.json({
            success: false,
            msg: "Erro ao registrar",
            error: error.message
        });
    }
};

export const getStudents = async (req, res) => {
    const students = await Students.findAll();
    res.json(students);
};

export const getStudentPaymentStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Students.findByPk(id);
        if (student) {
            res.json({ paymentStatus: student.lastPaymentDate });
        } else {
            res.status(404).json({ error: 'Estudante não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateStudentPaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    try {
        const [updated] = await Students.update({ lastPaymentDate: paymentStatus }, { where: { id } });
        if (updated) {
            res.json({ message: 'Pagamento atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Estudante não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateStudentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const [updated] = await Students.update({ status }, { where: { id : id } });
      if (updated) {
        res.json({ message: 'Status updated' });
      } else {
        res.status(404).json({ error: 'Estudante não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// export { regStudent, getStudents };
