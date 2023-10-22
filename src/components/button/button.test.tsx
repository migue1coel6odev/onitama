/// <reference lib="dom" />

import { expect, test, describe, mock, beforeEach } from 'bun:test'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Button from './Button'

const mockFn = mock(() => void 0)

describe('Test Button Component', () => {
  beforeEach(() => {
    cleanup()
  })

  test('renders children', async () => {
    const btnLabel = 'Test Label'
    render(<Button>{btnLabel}</Button>)
    expect(await screen.findByText(btnLabel)).not.toBeEmpty()
  })

  test('triggers on click', async () => {
    const { baseElement } = render(<Button id="btn" onClick={mockFn} />)
    fireEvent.click(baseElement.querySelector('#btn')!)
    expect(mockFn).toHaveBeenCalled()
  })
})
