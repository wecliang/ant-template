import { paramToStrs, templateProps } from '..';
import AlertIcon from '@/assets/template/Alert.svg';
import { memo } from 'react';
import { Alert } from 'antd';
import { IconView } from '@/component/SelectIcon';

export default {
  namespace: 'Alert',
  import: ({ icon }: any) => {
    let result: templateProps['import'] = [
      {
        imports: ['Alert'],
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
    return <img src={AlertIcon} />
  },
  renderText: ({icon , ...props}: any) => {
    let iconList: string[] = [];
    if(icon){
      iconList = [`\ticon={<${icon.type}${icon.iconType} />`]
    }
    return (
      [
        `<Alert`,
        ...paramToStrs(props),
        ...iconList,
        `/>`
      ]
    )
  },
  props: {
    message: ['textarea', {
      title: '警告提示内容',
      isNewline: true,
    }],
    type: ['select', {
      valueEnum: {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
      }
    }],
    icon: ['icon'],
    banner: ['switch'],
    closable: ['switch'],
    showIcon: ['switch'],
  },
  defaultProps: {
    message: '这是警告内容',
  },
  render: memo(({icon, ...props }: any) => {
    return (
      <Alert {...props} icon={icon? <IconView {...icon} /> : undefined} />
    )
  }),
} as templateProps;