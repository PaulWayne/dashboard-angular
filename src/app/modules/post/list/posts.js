'use strict';

(function() {

    angular
        .module('app.post')
        .controller('PostListController', postListController);

    postListController.$inject = ['posts', 'deletePostModal'];
    function postListController(posts, deletePostModal, transferts) {
      var vm = this;
      vm.posts = posts;
      vm.delete = deletePostModal.getDeleteMethod(vm.posts);
    }
})();
