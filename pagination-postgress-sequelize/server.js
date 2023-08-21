const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./services/database');
const {DataTypes, Sequelize} = require('sequelize');
const PORT = 8080;


const corsOption = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(morgan('dev'));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Models
const Teacher = require('./models/Teacher');
const Tutorial = require('./models/Tutorial');
//Set Associations
const TeacherTutorial = sequelize.define('TeacherTutorial', {
    // No need to define attributes for this intermediary table
    // Define foreign key columns
    teacherId: {
        type: DataTypes.INTEGER,
        references:{
            model: 'teacher',
            key: 'id'
        }
    },
    tutorialId: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model:'tutorial'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

module.exports = TeacherTutorial;

Tutorial.belongsToMany(Teacher, {
    through: TeacherTutorial,
    foreignKey: 'teacherId'
});

Teacher.belongsToMany(Tutorial, {
    through: TeacherTutorial,
    foreignKey: 'tutorialId'
});

//Sync Model
const sync = async () => await sequelize.sync();
sync().then(() => console.log('MODEL IS SYNC'));


app.use('/api/v4', require('./routes/tutorial.routes'));
app.use('/api/v4', require('./routes/teacher.routes'));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});