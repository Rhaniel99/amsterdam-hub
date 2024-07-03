// Importa o Sequelize e o objeto de configuração do banco de dados
import Sequelize from "sequelize";
import database from "../configs/db.config.js";

const Students = database.define("Students", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nameResp: Sequelize.STRING,
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true, // true para ativo, false para inativo
  },
  
  lastPaymentDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

const Payments = database.define("Payments", {
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Students,
      key: "id",
    },
    allowNull: false,
  },
  paymentDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

Students.hasMany(Payments, { foreignKey: "studentId" });
Payments.belongsTo(Students, { foreignKey: "studentId" });

// Define as associações entre as tabelas
// Students.hasMany(Payments);

// Exporta os modelos
export { Students, Payments };
