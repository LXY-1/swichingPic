- 轮播这种：以后考虑把左右移动的逻辑分成两个模块，左移动函数与右移动函数，方便维护，因为其实如果只是通过方向来弄的话，
最后函数可能会比较的复杂，最主要的是左右切换的索引的变化不同，以及存在临界状态有几个，如果只是通过一个方向来判断写到一个函数里面
不好维护。
- 当然也有一些唯一的状态标识：当前显示图片的索引，但是要做到不管怎么切换：移动后显示与对应索引是一致的，所以左右的移动分别写成两个函数应该更方便维护。
- 还有对于唯一标识最好不要弄成有两种情况，否则后面会出现各种问题，比如这里唯一显示标识：在左右切换确实不一样的。如果一直是第一个位置也就是索引是的时候显示，那就比较好写，不会怎么乱。