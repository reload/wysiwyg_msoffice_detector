Drupal.behaviors.WysiwygMsOfficeDetector = function(context) {
	// Attach to the entire context to recieve events which bubble up.
	// This should ensure that the WYSIWYG editor has transferred content
	// to textareas so we can check these.
	$(context).submit(function(event) {
		$('textarea', this).each(function(i, e) {
			var value = $('<div>').append($(e).fieldValue().shift());
			
			// Detect MS Office content.
			// Quite primitive at the moment. Content from MS Office usually contain the MsoNormal class
			if ($('.MsoNormal', value).length > 0) {
				var reaction = Drupal.settings.WysiwygMsOfficeDetector.reaction
				var message = Drupal.settings.WysiwygMsOfficeDetector.message;
        var stopSubmit = false;
								
				if (reaction == 1) { // Prompt for confirmation
					stopSubmit = !confirm(message);
				} else if (reaction == 2) { // Prevent saving
					alert(message);
					stopSubmit = true;
				}
				
				if (stopSubmit) {
					//Reinitialize the WYSIWYG editor
					$('.wysiwyg-processed', context).removeClass('wysiwyg-processed');
          Drupal.behaviors.attachWysiwyg(context);
					
					//Prevent the form from submitting
          event.preventDefault();    
				}
			}
		});	
	});	
}
