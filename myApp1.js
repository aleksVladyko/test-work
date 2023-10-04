"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mock_1 = require("./mock");
// Определяем схему для справочника сотрудников
var EmployeeSchema = new mongoose_1.Schema({
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
var EmployeeModel = mongoose_1.default.model("Employee", EmployeeSchema);
// Определяем класс для сотрудника
var Employee = /** @class */ (function () {
    function Employee(fullName, birthDate, gender) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
    }
    Employee.prototype.calculateAge = function () {
        var today = new Date();
        var birthDate = new Date(this.birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    Employee.prototype.saveToDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var employeeData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employeeData = {
                            fullName: this.fullName,
                            birthDate: this.birthDate,
                            gender: this.gender,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, EmployeeModel.create(employeeData)];
                    case 2:
                        _a.sent();
                        console.log("Employee record saved to the database!");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Failed to save employee record:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Employee.saveManyToDatabase = function (employees) {
        return __awaiter(this, void 0, void 0, function () {
            var employeeData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employeeData = employees.map(function (employee) { return ({
                            fullName: employee.fullName,
                            birthDate: employee.birthDate,
                            gender: employee.gender,
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // insertMany(): метод mongoDB добавляет несколько документов
                        return [4 /*yield*/, EmployeeModel.insertMany(employeeData)];
                    case 2:
                        // insertMany(): метод mongoDB добавляет несколько документов
                        _a.sent();
                        console.log("Employees saved to the database!");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Failed to save employees:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Employee;
}());
// Функция для создания 100 случайных сотрудников
function createRandomEmployees(count) {
    var employees = [];
    var genders = ["Male", "Female"];
    for (var i = 0; i < count; i++) {
        var gender = genders[Math.floor(Math.random() * genders.length)];
        var firstName = mock_1.firstNames[Math.floor(Math.random() * mock_1.firstNames.length)];
        var lastName = mock_1.lastNames[Math.floor(Math.random() * mock_1.lastNames.length)];
        var fullName = "".concat(lastName, " ").concat(firstName);
        var birthYear = Math.floor(Math.random() * (2003 - 1950 + 1)) + 1950;
        var birthMonth = Math.floor(Math.random() * 12) + 1;
        var birthDay = Math.floor(Math.random() * 28) + 1;
        var birthDate = new Date("".concat(birthYear, "-").concat(birthMonth, "-").concat(birthDay));
        employees.push(new Employee(fullName, birthDate, gender));
    }
    return employees;
}
// Функция для создания 100 сотрудников с фамилией на "F"
function createFLastNameEmployees(count) {
    var employees = [];
    var gender = "Male";
    var lastName = "Fisher";
    for (var i = 0; i < count; i++) {
        var firstName = mock_1.firstNames[Math.floor(Math.random() * mock_1.firstNames.length)];
        var fullName = "".concat(lastName, " ").concat(firstName);
        var birthYear = Math.floor(Math.random() * (2003 - 1950 + 1)) + 1950;
        var birthMonth = Math.floor(Math.random() * 12) + 1;
        var birthDay = Math.floor(Math.random() * 28) + 1;
        var birthDate = new Date("".concat(birthYear, "-").concat(birthMonth, "-").concat(birthDay));
        employees.push(new Employee(fullName, birthDate, gender));
    }
    return employees;
}
// Параметры подключения к базе данных MongoDB
var DB_HOST = "mongodb://localhost:27017";
var DB_NAME = "test";
// Функция для подключения к базе данных
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mongoose_1.default.connect("".concat(DB_HOST, "/").concat(DB_NAME))];
                case 1:
                    _a.sent();
                    console.log("Connected to the database!");
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Failed to connect to the database:", error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Функция для создания таблицы сотрудников
function createEmployeeTable() {
    return __awaiter(this, void 0, void 0, function () {
        var employees, _i, employees_1, employee, age, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    employees = [
                        new Employee("John Doe", new Date("1980-01-01"), "Male"),
                        new Employee("Jane Smith", new Date("1990-05-15"), "Female"),
                        // Добавьте других сотрудников по аналогии
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _i = 0, employees_1 = employees;
                    _a.label = 2;
                case 2:
                    if (!(_i < employees_1.length)) return [3 /*break*/, 5];
                    employee = employees_1[_i];
                    return [4 /*yield*/, employee.saveToDatabase()];
                case 3:
                    _a.sent();
                    age = employee.calculateAge();
                    console.log("Employee age: ".concat(age));
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("Employee table created!");
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error("Failed to create employee table:", error_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Функция для вывода всех записей из базы данных
function printAllEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var employees, _i, employees_2, employee, age, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, EmployeeModel.find()
                            .sort({ fullName: 1 })
                            .lean()];
                case 1:
                    employees = _a.sent();
                    for (_i = 0, employees_2 = employees; _i < employees_2.length; _i++) {
                        employee = employees_2[_i];
                        age = new Employee(employee.fullName, employee.birthDate, employee.gender).calculateAge();
                        console.log("Full Name: ".concat(employee.fullName, ", Birth Date: ").concat(employee.birthDate.toDateString(), ", Gender: ").concat(employee.gender, ", Age: ").concat(age));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error("Failed to print all employees:", error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Получаем режим работы из аргументов командной строки
var mode = process.argv[2];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fullName, birthDate, gender, employee, age, randomEmployees, fLastNameEmployees, employees, batchSize, i, batch, employees, _i, employees_3, employee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    if (!(mode === "1")) return [3 /*break*/, 3];
                    return [4 /*yield*/, createEmployeeTable()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 3:
                    if (!(mode === "2")) return [3 /*break*/, 5];
                    fullName = process.argv[3];
                    birthDate = process.argv[4];
                    gender = process.argv[5];
                    employee = new Employee(fullName, new Date(birthDate), gender);
                    return [4 /*yield*/, employee.saveToDatabase()];
                case 4:
                    _a.sent();
                    age = employee.calculateAge();
                    console.log("Employee age: ".concat(age));
                    return [3 /*break*/, 15];
                case 5:
                    if (!(mode === "3")) return [3 /*break*/, 7];
                    return [4 /*yield*/, printAllEmployees()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 7:
                    if (!(mode === "4")) return [3 /*break*/, 12];
                    randomEmployees = createRandomEmployees(200);
                    fLastNameEmployees = createFLastNameEmployees(100);
                    employees = __spreadArray(__spreadArray([], randomEmployees, true), fLastNameEmployees, true);
                    batchSize = 200;
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < employees.length)) return [3 /*break*/, 11];
                    batch = employees.slice(i, i + batchSize);
                    return [4 /*yield*/, Employee.saveManyToDatabase(batch)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    i += batchSize;
                    return [3 /*break*/, 8];
                case 11:
                    console.log("Employees table created!");
                    return [3 /*break*/, 15];
                case 12:
                    if (!(mode === "5")) return [3 /*break*/, 14];
                    console.time("Query time");
                    return [4 /*yield*/, EmployeeModel.find({ gender: "Male", fullName: { $regex: /^F/ } }, { fullName: 1, gender: 1 }).lean()];
                case 13:
                    employees = _a.sent();
                    for (_i = 0, employees_3 = employees; _i < employees_3.length; _i++) {
                        employee = employees_3[_i];
                        employee.fullName, employee.gender;
                        console.log("Full Name: ".concat(employee.fullName, ", Gender: ").concat(employee.gender));
                    }
                    console.timeEnd("Query time");
                    return [3 /*break*/, 15];
                case 14:
                    console.log("Invalid mode. Please provide a valid mode.");
                    _a.label = 15;
                case 15:
                    // Закрываем соединение с базой данных после завершения работы
                    mongoose_1.default.connection.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
// npm init
// скомпилировать tsc myAp1.ts
// Запускаем приложение: node myApp.js /*arg*/ // аргумент - это номер режима
