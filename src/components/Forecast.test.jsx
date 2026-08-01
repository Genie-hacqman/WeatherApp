import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Forecast from './Forecast'

describe('Forecast', () => {
  it('shows the selected day details when a day is clicked', async () => {
    const user = userEvent.setup()
    const data = {
      daily: [
        { day: 'Mon', high: 24, low: 18, rain: 10, condition: 'Sunny', icon: '01d' },
        { day: 'Tue', high: 22, low: 16, rain: 40, condition: 'Rain', icon: '10d' },
      ],
    }

    render(<Forecast data={data} theme="dark" />)

    expect(screen.getAllByText('Mon').length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: /Tue/i }))

    expect(screen.getByText(/selected day/i)).toBeInTheDocument()
    expect(screen.getByText(/Rain chance 40%/i)).toBeInTheDocument()
  })
})
