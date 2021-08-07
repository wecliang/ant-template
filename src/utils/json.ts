
/**
 * @name 返回JSON数据
 */
export const jsonTransitionHtml = (json: any): string[] => {
  let html: string[] = [];
  if(typeof json !== 'object') return html;
  if(Array.isArray(json)){
    html.push('[');
  }else{
    html.push('{')
  }

  function recursionArray(list: any[], tab: string){
    list.forEach((item: any) => {
      if(typeof item === 'object'){
        const isArray = Array.isArray(item);
        html.push(`\n${tab}${isArray ? '[' : '{'}`)
        if(isArray){
          recursionArray(item, `${tab}\t`)
        }else{
          recursionObject(item, `${tab}\t`)
        }
        html.push(`\n${tab}${isArray ? '],' : '},'}`)
      }else if(typeof item === 'string'){
        html.push(`\n${tab}'${item}',`)
      }else {
        if(item !== undefined && item !== null){
          html.push(`\n${tab}${item},`)
        }
      }
    })
  }

  function recursionObject(params: any, tab: string){
    Object.keys(params).forEach((key: string) => {
      const item = params[key];
      if(typeof item === 'object'){
        const isArray = Array.isArray(item);
        html.push(`\n${tab}${key}: ${isArray ? '[' : '{'}`)
        if(isArray){
          recursionArray(item, `${tab}\t`)
        }else{
          recursionObject(item, `${tab}\t`)
        }
        html.push(`\n${tab}${isArray ? '],' : '},'}`)
      }else if(typeof item === 'string'){
        html.push(`\n${tab}${key}: '${item}',`)
      }else if(typeof item === 'function'){
        html.push(`\n${tab}${key}: ${item(tab)},`)
      }else{
        if(item !== undefined && item !== null){
          html.push(`\n${tab}${key}: ${item},`)
        }
      }
    })
  }


  if(Array.isArray(json)){
    recursionArray(json, '\t\t');
    html.push('\n\t]');
  }else{
    recursionObject(json, '\t\t');
    html.push('\n\t}')
  }

  return html;
  
}