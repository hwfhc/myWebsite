##tagSet
创建一个标签集合

####属性:   
+ value[]:  
存储集合中所有元素  

####方法:  
+ constructor(ELEMENTS[]):传入数组，初始化集合元素
  + 参数：
    + ELEMENTS[]：包含所有初始拥有元素的数组
  + 返回值：null


+ OutPut():将所有元素以一个数组形式输出  
  + 参数：null
  + 返回值：包含所有元素的数组


+ Add(element):增添一个新的元素
  + 参数：
    + element：要添加的元素
  + 返回值：null


+ Delete(element):删除集合中某个元素
  + 参数：
    + tag：要删除的元素
  + 返回值：null  


+ isContain(SET):判断集合是否包含另一个集合
  + 参数：
    + SET：另一个集合 
  + 返回值：是包含另一集合的布尔值


+ isOwn(element)：判断集合是否包含元素
  + 参数：
    + element：某个元素
  + 返回值：是否拥有某一元素的布尔值
