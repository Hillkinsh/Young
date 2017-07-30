let All = [
	{//都是发布的数据
     anonAvatar:'', //匿名头像
     avatar: "http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/c8eade634069fbd980b8c6eeca8637be.png",
     commentArray:[{   //评论列表
          avatar:'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/26/2c2a633e403a53da80872fa972d64410.png',
          comment_content:'楼主说的对啊',
          nickName:'大毛',
          userID:'1223442',
        },{
          avatar:'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/26/dee1a9f3401c179780a1f6cf62791c83.png',
          comment_content:'大师兄说的对啊',
          nickName:'二毛',
          userID:'1223443',
      },{
          avatar:'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/26/8c95b16a4061fa0880992bfa10a440e3.png',
          comment_content:'二师兄说的也对啊！！！',
          nickName:'三毛',
          userID:'1223444',
      }],
      comment_count: 3,
      content: "东食堂的西瓜明显比西食堂的好吃啊。就是饭菜太难吃了，啥时候能把这些人全开了啊，换一批人换换口味。",//吐槽内容
      flowerName:'',//匿名者花名
      is_anony:false,
      likeArray:[],//只保存userID就好。
      like_count: 0,
      nickName: "gakki",
      picture: [],//吐槽配图.保存成对象格式便于解析{url:'dede'}
      rid: "5549630644",//吐槽ID
      time: "6/29/18/37",//吐槽发布时间
      university: "MIT",
      userID: 123456789000

    },{//都是发布的数据
      rid: "5641263159",//吐槽ID
      
      content: "天热天热，出去骑车兜兜风",//吐槽内容
      picture: [{url:"http://bmob-cdn-11557.b0.upaiyun.com/2017/06/29/5b02068a4020afb8801b7b9d25009738.png"},
	  {url:"http://bmob-cdn-11557.b0.upaiyun.com/2017/06/29/5b02068a4020afb8801b7b9d25009738.png"},
	  {url:"http://bmob-cdn-11557.b0.upaiyun.com/2017/06/29/5b02068a4020afb8801b7b9d25009738.png"}],//吐槽配图.保存成对象格式便于解析{url:'dede'}
      time: "6/29/8/43",//吐槽发布时间
      like_count: 1,
      likeArray:[{userID:'111222333'}],//只保存userID就好。
	comment_count: 2,
      commentArray:[{   //评论列表
        userID:'1223442',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      },{userID:'1223443',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      }
      ],
	  
	  is_anony:false,
      anonAvatar:'', //匿名头像
      flowerName:'',//匿名者花名
	  
      userID: '123456789000',
      avatar: "http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/787861024044d02d8022bbfab3456651.png",
      nickName: "小明",
      university: "MIT",
      
    },{//都是发布的数据
      rid: "1980004218",//吐槽ID
      
      content: 'asdafasfadf',//吐槽内容
      picture: [{url:"http://bmob-cdn-11557.b0.upaiyun.com/2017/06/29/5b02068a4020afb8801b7b9d25009738.png"}],//吐槽配图.保存成对象格式便于解析{url:'dede'}
      time: "6/29/8/43",//吐槽发布时间
      like_count: 10,
      likeArray:[{userID:'111222333'}],//只保存userID就好。
	comment_count: 2,
      commentArray:[{   //评论列表
        userID:'1223442',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      },{userID:'1223443',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      }
      ],
	  
	  is_anony:false,
      anonAvatar:'', //匿名头像
      flowerName:'',//匿名者花名
	  
      userID: '123456789000',
      avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/1bce73d74053723680519e5b346e410b.png',
      nickName: "图样0001",
      university: "MIT",
      
    },{//都是发布的数据
      rid: "1980004218",//吐槽ID
      
      content: '明天考信号估值！！！（还完全没有看啊',//吐槽内容
      picture: [{url:"http://bmob-cdn-11557.b0.upaiyun.com/2017/06/29/5b02068a4020afb8801b7b9d25009738.png"}],//吐槽配图.保存成对象格式便于解析{url:'dede'}
      time: "6/29/8/43",//吐槽发布时间
      like_count: 1,
      likeArray:[{userID:'111222333'}],//只保存userID就好。
	comment_count: 2,
      commentArray:[{   //评论列表
        userID:'1223442',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      },{userID:'1223443',
        nickName:'',
        avatar:'',
        comment_content:'ewfewfwefe'
      }],
     is_anony:false,
      anonAvatar:'', //匿名头像
      flowerName:'',//匿名者花名
	  
      userID: '123456789000',
      avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/5f4c96d8407eabac804f91c7bdb5f33d.png',
      nickName: "小明",
      university: "MIT",
      
    }
   ]

    module.exports = {
        roastData:All
    }