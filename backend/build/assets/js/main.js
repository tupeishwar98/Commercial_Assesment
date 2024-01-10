$(document).ready(function() {
    // Initialize the image scrolling functionality using jQuery
    $(".scrollable-images").on("mousewheel", function(event) {
        // Calculate the new scroll position
        var scrollPosition = $(this).scrollLeft() + event.originalEvent.deltaY;

        // Set the new scroll position
        $(this).scrollLeft(scrollPosition);

        // Prevent the default scrolling behavior
        event.preventDefault();
    });
});