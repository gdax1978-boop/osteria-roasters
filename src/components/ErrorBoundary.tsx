import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  retry = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-gold-muted font-medium mb-4">
              Something went wrong
            </p>
            <h2 className="font-serif text-3xl mb-4">We couldn't load this content.</h2>
            <p className="text-espresso-light font-light mb-10 max-w-sm">
              Make sure the dev server is running, then try again.
            </p>
            <button
              onClick={this.retry}
              className="bg-espresso text-cream px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors btn-float"
            >
              Try Again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

/* Lightweight inline error display for hook-level errors */
export const InlineError = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
    <p className="text-espresso-light font-light">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="border border-espresso/20 px-6 py-2 text-xs uppercase tracking-widest font-medium hover:border-terracotta hover:text-terracotta transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);
