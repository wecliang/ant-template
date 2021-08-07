import { templateProps, paramToStrs }　from '..';
import IconSVG from '@/assets/template/Icon.svg';
import React, { memo } from 'react';
import { IconView } from '@/component/SelectIcon';
import { PlaceHolder } from '@/component/Icon';
import Icon from '@ant-design/icons';

export default { 
  namespace: 'Icon',
  import: ({ icon }) => {
    if(icon){
      return [{
        imports: [`${icon.type}${icon.iconType}`],
        from: '@ant-design/icons',
      }]
    }
    return [];
  },
  renderText: ({ icon, ...props }: any) => {
    if(icon){
      return [`<${icon.type}${icon.iconType}${paramToStrs(props).join('')} />`];
    }
    return [];
  },
  renderHTML: () => <img src={IconSVG} />,
  props: {
    icon: ['icon']
  },
  render: memo(({ icon, ...props}:any) => {
    if(!icon) return <Icon component={PlaceHolder} />
    return <IconView {...icon} {...props} />
  }),
  isInline: true,
} as templateProps;