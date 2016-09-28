// vendor
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';

// setting
import setting from '../setting';

// https://developer.github.com/v3/repos/#get
const LIST_API_URL = `https://api.github.com/repos/${setting.config.repo}/contents/${setting.config.path}?ref=${setting.config.branch}`;


let store = new EventEmitter();


export default store;

/**
 * fetch post content from github
 *
 * @param title
 * @returns {Promise}
 */
store.getPost = (title) => {

    const POST_API_URL = setting.config.feed;

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${POST_API_URL}`, false);
        // https://developer.github.com/v3/media/#html
        xhr.setRequestHeader("Accept", "application/vnd.github.v3.html");
        xhr.onload = () => {
            const resText = xhr.responseText;

            var postkey = title;
            var js = JSON.parse(resText);
            var post = store.getObjects(js,'slug',postkey);
            console.dir(post);

            var dataObj = {
                title: post.current.title,
                excerpt: post.current.excerpt,
                content: decodeURI(post.current.content),
                media: post.current.media,
                prev: post.prev,
                next: post.next
            }

            resolve(dataObj);
        };
        xhr.onerror = () => reject;
        xhr.send();

    });
}


store.getList = () => {

    const POST_API_URL = setting.config.feed;

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${POST_API_URL}`, false);
        // https://developer.github.com/v3/media/#html
        xhr.setRequestHeader("Accept", "application/vnd.github.v3.html");
        xhr.onload = () => {
            const resText = xhr.responseText;
            resolve(resText);
        };
        xhr.onerror = () => reject;
        xhr.send();

    });
}

/**
 * fetch the list from cache or from github api
 *
 * @todo paginate not yet
 *
 * @param page
 * @returns {Promise}
 
store.getListByPage = (page = 1) => {
    return new Promise((resolve, reject) => {

        if (sessionStorage && sessionStorage.getItem('posts')) {

            // read data from cache
            resolve(JSON.parse(sessionStorage.posts));

        } else {

            const xhr = new XMLHttpRequest();

            xhr.open('GET', LIST_API_URL);
            xhr.onload = () => {
                const resJson = xhr.responseText;
                // caching
                sessionStorage.setItem('posts', resJson);

                resolve(JSON.parse(resJson));
            };
            xhr.onerror = () => reject;
            xhr.send();

        }

    });

}
*/

store.getObjects  = (obj, key, val) => {
        
        var objects = [];
        var triple =[]
        var curr;
        for (var i in obj) {
            console.log(obj[i].slug);
            objects.push(obj[i]);
            if (obj[i].slug == val){
               // objects.push(obj[i]);
              // console.log("PREV $$$$$$ - -" + obj[i-1].slug);
              // console.log("CURRENT $$$$$$ - -" + obj[i].slug);
              // console.log("NEXT $$$$$$ - -" + obj[i+1].slug);
               curr = i;
               /*
                triple ={
                    prev: obj[i-1],
                    current: obj[i],
                    next: obj[i+1]
                }
                */
                //return obj[i];
                
                //return triple;
            }
            
        }
       // console.log(objects);
       // return objects;
       var nextNum = Number(curr)+1;
       if (nextNum > obj.length-1) nextNum = 0;

       var prevNum = Number(curr)-1;
       if (prevNum < 0 ) prevNum = obj.length-1;


       triple ={
                    prev: objects[prevNum],
                    current: objects[curr],
                    next: objects[nextNum]
                }
       console.log('get obj');
       console.dir(obj);
       console.log('prev = '+ obj[4].slug + ', current = '+ obj[curr].slug + ', next = '+ obj[6].slug);
      // var nextnum = Number(curr)+1;
       console.log(curr);
       console.log(nextNum);
       console.log('prev = '+ obj[prevNum].slug + ', current = '+ obj[curr].slug + ', next = '+ obj[nextNum].slug);



       console.log('get triple');
       console.dir(triple);

       return triple;
      }

 
