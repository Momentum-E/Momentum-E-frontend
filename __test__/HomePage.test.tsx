import { render, screen } from '@testing-library/react';
import HomePage from '@/components/home/HomePage';

describe('HomePage', () => {
    test('renders the component', () => {
    render(<HomePage />);
    expect(screen.getByText('AI Driven ')).toBeInTheDocument();
  });
})
