import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the play method of HTMLMediaElement
Object.defineProperty(global.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: jest.fn(),
});

test('renders drum pads and responds to interactions', async () => {
  render(<App />);

  const sounds = [
    { letter: 'Q', sound: 'Heater-1' },
    { letter: 'W', sound: 'Heater-2' },
    { letter: 'E', sound: 'Heater-3' },
    { letter: 'A', sound: 'Heater-4' },
    { letter: 'S', sound: 'Clap' },
    { letter: 'D', sound: 'Open-HiHat' },
    { letter: 'Z', sound: 'Kick-and-Hat' },
    { letter: 'X', sound: 'Kick' },
    { letter: 'C', sound: 'Closed-Hi-Hat' }
  ];

  // Check if all drum pads are rendered
  sounds.forEach(({ letter }) => {
    const padElement = screen.getByText(letter);
    expect(padElement).toBeInTheDocument();
  });

  // Check if clicking the drum pads works
  sounds.forEach(({ letter }) => {
    const padElement = screen.getByText(letter);
    fireEvent.click(padElement);
    const audioElement = screen.getByTestId(`audio-${letter}`);
    expect(audioElement).toBeInTheDocument();
    // Expect play to be called on the audio element
    expect(audioElement.play).toHaveBeenCalled();
  });

  // Check if key press on the drum pads works
  sounds.forEach(({ letter }) => {
    fireEvent.keyDown(document, { key: letter });
    const audioElement = screen.getByTestId(`audio-${letter}`);
    expect(audioElement).toBeInTheDocument();
    // Expect play to be called on the audio element
    expect(audioElement.play).toHaveBeenCalled();
  });
});
