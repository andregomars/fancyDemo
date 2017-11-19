<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp');

/** MySQL database username */
define('DB_USER', 'wp');

/** MySQL database password */
define('DB_PASSWORD', 'wp');

/** MySQL hostname */
define('DB_HOST', 'db');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'JBt@QBy#1[-J`+dO|*#~I2_Yn=.vg&4#A@(-H5-S(FhsJC#kn}2z6MD7s4t]pqsX');
define('SECURE_AUTH_KEY',  'P{W#vB#mHtLWHw+A.f$wE4_-v]/[J `bZfY$X{Xs%^MpB3:Mly*8dU72X{&n(Nj-');
define('LOGGED_IN_KEY',    '?[!%$FL4n@R&@ruXKWUQ~]-$LZPoTX:@1XyrV.+2Zqnb?JZwdei7#c~s8vqX#fS`');
define('NONCE_KEY',        '%vl!2j30s2L1v.4 6wv!1!uk!e@#RVrBu|R=OD; Lx|Vo4Ow@-NRR)iNu!e7SJcS');
define('AUTH_SALT',        ')Va~d9dz]j;E.SoH}]ws;2RE~<0r_Q1{CY^^o.[sU5[r5Suq!E<Vt@f%2HRk=xKL');
define('SECURE_AUTH_SALT', 'xOE}&P2c7>QcUUZ%[{%A2x-<kZj]:s~L6xq$*99tGJF</YnY]^6F(Yl 351!<Rhc');
define('LOGGED_IN_SALT',   '*5L^^+f<k+yw[Tt}5/d~6U4][5a[2VmQ0GrDDB+Q(M_}qCFjxx^ilW;cqUL?/3Sn');
define('NONCE_SALT',       '+8&cE#(,LGy;?zqxeUOk]/2UJyahfsByp:+)f<i4K3A3VZW[4G^:vi|u/wqjN; ]');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('AUTOMATIC_UPDATER_DISABLED', true );

//by andre
define('IOC_LOGGED_IN_COOKIE', 'ioc_loggedin');
//by andre end

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
