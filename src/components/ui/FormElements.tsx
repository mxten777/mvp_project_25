export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        'block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition ' +
        (props.className || '')
      }
    />
  );
}

export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        'inline-flex items-center justify-center rounded bg-brand-primary text-white font-semibold px-4 py-2 hover:bg-brand-secondary transition disabled:opacity-50 disabled:cursor-not-allowed ' +
        className
      }
    >
      {children}
    </button>
  );
}
