declare module 'react-katex' {
  import { ComponentType, HTMLAttributes } from 'react';

  interface KatexProps extends HTMLAttributes<HTMLSpanElement> {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }

  export const InlineMath: ComponentType<KatexProps>;
  export const BlockMath: ComponentType<KatexProps>;
}

