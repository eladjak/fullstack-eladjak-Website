import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock framer-motion to render a plain div so we can test props
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      initial,
      transition,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement> & {
      initial?: Record<string, unknown>;
      whileInView?: Record<string, unknown>;
      transition?: Record<string, unknown>;
      viewport?: Record<string, unknown>;
    }) => (
      <div
        data-testid="motion-div"
        className={className}
        data-initial={JSON.stringify(initial)}
        data-transition={JSON.stringify(transition)}
        {...rest}
      >
        {children}
      </div>
    ),
  },
}));

import { ScrollAnimate } from '../scroll-animate';

describe('ScrollAnimate', () => {
  it('renders children correctly', () => {
    render(
      <ScrollAnimate>
        <p>Hello World</p>
      </ScrollAnimate>,
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(
      <ScrollAnimate className="my-custom-class">
        <span>Content</span>
      </ScrollAnimate>,
    );

    const wrapper = screen.getByTestId('motion-div');
    expect(wrapper).toHaveClass('my-custom-class');
  });

  it('uses default delay of 0 when no delay prop is provided', () => {
    render(
      <ScrollAnimate>
        <span>No delay</span>
      </ScrollAnimate>,
    );

    const wrapper = screen.getByTestId('motion-div');
    const transition = JSON.parse(
      wrapper.getAttribute('data-transition') ?? '{}',
    );
    expect(transition.delay).toBe(0);
  });

  it('accepts and forwards a custom delay prop', () => {
    render(
      <ScrollAnimate delay={0.5}>
        <span>Delayed</span>
      </ScrollAnimate>,
    );

    const wrapper = screen.getByTestId('motion-div');
    const transition = JSON.parse(
      wrapper.getAttribute('data-transition') ?? '{}',
    );
    expect(transition.delay).toBe(0.5);
  });

  it('sets initial opacity to 0.85 and y to 8', () => {
    render(
      <ScrollAnimate>
        <span>Animate me</span>
      </ScrollAnimate>,
    );

    const wrapper = screen.getByTestId('motion-div');
    const initial = JSON.parse(
      wrapper.getAttribute('data-initial') ?? '{}',
    );
    expect(initial.opacity).toBe(0.85);
    expect(initial.y).toBe(8);
  });
});
