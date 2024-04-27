// Vendors
import { render, screen } from '@testing-library/react'
// Components
import App from '../App'

describe('App', () => {
  it('should render the App', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Welcome/i
      })
    ).toBeVisible()
  })
})
