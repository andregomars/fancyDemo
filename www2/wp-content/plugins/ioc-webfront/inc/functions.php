<?php 

remove_action( 'tgmpa_register', 'sydney_recommend_plugin' );
remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );

/**
 * remove wp logo, updates, comments from admin bar in the top
 */
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_links' );
function remove_admin_bar_links() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('wp-logo');          // Remove the WordPress logo
    // $wp_admin_bar->remove_menu('about');            // Remove the about WordPress link
    // $wp_admin_bar->remove_menu('wporg');            // Remove the WordPress.org link
    // $wp_admin_bar->remove_menu('documentation');    // Remove the WordPress documentation link
    // $wp_admin_bar->remove_menu('support-forums');   // Remove the support forums link
    // $wp_admin_bar->remove_menu('feedback');         // Remove the feedback link
    // $wp_admin_bar->remove_menu('site-name');        // Remove the site name menu
    // $wp_admin_bar->remove_menu('view-site');        // Remove the view site link
    $wp_admin_bar->remove_menu('updates');          // Remove the updates link
    $wp_admin_bar->remove_menu('comments');         // Remove the comments link
    // $
}

add_action('login_head', 'custom_login_logo');
function custom_login_logo() {
	echo '<style type="text/css">
			h1 a { background-image: url(http://cloud.iocontrols.com/ioc/wp-content/themes/sydney/images/logo.login.png) !important;  }
	</style>';
}

add_action( 'admin_menu', 'remove_menus' );
function remove_menus(){
  
  remove_menu_page( 'index.php' );                  //Dashboard
  remove_menu_page( 'jetpack' );                    //Jetpack* 
  remove_menu_page( 'edit.php' );                   //Posts
  //remove_menu_page( 'upload.php' );                 //Media
  //remove_menu_page( 'edit.php?post_type=page' );    //Pages
  remove_menu_page( 'edit-comments.php' );          //Comments
  //remove_menu_page( 'themes.php' );                 //Appearance
  //remove_menu_page( 'plugins.php' );                //Plugins
  //remove_menu_page( 'users.php' );                  //Users
  remove_menu_page( 'tools.php' );                  //Tools
  //remove_menu_page( 'options-general.php' );        //Settings
  
}

/*
 * replace login logo link and tooltip
*/
add_filter('login_headerurl','loginpage_custom_link');
function loginpage_custom_link() {
	return get_site_url();
}

add_filter('login_headertitle', 'change_title_on_logo');
function change_title_on_logo() {
	return get_bloginfo('name');
}

/*
 * remove help tab in admin page right up corner
 */
add_action( 'admin_head', 'hide_update_notice_to_all_but_admin_users', 998 );
function hide_update_notice_to_all_but_admin_users()
{
    remove_action( 'admin_notices', 'update_nag', 3 );
}


/*
 * remove help tab in admin page right up coner
 */
function remove_help($old_help, $screen_id, $screen){
    $screen->remove_help_tabs();
    return $old_help;
}
add_filter( 'contextual_help', 'remove_help', 999, 3 );


/**
 * manage custom cookies
 */
add_action('wp_login', 'add_custom_cookie_admin');
function add_custom_cookie_admin( $user_login ) {
  // setcookie('your_cookie_name', 'cookie value', time() + 86400, '/'); // expire in a day
  $secure = is_ssl();
  //$ioc_auth_cookie = 'andregomars';
  /*$user = get_userdata($user_id);
  if ( $user ) {
    $ioc_auth_cookie = $user->user_login;
  }
  */
  setcookie(IOC_LOGGED_IN_COOKIE, $user_login, 0, "/", COOKIE_DOMAIN, $secure, false);
}

add_action('wp_logout', 'remove_custom_cookie_admin');
function remove_custom_cookie_admin() {
  // setcookie('your_cookie_name', '', time() - 3600);
  setcookie( IOC_LOGGED_IN_COOKIE,        ' ', time() - YEAR_IN_SECONDS, "/",   COOKIE_DOMAIN );
}
