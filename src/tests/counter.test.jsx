import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Counter from '../component/Counter.jsx';
vi.mock('axios');

describe('Counter Component', () => {
    it('counter increments correctly', () => {
        render(<Counter />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
    });
});
