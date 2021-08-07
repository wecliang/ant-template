import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Transfer } from 'antd';
import TransferIcon from '@/assets/template/Transfer.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'Transfer',
  import: [{
    from: 'antd',
    imports: ['Transfer']
  },{
    from: 'react',
    imports: ['useState'],
  }],
  renderText: createHtml(({rowKey, title1, title2, ...props}: any) => {
    const params = { ...props };
    if(title1 || title2){
      params.titles = [title1 || '', title2 || ''];
    }
    return [
      `<Transfer`,
      `\trowKey={(record: any) => record.${rowKey || 'id'}}`,
      `\ttargetKeys={targetKeys}`,
      `\tonChange={setTargetKeys}`,
      ...paramToStrs(params),
      ` />`,
    ]
  }),
  renderHTML: () => {
    return <img src={TransferIcon} />
  },
  bodyJs: ({ columns }) =>{

    return [
        `const [targetKeys, setTargetKeys] = useState<string[]>([]);\n`,
    ];
  },
  props: {
    ...formItemProps,
    disabled: ['switch',{ title: '禁用状态' }],
    rowKey: ['text', { title: '数据主键' }],
    title1: ['text', { title: '标题一' }],
    title2: ['text', { title: '标题二' }],
  },
  defaultProps: {
    rowKey: 'id',
  },
  render: formCreate(({rowKey, title1, title2, ...props}:any) => {

    return (
      <Transfer 
        {...props}
        titles={[title1, title2]}
        rowKey={record => record[rowKey || 'id']}
      />
    )
  }),
} as templateProps;