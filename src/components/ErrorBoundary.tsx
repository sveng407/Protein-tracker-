import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ background: 'linear-gradient(160deg, var(--pt-bg) 0%, var(--pt-bg-mid) 50%, var(--pt-bg-end) 100%)' }}
        >
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</p>
          <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--pt-text)' }}>
            Etwas ist schiefgelaufen · Something went wrong
          </p>
          <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--pt-text-sec)' }}>
            Bitte lade die Seite neu · Please reload the page
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '1.5rem',
              fontWeight: 900,
              fontSize: '0.875rem',
              color: 'white',
              background: 'linear-gradient(135deg,var(--pt-grad-from),var(--pt-grad-to))',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🔄 Neu laden · Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
