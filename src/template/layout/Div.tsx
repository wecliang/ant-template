import React, { memo } from 'react';
import { paramToStrs, templateProps } from '@/template';


export default {
  namespace: 'Div',
  props:{
    hidden: ['switch'],
  },
  renderText: ({ hidden, ...props }: any) => {
    return [
      [`<div${paramToStrs(props, ' ').join(' ')} >`],
      ['</div>']
    ];
  },
  renderHTML: (props:any) => {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6310" width="64" height="64"><path d="M681.661 638.012h8.844a30.007 30.007 0 0 1 28.428 20.397l76.244 225.572 76.244-225.572a30.008 30.008 0 0 1 28.428-20.397h8.844c20.914 0 35.414 20.854 28.128 40.455L836.34 948.763a30.007 30.007 0 0 1-28.128 19.55h-26.069a30.008 30.008 0 0 1-28.128-19.55L653.533 678.467c-7.286-19.601 7.213-40.455 28.128-40.455zM340.689 576.194h6.59c14.049 0 25.439 11.387 25.439 25.434V945.05c0 14.047-11.389 25.434-25.439 25.434h-2.795c-14.049 0-25.439-11.387-25.439-25.434v-8.146c-19.881 27.445-48.793 41.162-86.744 41.162-41.203 0-73.554-14.623-97.045-43.87-21.686-27.081-32.529-62.098-32.529-105.072 0-41.517 10.656-75.639 31.987-102.364 22.77-29.247 54.393-43.87 94.876-43.87 34.333 0 62.889 16.434 85.66 49.286V601.628c0-14.047 11.39-25.434 25.439-25.434z m-160.976 181.98c-11.927 16.248-17.891 39.901-17.891 70.95 0 31.057 5.599 55.065 16.806 72.033 13.012 20.226 33.791 30.331 62.347 30.331 24.21 0 43.55-9.927 58.01-29.788 11.927-18.051 17.891-40.976 17.891-68.784v-4.875c0-29.965-7.234-54.338-21.686-73.117-13.74-16.968-31.267-25.455-52.589-25.455-28.555-0.001-49.521 9.571-62.888 28.705zM553.57 599.154c7.472 6.757 11.208 15.821 11.208 27.192 0 10.665-3.92 19.911-11.742 27.726-7.831 7.114-17.078 10.664-27.753 10.664s-19.931-3.549-27.753-10.664c-7.473-7.464-11.208-16.703-11.208-27.726 0-11.371 3.735-20.435 11.208-27.192 7.113-7.105 16.361-10.663 27.753-10.663 11.741 0.001 21.164 3.558 28.287 10.663z m-31.532 99.705h6.489c13.831 0 25.043 11.21 25.043 25.038v225.576c0 13.828-11.212 25.038-25.043 25.038h-6.489c-13.831 0-25.043-11.21-25.043-25.038V723.897c0.001-13.828 11.213-25.038 25.043-25.038zM658.527 100.078a31.93 31.93 0 0 0 9.367 22.591l187.243 187.055L667.894 496.78a31.936 31.936 0 0 0-9.367 22.591c0 28.463 34.448 42.717 54.594 22.591l216.924-216.706c8.586-8.578 8.586-22.485 0-31.063L713.122 77.487c-20.147-20.126-54.595-5.872-54.595 22.591zM337.978 77.487L121.055 294.194c-8.586 8.578-8.586 22.485 0 31.063l216.924 216.706c20.147 20.126 54.594 5.872 54.594-22.591a31.932 31.932 0 0 0-9.367-22.591L195.963 309.725 383.206 122.67a31.936 31.936 0 0 0 9.367-22.591c0-28.464-34.448-42.718-54.595-22.592zM450.05 486.563c-16.245-6.948-23.776-25.755-16.816-41.995L559.086 150.91c6.953-16.223 25.736-23.745 41.964-16.804 16.245 6.948 23.776 25.755 16.816 41.995L492.014 469.759c-6.953 16.223-25.736 23.745-41.964 16.804z" p-id="6311" fill="#8a8a8a"></path></svg>
  },
  render: memo(({ children, hidden, ...props }:any) => {
    if(hidden) return <div>--内容已隐藏--</div>;
    return (
      <div {...props}>
        {children}
      </div>
    )
  }),
  isContainer: true,
} as templateProps;