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
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('לא הצלחנו לאשר'));
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

  it('explains an earlier opt-out instead of re-adding', async () => {
    respond(409, { ok: false, error: 'previously_unsubscribed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('הוסרה בעבר'));
  });

  it('honeypot rejection is an error the visitor can recover from, never success', async () => {
    respond(400, { ok: false, error: 'rejected' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נרשמתם. תודה.')).toBeNull();
    expect((document.querySelector('input[name="website"]') as HTMLInputElement).value).toBe('');
  });

  it('asks for consent before sending anything', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    render(<NewsletterSignup />);
    fillAndSubmit(false);
    expect(screen.getByRole('alert')).toHaveTextContent('תיבת האישור');
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(f).not.toHaveBeenCalled();
  });
});
