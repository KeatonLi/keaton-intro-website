import { cva, type VariantProps } from 'class-variance-authority';
export const buttonVariants = cva('nova-button inline-flex items-center justify-center whitespace-nowrap shrink-0 disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: { default: 'nova-button-default', outline: 'nova-button-outline', secondary: 'nova-button-secondary', ghost: 'nova-button-ghost', destructive: 'nova-button-destructive', link: 'nova-button-link' },
    size: { default: 'nova-button-md', sm: 'nova-button-sm', lg: 'nova-button-lg', icon: 'nova-button-icon' }
  }, defaultVariants: { variant: 'default', size: 'default' }
});
export type ButtonVariants = VariantProps<typeof buttonVariants>;
