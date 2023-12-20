import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/pages/dashboard/index';
import { useRouter } from 'next/router'
// import HomePage from '@/pages/index';

// Mock the useRouter module
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest. mock("next/router", () => ({ useRouter: jest.fn(), }));
// jest.mock('framer-motion');
describe('HomePage', () => {
  it('renders the page', () => {
    // useRouter.mockReturnValue({ push: jest.fn() });
    render(<Dashboard/>);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
})
