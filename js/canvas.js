nie.define('Role', function() {
    var rem = document.documentElement.clientWidth / 375 * 312.5* 16 / 100;
    const W = 7.5 *  rem;
    const H = 13.34 * rem;

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let canvas2 = document.getElementById('canvas2');
    let context2 = canvas2.getContext('2d');

    const W1 = 7.5 *  rem;
    const H1 = 7.5 * rem;
    let canvas1 = document.getElementById('canvas1');
    let context1 = canvas1.getContext('2d');

    function Role(opts){
        this.init(opts);
    }
    Role.prototype = {
        constructor : Role,
        init : function(opts){
            this.opts = opts;
            this.isFinish = true;
            this.callback = function(){}
            this.render();
            this.bind();
            this.sync();
        },
        render : function(){
            canvas.style.width = W + 'px'
            canvas.style.height = H + 'px'
            canvas.width = W * 2;
            canvas.height = H * 2;
            // canvas.height = 0;
            // canvas.style.height = 0

            canvas1.style.width = W1 + 'px'
            canvas1.style.height = H1 + 'px'
            canvas1.width = W1 * 2;
            canvas1.height = H1 * 2;

            canvas2.style.width = W + 'px'
            canvas2.style.height = H + 'px'
            canvas2.width = W * 2;
            canvas2.height = H * 2;
        },
        bind : function(){

        },
        sync : function(){
        },
        draw : function(data,cb){
            let self = this;
            if(!data){
                data = self.data;
            }
            self.data = data;
            self.callback = cb || function(){};
            let src = '',
                body = data.body;
            if(data && self.isFinish){
                self.isFinish = false;
                self._tempData = data;//临时记录数据，只做查询
                self._dataLenth = 0;//记录数据长度
                self._loadedResult = [];//加载结果长度
                // 保证draw的顺序
                self._confirmData(data);


                for(let i in data){
                    if(data[i]){
                        if(body == 'female' && ['body','hair','jacket','pants','shoes'].indexOf(i) != -1){
                            src = './data/female'+ i + '/'+data[i]+'.png'
                        }else if(body == 'male' && ['body','hair','jacket','pants','shoes'].indexOf(i) != -1){
                            src = './data/male'+ i + '/'+data[i]+'.png'
                        }else{
                            src = './data/'+ i + '/'+data[i]+'.png'
                        }
                        self.getImage(src,i);
                    }else{
                        self._loadedResult.push(i)
                    }
                }
            }
        },
        getImage : function(src,type){
            let self = this;

            var imgnode = document.createElement('img');
            imgnode.crossOrigin = "anonymous";
            imgnode.className = '_temp_img target_'+type;
            imgnode.src = src;
            imgnode.onload =  function(){
                // self.drawImage(this);
                // $(this).remove();
                self.imageLoaded(type);
            }
            imgnode.onerror =  function(){
                self.imageLoaded(type);
            }
            $('#Wrap').append(imgnode);
        },
        drawImage : function(img){
            var error =-1 * document.documentElement.clientWidth / 375 * 312.5 * 16 * .7 / 100;
            var error1 = document.documentElement.clientWidth / 375 * 312.5 * 16 * 4 / 100;
            var _a = document.documentElement.clientWidth / 375
            if(img){
                context.save();
                context1.save();
                context2.save();
                try{
                     context.drawImage(img,0,0,img.clientWidth,img.clientHeight,(W - img.clientWidth * _a/2),(H - img.clientHeight * _a/2) + error,img.clientWidth * _a,img.clientHeight * _a);
                    context1.drawImage(img,0,0,img.clientWidth,img.clientHeight,(W1 - img.clientWidth * _a/2),(H1 - img.clientHeight * _a/2) + error1,img.clientWidth * _a,img.clientHeight * _a);
                    context2.drawImage(img,0,0,img.clientWidth,img.clientHeight,(W - img.clientWidth * _a/2),(H - img.clientHeight * _a/2) + error,img.clientWidth * _a,img.clientHeight * _a);
                }catch(e){
                    console.log(e);
                }
                context.restore();
                context1.restore();
                context2.restore();
            }
        },
        imageLoaded : function(type){
            let self = this;

            self._loadedResult.push(type);
            // 全部加载完毕
            if(self._loadedResult.length == self._dataLenth){
                self.clear && context.clearRect(0,0,W*2,H*2);
                self.clear && context1.clearRect(0,0,W*2,H*2);
                self.clear && context2.clearRect(0,0,W*2,H*2);
                self._drawBg(function(){
                    self._drawAll();
                });
            }
        },
        _confirmData : function(data){
            let self = this;

            for(let i in data){
                self._dataLenth ++;
            }
        },
        _drawAll : function(){
            let self = this,
                node = null;


            // for(let i in self._tempData){
            //     if(self._tempData[i]){
            //         node = document.getElementsByClassName('target_'+i)[0];
            //         self.drawImage(node);
            //         $(node).remove();
            //     }
            //     if(i == 'object'){
            //         setTimeout(function(){
            //             self.callback.call(self);
            //         },200);
            //     }
            // }

            self._draw('body');

            if(self._tempData.pants != 'femalepants3' && self._tempData.pants != 'femalepants5' && self._tempData.pants != 'malepants3' && self._tempData.pants != 'malepants5' ){
                self._draw('pants');
                self._draw('shoes');
                self._draw('jacket');
            }else{
                self._draw('jacket');
                self._draw('shoes');
                self._draw('pants');
            }
            self._draw('eye');
            self._draw('hair');
            self._draw('hat');
            self._draw('object');

            self.isFinish = true;
            self.clear = true;
        },
        _draw : function(part){
            let node = null;
            let self = this;

            node = document.getElementsByClassName('target_'+part)[0];

            self.drawImage(node);
            $(node).remove();
            console.log(part);
            if(part == 'object'){
                setTimeout(function(){
                    self.callback.call(self);
                },200);
            }
        },
        _drawBg : function(cb){
            context1.fillStyle = '#FFFFFF';
            context1.fillRect(0,0,W1*2,H1*2);
            let self = this;
            var imgnode = document.createElement('img');
            imgnode.crossOrigin = "anonymous";
            imgnode.className = '_temp_img bg';
            imgnode.src = './data/bg.jpg';
            imgnode.onload =  function(){
                var _a = document.documentElement.clientWidth / 375
                context2.save();
                context2.drawImage(this,0,0,this.clientWidth,this.clientHeight,(W - this.clientWidth*_a/2),(H - this.clientHeight*_a/2),this.clientWidth*_a,this.clientHeight*_a);
                context2.restore();
                cb()
                $(this).remove();
            }
            $('#Wrap').append(imgnode);
        },
        drawBg : function(src,cb){
            let self = this;
            // self.callback = cb || function(){};

            var imgnode = document.createElement('img');
            imgnode.crossOrigin = "anonymous";
            imgnode.className = '_temp_img bg';
            imgnode.src = src;
            imgnode.onload =  function(){
                var _a = document.documentElement.clientWidth / 375
                context.save();
                context.drawImage(this,0,0,this.clientWidth,this.clientHeight,(W - this.clientWidth*_a/2),(H - this.clientHeight*_a/2),this.clientWidth*_a,this.clientHeight*_a);
                context.restore();
                self.clear = false;
                self.draw(undefined,cb);
                $(this).remove();
            }
            imgnode.onerror =  function(){
            }
            $('#Wrap').append(imgnode);
        },
        save : function(q){
            return canvas2.toDataURL('image/jpeg', q||0.8)
        },
        savehead : function(q){
            return canvas1.toDataURL('image/jpeg', q||0.8)
        }
    }

    return new Role();

});
