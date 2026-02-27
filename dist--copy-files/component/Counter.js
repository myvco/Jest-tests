/**
 * @module Counter
 * @description A simple React counter component for incrementing a numeric value.
 * Demonstrates basic React hooks usage with useState for state management.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Counter Component - A simple counter application with increment functionality.
 *
 * This React component provides a basic counter interface that allows users to
 * increment a numeric value by clicking a button. The component demonstrates:
 * - React hooks usage (useState)
 * - State management and updates
 * - Event handling (onClick)
 * - Simple UI rendering
 *
 * Features:
 * - Displays a button labeled "Click me" to increment the counter
 * - Shows the current count value below the button
 * - Count starts at 0 and increments by 1 with each click
 * - Count is maintained in component state (not persisted)
 *
 * State:
 * - count: number - Current counter value, initialized to 0
 *
 * The component is stateless in terms of persistence (resets to 0 on remount).
 * For persistent counters, consider implementing localStorage or a parent state.
 *
 * @component
 * @returns {React.ReactElement} A div containing a clickable button and counter display
 *
 * @example
 * // Basic usage in a parent component
 * import Counter from './Counter';
 *
 * export default function App() {
 *   return (
 *     <div>
 *       <Counter />
 *     </div>
 *   );
 * }
 *
 *
 * @state {number} count - The current counter value
 *   - Initial value: 0
 *   - Updated by: clickOnme() function
 *   - Display: Shown in span element with test ID "count"
 */
function Counter() {

  /**
   * Current counter value.
   * @type {number}
   */

  var _useState = (0, _react.useState)(0);

  var _useState2 = _slicedToArray(_useState, 2);

  var count = _useState2[0];
  var setCount = _useState2[1];

  /**
   * Increments the counter by one.
   *
   * This function is called when the user clicks the "Click me" button.
   * It updates the count state by adding 1 to the current value.
   * React automatically re-renders the component with the new count.
   *
   * @function clickOnme
   * @returns {void}
   *
   */
  var clickOnme = function clickOnme() {
    setCount(count + 1);
  };

  /**
   * Render the counter component UI
   *
   * Structure:
   * - Main div container
   * - Button element with onClick handler
   *   - Text: "Click me"
   *   - Handler: clickOnme function
   * - Span element displaying the current count
   *   - Content: "Count: {count}"
   *   - Test ID: "count" (for testing purposes)
   *
   */
  return _react2["default"].createElement(
    "div",
    null,
    _react2["default"].createElement(
      "button",
      { onClick: clickOnme },
      "Click me"
    ),
    _react2["default"].createElement(
      "span",
      { "data-testid": "count" },
      "Count: ",
      count
    )
  );
}

/**
 * Export the Counter component as default export
 * @exports Counter
 */
exports["default"] = Counter;
module.exports = exports["default"];