import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function LegalPage({ title, children }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, var(--pt-bg) 0%, var(--pt-bg-mid) 50%, var(--pt-bg-end) 100%)' }}
    >
      <div className="max-w-md mx-auto px-4 pt-5 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-black"
            style={{ background: 'var(--pt-surface)', color: 'var(--pt-accent)' }}
            aria-label="Zurück"
          >
            ‹
          </button>
          <h1 className="text-xl font-black" style={{ color: 'var(--pt-text)' }}>{title}</h1>
        </div>

        <div
          className="rounded-4xl p-6 text-sm leading-relaxed"
          style={{ background: 'var(--pt-card)', border: '2px solid var(--pt-border)', color: 'var(--pt-text)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-black mt-6 mb-2 first:mt-0" style={{ color: 'var(--pt-accent)' }}>
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3" style={{ color: 'var(--pt-text)' }}>{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-3 pl-4 list-disc space-y-1" style={{ color: 'var(--pt-text)' }}>{children}</ul>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl px-4 py-3 mb-4 text-xs font-semibold"
      style={{ background: 'var(--pt-border-pink)', color: '#E87BAA' }}>
      ⚠️ {children}
    </div>
  );
}
