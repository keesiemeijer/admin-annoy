( function( $ ) {

	function annoy( el ) {
		$( el ).stop().animate( {
			left: ( Math.random() * 300 ),
			top: ( Math.random() * 300 ),
		}, 130 );
		$( el ).css( 'z-index', '1000' );
	}

	$( document ).ready( function() {

		if ( typeof admin_annoy === 'undefined' ) {
			return;
		}

		if ( !$( admin_annoy ).length ) {
			return;
		}

		var admin_menu = $( '#adminmenu' ),
			admin_bar = $( '#wpadminbar' ),
			screen_links = $( '#screen-meta-links' ),
			screen_meta = $( '#screen-meta' ),
			wpbody = $( '#wpbody' ),
			wpwrap = $( '#wpwrap' );

		if ( admin_annoy.sidebar ) {

			admin_menu.hover( function() {
				$( this ).hide( "slide", {
					direction: "left"
				}, 100 );
			} );

			wpbody.on( "mouseenter  touchstart", function( e ) {
				if ( admin_menu.is( ":hidden" ) ) {
					admin_menu.show( "slide", {
						direction: "left"
					}, 100 );
				}
			} );
		}

		if ( admin_annoy.toolbar ) {

			admin_bar.hover( function() {
				admin_bar.hide( "slide", {
					direction: "up"
				}, 100 );
				screen_links.hide();
				screen_meta.hide();
			} );
		}

		wpwrap.on( "mousemove touchstart", _.debounce( function( e ) {
			if ( admin_bar.is( ":hidden" ) && ( e.clientY > 31 ) ) {
				admin_bar.show( "slide", {
					direction: "up"
				}, 100 );
				screen_links.show();
				screen_meta.show();
			}
		}, 60 ) );

		$( 'label' ).on( "click touchstart", function( e ) {
			e.preventDefault();
		} );

		var elements = $( 'input:visible,a,select,textarea,button', wpbody ).filter( function() {
			return $( this ).parents( '#contextual-help-wrap' ).length < 1;
		} );

		if ( elements.length ) {

			var elements_num = Math.round( ( parseInt( admin_annoy.level ) / 100 ) * elements.length );

			elements_num = ( 1 > elements_num ) ? 1 : elements_num;

			if ( elements.length !== elements_num ) {

				elements.sort( function() {
					return ( Math.round( Math.random() ) - 0.5 );
				} );

				elements = elements.slice( 0, Math.ceil( elements_num ) );
			}


			elements.css( 'position', 'relative' );

			$( '.activity-block, .dashboard-widget-control-form, .mu-storage, .tablenav .actions, th.sortable a, th.sorted a' ).css( 'overflow', 'visible' );

			elements.on( "mouseover touchstart click", function( e ) {
				e.preventDefault();
				$( this ).blur();
				annoy( this );

			} );
		}
	} );

} )( jQuery );