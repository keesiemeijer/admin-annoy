<?php
/*
Plugin Name: Admin Annoy
Version: 1.0.1-alpha
Plugin URI:
Description: Agitate html elements in the wp-admin.
Author: keesiemijer
Author URI:
License: GPL v2+

Admin Annoy
Copyright 2015  Kees Meijer  (email : keesie.meijer@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version. You may NOT assume that you can use any other version of the GPL.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

add_action( 'admin_enqueue_scripts', 'admin_annoy_enqueue_scripts', 99 );

function admin_annoy_enqueue_scripts() {

	if(is_customize_preview ()) {
		return;
	}

	$plugin_screen = apply_filters( 'admin_annoy_plugin_screen_do_annoy', false);
 
	if ( !$plugin_screen ) {
		$screen = get_current_screen();

		// Don't annoy on the plugins screen.
		if ( 'plugins' === $screen->id ) {
			return;
		}
	}

	// Annoy only on specific date. Format Y-m-d (e.g. 2015-04-01)
	$annoy_date = apply_filters( 'admin_annoy_date', '' );
	$date       = DateTime::createFromFormat( 'Y-m-d', $annoy_date );

	// Check if correct date format is used.
	if ( $date && ( $date->format( 'Y-m-d' ) == $annoy_date ) ) {

		// Annoy on specific date only.
		if (  new DateTime() != $date ) {
			return;
		}
	}

	$user_id = get_current_user_id();

	// Displease this user with an annoying wp-admin experience.
	$sucker = apply_filters( 'admin_annoy_user_id', $user_id );

	if ( $sucker !== $user_id ) {
		return;
	}

	// how many elments shoul by annoying.
	$agitate_level = absint( apply_filters( 'admin_annoy_annoyance_percentage', 60 ) );

	if ( !$agitate_level || $agitate_level > 100 ) {
		$agitate_level = 50;
	}

	// elements to annoy
	$annoy_elements = array(
		'sidebar' => mt_rand( 1, 100 ) <= $agitate_level ? true : false,
		'toolbar' => mt_rand( 1, 100 ) <= $agitate_level ? true : false,
		'nav_links'   => mt_rand( 1, 100 ) <= $agitate_level ? true : false,	
	);

	$js_vars          = apply_filters( 'admin_annoy_elements', $annoy_elements, $user_id );
	$js_vars          = array_merge($annoy_elements, (array) $js_vars );
	$js_vars['level'] = $agitate_level;

	wp_register_script( 'admin-annoy-js', plugin_dir_url( __FILE__ ) . 'admin-annoy.js',  array( 'jquery', 'jquery-effects-slide', 'underscore' ), false, true );
	wp_enqueue_script( 'admin-annoy-js' );

	wp_localize_script( 'admin-annoy-js', 'admin_annoy', $js_vars );
}