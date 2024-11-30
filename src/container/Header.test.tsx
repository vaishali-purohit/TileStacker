import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('should render Reset and Sort buttons', () => {
    render(<Header onReset={() => {}} onSort={() => {}} />);

    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });

  it('should call onReset when Reset button is clicked', () => {
    const onReset = vi.fn();
    render(<Header onReset={onReset} onSort={() => {}} />);

    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalled();
  });

  it('should call onSort when Sort button is clicked', () => {
    const onSort = vi.fn();
    render(<Header onReset={() => {}} onSort={onSort} />);

    fireEvent.click(screen.getByText('Sort'));
    expect(onSort).toHaveBeenCalled();
  });
});
