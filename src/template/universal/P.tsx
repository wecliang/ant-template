import { paramToStrs, templateProps } from '@/template';
import { memo } from 'react';
import Icon from '@ant-design/icons';
import Text from './Text';

const PIcon = () => <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22346" width="100" height="100"><path d="M181.76 577.536c16.384 6.144 34.304-2.048 39.936-18.432l52.224-143.36v0.512h141.312l52.224 143.36c6.144 15.872 23.552 24.064 39.936 18.432 15.872-6.144 24.064-23.552 18.432-39.936L376.832 129.024c-4.608-13.824-18.432-22.016-32.256-20.48-13.824-1.536-27.136 6.656-32.256 20.48L163.328 537.6c-6.144 16.384 2.048 34.304 18.432 39.936z m162.816-356.352l48.128 132.096h-96.256l48.128-132.096z m563.2 633.344H99.328c-16.896 0-31.232 13.824-31.232 31.232s13.824 31.232 31.232 31.232h808.448c17.408 0 31.232-13.824 31.232-31.232s-13.824-31.232-31.232-31.232z m-248.832-683.52h248.832c17.408 0 31.232-13.824 31.232-31.232s-13.824-31.232-31.232-31.232H658.944c-17.408 0-31.232 13.824-31.232 31.232s13.824 31.232 31.232 31.232z m248.832 123.904H658.944c-17.408 0-31.232 13.824-31.232 31.232s13.824 31.232 31.232 31.232h248.832c17.408 0 31.232-13.824 31.232-31.232s-13.824-31.232-31.232-31.232z m0 372.736H99.328c-16.896 0-31.232 14.336-31.232 31.232 0 17.408 13.824 31.232 31.232 31.232h808.448c17.408 0 31.232-13.824 31.232-31.232s-13.824-31.232-31.232-31.232z m0-186.368H658.944c-17.408 0-31.232 13.824-31.232 31.232s13.824 31.232 31.232 31.232h248.832c17.408 0 31.232-13.824 31.232-31.232s-13.824-31.232-31.232-31.232z" fill="#666666" p-id="22347"></path></svg>

export default {
  namespace: 'P',
  renderText: ({ text, ...props}) => {
    return [
      [`<p${paramToStrs(props, ' ').join('')} >`],
      [`</p>`],
    ];
  },
  props: {
    // text: ['textarea', {
    //   isNewline: true,
    //   title: '段落文本',
    //   fieldProps:{
    //     autoSize: true,
    //   }
    // }]
  },
  defaultProps:{
//    text: '这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本。'
  },
  renderHTML: () => <Icon component={PIcon} />,
  render:memo(({ children, ...props }) =>{
    return <p {...props}>
      {children}
    </p>
  }),
  isContainer: true,
  children: [
    { ...Text, defaultProps: { text: '这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本，这是段落文本。' }},
  ]
} as templateProps;