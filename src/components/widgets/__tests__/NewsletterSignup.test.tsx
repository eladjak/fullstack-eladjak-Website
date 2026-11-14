import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterSignup } from '../NewsletterSignup';

function respond(status: number, body: unknown) {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), { status })));
}
function fillAndSubmit(consent = true) {
  fireEvent.change(screen.getByLabelText('האימייל שלכם'), { target: { value: 'a@b.co' } });
  if (consent) fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.submit(screen.getByRole('button', { name: /הירשמו|שולח/ }).closest('form')!);
}

describe('NewsletterSignup', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows success after the server confirms', async () => {
    respond(200, { ok: true, status: 'confirmation_sent' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('נשלח אליכם מייל')).toBeInTheDocument());
  });

  it('RED ARM: provider failure shows an error, never success', async () => {
    respond(502, { ok: false, error: 'subscribe_failed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('לא הצלחנו לאשר'));
    expect(screen.queryByText('נשלח אליכם מייל')).toBeNull();
  });

  it('RED ARM: a bare ok without a confirmed status is not success', async () => {
    respond(200, { ok: true });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נשלח אליכם מייל')).toBeNull();
  });

  it('after submit it says the mail was sent and that the person is NOT yet subscribed', async () => {
    respond(200, { ok: true, status: 'confirmation_sent' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('נשלח אליכם מייל')).toBeInTheDocument());
    expect(screen.getAllByText(/עוד לא נרשמתם/).length).toBeGreaterThan(0);
    expect(screen.queryByText('נרשמתם. תודה.')).toBeNull();
  });

  it('RED ARM: the old single-step statuses are no longer success', async () => {
    respond(200, { ok: true, status: 'subscribed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נשלח אליכם מייל')).toBeNull();
  });

  it('explains an earlier opt-out instead of re-adding', async () => {
    respond(409, { ok: false, error: 'previously_unsubscribed' });
    render(<NewsletterSignup />);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('הוסרה בעבר'));
  });

  it('honeypot rejection: error, field cleared, retry then succeeds, never a false confirmation', async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: false, error: 'rejected' }), { status: 400 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true, status: 'confirmation_sent' }), { status: 200 }));
    vi.stubGlobal('fetch', f);
    render(<NewsletterSignup />);
    const hp = document.querySelector('input[name="website"]') as HTMLInputElement;
    fireEvent.change(hp, { target: { value: 'autofilled' } });
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נשלח אליכם מייל')).toBeNull();
    expect(JSON.parse(String(f.mock.calls[0][1].body)).website).toBe('autofilled');
    expect(hp.value).toBe('');
    fireEvent.submit(screen.getByRole('button', { name: /הירשמו|שולח/ }).closest('form')!);
    await waitFor(() => expect(screen.getByText('נשלח אליכם מייל')).toBeInTheDocument());
    expect(JSON.parse(String(f.mock.calls[1][1].body)).website).toBe('');
  });

  it('asks for consent before sending anything', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    render(<NewsletterSignup />);
    fillAndSubmit(false);
    expect(screen.getByRole('alert')).toHaveTextContent('תיבת האישור');
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('האימייל שלכם').className).not.toMatch(/border-destructive/);
    expect(f).not.toHaveBeenCalled();
  });
});
