function validateCustomFields(formId, page){
	page = page-1;
	var items = document.querySelectorAll('#rsform_'+formId+'_page_'+page+' [data-validate-empty]');
	console.log(items);
	console.log('#rsform_'+formId+'_page_'+page+' [data-validate-empty]');

	var response = true;
	for( i = 0; i < items.length; i++ ){
		var currentItem = items[i];
		console.log(currentItem);
		if( currentItem.offsetParent === null ) return true;
		else{
			if(currentItem.value == ''){
				var errorEl = currentItem.parentNode.querySelector('.formNoError');
				var errorElClasses = errorEl.getAttribute('class').split(' ');
				var errorElNewClasses = [];

				// Remove class
				for(j = 0; j < errorElClasses.length; j++){
					if( errorElClasses[j] != 'formNoError' ) errorNewClasses.push(errorElClasses[j]);
				}

				// Add class
				errorElNewClasses.push('formError');

				errorEl.setAttribute('class', errorElNewClasses.join(' '));
				
				response = false;
				return false;
			}
		}
	}
	console.log(response);
	return response;
}

function rsfp_changePage(formId, page, totalPages, validate){
	if (validate){
		var form = rsfp_getForm(formId);
		if (!ajaxValidation(form, page)) return false;
		else if( !validateCustomFields(formId, page) ) return false;
	}
	
	for (var i=0; i<=totalPages; i++){
		var thePage = document.getElementById('rsform_' + formId + '_page_' + i);
		if (thePage)
			document.getElementById('rsform_' + formId + '_page_' + i).style.display = 'none';
	}
	
	var thePage = document.getElementById('rsform_' + formId + '_page_' + page);
	if (thePage){
		thePage.style.display = '';
		try {
			eval('if (typeof rsfp_showProgress_' + formId + ' == "function") rsfp_showProgress_' + formId + '(' + page + ')');
		}catch (err) { }
	}
}
