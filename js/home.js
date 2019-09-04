/*
 * @Author: Alan.zheng 
 * @Date: 2019-09-03 10:40:12 
 * @Last Modified by: Alan.zheng
 * @Last Modified time: 2019-09-04 15:42:29
 */


var vueApp = new Vue({
    el: '#app',
    data: {
        page: 1,
        msgShow: false,
        shareShow: false,
        navShow: true,
        choseGender: 'male',
        match: ['hat', 'hair', 'eye', 'jacket', 'pants', 'shoes', 'object'],
        gender: {
            male: {
                hat: {
                    name:'hat',
                    length:14,
                    chose: 0,
                },
                hair: {
                    name: 'hair',
                    length: 7,
                    chose: 0,
                },
                eye: {
                    name: 'eye',
                    length: 9,
                    chose: 0,
                },
                jacket: {
                    name: 'jacket',
                    length: 20,
                    chose: 0,
                },
                pants: {
                    name: 'pants',
                    length: 13,
                    chose: 0,
                },
                shoes: {
                    name: 'shoes',
                    length: 10,
                    chose: 0,
                },
                object: {
                    name: 'object',
                    length: 14,
                    chose: 0,
                },
            },
            female: {
                hat: {
                    name: 'hat',
                    length: 14,
                    chose: 0,
                },
                hair: {
                    name: 'hair',
                    length: 7,
                    chose: 0,
                },
                eye: {
                    name: 'eye',
                    length: 9,
                    chose: 0,
                },
                jacket: {
                    name: 'jacket',
                    length: 10,
                    chose: 0,
                },
                pants: {
                    name: 'pants',
                    length: 14,
                    chose: 0,
                },
                shoes: {
                    name: 'shoes',
                    length: 12,
                    chose: 0,
                },
                object: {
                    name: 'object',
                    length: 14,
                    chose: 0,
                },
            }

        },
        matchChose:'hat',
        genderChose: 0,
    },
    methods: {
        changePage(num) {
            this.page = num;
        },
        generate() {
            // 生成套装
            
        },
        prevSuit() {
            // 返回

        },
        changeGender() {
            // 修改性别
            var choseGender = this.choseGender;
            if (choseGender == 'male') {
                this.choseGender = 'female';
            } else {
                this.choseGender = 'male';
            }
        },
        backDressStyle() {
            // 返回上一级
            this.navShow = true;
        },
        dressStyle(type) {
            // 选择装饰类别
            console.log(type);
            this.navShow = false;
            this.matchChose = type;
        },
        dressUp(num) {
            // 选择装饰
            console.log(num);
            this.genderChose = num;
            this.gender[this.choseGender][this.matchChose].chose = num;

        }

    }
});