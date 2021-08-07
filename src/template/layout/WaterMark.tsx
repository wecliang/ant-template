import { paramToStrs, templateProps } from '..';
import { WaterMark } from '@ant-design/pro-layout';
import { memo } from 'react';

export default {
  namespace: 'WaterMark',
  import: [
    {
      from: '@ant-design/pro-layout',
      imports: ['WaterMark'],
    }
  ],
  renderHTML: () => {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6647" width="120" height="120"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 962.56a450.56 450.56 0 1 1 450.56-450.56 450.56 450.56 0 0 1-450.56 450.56z" p-id="6648" fill="#bfbfbf"></path><path d="M245.76 245.76h225.28v61.44H245.76zM552.96 245.76h225.28v61.44H552.96zM681.472 716.8H778.24v61.44h-96.768zM245.76 481.28h225.28v61.44H245.76zM245.76 716.8h225.28v61.44H245.76z" p-id="6649" fill="#bfbfbf"></path><path d="M245.76 245.76h61.44v532.48h-61.44zM716.8 245.76h61.44v532.48h-61.44zM552.96 245.76h61.44v532.48h-61.44z" p-id="6650" fill="#bfbfbf"></path></svg>;
  },
  renderText: (props: any) => {
    return [
      [`<WaterMark${paramToStrs(props, ' ').join('')} >`],
      [`</WaterMark>`]
    ];
  },
  props: {
    width: ['digit', { title: '水印的宽度', formProps: { initialValue: 120 } }],
    height: ['digit', { title: '水印的高度', formProps: { initialValue: 64 } }],
    rotate: ['digit', { 
      title: '旋转的角度',
      formProps: { initialValue: -22 },
      fieldProps: {
        min: -Number.MAX_SAFE_INTEGER
      }
    }],
    image: ['text', {
      title: '图片源'
    }],
    zIndex: ['digit'],
    content: ['textarea', { title: '水印文字内容', isNewline: true }],
    fontColor: ['color'],
    fontSize: ['digit', { 
      title: '文字大小',
      formProps: { initialValue: 16 }
    }],
    markStyle: ['style'],
    gapX: ['digit', { title: '水印之间的水平间距', isNewline: true, }],
    gapY: ['digit', { title: '水印之间的垂直间距', isNewline: true, }],
  },
  defaultProps: {
    content: '模板制作',
  },
  render: memo(({ children, ...props }: any) => {
    return (
      <WaterMark {...props}>
        {children}
      </WaterMark>
    )
  }),
  isContainer: true,
} as templateProps;