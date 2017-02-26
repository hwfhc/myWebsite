module.exports = tagSet;


function tagSet(ELEMENTS){
    /*
     *效果说明:
     *初始化集合
     */
    this.value = ELEMENTS.concat();
}

tagSet.prototype.OutPut = function(){
    /*
     *效果说明：
     *将所有标签以数组形式输出
     */
    return this.value.concat();
}

tagSet.prototype.Add = function(element){
    /*
     *效果说明：
     *添加新的元素
     */
    this.value.push(element);
}

tagSet.prototype.Delete = function(element){
    /*
     *效果说明:
     *删除元素
     */
    this.value = this.value.filter(function(item){
        return !(item === element);
    });
}

tagSet.prototype.isContain = function(SET){
    /*
     *效果说明:
     *判断集合是否包含另一个集合
     */

    var set = this.value;

    return SET.value.every(function(SET_item){
        return set.some(function(item){
            return item === SET_item;
        });
    });
}
tagSet.prototype.isOwn = function(element){
    /*
     *效果说明:
     *判断元素是否属于集合
     */
    return this.value.some(function(item){
        return item === element;
    });
}
