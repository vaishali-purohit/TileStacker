import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import GridPost from './GridPost';

// Mocking necessary utility functions
vi.mock('../util/sortByDate', () => ({
  default: vi.fn().mockReturnValue([]),
}));

describe('GridPost Component', () => {
  const mockData = [
    {
      year: 2020,
      posts: [
        { date: '2020-01-01', message: 'Message 1' },
        { date: '2020-02-01', message: 'Message 2' },
      ],
    },
    {
      year: 2021,
      posts: [{ date: '2021-01-01', message: 'Message 3' }],
    },
  ];

  it('should render GridPost with data', async () => {
    render(
      <GridPost originalData={mockData} filter="reset" setFilter={vi.fn()} />
    );
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('Message 1')).toBeInTheDocument();
  });

  it('should handle drag-and-drop functionality', async () => {
    render(
      <GridPost originalData={mockData} filter="reset" setFilter={vi.fn()} />
    );

    const draggableItem = screen.getByText('Message 1');
    const dropTarget = screen.getByText('Message 2');

    const mockDataTransfer = {
      effectAllowed: 'move',
      setData: vi.fn(),
      getData: vi.fn(),
    };

    const mockDragEvent = {
      ...new Event('dragstart'),
      dataTransfer: mockDataTransfer,
    };

    fireEvent.dragStart(draggableItem, mockDragEvent);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    // Wait for state changes (if state is being updated)
    await waitFor(() => {
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
    });
  });

  it('should render "No Data to Show" if no posts exist', async () => {
    render(<GridPost originalData={null} filter="reset" setFilter={vi.fn()} />);
    expect(screen.getByText('No Data to Show')).toBeInTheDocument();
  });
});
