class TagGroup{
  constructor(){
    /*
     *效果说明:
     *存储所有选择的标签
     */
     this.tags = [];
  }

  AddTag(tag){
    /*
     *效果说明:
     *添加参数标签
     */
    this.tags[this.tags.length] = tag;
  }

  DeleteTag(tag){
    /*
     *效果说明:
     *删除参数标签
     */
     var length = this.tags.length;

     for(let i=0;i<length;i++)
     {
       if(this.tags[i] == tag)
       {
         this.tags[i] = this.tags[length-1];
         this.tags[length-1] = undefined;
         this.tags.length--;
       }
     }
  }

  isInclude(tag){
   /*
    *效果说明:
    *判断标签是否被标签集合包含
    */
    var length = this.tags.length;

    for(let i=0;i<length;i++)
    {
      if(this.tags[i] == tag)
      {
        return true;
      }
    }

    return false;
  }

  isIncludeTagGroup(tag_group){
   /*
    *效果说明:
    *判断标签集合是否完全包含另一个标签集合
    */
    var length = tag_group.tags.length;

    for(let i=0;i<length;i++){
      if(this.isInclude(tag_group.tags[i]) == false){
        return false;
      }
    }

    return true;
  }
}
