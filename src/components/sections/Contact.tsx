import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Copy, Check, Send, Download } from 'lucide-react';
import { profile } from '@/data/profile';
import { Reveal, SectionHeading } from '@/components/ui/Reveal';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [mailtoSent, setMailtoSent] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setMailtoSent(true);
    setTimeout(() => setMailtoSent(false), 4000);
  };

  const contactItems: {
    icon: typeof Mail;
    label: string;
    value: string;
    href: string | null;
    copyable: boolean;
    field: string;
  }[] = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      copyable: true,
      field: 'email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      copyable: true,
      field: 'phone',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bangalore, Karnataka, India',
      href: null,
      copyable: false,
      field: 'location',
    },
  ];

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="section-heading text-balance">
              Let's build something <span className="gradient-text">amazing</span> together.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subheading mx-auto mt-4">
              I'm always interested in discussing exciting engineering opportunities, innovative products, and challenging software development problems.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <Reveal>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg mb-5">Contact Details</h3>
                <div className="space-y-3">
                  {contactItems.map((item) => (
                    <div key={item.label} className="group flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20">
                        <item.icon className="h-4 w-4 text-primary-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-muted">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium hover:text-primary-400 transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value, item.field)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
                          aria-label={`Copy ${item.label}`}
                        >
                          {copiedField === item.field ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-text-muted" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}

                  {/* LinkedIn */}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 group-hover:scale-105 transition-transform">
                      <Linkedin className="h-4 w-4 text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-text-muted">LinkedIn</p>
                      <p className="text-sm font-medium hover:text-primary-400 transition-colors">
                        {profile.linkedinHandle}
                      </p>
                    </div>
                  </a>
                </div>

                <a
                  href={`mailto:${profile.email}?subject=Resume Request`}
                  className="btn-primary w-full mt-6"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </Reveal>
          </div>

          {/* Contact form */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:border-primary-500/40 transition-colors ${
                    errors.name ? 'border-red-400/40' : ''
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:border-primary-500/40 transition-colors ${
                    errors.email ? 'border-red-400/40' : ''
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full rounded-xl glass px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary-500/40 transition-colors ${
                    errors.message ? 'border-red-400/40' : ''
                  }`}
                  placeholder="Tell me about your opportunity or project..."
                />
                {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" />
                Send Message
              </button>

              {mailtoSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-green-400 glass rounded-xl px-4 py-3 border-green-400/20"
                >
                  <Check className="h-4 w-4" />
                  Your email app should now be open with the message ready to send.
                </motion.div>
              )}

              <p className="text-xs text-text-muted text-center">
                This form opens your email client. No data is stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
