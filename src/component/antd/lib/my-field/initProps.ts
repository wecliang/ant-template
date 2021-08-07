import { MyFieldProps } from './Field';
const intl = {
  placeholder: '请输入',
  placeSelect: '请选择',
  startTime: '开始时间',
  endTime: '结束时间',
  startDate: '开始日期',
  endDate: '结束日期',
}

/**
 * 预设 fieldProps 初始值
 */
export function initializeFieldProps({
  ...item
}: MyFieldProps) {
  const { valueType, placeholder } = item;
  const label = item.label || '';
  let fieldProps:any = {};
  switch (valueType) {
    case 'dateTimeRange':
      fieldProps = {
        placeholder: [
          intl.startTime,
          intl.endTime,
        ],
      };
      break;
    case 'dateRange':
      fieldProps = {
        placeholder: [
          intl.startDate, 
          intl.endTime,
        ],
      };
      break;
    case 'date':
    case 'dateTime':
      fieldProps = {
        placeholder: `${intl.placeSelect}${label}`,
      };
      break;
    case 'select':
      fieldProps = {
        placeholder: `${intl.placeSelect}${label}`,
        showSearch: true,
        optionFilterProp: 'label',
      };
      break;
    default:
      fieldProps = {
        autoComplete: 'off',
        placeholder: `${intl.placeholder}${label}`,
      };
      break;
  }
  if(placeholder){
    fieldProps.placeholder = placeholder;
  }

  return fieldProps;
}


/**
 * 预设 formProps 值
 */
export function initializeFromProps({
  label,
  required,
  valueType,
  mode,
}: MyFieldProps){
  let config: MyFieldProps['formProps'] = {};
  if (required && mode !== 'read') {
    switch (valueType) {
      case 'date':
      case 'dateMonth':
      case 'dateQuarter':
      case 'dateRange':
      case 'dateTime':
      case 'dateTimeRange':
      case 'dateWeek':
      case 'dateYear':
      case 'select':
      case 'digit':
        config.rules = [
          {
            required: true,
            message: `${intl.placeSelect}${label}`,
          },
        ];
        break;
      default:
        config.rules = [
          {
            required: true,
            whitespace: true,
            message: `${intl.placeholder}${label}`,
          },
        ];
    }
  }
  return config;
};
