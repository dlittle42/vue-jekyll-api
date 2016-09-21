<!-- src/components/App.vue -->

  <template>
  <!--
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a v-link="'home'">Home</a></li>
          <li><a v-link="'login'">Login</a></li>
          <li><a v-link="'signup'">Sign Up</a></li>
          <li><a v-link="'secretquote'">Secret Quote</a></li>
          <li><a v-link="'login'">Logout</a></li>
        </ul>
      </div>    
    </nav>
    -->

    <div class="container">
      <!-- header 
        <header>
            <h1><a v-link="{ path: '/home' }">SCM</a></h1>
        </header>
        -->
        <header class="header">
            <!--
               <div class="circle unselectable" id="logo"><h1>Super Computing Machine</h1></div>
             -->


               <div class="logo unselectable">
               <a v-link="{ path: '/home' }">
                    <div id="symbol">

                        <div id="leftcircle" class="halfCircleLeft"><h1>Super Computing Machine - Portfolio of Derek Little - Creative Developer</h1></div>
                        <div id="rightcircle" class="halfCircleRight"></div>
                    </div>
                </a>
               </div>
        </header> <!-- end header -->
      <router-view
            class="view"
            transition
            transition-mode="out-in">
        </router-view>
        <div id="WebGL-output"></div>
    </div>

  </template>

  <style lang="scss">





    footer{
        text-align: center;
        font-size: .8rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
    }

    .v-transition{
        transition: opacity .2s ease;
    }

    .v-enter, .v-leave{
        opacity: 0;
    }

    h1,
    h2,
    h3,
    h4{
        font-weight: 400;
        color: #222;
    }

    h1{
        line-height: 3;
        font-size: 1.8rem;
    }

    h2,
    h3{
        line-height: 2.5rem;
        margin-top: 2.5rem;
    }

    h2{
        font-size: 1.6rem;
    }

    h3{
        font-size: 1.2rem;
    }

    ul,
    ol{
        line-height: 2.1;
        padding: 5px 25px;
    }

    ul li{
        padding: 0;
        margin: 0;
        line-height: 2.1rem;
    }

    a{
        color: #08c;
        overflow-wrap: break-word;
        word-break: break-all;
        text-decoration: none;
        padding: 0 .3rem;

        &:hover, &:active {
            color: #e60900;
            text-decoration: underline;
        }
    }

    .publish-date{
        float: right;
        font-size: .8rem;
        line-height: 4;
        vertical-align: middle;
    }

</style>

<!-- import a file from the installed "normalize-css" npm package -->
<style src="normalize-css/normalize.css"></style>
<style lang="scss" src="./css/main.scss"></style>