
'import $rest as app.rest';
app.service.register("Comments", {

    cachedComments: null,

    getComments: function (postId) {

        return $rest.get(this.cachedComments || app.config.apiUrl + '/comments', {
            urlParams: {
                postId: postId
            }
        });

    }
});
SPIKE_IMPORT_END

'import $footer as app.component.Footer';
'import $postsList as app.component.PostsList';

app.controller.register("Home", {

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

        var gstring = 'Person name: ${{person.name}}';
        gstring += ", surname: ${person.surname}";
        gstring = ', nick: "${{person.nick}}" ';

        $this.selector.home().click(function(){
            app.router.redirect(app.router.createLink('/someLink'))
        });

    },

    dupa: function(){
        $footer.ok();
    }

});
SPIKE_IMPORT_END
app.component.register("Menu", {

    init: function () {

        $this.selector.home().click(function(){
            app.router.redirect(app.router.createLink('/someLink'))
        });

    },

});
SPIKE_IMPORT_END
'import $postService as app.service.Post';
'import $postsList as app.component.PostList';

app.component.register("PostsList", {

    init: function (data) {

        if (data.recentPosts) {
            $this.createRecentPostsList();
        } else {
            $this.createAllPostsList();
        }

    },

    createRecentPostsList: function () {

        $postService.getRecentPosts()
            .then(function (posts) {
                $postsList.createPostsList(posts, 5);
            })
            .catch(function (error) {
            });

    },

    createAllPostsList: function () {

        $postService.getPosts()
            .then(function (posts) {
                $postsList.createPostsList(posts, 20);
            })
            .catch(function (error) {
            });

    },

    createPostsList: function (posts, limit) {

        app.lister.PostsList.render(
            $postsList.selector.postsList(),
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

});

SPIKE_IMPORT_END
