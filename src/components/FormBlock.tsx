import { useState } from 'react';
import { FormKind } from '../types';

interface FormBlockProps {
  kind: FormKind;
  title: string;
}

const fieldConfig: Record<FormKind, { label: string; placeholder?: string; file?: boolean }[]> = {
  contact: [
    { label: 'Name', placeholder: 'Your full name' },
    { label: 'Email', placeholder: 'you@company.com' },
    { label: 'Phone', placeholder: '+91 / +1 …' },
    { label: 'Message', placeholder: 'How can we help?' },
  ],
  inquiry: [
    { label: 'Name', placeholder: 'Your full name' },
    { label: 'Company', placeholder: 'Company name' },
    { label: 'Email', placeholder: 'you@company.com' },
    { label: 'Technical Question', placeholder: 'Describe your requirement or question' },
  ],
  rfq: [
    { label: 'Part Name', placeholder: 'e.g. housing, bracket, shaft' },
    { label: 'Material', placeholder: 'e.g. aluminium 6061' },
    { label: 'Quantity', placeholder: 'e.g. 10,000 pcs / year' },
    { label: 'Target Timeline', placeholder: 'e.g. prototype in 4 weeks' },
    { label: 'Notes', placeholder: 'Tolerances, finish, packaging requirements' },
    { label: 'Drawing Upload', file: true },
  ],
  careers: [
    { label: 'Full Name', placeholder: 'Your full name' },
    { label: 'Email', placeholder: 'you@company.com' },
    { label: 'Phone', placeholder: '+91 …' },
    { label: 'Position Applied For', placeholder: 'e.g. CNC Programmer' },
    { label: 'Cover Letter', placeholder: 'Why Sembros?' },
    { label: 'Resume Upload', file: true },
  ],
};

export default function FormBlock({ kind, title }: FormBlockProps) {
  const [sent, setSent] = useState(false);
  const fields = fieldConfig[kind];

  return (
    <section className="form-widget">
      <h2>{title}</h2>
      {sent ? (
        <div className="form-success">
          <strong>Thank you.</strong>
          <p>Your submission has been recorded for demo purposes. Our team will follow up shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {fields.map((f) => (
            <label key={f.label} className="form-field">
              <span>{f.label}</span>
              {f.file ? (
                <input type="file" />
              ) : (
                <input type={f.label.toLowerCase().includes('email') ? 'email' : 'text'} placeholder={f.placeholder} required />
              )}
            </label>
          ))}
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      )}
    </section>
  );
}