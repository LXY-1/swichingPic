const swichingPic = (function () {
    let slideContainer = document.getElementById('slide-container');
    let slideItems = document.getElementsByClassName('slide-item');
    let bigPic = document.getElementById('big-pic').getElementsByTagName('img')[0];
    let leftMove = document.getElementById('left-arrow');
    let rightMove = document.getElementById('right-arrow');
    let imgs = ['./imgs/p1.png', './imgs/p2.png', './imgs/p3.png', './imgs/p4.png', './imgs/p5.jpg',
        './imgs/p6.jpg'
    ];
    let moveSize = -235;
    let activeNum = 1;
    let isEnd = false; // 判断是否到达最后一张图片
    let isFirst = false; // 判断是否是只剩下第一张图
    let isFirstRight = true;

    return function () {
        /**
         * @description: 左右移动控制:transform,index,判断边界
         * @param {type} direction:方向
         * @return: 
         */
        function slidePic(direction) {
            if (isEnd) {
                //恢复
                moveSize = -235;
                slideContainer.style.transform = `translate(${moveSize}px, 0px)`;
                isEnd = false;
                return;
            }
            // 右边划到了剩下最后一张图
            if (isFirst) {
                //恢复,同时第一次点击右边变量变为true
                moveSize = -235;
                slideContainer.style.transform = `translate(${moveSize}px, 0px)`;
                isFirst = false;
                isFirstRight = true;
                return;

            }
            let step = direction === 'left' ? -235 : 235;
            moveSize += step;
            slideContainer.style.transform = `translate(${moveSize}px, 0px)`;
            console.log(slideContainer.style.transform);


        }

        /**
         * @description: 控制索引的改变:当前状态的索引只有一个
         * @param {type} direction：方向
         * @return: 
         */
        function changeInd(direction) {
            // 点击右边箭头的时候：3 2 1 0 之后恢复又是1是怎么显示的：
            if (activeNum === 1 && direction === 'right' && isFirstRight) {
                activeNum = slideItems.length - 3;
                isFirstRight = false;
                return;
            }
            let step = direction === 'left' ? 1 : -1;
            if (activeNum === 5) {
                activeNum = 1;
                isEnd = true;
                console.log(activeNum);

                return false;
            }
            if (activeNum === 0) {
                activeNum = 1;
                isFirst = true;
                return;
            }
            activeNum += step;
            console.log(activeNum);

        }

        /**
         * @description: 给对应的图片加上active类:索引
         * @param {type} 
         * @return: 
         */
        function addActive(direction) {
            if (isEnd) {
                slideItems[slideItems.length - 1].className = slideItems[slideItems.length - 1].className.replace(
                    new RegExp(
                        "(\\s|^)active(\\s|$)"), " ");
                slideItems[activeNum].className = slideItems[activeNum].className + ' active';
                return;
            }
            if (isFirst) {
                slideItems[0].className = slideItems[0].className.replace(new RegExp(
                    "(\\s|^)active(\\s|$)"), " ");
                slideItems[1].className = slideItems[1].className + ' active';
                return;
            }
            if (activeNum === 3 && direction === 'right') {
                slideItems[1].className = slideItems[1].className.replace(new RegExp(
                    "(\\s|^)active(\\s|$)"), " ");
                slideItems[activeNum].className = slideItems[activeNum].className + ' active';
                return;
            }
            let lastInd = direction === 'left' ? activeNum - 1 : activeNum + 1;
            slideItems[lastInd].className = slideItems[lastInd].className.replace(new RegExp("(\\s|^)active(\\s|$)"),
                " ");
            slideItems[activeNum].className = slideItems[activeNum].className + ' active';

        }

        /**
         * @description:显示第一张图片 
         * @param {type} 
         * @return: 
         */
        function showBigPic() {
            let imgsrc = imgs[activeNum];
            bigPic.setAttribute('src', imgsrc);
        }




        //点击左箭头
        leftMove.onclick = function () {
            changeInd('left'); //改变索引同时判断是否是到达最好一张图片
            addActive('left');
            showBigPic();
            slidePic('left');

        }

        //点击右箭头
        rightMove.onclick = function () {
            changeInd('right'); //改变索引同时判断是否是到达最好一张图片
            addActive('right');
            showBigPic();
            slidePic('right');

        }

        for (let i = 0; i < slideItems.length; i++) {
            slideItems[i].onclick = function () {
                this.index = i;
                toggle(i);
            }
        }

        function toggle(ind) {
            for (let i = 0; i < slideItems.length; i++) {
                slideItems[i].className = slideItems[i].className.replace(new RegExp(
                    "(\\s|^)active(\\s|$)"), " ");
            }
            slideItems[ind].className = slideItems[ind].className + ' active';
            // 移动次数
            let len = ind - activeNum;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    changeInd('left'); //改变索引同时判断是否是到达最好一张图片
                    addActive('left');
                    showBigPic();
                    slidePic('left');
                }
            } else if (len < 0) {
                len = Math.abs(len);
                for (let i = 0; i < len; i++) {
                    changeInd('right'); //改变索引同时判断是否是到达最好一张图片
                    addActive('right');
                    showBigPic();
                    slidePic('right');
                }
            }



        }
    }


})()