const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Faculty extends Model {
}

class Pulpit extends Model {
}

class Teacher extends Model {
}

class Subject extends Model {
}

class Auditorium extends Model {
}

class Auditorium_type extends Model {
}

function internalORM(sequelize) {
    Faculty.init(
    {
        faculty: {type: Sequelize.STRING, primaryKey: true},
        faculty_name: {type: Sequelize.STRING, allowNull: false}
    }, 
    {
        sequelize, tableName: 'Faculty', modelName: 'Faculty', timestamps: false
    });


    Pulpit.init(
    {
        pulpit: {type: Sequelize.STRING, primaryKey: true},
        pulpit_name: {type: Sequelize.STRING, allowNull: false},
        faculty: 
        {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Faculty, key: 'faculty'}
        }
    }, 
    {
        sequelize, tableName: 'Pulpit', modelName: 'Pulpit', timestamps: false
    });


    Teacher.init(
    {
        teacher: {type: Sequelize.STRING, primaryKey: true},
        teacher_name: {type: Sequelize.STRING, allowNull: false},
        pulpit: 
        {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Pulpit, key: 'pulpit'}
        }
    }, {
        sequelize, tableName: 'Teacher', modelName: 'Teacher', timestamps: false
    });


    Subject.init(
        {
        subject: {type: Sequelize.STRING, primaryKey: true},
        subject_name: {type: Sequelize.STRING, allowNull: false},
        pulpit: {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Pulpit, key: 'pulpit'}
        }
    }, 
    {
        sequelize, tableName: 'Subject', modelName: 'Subject', timestamps: false
    });

    Auditorium_type.init(
    {
        auditorium_type: {type: Sequelize.STRING, primaryKey: true},
        auditorium_typename: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize, tableName: 'Auditorium_type', modelName: 'Auditorium_type', timestamps: false
    });

    Auditorium.init(
    {
        auditorium: {type: Sequelize.STRING, primaryKey: true},
        auditorium_name: {type: Sequelize.STRING, allowNull: false},
        auditorium_capacity: {type: Sequelize.STRING, allowNull: false},
        auditorium_type: 
        {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Auditorium_type, key: 'auditorium_type'}
        }
    }, 
    {
        sequelize, tableName: 'Auditorium', modelName: 'Auditorium', timestamps: false
    })
}

exports.ORM = (s) => {
    internalORM(s);
    return {Faculty, Pulpit, Subject, Teacher, Auditorium, Auditorium_type}
};
