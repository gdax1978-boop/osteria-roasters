import { useState, type ChangeEvent } from 'react';
import { MapPin } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import type { ContactPayload, ContactResponse, ApiError } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY_FORM: ContactPayload = { name: '', email: '', message: '' };

export const VisitUs = () => {
  const [form, setForm] = useState<ContactPayload>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err: ApiError = await res.json();
        throw new Error(err.error || 'Something went wrong.');
      }

      const data: ContactResponse = await res.json();
      setStatus('success');
      setFeedback(data.message);
      setForm(EMPTY_FORM);
    } catch (err: unknown) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-espresso/30 py-2 outline-none focus:border-terracotta transition-colors rounded-none placeholder:text-espresso/30';

  return (
    <PageTransition className="pt-32 pb-24 px-6 h-full min-h-screen max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Visit Us</h1>
          <p className="text-espresso-light font-light text-lg mb-12">
            Step into our Brooklyn roastery and café. Experience the aromas, taste the latest micro-lots, and chat with
            our roasters.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="font-serif text-2xl mb-2 text-terracotta">Location</h3>
              <p className="font-light">
                124 Artisan Way
                <br />
                Brooklyn, NY 11211
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-2 text-terracotta">Hours</h3>
              <ul className="font-light space-y-1">
                <li>Monday &ndash; Friday: 7:00 AM &ndash; 4:00 PM</li>
                <li>Saturday &ndash; Sunday: 8:00 AM &ndash; 5:00 PM</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2 text-terracotta">Get in Touch</h3>
              <p className="font-light mb-6">
                hello@osteriaroasters.com
                <br />
                (718) 555-0199
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-sm mt-8 border-t border-espresso/10 pt-8"
              >
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-1 text-espresso-light">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-1 text-espresso-light">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-widest mb-1 text-espresso-light"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass + ' resize-none'}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-espresso text-cream hover:bg-terracotta transition-colors px-6 py-3 text-xs uppercase tracking-widest font-semibold mt-4 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>

                {feedback && (
                  <p
                    className={`text-sm pt-2 ${
                      status === 'success' ? 'text-terracotta' : 'text-red-600'
                    }`}
                  >
                    {feedback}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="h-full min-h-[500px] w-full bg-espresso/5 rounded-sm overflow-hidden relative">
          <img
            src="https://picsum.photos/seed/visitca/1500/1500"
            alt="Cafe Interior Setting"
            className="absolute inset-0 w-full h-full object-cover film-filter"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 bg-cream/90 backdrop-blur-sm px-6 py-4 rounded-sm">
            <div className="flex items-center gap-2 text-espresso">
              <MapPin className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-medium">124 Artisan Way, Brooklyn</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
