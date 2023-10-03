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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EmployeeSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
});
var EmployeeClass = /** @class */ (function () {
    function EmployeeClass(fullName, birthDate, gender) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.employeeModel = mongoose_1.default.model('Employee', EmployeeSchema);
    }
    EmployeeClass.prototype.calculateAge = function () {
        var today = new Date();
        var birthDate = new Date(this.birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    EmployeeClass.prototype.saveToDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var employeeData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employeeData = new this.employeeModel({
                            fullName: this.fullName,
                            birthDate: this.birthDate,
                            gender: this.gender,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, employeeData.save()];
                    case 2:
                        _a.sent();
                        console.log('Employee record saved to the database!');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Failed to save employee record:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return EmployeeClass;
}());
// Параметры подключения к базе данных MongoDB
var DB_HOST = 'mongodb://localhost:27017';
var DB_NAME = 'test';
// Функция для подключения к базе данных
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mongoose_1.default.connect("".concat(DB_HOST, "/").concat(DB_NAME))];
                case 1:
                    _a.sent();
                    console.log('Connected to the database!');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Failed to connect to the database:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Функция для создания таблицы сотрудников
function createEmployeeTable() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
// Основная логика приложения
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mode, fullName, birthDate, gender, employee, age;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    mode = process.argv[2];
                    if (!(mode === '1')) return [3 /*break*/, 3];
                    return [4 /*yield*/, createEmployeeTable()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(mode === '2')) return [3 /*break*/, 5];
                    fullName = process.argv[3];
                    birthDate = process.argv[4];
                    gender = process.argv[5];
                    employee = new EmployeeClass(fullName, new Date(birthDate), gender);
                    return [4 /*yield*/, employee.saveToDatabase()];
                case 4:
                    _a.sent();
                    age = employee.calculateAge();
                    console.log("Employee age: ".concat(age));
                    return [3 /*break*/, 6];
                case 5:
                    console.log('Invalid mode. Please provide a valid mode.');
                    _a.label = 6;
                case 6:
                    // Закрываем соединение с базой данных после завершения работы
                    mongoose_1.default.connection.close();
                    return [2 /*return*/];
            }
        });
    });
}
// Запускаем приложение
main();
