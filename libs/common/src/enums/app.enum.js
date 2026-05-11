"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOfDay = exports.SortDirection = exports.AccountAction = exports.BodyContentType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["User"] = "User";
})(Role || (exports.Role = Role = {}));
var BodyContentType;
(function (BodyContentType) {
    BodyContentType["Json"] = "application/json";
    BodyContentType["MultipartFormData"] = "multipart/form-data";
})(BodyContentType || (exports.BodyContentType = BodyContentType = {}));
var AccountAction;
(function (AccountAction) {
    AccountAction["VerifyEmail"] = "verify-email";
    AccountAction["ResetPassword"] = "reset-password";
})(AccountAction || (exports.AccountAction = AccountAction = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
var TimeOfDay;
(function (TimeOfDay) {
    TimeOfDay["Morning"] = "Morning";
    TimeOfDay["Afternoon"] = "Afternoon";
    TimeOfDay["Night"] = "Night";
    TimeOfDay["Overnight"] = "Overnight";
    TimeOfDay["AllDay"] = "AllDay";
})(TimeOfDay || (exports.TimeOfDay = TimeOfDay = {}));
//# sourceMappingURL=app.enum.js.map