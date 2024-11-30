import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MessageInfo from './MessageInfo';
import Message from '../types/Message.type';

describe('MessageInfo Component', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDragOver = vi.fn();
  const mockOnDrop = vi.fn();
  const mockOnDragEnd = vi.fn();

  const post: Message = {
    date: '2024-01-01',
    message: 'Sample message',
  };

  const yearIndex = 0;
  const postIndex = 0;

  it('should render the message with date and content', () => {
    render(
      <MessageInfo
        post={post}
        yearIndex={yearIndex}
        postIndex={postIndex}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        onDragEnd={mockOnDragEnd}
      />
    );

    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('Sample message')).toBeInTheDocument();
  });

  it('should trigger onDragStart when the message is dragged', () => {
    render(
      <MessageInfo
        post={post}
        yearIndex={yearIndex}
        postIndex={postIndex}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        onDragEnd={mockOnDragEnd}
      />
    );

    const messageElement = screen.getByText('Sample message');

    fireEvent.dragStart(messageElement);

    expect(mockOnDragStart).toHaveBeenCalledWith(
      expect.anything(),
      yearIndex,
      postIndex
    );
  });

  it('should trigger onDragOver when dragging over the message', () => {
    render(
      <MessageInfo
        post={post}
        yearIndex={yearIndex}
        postIndex={postIndex}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        onDragEnd={mockOnDragEnd}
      />
    );

    const messageElement = screen.getByText('Sample message');

    fireEvent.dragOver(messageElement);

    expect(mockOnDragOver).toHaveBeenCalled();
  });

  it('should trigger onDrop when dropping a message', () => {
    render(
      <MessageInfo
        post={post}
        yearIndex={yearIndex}
        postIndex={postIndex}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        onDragEnd={mockOnDragEnd}
      />
    );

    const messageElement = screen.getByText('Sample message');

    fireEvent.drop(messageElement);

    expect(mockOnDrop).toHaveBeenCalledWith(
      expect.anything(),
      yearIndex,
      postIndex
    );
  });

  it('should trigger onDragEnd when dragging ends', () => {
    render(
      <MessageInfo
        post={post}
        yearIndex={yearIndex}
        postIndex={postIndex}
        onDragStart={mockOnDragStart}
        onDragOver={mockOnDragOver}
        onDrop={mockOnDrop}
        onDragEnd={mockOnDragEnd}
      />
    );

    const messageElement = screen.getByText('Sample message');

    fireEvent.dragEnd(messageElement);

    expect(mockOnDragEnd).toHaveBeenCalled();
  });
});
