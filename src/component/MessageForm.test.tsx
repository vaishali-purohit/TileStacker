import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MessageForm from './MessageForm';

describe('MessageForm Component', () => {
  const addTile = vi.fn();
  const closeForm = vi.fn();

  const dummyData = [
    { year: 2013, posts: [{ date: '2013-02-12', message: 'Dummy Data.' }] },
  ];

  it('should render MessageForm with open state', () => {
    render(
      <MessageForm
        open={true}
        addTile={addTile}
        closeForm={closeForm}
        messageList={dummyData}
      />
    );

    // Check if the form elements are rendered
    const dateInput = screen.getByLabelText('Date (YYYY-MM-DD)');
    expect(dateInput).toBeInTheDocument();

    const messageInput = screen.getByLabelText('Message');
    expect(messageInput).toBeInTheDocument();
  });

  it('should display date error for future date format', async () => {
    render(
      <MessageForm
        open={true}
        addTile={addTile}
        closeForm={closeForm}
        messageList={dummyData}
      />
    );

    fireEvent.change(screen.getByLabelText(/Date/), {
      target: { value: '2025-12-01' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Valid message' },
    });

    fireEvent.click(screen.getByText(/Add Message/));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes('Date cannot be in the future.')
        )
      ).toBeInTheDocument();
    });
  });

  it('should call addTile and closeForm when valid data is submitted', async () => {
    render(
      <MessageForm
        open={true}
        addTile={addTile}
        closeForm={closeForm}
        messageList={dummyData}
      />
    );

    // Enter valid data
    fireEvent.change(screen.getByLabelText(/Date/), {
      target: { value: '2024-01-01' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Valid message' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Add Message/));

    // Ensure addTile and closeForm are called
    await waitFor(() => {
      expect(addTile).toHaveBeenCalledWith('2024-01-01', 'Valid message');
      expect(closeForm).toHaveBeenCalled();
    });
  });

  it('should close the form when Cancel button is clicked', () => {
    render(
      <MessageForm
        open={true}
        addTile={addTile}
        closeForm={closeForm}
        messageList={dummyData}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/));

    expect(closeForm).toHaveBeenCalled();
  });
});
