/*
 * @Author: Alan.zheng 
 * @Date: 2019-09-03 10:40:12 
 * @Last Modified by: Alan.zheng
 * @Last Modified time: 2019-09-03 15:37:53
 */


var vueApp = new Vue({
    el:'#app',
    data:{
        page:1,
        msgShow:false,
        shareShow:false,
        choseGender: 'male',
        match: ['hat', 'hair', 'eye', 'jacket', 'pants', 'shoes', 'object'],
        gender:{
            male:{
                eye: []
            },
            female:{
                 eye: []
            }

        }
    },
    methods:{
        changePage(num){
            this.page = num;
        },
        generate(){
            // 生成套装
            
        },
        prevSuit(){
            // 返回
            
        },
        changeGender(){
            // 修改性别
            var choseGender = this.choseGender;
            if (choseGender == 'male') {
                this.choseGender = 'female';
            }else {
                this.choseGender = 'male';
            }
        }
    }
});