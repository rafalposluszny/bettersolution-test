'use strict';

(function(){
    var app = angular.module('Userlist', []);

    app.controller('BaseController', BaseControllerCtrl);
    app.directive('showUserList', showUserListDir);
    app.directive('showUser', showUserDir);
    app.directive('showErrorPopover', showErrorPopoverDir);
    app.filter('id', byUserIdFilter);

    function BaseControllerCtrl($scope, $http) {
        $scope.posts = [];
        $scope.userCardShow = userCardShow;

        $http({
            method: 'GET',
            url: 'http://jsonplaceholder.typicode.com/users'

            }).then(function successCallback(response) {
                $scope.people = response.data;

        }, function errorCallback(response) {
                errorPopOver(response)
        });

        $http({
            method: 'GET',
                url: 'http://jsonplaceholder.typicode.com/posts'

            }).then(function successCallback(response) {
                $scope.posts = response.data;

            }, function errorCallback(response) {
                    errorPopOver(response)
        });

        function errorPopOver(response) {
            $scope.status = response.status;
            $scope.statusText = response.statusText;
            $('#popoverError').modal('show');
        }

        function userCardShow (person) {
            $scope.userCard = person;
        }
    }

    function showUserListDir () {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'template/user-list.html'
        }
    }

    function showUserDir () {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'template/show-user.html'
        }
    }

    function showErrorPopoverDir () {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'template/show-error-popover.html'
        }
    }

    function byUserIdFilter() {
        return function (items, userCardId) {
            return items.filter(function (item) {
                return item.userId == userCardId;
            });
        };
    }

})();