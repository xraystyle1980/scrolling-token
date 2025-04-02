'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import gsap from 'gsap'
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Kill all GSAP animations on error
    gsap.killTweensOf("*")
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public componentWillUnmount() {
    // Clean up any remaining GSAP animations
    gsap.killTweensOf("*")
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorMessage}>
            Oops, something went wrong!
          </h2>
          <button 
            onClick={() => {
              gsap.killTweensOf("*")
              this.setState({ hasError: false })
            }}
            className={styles.retryButton}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}