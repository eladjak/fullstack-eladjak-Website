import { render, screen } from '@testing-library/react';
import { Github } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { SocialLink } from '../social-link';

describe('SocialLink', () => {
  it('renders a link with the correct href', () => {
    render(
      <SocialLink href="https://github.com/eladj" icon={Github} label="GitHub" />,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/eladj');
  });

  it('renders the icon (hidden from assistive tech)', () => {
    render(
      <SocialLink href="https://github.com" icon={Github} label="GitHub" />,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    // The SVG should be inside the link with aria-hidden
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders screen-reader-only label text', () => {
    render(
      <SocialLink href="https://github.com" icon={Github} label="GitHub" />,
    );

    // sr-only span should contain the label
    const srText = screen.getByText('GitHub');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  it('sets aria-label on the link', () => {
    render(
      <SocialLink href="https://github.com" icon={Github} label="GitHub" />,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('aria-label', 'GitHub');
  });

  it('adds target="_blank" and rel="noopener noreferrer" for external URLs', () => {
    render(
      <SocialLink href="https://github.com" icon={Github} label="GitHub" />,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target or rel for internal URLs', () => {
    render(
      <SocialLink href="/contact" icon={Github} label="Contact" />,
    );

    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('applies a custom className', () => {
    render(
      <SocialLink
        href="https://github.com"
        icon={Github}
        label="GitHub"
        className="extra-class"
      />,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveClass('extra-class');
  });
});
