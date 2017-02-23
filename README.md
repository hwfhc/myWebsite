#前端部分
###Layer
+ TagGroup
+ Shape  
  + TagGroup
  + Matrix

###ArticleList
+ TagGroup
+ Article  
  + TagGroup

**目录栏（左）**：
+ 排列文章标题与发布日期
+ 鼠标悬于文章上时右侧图形框对应的标签会改变颜色  

##ArticleList：
文章列表，使用vue框架

####属性: 
+ article[]:  
存储所有的article  

+ visible_article[]:  
存储会被Refresh()显示的article

####方法:
+ Filter(tag_group):  
visible_article中换为拥有tag_group中所有标签的article  

+ AddArticle(id,title,tags):  
添加一个article

 + id：文章编号  
 + title：文章标题  
 + tags[]：文章标签的数组  

##Article：
####属性: 
+ tag_Group:  
文章对应的TagGroup   

---

**图形框（右）**：
+ 使用js运算使其时刻居中
+ 选择图形框中的标签时，目录栏中文章会过滤  
+ 标签均为圆代替  
+ 每次更新文章时会生成新的图形，各个标签（圆）的大小由该标签下文章数量决定  

###接口：由后端传递json文件，获取目录栏文章列表，图形框标签分布及大小  

##Layer
整个canvas图像  

####属性: 
+ canvas:  
对应本图层的canvas 
 
+ Shape[]:  
指向本图层包含的图形  

+ tag_group:
TagGroup对象，存储被选择的标签

####方法:
+ draw():  读取所有shape并绘制
  + 参数：null
  + 返回值：null

+ clear():清空本图层
  + 参数：null
  + 返回值：null 


+ AddShape(X,Y,range,tag,color):为图层添加一个shape，其后是shape初始化参数 
  + 参数：
    + X，Y：shape中心location坐标
    + range：shape半径
    + tag：
    + color：shape的颜色  
  + 返回值：null  


+ DeleteShape(N):删除第N个shape  
  + 参数：
    + N：删除shape序号
  + 返回值：null  


+ ClickedAt(x,y):获取被点击的shape
  + 参数：
    + x,y：鼠标点击点的坐标
  + 返回值：被点击shape的指针  


+ GetTagGroup():获取layer对象的tag_group属性
  + 参数：null
  + 返回值：指向tag_group的指针

##Shape
每一个标签所对应的圆形  

####属性:
+ location:  
三维矩阵，代表图形的中心  

+ range:  
圆的半径  

+ tag:  
该图形所对应的标签  

+ color:  
图形绘制时的颜色

+ fill_style(还没有):  
说明shape内部填充方式  

+ stroke_style(还没有):  
说明shape线条样式  

####方法:
+ GetX():获取中心X坐标 
  + 参数：null
  + 返回值：中心X坐标


+ GetY():获取中心Y坐标 
  + 参数：null
  + 返回值：中心Y坐标


+ Transformation(matrix):将矩阵location右乘一个矩阵
 + 参数：
   + matrix：3X3矩阵
 + 返回值：无

---

#后端部分
####概述：  
index.json存储文章头，页面初始化时获取（存在脚本判断index.json和正文是否一一对应且正确）  
1/2/3…….json存储对应编号文章的正文，显示正文时获取  
graph.json存储canvas布局，页面初始化获取，由脚本解析index.json生成
####通讯格式：
+ graph.json:   
tags[]
 + tag:标签  
 + number：本标签文章数量
 + X,Y:标签图形在canvas中的坐标
 + color：标签颜色
+ index.json：  
articles[]
 + ID:文章的编号
 + title:文章的标题
 + tags[]:文章的标签集合
+ 1/2/3…….json
 + title:文章的标题
 + content:文章的正文  
