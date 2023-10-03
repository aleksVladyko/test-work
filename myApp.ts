import mongoose, { Document, Schema } from "mongoose";
import test from "node:test";

// Определяем интерфейс для справочника сотрудников
interface IEmployee {
    fullName: string;
    birthDate: Date;
    gender: string;
}

// Определяем схему для справочника сотрудников
const EmployeeSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
});

const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);

// Параметры подключения к базе данных MongoDB
const DB_HOST = "mongodb://localhost:27017";
const DB_NAME = "test";

// Функция для подключения к базе данных
async function connectToDatabase() {
    try {
        await mongoose.connect(`${DB_HOST}/${DB_NAME}`);
        console.log("Connected to the database!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

// Функция для создания таблицы сотрудников
async function createEmployeeTable() {
    const employees: IEmployee[] = [
        {
            fullName: "John Doe",
            birthDate: new Date("1980-01-01"),
            gender: "Male",
            ...{},
        },
        {
            fullName: "Jane Smith",
            birthDate: new Date("1990-05-15"),
            gender: "Female",
            ...{},
        },
        // Добавьте других сотрудников по аналогии
    ];

    try {
        await EmployeeModel.insertMany(employees);
        console.log("Employee table created!");
    } catch (error) {
        console.error("Failed to create employee table:", error);
    }
}

// Получаем режим работы из аргументов командной строки
const mode = process.argv[2];

// Основная логика приложения
async function main() {
    await connectToDatabase();

    if (mode === "1") {
        await createEmployeeTable();
    } else {
        console.log("Invalid mode. Please provide a valid mode.");
    }

    // Закрываем соединение с базой данных после завершения работы
    mongoose.connection.close();
}

// Запускаем приложение
main();
