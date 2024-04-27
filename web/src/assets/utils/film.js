let url = "https://search.bilibili.com/all?keyword=";

export default {
    load:function(){
        let filmInfos;
        let filmNames;
        let filmPlays;
        // this.addFilm();
        filmPlays = document.getElementsByClassName("play");
        filmInfos = document.getElementsByClassName("information");
        filmNames = document.getElementsByClassName("filmName");
    
        for (let i = 0; i < filmInfos.length; i++) {
            filmInfos[i].title = filmNames[i].innerText;
            filmPlays[i].addEventListener("click",  ()=> {
                                              this.request(filmNames[i].innerText);
                                          });
        }
        // displayOfCutIn(document.getElementsByClassName("filmCol"),1);
    }
    ,
    request:function(filmName) {
        window.open(encodeURI(url + filmName.substr(2)), "播放器", "toolbar=no,menubar=no,scrollbars=no,resizeable=yes,status=no,location=no,titlebar=no", false);
    }
    ,
    addFilm: function () {
        let filmPlay = "<button class='play'>播放</button>";
        let filmName = "哆啦A梦：大雄的平行西游记";
        let filmPhoto = "src/assets/img/jp_journey_west.jpg";
        let filmIntroduce = "为了在新生欢迎会上表演话剧《西游记》，大雄班级举行的话剧的排练。大雄想当孙悟空，可是却只是村人甲。为了证明自己最像孙悟空，大雄用航时机来到中国唐朝，想见孙悟空，而且真的见到了“孙悟空”。后来大雄以哆啦A梦的道具为赌注，证明孙悟空很像 大雄。大雄与他的朋友来到唐朝，却没有见到孙悟空。因此大雄用哆啦A梦的模拟游戏机假扮孙悟空，最后被识破。由于没有关好机器，游戏里的妖怪从游戏机里跑了出来。妖怪最后统治了世界，大雄他们也面临危险。 为了恢复历史，拯救玄奘法师，大雄、静香、小夫和刚田武假扮孙悟空等角色来保护玄奘法师，踏上了冒险之旅";
        let element = '<div class="col-xl-3 offset-xl-0 col-lg-3 offset-lg-1 col-md-4 col-sm-6 col-12 filmCol"><div class="film" style=""><img class="img-fluid" src=' + filmPhoto + '><div class="information"><h5 class="font-weight-bold filmName">' + filmPlay + filmName + '</h5><p class="introduce">' + filmIntroduce + '</p></div></div></div>';
        let filmCol = document.querySelector("div.filmCol:last-child");
        filmCol.insertAdjacentHTML("afterend", element)
    }
}