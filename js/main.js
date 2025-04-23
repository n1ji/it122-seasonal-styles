function displayCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    $('#currentDate').text(`Today is: ${formattedDate}`);
}

$(document).ready(function() {
    displayCurrentDate();
    $("#html-checker").attr("href", "https://validator.w3.org/nu/?doc=" + location.href);
    $("#css-checker").attr("href", "https://jigsaw.w3.org/css-validator/validator?uri=" + location.href);

    function applySeason(season) {
        $('.seasons').removeClass('active');
        
        $(`.seasons a:contains("${season}")`).parent().addClass('active');
        
        switch(season) {
            case 'Spring':
                $('html').css('background-color', '#2B7129');
                $('#logo').attr('src', 'images/spring.gif');
                $('#wear').attr('src', 'images/spring-wear.jpg');
                $('main.wrapper header h3').text('Spring into our Fresh Styles!');
                break;
                
            case 'Summer':
                $('html').css('background-color', '#EBA52B');
                $('#logo').attr('src', 'images/summer.gif');
                $('#wear').attr('src', 'images/summer-wear.jpg');
                $('main.wrapper header h3').text('Soak up our Summer Deals!');
                break;
                
            case 'Fall':
                $('html').css('background-color', '#A81124');
                $('#logo').attr('src', 'images/fall.gif');
                $('#wear').attr('src', 'images/fall-wear.jpg');
                $('main.wrapper header h3').text('Fall in Love with our Autumn Collection!');
                break;
                
            case 'Winter':
                $('html').css('background-color', '#005393');
                $('#logo').attr('src', 'images/winter.gif');
                $('#wear').attr('src', 'images/winter-wear.jpg');
                $('main.wrapper header h3').text('Warm up with our Winter Specials!');
                break;
                
            default:
                $('html').css('background-color', '#ccc');
                $('#logo').attr('src', 'images/four-seasons.gif');
                $('#wear').attr('src', 'images/300x400.png');
                $('main.wrapper header h3').text('Outfitter for All Seasons!');
        }
    }

    // Get season from date
    function getSeasonFromDate(date) {
        const month = date.getMonth() + 1;
        if (month >= 3 && month <= 5) return 'Spring';
        if (month >= 6 && month <= 8) return 'Summer';
        if (month >= 9 && month <= 11) return 'Fall';
        return 'Winter';
    }

    // Manual season selection
    $('.seasons a').on('click', function(e) {
        e.preventDefault();
        applySeason($(this).text());
    });

    // Date form submission
    $('#dateForm').on('submit', function(e) {
        e.preventDefault();
        const inputDate = new Date($('#dateField').val());
        
        if (isNaN(inputDate)) {
            alert('Please enter a valid date (e.g., MM/DD/YYYY)');
            return;
        }
        
        const season = getSeasonFromDate(inputDate);
        applySeason(season);
        
        const today = new Date();
        const message = inputDate > today ?
            `Our future ${season} collection will be perfect for ${inputDate.toLocaleDateString()}!` :
            `Our ${season} collection was ideal for ${inputDate.toLocaleDateString()}!`;
        alert(message);
    });

    // Initialize with current season
    applySeason(getSeasonFromDate(new Date()));
});