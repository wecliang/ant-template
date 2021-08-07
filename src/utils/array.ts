/**
 * @name 根据ID返回当前对象
 * @param list  当前数据列表
 * @param oid   当前Id
 */
export const getIdObject = (list:any[], oid:string) => {
  let result:any = {};
  const filtersList = (arr:any[]) =>{
    arr.forEach((item:any) =>{
      if(result.id) return;
      const { id, children } = item;
      if(id == oid){
        result = item;
      }
      if(children){
        filtersList(children);
      }
    })
  }
  filtersList(list);
  return [result, result.children || []];
}

/**
 * @name 返回当前ID父类对象没有时返回undefind
 * @param list 当前数据列表
 * @param oid 当前id
 */
export const getParentObject = (list:any[], oid:string) => {
  let result:any = undefined;
  const filtersList = (arr:any[],parent:any) =>{
    arr.forEach((item:any) =>{
      if(result) return;
      const { id, children } = item;
      if(id == oid){
        result = parent;
      }
      if(children){
        filtersList(children,item);
      }
    })
  }
  for(let item of list){
    if(item.id === oid) return [undefined];
    if(item.children){
      filtersList(item.children,item);
    }
  }
  return [result];
} 



/**
 * @name 根据id返回当前所在数组集合
 * @param id 当前id
 * @param list 数据集合
 */
export const getIdList = (id:string, list:any[]) =>{
  for(let item of list){
    if(item.id == id) return list;
    if(item.children){
      let result:any = getIdList(id, item.children);
      if(result) return result;
    }
  }
}
