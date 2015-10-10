g_NG.controller('UsersController', function($scope, UsersService, user) {
	'use strict';

	angular.extend($scope, {
		list: UsersService.getUsers(),
		user: user,
		profileTabs: [
			{
				id: 'summary',
				active: true,
				label: 'Riepilogo',
				templateURL: '/includes/views/modules/users/summary.html'
			},{
				id: 'edit',
				label: 'Dati Anagrafici',
				templateURL: '/includes/views/modules/users/edit.html'
			},{
				id: 'documents',
				label: 'Documenti',
				templateURL: '/includes/views/modules/users/documents.html'
			}
		],

		/**
		 * If the selected user has the "photo" property, it is returned.
		 * Default image is returned if the parameter is null or empty
		 * @returns {String} Image URL
		 */
		getUserProfileImageURL: function() {
			if(
				$scope.user != null &&
				$scope.user.photo != null &&
				$scope.user.photo != ''
			) {

				return $scope.user.photo;
			}
			return '/includes/images/image-na.jpg';
		},

		/**
		 * Activating the clicked tab in the user detail page.
		 * @param {Object} oItem which is a tab item
		 * @returns void
		 */
		showTab: function(oItem) {
			jQuery('.tab-content > div').removeClass('active');
			jQuery('.tab-content #tab-content-' + oItem.id).addClass('active');
			/*
			$scope.profileTabs.forEach(function(oMenuItem) {
				oMenuItem.active = oItem.id == oMenuItem.id;
			});*/
		},

		/**
		 * This method is invoked on every render of the controller. Returns true if the item is active.
		 * @param {Object} oItem which is a tab item
		 * @returns {String} class name
		 */
		getTabClass: function(oItem) {
			return oItem.active ? 'active' : '';
		}
	});
});

/* --- */

g_NG.service('UsersService', function($q, $http) {

	var aTmpTimelineEvents = [
		{
			month: 'Agosto 2014',
			items: [
				{timelapse: '1 ora fa.', description: 'It\'s awesome when we find a good solution for our projects'},
				{timelapse: '1 settimana fa.', description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim'},
				{timelapse: '1 settimane fa.', description: 'Aggiunto documento "Riepilogo assemblea"'}
			]
		},{
			month: 'Gennaio 2014',
			items: [
				{timelapse: '7 mesi fa', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim'}
			]
		}
	];

	var oService = angular.extend({}, {

		users: [
			{id: 1, name: 'Mario', surname: 'Rossi', role:'CEO', events:aTmpTimelineEvents, photo: 'http://preview.oklerthemes.com/porto-admin/1.0.0/assets/images/!logged-user.jpg'},
			{id: 2, name: 'Luigi', surname: 'Verdi', role:'CTO', events:aTmpTimelineEvents},
			{id: 3, name: 'Giovanni', surname: 'Giallo', role:'CIO', events:aTmpTimelineEvents}
		],

		getUsers: function() {
			return this.users;
		},

		getUserDetails: function(nId) {
			var oDefer = $q.defer();
			oService.users.forEach(function(oUser) {
				if(oUser.id == nId){
					oDefer.resolve(oUser);
				}
			});
			return oDefer.promise;
		}
	});

	return oService;
});