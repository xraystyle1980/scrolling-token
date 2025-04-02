declare module 'split-type' {
  interface SplitTypeOptions {
    types?: string | string[]
    tagName?: string
    split?: string | string[]
    absolute?: boolean
    lineClass?: string
    wordClass?: string
    charClass?: string
    splitClass?: string
  }

  interface SplitTypeResult {
    chars: HTMLElement[]
    words: HTMLElement[]
    lines: HTMLElement[]
    elements: HTMLElement[]
    revert: () => void
  }

  export default class SplitType {
    chars: HTMLElement[]
    words: HTMLElement[]
    lines: HTMLElement[]
    elements: HTMLElement[]
    isSplit: boolean
    constructor(target: string | Element | Element[], options?: SplitTypeOptions)
    revert(): void
    split(options?: SplitTypeOptions): SplitTypeResult
  }
} 