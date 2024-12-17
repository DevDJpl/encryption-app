import { classNames } from 'primereact/utils';

export const TRANSITIONS = {
  overlay: {
      timeout: 150,
      classNames: {
          enter: 'opacity-0 scale-75',
          enterActive: 'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
          exit: 'opacity-100',
          exitActive: '!opacity-0 transition-opacity duration-150 ease-linear'
      }
  }
};

const CipherGuard = {
    menu: {
        root: 'min-w-[12rem] rounded-md py-2 bg-surface-0 dark:bg-[#1c2537] text-surface-700 dark:text-white/80 border border-surface-200 dark:border-[#1c2537]',
        menu: {
            className: classNames('m-0 p-0 list-none', 'outline-none')
        },
        content: ({ state }) => ({
            className: classNames(
              'rounded-none text-surface-700 dark:text-white/80',
              {
                'bg-surface-200 text-surface-700 dark:bg-surface-300/10 dark:text-white': state.focused
              },
              'transition-shadow duration-200',
              'hover:text-surface-700 dark:hover:text-white/80',
              'hover:bg-surface-100 dark:bg-[#1c2537] dark:hover:bg-[#21345c]/30'
            )
        }),
        action: {
            className: classNames('relative flex items-center py-3 px-5 text-surface-700 dark:text-white/80 no-underline overflow-hidden cursor-pointer select-none')
        },
        menuitem: {
            className: classNames('hover:bg-gray-200')
        },
        icon: 'mr-2 text-surface-600 dark:text-[#2196f3]',
        submenuheader: {
            className: classNames('font-bold', 'm-0 py-3 px-5', 'rounded-tl-none rounded-tr-none', 'bg-surface-0 dark:bg-[#1c2537]', 'text-surface-700 dark:text-white')
        },
        separator: 'border-t border-gray-300 dark:border-blue-900/40 my-1',
        transition: TRANSITIONS.overlay
    },
    tag: {
        root: ({ props }) => ({
            className: classNames(
                'text-2xs font-bold inline-flex items-center justify-center px-2 py-1',
                'text-[#fff] dark:text-[#fff] ',
                {
                    'bg-gray-500 ': props.severity == 'secondary',
                    'bg-green-500 ': props.severity == 'success',
                    'bg-blue-500 dark:bg-[#2196f3] ': props.severity == null || props.severity == 'info',
                    'bg-orange-500 ': props.severity == 'warning',
                    'bg-purple-500 ': props.severity == 'help',
                    'bg-red-500 ': props.severity == 'danger'
                },
                {
                    'rounded-md': props.rounded,
                    'rounded-full': !props.rounded
                }
            )
        }),
        value: 'leading-normal',
        icon: 'mr-1 text-sm'
    }
};

export default CipherGuard;