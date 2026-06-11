"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { trackMarketingError } from "@/lib/analytics";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Marketing Error:", error, info);
    trackMarketingError(error.message, {
      component_stack: info.componentStack?.slice(0, 500) ?? "unknown",
    });

    if (window.Sentry?.captureException) {
      window.Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="marketing-container py-2xl text-center max-sm:py-xl">
          <h2 className="mb-md font-display text-3xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="text-brand-gray">
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
