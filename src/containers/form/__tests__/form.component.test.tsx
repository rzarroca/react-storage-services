// Vendors
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import FormComponent from '../form.component'

describe('Containers / FormComponent', () => {
  test('it should render', () => {
    render(<FormComponent />)

    screen.getByRole('heading', {
      name: /form test/i
    })
  })

  test('first and second value must start with no value set', () => {
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const secondValue = screen.getByTestId(/second value/i)

    expect(firstValue).toHaveTextContent(/no value/i)
    expect(secondValue).toHaveTextContent(/no value/i)
  })

  test('updating the first value must work', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    await user.type(firstInput, 'test value')
    expect(firstInput).toHaveValue('test value')

    await user.click(firstButton)
    expect(firstValue).toHaveTextContent('test value')
  })

  test('updating the first value must clean the input', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    await user.type(firstInput, 'test value')
    await user.click(firstButton)
    expect(firstInput).toHaveValue('')
  })

  test('updating the first and second value must work', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    const secondValue = screen.getByTestId(/second value/i)
    const secondInput = screen.getByRole('textbox', { name: /second value/i })
    const secondButton = screen.getByRole('button', {
      name: /update second value/i
    })

    await user.type(firstInput, 'first test value')
    expect(firstInput).toHaveValue('first test value')
    await user.click(firstButton)
    expect(firstValue).toHaveTextContent('first test value')

    await user.type(secondInput, 'second test value')
    expect(secondInput).toHaveValue('second test value')
    await user.click(secondButton)
    expect(secondValue).toHaveTextContent('second test value')
  })
  test('updating the first and second value must work', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    const secondValue = screen.getByTestId(/second value/i)
    const secondInput = screen.getByRole('textbox', { name: /second value/i })
    const secondButton = screen.getByRole('button', {
      name: /update second value/i
    })

    await user.type(firstInput, 'first test value')
    expect(firstInput).toHaveValue('first test value')
    await user.click(firstButton)
    expect(firstValue).toHaveTextContent('first test value')

    await user.type(secondInput, 'second test value')
    expect(secondInput).toHaveValue('second test value')
    await user.click(secondButton)
    expect(secondValue).toHaveTextContent('second test value')
  })
  test('updating the first value with a empty string must work', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    await user.type(firstInput, 'first test value')
    await user.click(firstButton)
    await user.click(firstButton)

    expect(firstValue).toHaveTextContent('no value')
  })

  test('should update first and second value if second input is: "populate"', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const secondValue = screen.getByTestId(/second value/i)
    const secondInput = screen.getByRole('textbox', { name: /second value/i })
    const secondButton = screen.getByRole('button', {
      name: /update second value/i
    })

    await user.type(secondInput, 'populate')
    await user.click(secondButton)
    expect(firstValue).toHaveTextContent('John')
    expect(secondValue).toHaveTextContent('Doe')
  })

  test('should swap the values if Switch Context is clicked', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const firstValue = screen.getByTestId(/first value/i)
    const firstInput = screen.getByRole('textbox', { name: /first value/i })
    const firstButton = screen.getByRole('button', {
      name: /update first value/i
    })

    const secondValue = screen.getByTestId(/second value/i)
    const secondInput = screen.getByRole('textbox', { name: /second value/i })
    const secondButton = screen.getByRole('button', {
      name: /update second value/i
    })

    await user.type(firstInput, 'first test value')
    await user.click(firstButton)

    await user.type(secondInput, 'second test value')
    await user.click(secondButton)

    const switchButton = screen.getByRole('button', {
      name: /switch context/i
    })
    await user.click(switchButton)
    expect(firstValue).toHaveTextContent('second test value')
    expect(secondValue).toHaveTextContent('first test value')
  })
})
