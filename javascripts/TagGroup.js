function TagGroup(TAGS){
	/*
	 *效果说明:
	 *存储所有选择的标签
	 *
	 *参数说明：
	 *初始化的标签
	 */
	var tags = [];

	for(let i=0;i<TAGS.length;i++){
		tags[i] = TAGS[i];
	}
	
	function GetTags(){
		/*
		 *效果说明：
		 *将所有标签以数组形式输出
		 *
		 */

		var TAGS = [];

		for(let i=0;i<tags.length;i++)
		{
			TAGS[i] = tags[i];
		}

		return TAGS;
	}

	function AddTag(tag){
		/*
		 *效果说明：
		 *添加参数标签
		 */
		tags[tags.length] = tag;
	}

	function GetNumber(){
    return tags.length;
	}

	function DeleteTag(tag){
		/*
		 *效果说明:
		 *删除参数标签
		 */
		var length = tags.length;

		for(let i=0;i<length;i++)
		{
			if(tags[i] == tag)
			{
				tags[i] = tags[length-1];
				tags[length-1] = undefined;
				tags.length--;
			}
		}
	}

	function isInclude(tag){
		/*
		 *效果说明:
		 *判断标签是否被标签集合包含
		 */
		var length = tags.length;

		for(let i=0;i<length;i++)
		{
			if(tags[i] == tag)
			{
				return true;
			}
		}

		return false;
	}

	function GetTagAtN(i){
		return tags[i];
	}

	function isIncludeTagGroup(tag_group){
		/*
		 *效果说明:
		 *判断标签集合是否完全包含另一个标签集合
		 */

		var length = tag_group.GetNumber();

		for(let i=0;i<length;i++){
			if(isInclude(tag_group.GetTagAtN(i)) == false){
				return false;
			}
		}

		return true;
	}

	return {
    GetTags : GetTags,
		GetNumber : GetNumber,
    AddTag : AddTag,
		DeleteTag : DeleteTag,
		isInclude : isInclude,
		GetTagAtN : GetTagAtN,
		isIncludeTagGroup : isIncludeTagGroup
	}
}
