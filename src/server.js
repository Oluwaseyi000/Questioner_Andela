"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_express.default.json());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json({
  type: 'application/json'
}));
app.use('/api/v1', _routes.default);
var port = process.env.PORT || 5000;

if (!module.parent) {
  var server = app.listen(port, function () {
    return console.log('server running');
  });
}

var _default = app;
exports.default = _default;