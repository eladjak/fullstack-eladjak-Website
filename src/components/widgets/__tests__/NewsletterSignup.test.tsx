import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterSignup } from '../NewsletterSignup';

function respond(status: number, body: unknown) {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), { status })));
}
function fillAndSubmit(consent = true) {
  fireEvent.change(screen.getByLabelText('האימייל שלכם'), { target: { value: 'a@b.co' } });
  if (consent) fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.submit(screen.getByRole('button', { name: 'הירשמו' }).closest('form')!);
}

describe('NewsletterSignup', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows success after the server confirms', async () => {
    respond(200, { ok: true, status: 'subscribed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('נרשמתם. תודה.')).toBeInTheDocument());
  });

  it('RED ARM: provider failure shows an error, never success', async () => {
    respond(502, { ok: false, error: 'subscribe_failed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('ההרשמה לא נשמרה'));
    expect(screen.queryByText('נרשמתם. תודה.')).toBeNull();
  });

  it('RED ARM: a bare ok without a confirmed status is not success', async () => {
    respond(200, { ok: true });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נרשמתם. תודה.')).toBeNull();
  });

  it('says "already on the list" for a known address', async () => {
    respond(200, { ok: true, status: 'already_subscribed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('אתם כבר ברשימה')).toBeInTheDocument());
  });

  it('asks for consent before sending anything', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    render(<NewsletterSignup />);
    fillAndSubmit(false);
    expect(screen.getByRole('alert')).toHaveTextContent('תיבת האישור');
    expect(f).not.toHaveBeenCalled();
  });
});
