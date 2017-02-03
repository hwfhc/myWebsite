function TagGroup(TAGS){
	/*
	 *效果说明:
	 *存储所有选择的标签
	 *
	 *参数说明：
	 *初始化的标签数组
	 */
	var tags = [];

	for(let i=0;i<TAGS.length;i++){
		tags[i] = TAGS[i];
	}

	function GetTags(){
		/*
		 *效果说明：
		 *将所有标签以数组形式输出
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

	function isIncludeTagGroup(tag_group){
		/*
		 *效果说明:
		 *判断标签集合是否完全包含另一个标签集合
		 *参数：
		 *另一个TagGroup
		 *返回值：
		 *true:本集合完全包含另一集合
		 *false:~~~
		 */

		var Another_tags = tag_group.GetTags();
		var length = Another_tags.length;

		for(let i=0;i<length;i++){
			if(isInclude(Another_tags[i]) == false){
				return false;
			}
		}

		return true;

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
	}

	return {
       	GetTags : GetTags,
				AddTag : AddTag,
				DeleteTag : DeleteTag,
				isIncludeTagGroup : isIncludeTagGroup
	}
}
