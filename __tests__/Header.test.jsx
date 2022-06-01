import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import '@testing-library/jest-dom'

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />)

    const heading = screen.getByRole('heading', {
      name: /YAPA/i,
    })

    expect(heading).toBeInTheDocument()
  })
})