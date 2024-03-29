// generate advising pin
var down = document.getElementById('AdvisingPin');
function Random() {
    var rnd = Math.floor(Math.random() * 1000000);
    document.getElementById('randGen').value = rnd;
}

// calculate gpa
$(document).ready(function() {
        "use strict";
    
        // Alabama A&M grade scale
        var scale = {"A": 4.00, "B": 3.00, "C": 2.00, "D": 1.00, "F": 0.00};
    
        // build select list
        var dropdown = "",
                keys = Object.keys(scale);
        for (var i = 0; i < keys.length; i++) {
                dropdown += '<option>' + keys[i] + '</option>';
        }
    
        // populate select lists
        $('.gpa_select').html(dropdown);
    
        // delete a table row
        $('#remove_row').click(function() {
                $('#gpa-table tbody tr:last').remove();
        });
    
        // add a table
        $('#add_row').click(function() {
                var numOfRows = $('#gpa-table tbody tr').size() + 1;
                var row = '' +
                          '<tr>' +
                          '<td>' + numOfRows + '</td>' +
                          '<td><input type="text" class="coursename"></td>' +
                          '<td><input type="text" class="credithours small"></td>' +
                          '<td><select class="gpa_select small"></select></td>' +
                          '<td><input type="text" class="gradepoint small" readonly="readonly"></td>' +
                          '</tr>';
                $('#gpa-table tbody').append(row);
                $('.gpa_select:last').html(dropdown);
        });
    
        $('body').on('blur', '.credithours', function() {
                compute($(this));
        });
    
        // calculate grade point after user input
        $('body').on('change', '.gpa_select', function() {
                compute($(this));
        });
    
        // FUNCTIONS
        function compute(self) {    // self = $(this)
                var $tableRow = self.closest('tr'),
                   currentRow = $tableRow.index(),
                   creditHour = $('.credithours').eq(currentRow).val(),
                  letterGrade = $('.gpa_select').eq(currentRow).val();
                
                // compute if it's NOT empty and IS a number
                if (creditHour !== "" && $.isNumeric(creditHour)) {
                        var gradepoint = (creditHour * scale[letterGrade]).toFixed(2);
                        $('.gradepoint').eq(currentRow).val(gradepoint);
                        $('.credithours').eq(currentRow).removeClass('red');
    
                        // update totals
                        sumSemesterCredits();
                        sumSemesterGradePoints();
                        computeGPA();
                // alert user that they used an invalid character
                } else {
                        $('.credithours').eq(currentRow).addClass('red');
                }
        }
    
        function sumSemesterCredits() {
            var sum = 0;
                    $('.credithours').each(function() {
                            var val = $(this).val();
                            if (val !== "" && $.isNumeric(val)){    // only process the inputs that have been populated
                                    sum += parseInt(val, 10);
                            }
                    });
                    $('#semester-credit-hours').val(sum.toFixed(2));
        }
    
        function sumSemesterGradePoints() {
                    var sum = 0;
                    $('.gradepoint').each(function (){
                            var val = $(this).val();
                            if (val !== "" && $.isNumeric(val)){    // only process the inputs that have been populated
                                    sum += parseFloat(val);
                            }
                    });
                    $('#semester-grade-points').val(sum.toFixed(2));
            }
    
        function computeGPA() {
                    var currentGradePoints = parseFloat($('#current-gpa').val());
                    var currentHours = parseInt($('#current-hrs').val(), 10);
                    var newGradePoints = parseFloat($('#semester-grade-points').val());
                    var newHours = parseInt($('#semester-credit-hours').val(), 10);
                    
                    // existing GPA?
                    if (trueIfNumber(newGradePoints)) {
                            $('#current-gpa').removeClass('red');
                            console.log('Current (GPA:', currentGradePoints, ' Hrs:', currentHours, ') New (GPA:', newGradePoints, ' Hrs:', newHours, ')');
                            $('#total-grade-points').val(((currentGradePoints * currentHours) + newGradePoints).toFixed(2));
                    } else{
                            $('#current-gpa').addClass('red');
                    }
                    
                    // existing credit hours?
                    if (trueIfNumber(newHours)) {
                            $('#current-hrs').removeClass('red');
                            $('#total-credit-hours').val((newHours + currentHours).toFixed(2));
                    } else{
                            $('#current-hrs').addClass('red');
                    }
                    
                    // check for errors before computing existing GPA
                    if (trueIfNumber(newGradePoints) && trueIfNumber(newHours)) {
                            $('#overall-gpa').val( ($('#total-grade-points').val() / $('#total-credit-hours').val()).toFixed(2) );
                    } else {
                            console.log("Fail");
                    }
            }
    
        // helper functions
            function trueIfNumber(variable) {
                    if (variable !== "" && $.isNumeric(variable)) {
                            return true;
                    } else {
                            return false;
                    }
            }
    });

// logout confirmation
function logout() {
         swal({
                title: 'Are you sure you want to logout?',
                icon: 'warning',
                buttons:["No", "Yes"],
                showCancelButton: true,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonColor: '#81112c',
                cancelButtonColor: '#d33',
                iconColor: '#81112c'
         }).then(okay => {
                if (okay) {
                        window.location = 'login.html';
                }
        })
}