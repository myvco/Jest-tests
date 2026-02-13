/**
 * @module Counter
 * @description A simple React counter component for incrementing a numeric value.
 * Demonstrates basic React hooks usage with useState for state management.
 */

import React, { useState } from 'react';

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
function  Counter () {

    /**
     * Current counter value.
     * @type {number}
     */
    let [count, setCount] = useState(0);

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
    const clickOnme = () => {
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
    return (
        <div>
            <button onClick={clickOnme}>Click me</button>
            <span data-testid="count">Count: {count}</span>
        </div>
    );
}

/**
 * Export the Counter component as default export
 * @exports Counter
 */
export default Counter;