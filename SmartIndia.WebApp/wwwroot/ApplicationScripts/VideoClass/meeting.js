main_host = "aalapa.odisha.gov.in/";
function view_meeting_details(meet_id) {
	// console.log(meet_id);
	var data = { meet_id: meet_id, action: 'meeting_det' };
	//$.ajax({
	//	url: "include/dashboard.php",
	//	type: "POST",
	//	data: data,
	//	beforeSend: function () {
	//		$('.loader').show();
	//	},
	//	success: function (response) {
	//		// console.log(response);
	//		jobj = JSON.parse(response);
	//		// console.log(jobj);
	//		// $('#meet_link').attr("href",);
	//		$('#meet_head').html(jobj[0]['discuss_heading']);
	//		$('#rname').val(jobj[0]['room_name']);
	//		$('#moderator').html(jobj[0]['invite_from']);
	//		var meet_status = jobj[0]['status'];
	//		$('#mem_list').html(' ');
	//		$('#start_date').html(jobj[0]['start_date'] + ' ' + jobj[0]['start_time']);
	//		for (var i = 0; i < jobj[0]['participants'].length; i++) {
	//			userdets = jobj[0]['participants'][i].split('@@');
	//			divcont = userdets[0] + ',';
	//			$('#mem_list').append(divcont);
	//		}
	//		// starttimer(link);
	//		getmod_user = jobj[0]['invite_from'].split(' ');
	//		getses_user = $('#fuser').val();
	//		// console.log(getmod_user[0]+ '--' +getses_user);
	//		if (getmod_user[0] == getses_user) {
	//			showParticipants($('#inv_id').val(), $('#mem_list').html().trim());
	//			update_meet_status(meet_id);
	//			startvideo();
	//		}
	//		else {
	//			$(".inv_box").hide();
	//			if (meet_status == 1) {
	//				startvideo();
	//			}
	//			else {
	//				// console.log("meetstatus 0");
	//				$('.loader').hide();
	//				// $('#loader2').show();
	//				// check_meet(meet_id);
	//				startvideo();
	//			}
	//		}
	//		$('.loader').hide();
	//	}
	//});
}

function update_meet_status(meet_id) {
	// console.log(meet_id);
	var data = { meet_id: meet_id, action: 'meeting_upd' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			$('.loader').show();
		},
		success: function (response) {
			// console.log(response);
		}
	});
}

function check_meet(meet_id) {
	// console.log(meet_id);
	var data = { meet_id: meet_id, action: 'meeting_chk' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			// $('.loader').show();
		},
		success: function (response) {
			// console.log(response);
			if (response == 'Started') {
				$('#loader2').hide();
				clearTimeout(myVar);
				startvideo();
			}
			else {
				// setTimeout(, 5000);
				// console.log(response);
				myVar = setTimeout(function () { check_meet(meet_id); }, 10000);
			}
		}
	});
}

function showParticipants(meet_id, participants) {
	// console.log(meet_id+"----"+participants);
	var data = { meet_id: meet_id, participants: participants, action: 'meeting_invite' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			// $('.loader').show();
		},
		success: function (response) {
			jobj = JSON.parse(response);
			// console.log(jobj);
			divcont = '';
			$('#friends').html('');
			for (var i = 0; i < jobj.length; i++) {
				userdets = jobj[i].split('@@');
				divcont = '<div class="friend" data-filter-item data-filter-name="' + userdets[0] + '"> <label class="inputGroup"> <input type="checkbox" class="newpartCheck" id="' + userdets[0] + '" value="' + userdets[0] + '"> <div class="friend_cont"> <img src="img/user.png" /> <p> <strong>' + userdets[2] + '</strong> <span>' + userdets[1] + '</span> </p> </div> </label></div>';
				$('#friends').append(divcont);
			}
		}
	});
}

$('body').on('click', '#addPartNew', function () {
	newPart = [];
	$('input:checkbox.newpartCheck').each(function () {
		var sThisVal = (this.checked ? $(this).val() : "");
		if (sThisVal != "") {
			// added_user_arr.push(sThisVal);
			// console.log(sThisVal);
			newPart.push(sThisVal);
		}
	});
	// console.log(newPart);
	meet_id = $('#inv_id').val();
	// console.log(meet_id);
	var data = { meet_id: meet_id, newPart: newPart, action: 'meeting_update_part' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			// $('.loader').show();
		},
		success: function (response) {
			// console.log(JSON.parse(response));
			// console.log(response);
			var newArr = newPart.concat(JSON.parse(response));
			// console.log(newArr);
			updateMeetingParticipants(newArr, meet_id);
		}
	});
});

function updateMeetingParticipants(newArr, meet_id) {
	// console.log(meet_id);
	var data = { newArr: newArr, meet_id: meet_id, action: 'meeting_update_indi' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			// $('.loader').show();
		},
		success: function (response) {
			// console.log(response);
			if (response == 'Success') {
				$('#mem_list').html('');
				for (var i = 0; i < newArr.length; i++) {
					divcont = newArr[i] + ',';
					$('#mem_list').append(divcont);
				}
				// alert(newArr.length);
				showParticipants($('#inv_id').val(), $('#mem_list').html().trim());
			}
		}
	});
}

$('body').on('click', '#share_btn', function () {
	var sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
	var win = window.open('https://wa.me/?text=Hi, Kindly join discussion on *' + $('#meet_head').html() + '*. Join ' + main_host + 'guest/ with password : ' + sixdigitsrandom, '_blank');
	meet_id = $('#inv_id').val();
	var data = { password: sixdigitsrandom, meet_id: meet_id, action: 'meeting_guest' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			// $('.loader').show();
		},
		success: function (response) {
			console.log(response);
		}
	});
	if (win) {
		//Browser has allowed it to be opened
		win.focus();
	} else {
		//Browser has blocked it
		alert('Please allow popups for this website');
	}
});

function activateWebinar(rname) {
	// console.log(rname);
	var data = { rname: rname, action: 'start_webinar' };
	$.ajax({
		url: "include/meeting.php",
		type: "POST",
		data: data,
		beforeSend: function () {
			$('.loader').show();
		},
		success: function (response) {
			console.log(response);
			if (response == "Success") {
				showChat(rname, 1);
			}
			// $('.loader').hide();
		}
	});
}