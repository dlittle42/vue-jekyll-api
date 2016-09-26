// src/index.js

import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Post from './components/postView.vue'
// import SecretQuote from './components/SecretQuote.vue'
// import Signup from './components/Signup.vue'
// import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//import Scroll from 'js/ScrollTo.js'
//var scroller = require('./js/ScrollTo.js');
var scroller = require('./js/ScrollTo.js');
//var $ = require('jquery');
//require('jquery')


Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()

// Set up routing and match routes to components
router.map({
  '/home': {
    component: Home
  },
  'post/:name': {
            name: 'post',
            component: Post
    }
})

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/home'
})

router.beforeEach(function () {
  //window.scrollTo(0, 1000)
 // console.log('beforeEach = ' + scrollTo);
 // scrollTo(0, console.log('end'), 1000);
 scroller.scrollTo(0, null, 500);
})


// Start the app on the #app div
router.start(App, '#app')




Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut',
    afterLeave: function (el) {
      this.$dispatch('fade-done');
    }
  });

Vue.transition('expand', {

  beforeEnter: function (el) {
  	console.log('beforeEnter');
    //el.textContent = 'beforeEnter'
  },
  enter: function (el) {
  	console.log('enter');
    //el.textContent = 'enter'
    //$('body').css('background-color','red');
  },
  afterEnter: function (el) {
  	console.log('afterEnter');
    //el.textContent = 'afterEnter'
  },
  enterCancelled: function (el) {
  	console.log('enterCancelled');
    // handle cancellation
  },

  beforeLeave: function (el) {
  	console.log('beforeLeave');
    //el.textContent = 'beforeLeave'
  },
  leave: function (el) {
  	console.log('leave');
    //el.textContent = 'leave'
  },
  afterLeave: function (el) {
  	console.log('afterLeave');
    //el.textContent = 'afterLeave'
  },
  leaveCancelled: function (el) {
  	console.log('leaveCancelled');
    // handle cancellation
  }
})


