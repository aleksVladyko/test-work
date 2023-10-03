import mongoose, { Document, Schema } from "mongoose";

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
    gender: { type: String, enum: ["Male", "Female"], required: true },
});

// Регистрируем модель Employee
const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);

// Определяем класс для сотрудника
class Employee {
    constructor(
        public fullName: string,
        public birthDate: Date,
        public gender: string
    ) {}

    calculateAge(): number {
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    }

    async saveToDatabase(): Promise<void> {
        const employeeData: IEmployee = {
            fullName: this.fullName,
            birthDate: this.birthDate,
            gender: this.gender,
        };
        try {
            await EmployeeModel.create(employeeData);
            console.log("Employee record saved to the database!");
        } catch (error) {
            console.error("Failed to save employee record:", error);
        }
    }
}

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
    const employees: Employee[] = [
        new Employee("John Doe", new Date("1980-01-01"), "Male"),
        new Employee("Jane Smith", new Date("1990-05-15"), "Female"),
        // Добавьте других сотрудников по аналогии
    ];

    try {
        for (const employee of employees) {
            await employee.saveToDatabase();
            const age = employee.calculateAge();
            console.log(`Employee age: ${age}`);
        }
        console.log("Employee table created!");
    } catch (error) {
        console.error("Failed to create employee table:", error);
    }
}

// Функция для вывода всех записей из базы данных
async function printAllEmployees() {
    try {
        const employees = await EmployeeModel.find()
            .sort({ fullName: 1 })
            .lean();

        for (const employee of employees) {
            const age = new Employee(
                employee.fullName,
                employee.birthDate,
                employee.gender
            ).calculateAge();

            console.log(
                `Full Name: ${
                    employee.fullName
                }, Birth Date: ${employee.birthDate.toDateString()}, Gender: ${
                    employee.gender
                }, Age: ${age}`
            );
        }
    } catch (error) {
        console.error("Failed to print all employees:", error);
    }
}

// Получаем режим работы из аргументов командной строки
const mode = process.argv[2];

// Основная логика приложения
async function main() {
    await connectToDatabase();

    if (mode === "1") {
        await createEmployeeTable();
    } else if (mode === "2") {
        const fullName = process.argv[3];
        const birthDate = process.argv[4];
        const gender = process.argv[5];

        const employee = new Employee(fullName, new Date(birthDate), gender);
        await employee.saveToDatabase();

        const age = employee.calculateAge();
        console.log(`Employee age: ${age}`);
    } else if (mode === "3") {
        await printAllEmployees();
    } else {
        console.log("Invalid mode. Please provide a valid mode.");
    }

    // Закрываем соединение с базой данных после завершения работы
    mongoose.connection.close();
}

// Запускаем приложение
main();
