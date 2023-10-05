import mongoose, { Schema } from "mongoose";
import { firstNames, lastNames } from "./mock";

// Определяем интерфейс для справочника сотрудников
interface IEmployee {
    fullName: string;
    birthDate: Date;
    gender: string;
}
// Определяем схему для справочника сотрудников
const EmployeeSchema: Schema = new Schema({
    fullName: { type: String, required: true, index: true },
    birthDate: { type: Date, required: true },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
        index: true,
    },
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

    static async saveManyToDatabase(employees: Employee[]): Promise<void> {
        const employeeData: IEmployee[] = employees.map((employee) => ({
            fullName: employee.fullName,
            birthDate: employee.birthDate,
            gender: employee.gender,
        }));
        try {
            // insertMany(): метод mongoDB добавляет несколько документов
            await EmployeeModel.insertMany(employeeData);
            console.log("Employees saved to the database!");
        } catch (error) {
            console.error("Failed to save employees:", error);
        }
    }
}
// Функция для создания 100 случайных сотрудников
function createRandomEmployees(count: number): Employee[] {
    const employees: Employee[] = [];
    const genders = ["Male", "Female"];

    for (let i = 0; i < count; i++) {
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${lastName} ${firstName}`;
        const birthYear = Math.floor(Math.random() * (2003 - 1950 + 1)) + 1950;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
        employees.push(new Employee(fullName, birthDate, gender));
    }

    return employees;
}

// Функция для создания 100 сотрудников с фамилией на "F"
function createFLastNameEmployees(count: number): Employee[] {
    const employees: Employee[] = [];
    const gender = "Male";
    const lastName = "Fisher";

    for (let i = 0; i < count; i++) {
        const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = `${lastName} ${firstName}`;
        const birthYear = Math.floor(Math.random() * (2003 - 1950 + 1)) + 1950;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
        employees.push(new Employee(fullName, birthDate, gender));
    }

    return employees;
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
async function printAllEmployees(): Promise<void> {
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
        throw error;
    }
    return;
}

// Получаем режим работы из аргументов командной строки
const mode = process.argv[2];

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
    } else if (mode === "4") {
        const randomEmployees = createRandomEmployees(200); // 1 000 000
        const fLastNameEmployees = createFLastNameEmployees(100);
        const employees = [...randomEmployees, ...fLastNameEmployees];
        const batchSize = 200;
        for (let i = 0; i < employees.length; i += batchSize) {
            const batch = employees.slice(i, i + batchSize);
            await Employee.saveManyToDatabase(batch);
        }

        console.log("Employees table created!");
    } else if (mode === "5") {
        console.time("Query time");
        const employees = await EmployeeModel.find(
            { gender: "Male", fullName: { $regex: /^F/ } },
            { fullName: 1, gender: 1 }
        ).lean();

        for (const employee of employees) {
            employee.fullName, employee.gender;

            console.log(
                `Full Name: ${employee.fullName}, Gender: ${employee.gender}`
            );
        }

        console.timeEnd("Query time");
    } else {
        console.log("Invalid mode. Please provide a valid mode.");
    }

    // Закрываем соединение с базой данных после завершения работы
    mongoose.connection.close();
}
main();
// npm init
// скомпилировать tsc myAp1.ts
// Запускаем приложение: node myApp1.js /*arg*/ // аргумент - это номер режима
// для оптимизации провели индексирование полей gender and fullName,
// что позволило ускорить выполнение запроса, позволяя MongoDB быстро 
// находить соответствующие документы используя проекцию
// так же убрал блок try catch что позволило сократить затрачиваемые 
// ресурсы на перехват и обработку ошибок
// Однако, если в коде есть возможность возникновения ошибок, то 
// использование блока try-catch может повысить надежность и 
// устойчивость приложения