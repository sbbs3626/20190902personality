nie.define('Index',function(){
    const ds = nie.require('ds');
    const Role = nie.require('Role');
    var tick =document.getElementById('tick');
    function Index(opts){
        this.init(opts);
    }
    Index.prototype = {
        constructor : Index,
        init : function(opts){
            this.curpage = 1;
            this.opts = opts;
            this.render();
            this.bind();
            this.sync();
        },
        render : function(){

        },
        showPage : function(index){
            index = index || this.curpage;
            this.curpage = index;
            $('.page').removeClass('show')
            $('.page.page'+index).addClass('show')
        },
        bind : function(){
            let self = this;
            $('.J_start').click(function(){
                tick.play();
                self.showPage(2)
            });

            $('.J_back1').click(function(){
                tick.play();
                $('.J_display').removeClass('show');
                self.showPage(2)
                Role.callback = function(){}
            });

            $('.J_back2').click(function(){
                tick.play();
                self.showPage(3)
            });

            $('.J_back0').click(function(){
                tick.play();
                $('.J_menu').addClass('show')
                $('.J_list').removeClass('show')
                self.showPage(1)
            });

            $('.J_menu,.J_list').on('touchmove',function(event){
                event.stopPropagation();
            });

            $('.J_menu').click(function(event){
                if($(event.target.parentNode).hasClass('item')){
                    tick.play();
                    let type = event.target.parentNode.className.replace(/item /ig,'');
                    $('.J_menu').removeClass('show');
                    $('.J_list').addClass('show');
                    $('.J_list li').hide();
                    if($('.J_list').find('.'+type+'[data-for='+ds.get('body')+']').length){
                        $('.J_list').find('.'+type+'[data-for='+ds.get('body')+']').show()
                    }else{
                        $('.J_list').find('.'+type).show()
                    }
                }
            });

            $('.J_list').click(function(event){
                if($(event.target).hasClass('icon') && !$(event.target).hasClass('cur')){
                    let name = event.target.className.replace(/icon /ig,'');
                    let type = event.target.parentNode.className;
                    ds.set(type,name);
                    Role.draw(ds.data);
                    $(event.target).siblings().removeClass('cur');
                    $(event.target).addClass('cur');
                    tick.play();
                }else if($(event.target).hasClass('close')){
                    $(event.target.parentNode).find('li').hide();
                    $('.J_menu').addClass('show')
                    $('.J_list').removeClass('show')
                    tick.play();
                }
            });
            $('body').on('touchmove',function(event){
                event.preventDefault();
            })
            $('.J_sex').click(function(event){
                if(ds.get('body') === 'male'){
                    ds.set('body','female')
                }else{
                    ds.set('body','male')
                }
                Role.draw(ds.data);

                $('.J_list').find('.hat .icon').removeClass('cur');
                if(ds.data.hat){
                    $('.J_list').find('.hat .icon.'+ds.data.hat).addClass('cur');
                }
                $('.J_list').find('.eye .icon').removeClass('cur');
                $('.J_list').find('.eye .icon.'+ds.data.eye).addClass('cur');

                $('.J_list').find('.object .icon').removeClass('cur');
                $('.J_list').find('.object .icon.'+ds.data.object).addClass('cur');

                $('.J_menu').addClass('show')
                $('.J_list').removeClass('show')
                tick.play();
            });

            $('.J_save').click(function(){
                tick.play();
                console.log('finish');
                self.showPage(3);
                $('.J_display').attr('src',Role.save()).addClass('show');
                Role.callback = function(){}
            });
            $('.J_head').click(function(){
                tick.play();
                self.showPage(4);
                $('.J_head_display').attr('src',Role.savehead());
            });

            $('.J_share').click(function(){
                // mbshare.showShare();
            });
        },
        sync : function(){
            this.showPage();
            Role.draw(ds.data);
        }
    }


    var imgLoader = {

        _srcs: [],
        _onLoaded: null,
        _onLoading: null,

        load: function() {

            var srcs = this._srcs,
                l = srcs.length,
                loadCount = 0,
                that = this,
                tmp,
                i;

            function onImgLoad() {
                if (++loadCount === l) {
                    that._onLoaded && that._onLoaded();
                } else {
                    that._onLoading && that._onLoading(Math.floor(loadCount / l * 100));
                }
            }

            if (!l) {
                that._onLoaded && that._onLoaded();
                return this;
            }

            for (i = l; i--;) {
                tmp = new Image();
                tmp.src = srcs[i];
                tmp.onload = onImgLoad;
            }

            return this;
        },

        init: function(arrSrcs, onLoaded, onLoading) {

            this._srcs = arrSrcs.slice(0);
            this._onLoaded = onLoaded;
            this._onLoading = onLoading;

            return this;
        }
    };

    //加载img的所有图片列表

    var loadList = ["../images/back-ico_c313038.png","../images/back_eca03ce.png","../images/bg_9c2c9a4.jpg","../images/bg1_c4060ab.jpg","../images/bg2_0f8b543.jpg","../images/clothes_215379d.png","../images/content-pannel_4498d67.png","../images/eye-active_08313cd.png","../images/eye_7c0e93a.png","../images/eye/eye1_b9ccb84.png","../images/eye/eye2_271a151.png","../images/eye/eye3_5a194be.png","../images/eye/eye4_c63b7f7.png","../images/eye/eye5_6832402.png","../images/eye/eye6_11daccb.png","../images/eye/eye7_fd0bb11.png","../images/eye/eye8_d137f74.png","../images/eye/eye9_5cfcc7e.png","../images/femalehair/femalehair1_18f0f56.png","../images/femalehair/femalehair2_1adddf6.png","../images/femalehair/femalehair3_135481a.png","../images/femalehair/femalehair4_3c9514c.png","../images/femalehair/femalehair5_2dda2ff.png","../images/femalehair/femalehair6_58065df.png","../images/femalehair/femalehair7_203389d.png","../images/femalejacket/femalejacket10_98fde8a.png","../images/femalejacket/femalejacket11_37983e2.png","../images/femalejacket/femalejacket12_7bb8d50.png","../images/femalejacket/femalejacket13_28af254.png","../images/femalejacket/femalejacket14_a8d35b4.png","../images/femalejacket/femalejacket15_57b1643.png","../images/femalejacket/femalejacket16_b37fabd.png","../images/femalejacket/femalejacket17_93e5c69.png","../images/femalejacket/femalejacket18_11efd43.png","../images/femalejacket/femalejacket19_a05efd7.png","../images/femalejacket/femalejacket2_81678de.png","../images/femalejacket/femalejacket3_b356c7d.png","../images/femalejacket/femalejacket4_8151145.png","../images/femalejacket/femalejacket5_d8fe274.png","../images/femalejacket/femalejacket6_c6c3deb.png","../images/femalejacket/femalejacket7_bf57651.png","../images/femalejacket/femalejacket8_f0bf60e.png","../images/femalejacket/femalejacket9_43323dd.png","../images/femalepants/femalepants10_a90493f.png","../images/femalepants/femalepants11_859ac78.png","../images/femalepants/femalepants12_e6e4fec.png","../images/femalepants/femalepants13_afd62df.png","../images/femalepants/femalepants14_dc63433.png","../images/femalepants/femalepants15_00587bb.png","../images/femalepants/femalepants2_ca8b6ef.png","../images/femalepants/femalepants3_c8f005f.png","../images/femalepants/femalepants4_b7cee9f.png","../images/femalepants/femalepants5_4ccb630.png","../images/femalepants/femalepants6_68c0da9.png","../images/femalepants/femalepants7_77b0c23.png","../images/femalepants/femalepants8_384ee22.png","../images/femalepants/femalepants9_4ba6400.png","../images/femaleshoes/femaleshoes1_933199c.png","../images/femaleshoes/femaleshoes10_5c2757e.png","../images/femaleshoes/femaleshoes11_e4a7a65.png","../images/femaleshoes/femaleshoes2_9213de9.png","../images/femaleshoes/femaleshoes3_329a250.png","../images/femaleshoes/femaleshoes4_9ed041b.png","../images/femaleshoes/femaleshoes5_81a14aa.png","../images/femaleshoes/femaleshoes6_b134bcb.png","../images/femaleshoes/femaleshoes7_68c79f5.png","../images/femaleshoes/femaleshoes8_0447bf9.png","../images/femaleshoes/femaleshoes9_96152c9.png","../images/go_a460e95.png","../images/hair-active_9a76a5d.png","../images/hair_0134c1a.png","../images/hat-active_f194fbd.png","../images/hat_8f05f6d.png","../images/hat/hat1_53dd482.png","../images/hat/hat10_99ee12a.png","../images/hat/hat11_fb01b04.png","../images/hat/hat12_476cdac.png","../images/hat/hat13_b907233.png","../images/hat/hat14_cdb7356.png","../images/hat/hat2_261a375.png","../images/hat/hat3_56d8e67.png","../images/hat/hat4_4140814.png","../images/hat/hat5_e5bfe7e.png","../images/hat/hat6_efec019.png","../images/hat/hat7_a882e1b.png","../images/hat/hat8_996d9c3.png","../images/hat/hat9_6b4d73a.png","../images/head_02e5dc4.png","../images/jacket-active_8d9c573.png","../images/jacket_c1281b7.png","../images/loading_8d8514f.gif","../images/malehair/malehair1_23389b9.png","../images/malehair/malehair2_8d11ba5.png","../images/malehair/malehair3_3a1fe53.png","../images/malehair/malehair4_acbcbf2.png","../images/malehair/malehair5_a0c289e.png","../images/malehair/malehair6_85bf0f0.png","../images/malehair/malehair7_b4f0e5e.png","../images/malejacket/malejacket10_7fcfcc7.png","../images/malejacket/malejacket11_bace587.png","../images/malejacket/malejacket12_9af818f.png","../images/malejacket/malejacket13_dce0191.png","../images/malejacket/malejacket14_38eac65.png","../images/malejacket/malejacket15_aa49f8d.png","../images/malejacket/malejacket16_0ebc9cf.png","../images/malejacket/malejacket17_cee1ed7.png","../images/malejacket/malejacket18_2242405.png","../images/malejacket/malejacket19_28d8e22.png","../images/malejacket/malejacket2_bff8a7c.png","../images/malejacket/malejacket20_08930db.png","../images/malejacket/malejacket3_f0e9a96.png","../images/malejacket/malejacket4_55f3f7d.png","../images/malejacket/malejacket5_1c9d1b9.png","../images/malejacket/malejacket6_27c3066.png","../images/malejacket/malejacket7_6636961.png","../images/malejacket/malejacket8_9f335c9.png","../images/malejacket/malejacket9_3259afd.png","../images/malepants/malepants10_6c359b5.png","../images/malepants/malepants11_ec95659.png","../images/malepants/malepants12_6f336e9.png","../images/malepants/malepants13_937dbcf.png","../images/malepants/malepants14_16375d2.png","../images/malepants/malepants2_5f9c904.png","../images/malepants/malepants3_bb41aa0.png","../images/malepants/malepants4_c4f5d34.png","../images/malepants/malepants5_f8199c8.png","../images/malepants/malepants6_67ebf9f.png","../images/malepants/malepants7_8425b7c.png","../images/malepants/malepants8_3697e74.png","../images/malepants/malepants9_db891d7.png","../images/maleshoes/maleshoes1_fbcd790.png","../images/maleshoes/maleshoes10_32d33c0.png","../images/maleshoes/maleshoes2_cd0aece.png","../images/maleshoes/maleshoes3_335da48.png","../images/maleshoes/maleshoes4_57d9ebd.png","../images/maleshoes/maleshoes5_4e101c7.png","../images/maleshoes/maleshoes6_2f3f406.png","../images/maleshoes/maleshoes7_6485bf9.png","../images/maleshoes/maleshoes8_e4a7a65.png","../images/maleshoes/maleshoes9_4002fc0.png","../images/nav-mask_c0a0c6b.png","../images/nav-mask1_0a1f034.png","../images/next_85765ba.png","../images/object-active_275d03d.png","../images/object_925229e.png","../images/object/object10_bd8542d.png","../images/object/object11_81ddd04.png","../images/object/object12_48cc0ec.png","../images/object/object13_778bda8.png","../images/object/object14_fff5a22.png","../images/object/object15_d82becc.png","../images/object/object2_bd87900.png","../images/object/object3_57c79d5.png","../images/object/object4_626b004.png","../images/object/object5_97df6e5.png","../images/object/object6_0270cb1.png","../images/object/object7_48ba9a9.png","../images/object/object8_5c08537.png","../images/object/object9_1a8ced0.png","../images/pants-active_cb5c3b5.png","../images/pants_fbebcec.png","../images/save_9cf88ee.png","../images/share-pic_f881f85.png","../images/share_cb91900.png","../images/shoes-active_792699b.png","../images/shoes_ea71540.png","../images/start-btn_50448b3.png"];
    var Loadmark = $('#LoadingMark');
    imgLoader.init(loadList, function() {
        new Index();
        setTimeout(function(){
            Loadmark.addClass('remove');
        },2000);
    },function(percent){
        // Loadmark.find('.value').text(percent + '%')
        // Loadmark.find('i').width(percent + '%')
    }).load();
});
