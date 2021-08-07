import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import CommentIcon from '@/assets/template/Comment.svg';
import { Comment } from 'antd';

export default {
  namespace: 'Comment',
  import: [
    {
      from: 'antd',
      imports: ['Comment'],
    }
  ],
  renderText: (props:any) => {
    return [`<Comment`,...paramToStrs(props),`/>`];
  },
  props:{

  },
  renderHTML:() => {
    return <img src={CommentIcon} />
  },
  render:memo((props:any) => {
    return <Comment {...props} />
  }),
} as templateProps;