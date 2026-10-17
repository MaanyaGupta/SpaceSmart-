<?php
/**
 * SpaceSmart Theme Functions
 */

function spacesmart_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'spacesmart_theme_setup');

// Disable admin bar on frontend for clean presentation
add_filter('show_admin_bar', '__return_false');
