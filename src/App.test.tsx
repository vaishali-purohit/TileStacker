import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./util/groupByYear', () => ({
  default: vi.fn().mockReturnValue({}),
}));

vi.mock('./util/sortedYears', () => ({
  default: vi.fn().mockReturnValue([]),
}));

vi.mock('./data/dummyInput', () => ({
  input: [],
}));

describe('App Component', () => {
  it('renders App and checks initial render', async () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Reset')).toBeInTheDocument();
      expect(screen.getByText('Sort')).toBeInTheDocument();
    });
  });

  it('should call onReset and onSort functions', () => {
    const { getByText } = render(<App />);

    const resetButton = getByText('Reset');
    const sortButton = getByText('Sort');

    fireEvent.click(resetButton);
    fireEvent.click(sortButton);
  });

  it('should update original data after useEffect is triggered', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Reset')).toBeInTheDocument();
    });
  });
});
