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

  it('honeypot rejection: error, field cleared, retry then succeeds, never a false confirmation', async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: false, error: 'rejected' }), { status: 400 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true, status: 'subscribed' }), { status: 200 }));
    vi.stubGlobal('fetch', f);
    render(<NewsletterSignup />);
    const hp = document.querySelector('input[name="website"]') as HTMLInputElement;
    fireEvent.change(hp, { target: { value: 'autofilled' } });
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText('נרשמתם. תודה.')).toBeNull();
    expect(JSON.parse(String(f.mock.calls[0][1].body)).website).toBe('autofilled');
    expect(hp.value).toBe('');
    fireEvent.submit(screen.getByRole('button', { name: 'הירשמו' }).closest('form')!);
    await waitFor(() => expect(screen.getByText('נרשמתם. תודה.')).toBeInTheDocument());
    expect(JSON.parse(String(f.mock.calls[1][1].body)).website).toBe('');
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
