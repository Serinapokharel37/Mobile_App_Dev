$(document).ready(function() {
    // Menu Toggle Function
    $('.menu-toggle').click(function() {
        $('.main-nav').toggleClass('open');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Navigation Menu Items Click
    $('.main-nav li').click(function() {
        // Get the section id
        const sectionId = $(this).data('section');
        
        // Remove active class from all nav items and add to clicked one
        $('.main-nav li').removeClass('active');
        $(this).addClass('active');
        
        // Hide all sections and show the selected one
        $('.content').removeClass('active');
        $(`#${sectionId}`).addClass('active');
        
        // Close the menu on mobile after selection
        $('.main-nav').removeClass('open');
        $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
        
        // Scroll to top when changing sections
        window.scrollTo(0, 0);
    });

    // Like Button Functionality
    $('.like-btn').click(function() {
        $(this).toggleClass('active');
        
        const likeCount = $(this).find('span');
        let count = parseInt(likeCount.text());
        
        if($(this).hasClass('active')) {
            likeCount.text(count + 1);
            $(this).find('i').removeClass('far').addClass('fas');
        } else {
            likeCount.text(count - 1);
            $(this).find('i').removeClass('fas').addClass('far');
        }
    });

    // Share Button Functionality
    $('.share-btn').click(function() {
        // Get the joke or quote text
        const contentText = $(this).closest('.joke-card, .quote-card').find('p').text();
        
        // Store the content to share
        localStorage.setItem('shareContent', contentText);
        
        // Open the share modal
        $('.share-modal').fadeIn(300);
    });

    // Close the share modal
    $('.close-modal, .share-modal').click(function(e) {
        if(e.target === this) {
            $('.share-modal').fadeOut(300);
        }
    });

    // Share options click
    $('.share-option').click(function() {
        const platform = $(this).data('platform');
        const content = localStorage.getItem('shareContent');
        
        // Handle different sharing platforms
        switch(platform) {
            case 'facebook':
                // Simulate Facebook share
                alert('Sharing via Facebook: ' + content);
                break;
            case 'twitter':
                // Simulate Twitter share
                alert('Sharing via Twitter: ' + content);
                break;
            case 'whatsapp':
                // Simulate WhatsApp share
                alert('Sharing via WhatsApp: ' + content);
                break;
            case 'copy':
                // Copy to clipboard
                navigator.clipboard.writeText(content).then(function() {
                    alert('Content copied to clipboard!');
                }).catch(function() {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = content;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('Content copied to clipboard!');
                });
                break;
        }
        
        // Close the modal after sharing
        $('.share-modal').fadeOut(300);
    });

    // Clear Note Button
    $('#clearNote').click(function() {
        $('#userNote').val('');
    });

    // Share Note Button
    $('#shareNote').click(function() {
        const noteText = $('#userNote').val().trim();
        
        if(noteText !== '') {
            // Create timestamp
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const dateString = now.toLocaleDateString();
            
            // Create and add the note to the shared notes
            const noteHTML = `
                <div class="shared-note">
                    <p>${noteText}</p>
                    <div class="timestamp">${dateString} at ${timeString}</div>
                </div>
            `;
            
            $('#sharedNotes').prepend(noteHTML);
            
            // Clear the textarea
            $('#userNote').val('');
            
            // Save notes to local storage
            saveNotesToLocalStorage();
        } else {
            alert('Please write something before sharing!');
        }
    });

    // Function to save notes to local storage
    function saveNotesToLocalStorage() {
        const notesContainer = $('#sharedNotes').html();
        localStorage.setItem('daiKoGuff_notes', notesContainer);
    }

    // Function to load notes from local storage
    function loadNotesFromLocalStorage() {
        const savedNotes = localStorage.getItem('daiKoGuff_notes');
        if(savedNotes) {
            $('#sharedNotes').html(savedNotes);
        }
    }
    
    // Load saved notes on page load
    loadNotesFromLocalStorage();

    // Swipe functionality (for mobile)
    const mainElement = document.querySelector('main');
    const hammertime = new Hammer(mainElement);
    
    hammertime.on('swipeleft', function() {
        // Find the current active section
        const activeSection = $('.content.active');
        const activeIndex = $('.content').index(activeSection);
        const totalSections = $('.content').length;
        
        // Calculate the next section index
        const nextIndex = (activeIndex + 1) % totalSections;
        
        // Activate the next section
        $('.content').removeClass('active');
        $('.content').eq(nextIndex).addClass('active');