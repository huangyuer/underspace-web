
function DataTree() {
  if (!(this instanceof DataTree)) {
    return new DataTree();
  }
}

// 生成树形结构
DataTree.build =  (data) => { 
  let result = [];
  for(let item of data){ 
    if(item.parentId === '' || item.parentId === undefined){
      let t = {};
      for(let i in item){
        t[i] = item[i];
      }
      t.level = 1;
      t.display = true;
      t.expanded = true; 
      t.isLeaf = true;
      t.children = [];
      result.push(t);
    }
  }
  DataTree.buildChildren(result, data, 1);
  console.log('result', result);
  return result;
};

// 生成子节点
DataTree.buildChildren =  (result, data, level) => { 
  let hasChildren = false; 
  let levelChildren = [];
  DataTree.findLevelChildren(levelChildren, result, level);
  for(let i in levelChildren){
    let item = levelChildren[i];
    // 查找子目录
    let children = DataTree.findNodeChildren(data, item._id, item.level);
    // 存储子目录
    if(children.length > 0){
      hasChildren = true;
      item.isLeaf = false;   
      for(let child of children){ 
        item.children.push(child); 
      } 
    } 
  } 
  if(hasChildren){
    level += 1; 
    DataTree.buildChildren(result, data, level);
  }else{ 
    return;
  }
};

// 查找层级节点
DataTree.findLevelChildren =  (result, arr, level) => {  
  for(let item of arr){
    if(item.level === level){
      result.push(item);
    } 
    DataTree.findLevelChildren(result, item.children, level);
  }
};

// 搜索节点的子节点
DataTree.findNodeChildren =  (data, nodeId, nodeLevel) => { 
  let children = [];
  for(let item of data){
    if(item.parentId === nodeId){
      let t = {};
      for(let i in item){
        t[i] = item[i];
      }
      t.level = nodeLevel + 1;
      t.display = true;
      t.expanded = true;  
      t.isLeaf = true;
      t.children = [];
      children.push(t);
    }
  }
  return children;
};


export{DataTree};