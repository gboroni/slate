//= require ./all_nosearch
//= require ./app/_search


$(document).ready(function() {
	$("p > code").each(function() {
		$(this).html($(this).html().replace(/\[/g, '<b>[').replace(/\]/g, ']</b>'))
	});
});