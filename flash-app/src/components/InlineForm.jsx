import { useState } from 'react';
import Reveal from './Reveal';
import './InlineForm.css';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Shared form for driver/seller applications and the contact page.
 * `endpoint` is appended to API_BASE (e.g. 'applications/driver').
 * `fields` describes what to render; `extraFields` (city select, subject
 * select) are passed as pre-built elements via `selectField`.
 */
export default function InlineForm({ endpoint, submitLabel, successMessage, selectField, selectLabel, selectOptions, messageLabel }) {
  const [values, setValues] = useState({ name: '', email: '', select: selectOptions?.[0]?.value || '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = { name: values.name, email: values.email, message: values.message };
    if (selectField === 'city') payload.city = values.select;
    if (selectField === 'subject') payload.subject = values.select;

    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Could not reach the server. Please try again shortly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <Reveal className="inline-form__success" role="status">
        {successMessage}
      </Reveal>
    );
  }

  return (
    <Reveal as="form" className="inline-form" onSubmit={handleSubmit}>
      <div className="inline-form__row">
        <div className="inline-form__field">
          <label htmlFor={`${endpoint}-name`}>Full name</label>
          <input
            id={`${endpoint}-name`}
            type="text"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="inline-form__field">
          <label htmlFor={`${endpoint}-email`}>Email address</label>
          <input
            id={`${endpoint}-email`}
            type="email"
            required
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      {selectField && (
        <div className="inline-form__field">
          <label htmlFor={`${endpoint}-select`}>{selectLabel}</label>
          <select
            id={`${endpoint}-select`}
            value={values.select}
            onChange={(e) => update('select', e.target.value)}
          >
            {selectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="inline-form__field">
        <label htmlFor={`${endpoint}-message`}>{messageLabel || 'Message'}</label>
        <textarea
          id={`${endpoint}-message`}
          required
          rows={4}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending\u2026' : submitLabel}
      </button>

      {status === 'error' && <p className="inline-form__error" role="alert">{errorMsg}</p>}
    </Reveal>
  );
}
