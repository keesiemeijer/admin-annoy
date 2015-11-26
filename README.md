# Admin Annoy

Version:           1.0.1-alpha 
Requires at least: 4.0  
Tested up to:      4.3

A prank WordPress plugin to give yourself, or a "friend", a very annoying WordPress dashboard experience.

Activate the plugin and go to any other admin page to experience the destructive nature of this plugin.

To deactivate this plugin go to this admin url `/wp-admin/plugins.php` and deactivate it. 

## Level of Annoyance
Set the level of annoyance with the `admin_annoy_annoyance_percentage` filter. Use a number between 0 or 100.  Default is 60.

Example of full annoyance

```php
add_filter('admin_annoy_annoyance_percentage', 'full_annoyance' );

function full_annoyance( $percentage ){
	return 100;
}
```

## Set a date for the annoyance
Set the date for when to annoy with the `admin_annoy_date` filter. Default none
Example of april first.
```php
add_filter('admin_annoy_date', 'april_fools' );

function april_fools( $percentage ){

	// Return the date in this format 'YYYY-MM-DD'
	return '2015-04-01';
}
```

## Only annoy a specific user
Set the user id to annoy with the `admin_annoy_user_id` filter. Default none

Example to only annoy a user with id 23.
```php
add_filter('admin_annoy_user_id', 'annoy_you_know_who' );

function annoy_you_know_who( $user ){

	// Annoy user with user ID 23.
	return 23;
}
```