<?php 

// include_once( ABSPATH . 'wp-includes/pluggable.php' );

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
