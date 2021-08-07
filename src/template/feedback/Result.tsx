import { paramToStrs, renderChildren, templateProps } from '..';
import ResultIcon from '@/assets/template/Result.svg';
import { memo } from 'react';
import { Result } from 'antd';
import { IconView } from '@/component/SelectIcon';

export default {
  namespace: 'Result',
  import: ({ icon }: any) => {
    let result: templateProps['import'] = [
      {
        imports: ['Result'],
        from: 'antd',
      }
    ]
    if(icon){
      result.push({
        imports: [`${icon.type}${icon.iconType}`],
        from: '@ant-design/icons',
      })
    }
    return result;
  },
  renderHTML: () => {
    return <img src={ResultIcon} />
  },
  renderText: ({icon, extra, ...props}: any) => {
    let textList: string[] = [];
    if(extra){
      textList.push(`\textra={[`);
      extra.forEach((vals: string[], i:number) =>{
        textList = [...textList, ...vals.map((str: string) => `\t${str}`)];
        textList[textList.length - 1] = `${textList[textList.length - 1]},`;
      })
      textList.push(`\t]}`)
    }
    let iconList: string[] = [];
    if(icon){
      iconList = [`\ticon={<${icon.type}${icon.iconType} />`]
    }
    return (
      [
        `<Result`,
        ...paramToStrs(props),
        ...iconList,
        ...textList,
        `/>`
      ]
    )
  },
  props: {
    status: ['select', {
      valueEnum: {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
        '404': 404,
        '403': 403,
        '500': 500,
      }
    }],
    icon: ['icon'],
    title: ['textarea', {
      isNewline: true,
    }],
    extra: ['ReactNode[]'],
    subTitle: ['textarea', { isNewline: true }],
  },
  defaultProps:{
    status: 'success',
    title: 'Successfully Purchased Cloud Server ECS!',
    subTitle: 'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
  },
  render: memo(({children, icon, ...props}: any) => {
    return (
      <Result 
        {...props}
        icon={icon? <IconView {...icon} /> : undefined}
        extra={renderChildren(children, 'extra')}
      />
    )
  }),
} as templateProps;