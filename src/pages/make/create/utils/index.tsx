import { templateProps } from "@/template";

/**
 * @name 返回list 集合对象中所有 namespace 值
 * @param list 对象集合
 * @return string[]
 */
export const getListNamespace = (list:templateProps[]) => {
  let set = new Set();
  function recursionList(arr:templateProps[]){
    arr.forEach(({ namespace, children }) => {
      set.add(namespace);
      if(children){
        recursionList(children);
      }
    })
  }
  recursionList(list);

  return [...set];
}

/**
 * @name 根据List集合返回原始modules对象
 */
export const getListModuleObjs = async (list:templateProps[], modules:any ):Promise<any> => {
  let names = getListNamespace(list);
  let moduleObj:any = {};
  await Promise.all(names.map((key:any) => modules[key]())).then((result:any) => {
    result.forEach(({ default:data }:any) => {
      moduleObj[data.namespace] = data;
    })
  })
  return moduleObj;
}
