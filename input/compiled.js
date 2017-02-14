
/** 'import $rest as app.rest'; **/app.service.register("Comments", {

    cachedComments: null,

    getComments: function (postId) {

        return app.rest.get(this.cachedComments || app.config.apiUrl + '/comments', {
            urlParams: {
                postId: postId
            }
        });

    }
});/**SPIKE_IMPORT_END**/

/** 'import $footer as app.component.Footer'; **/
/** 'import $postsList as app.component.PostsList'; **/app.controller.register("Home", {

    components: {
        PostsList: {
            recentPosts: true
        }
    },

    init: function (params) {

        var person = {
            name: 'Dawid',
            surname: 'Senko',
            nick: 'Sęp'
        };

        var gstring = 'Person name:'+ person.name+'';
        gstring += ", surname: "+person.surname+"";
        gstring = ', nick: "'+person.nick+'" ';

        app.controller.Home.selector.home().click(function(){
            app.router.redirect(app.router.createLink('/someLink'))
        });

    },

    dupa: function(){
        app.component.Footer.ok();
    }

});/**SPIKE_IMPORT_END**/
app.component.register("Menu", {

    init: function () {

        $this.selector.home().click(function(){
            app.router.redirect(app.router.createLink('/someLink'))
        });

    },

});
/**SPIKE_IMPORT_END**/
/** 'import $postService as app.service.Post'; **/
/** 'import $postsList as app.component.PostList'; **/app.component.register("PostsList", {

    init: function (data) {

        if (data.recentPosts) {
            app.component.PostsList.createRecentPostsList();
        } else {
            app.component.PostsList.createAllPostsList();
        }

    },

    createRecentPostsList: function () {

        app.service.Post.getRecentPosts()
            .then(function (posts) {
                app.component.PostList.createPostsList(posts, 5);
            })
            .catch(function (error) {
            });

    },

    createAllPostsList: function () {

        app.service.Post.getPosts()
            .then(function (posts) {
                app.component.PostList.createPostsList(posts, 20);
            })
            .catch(function (error) {
            });

    },

    createPostsList: function (posts, limit) {

        app.lister.PostsList.render(
            app.component.PostList.selector.postsList(),
            posts,
            {
                select: app.component.PostsList.selectPost
            },
            {
                limit: limit
            }
        );

    },

    selectPost: function (e) {

        app.router.redirect('post/:postId', {
            postId: e.eCtx.id
        });

    }

});/**SPIKE_IMPORT_END**/
