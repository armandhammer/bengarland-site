/*
  This file is for small custom JavaScript for the site.
  Bootstrap already handles the scrollspy and carousel behavior,
  so this file only adds a couple of simple custom touches.
*/

// This runs after the page finishes loading
$(document).ready(function () {
  var scrollspyMenu = document.getElementById("indexScrollspyMenu");

  if (scrollspyMenu) {
    $('body').scrollspy({
      target: '#indexScrollspyMenu',
      offset: 80
    });

    $(window).on('load', function () {
      $('body').scrollspy('refresh');
    });
  }
});

// Put the current year in the footer so it updates automatically.
var footerYearSpan = document.getElementById("currentYear");

if (footerYearSpan) {
  footerYearSpan.textContent = new Date().getFullYear();
}

// Simple message in the browser console so it is obvious the script loaded.
console.log("site_scripts.js loaded successfully.");
