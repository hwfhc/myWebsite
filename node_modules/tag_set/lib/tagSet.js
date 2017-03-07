module.exports = tagSet;


function tagSet(ELEMENTS){
    /*
     *效果说明:
     *初始化集合
     */
    var isRepeat = (function(){
        var judge = {};

        return function(value){
            if(judge[value] === undefined){
                judge[value] = true;
                return false;
            }else{
                return true;
            }
        }
    })();

    if(ELEMENTS.every(function(item,index,array){
        if(typeof item === 'string' && isRepeat(item) === false){
            return true;
        }
        else{
            return false;
        }
    })){
        this.value = ELEMENTS.concat();
    }
    else{
        console.error('[tag_set] element must be string or can not repeat');
    }
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
    if(!this.value.some(function(item){
        return item === element;
    }) && typeof element === 'string'){
        this.value.push(element);
    }else{
        console.error('[tag_set] element must be string or can not repeat');
    }
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
