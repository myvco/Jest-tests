"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactRouterDom = require("react-router-dom");

var _pagesHome = require("./pages/Home");

var _pagesHome2 = _interopRequireDefault(_pagesHome);

var _pagesFormPage = require("./pages/FormPage");

var _pagesFormPage2 = _interopRequireDefault(_pagesFormPage);

var _componentCounter = require("./component/Counter");

var _componentCounter2 = _interopRequireDefault(_componentCounter);

function App() {
  var location = (0, _reactRouterDom.useLocation)();

  var linkClass = function linkClass(path) {
    return "block px-4 py-2 rounded-xl transition-all duration-200 " + (location.pathname === path ? "bg-[#f8f5f1] shadow-md" : "text-gray-700 hover:bg-gray-200");
  };

  return React.createElement(
    "div",
    { className: "flex min-h-screen bg-gray-100" },
    React.createElement(
      "nav",
      { className: "w-64 bg-white shadow-lg p-6" },
      React.createElement(
        "ul",
        { className: "space-y-2" },
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouterDom.Link,
            { to: "/", className: linkClass("/") },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouterDom.Link,
            { to: "/form", className: linkClass("/form") },
            "Form"
          )
        )
      )
    ),
    React.createElement(
      "main",
      { className: "flex-1 p-10" },
      React.createElement(_componentCounter2["default"], null),
      React.createElement(
        _reactRouterDom.Routes,
        null,
        React.createElement(_reactRouterDom.Route, { path: "/", element: React.createElement(_pagesHome2["default"], null) }),
        React.createElement(_reactRouterDom.Route, { path: "/form", element: React.createElement(_pagesFormPage2["default"], null) })
      )
    )
  );
}

exports["default"] = App;
module.exports = exports["default"];
/* Sidebar */ /* Main content */