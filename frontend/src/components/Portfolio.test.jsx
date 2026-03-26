import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Portfolio from './Portfolio';

describe('Portfolio Component', () => {
  const mockData = {
    name: "Jane Doe",
    contact: "jane.doe@example.com",
    summary: "A passionate software engineer.",
    experience: [{ title: "Frontend Developer", company: "Tech Inc", description: "Built things" }],
    education: ["B.S. in Computer Science"],
    skills: ["React", "JavaScript", "Tailwind"]
  };

  it('renders the portfolio data correctly', () => {
    render(<Portfolio data={mockData} />);
    
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("A passionate software engineer.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Inc")).toBeInTheDocument();
    
    // Check if Export HTML button is there
    expect(screen.getByRole('button', { name: /export html/i })).toBeInTheDocument();
  });
});
