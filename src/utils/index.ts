/**
 * @name 根据ID 获取对象数据
 * @param Array   List  树状数据集合
 * @param Object  data  list 对象集
 * @param String  id
 * @returns [number, Array, parentItems]
 */
 export const getObject = (list:any[],data:Record<string, string | undefined>,id:string) =>{
  let setps = [id];
  while(data[id]){
    id = data[id] as string;
    setps.push(id);
  }
  let result = list;
  let index:number|undefined = undefined;
  let parentItems:any = [];
  let setpId = setps.pop();
  while(setpId){
    index = result.findIndex((options:any) => options.id === setpId);
    if(setps.length){
      let item = Object.assign({},{
        ...result[index],
        children: [...result[index].children]
      });
      result[index] = item;
      result = item.children;
      parentItems.push(item);
      setpId = setps.pop();
    }else{
      setpId = undefined;
      result[index] = { ...result[index] }
    }
  }
  return [index, result, parentItems];
}