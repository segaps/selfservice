  $(document).ready(function(){

    //SQL vars
    var sqlPrefix = 'SELECT';

    ///Sanity results
    $.ajax({
            type: 'GET',
            dataType: 'html',
            processData: false,
            url: "sanity.php",
            success: function (data, textStatus, jqXHR) {
               if(data.indexOf("ERROR: ") > -1){
                  $("#sanity_results").text("Data currently unavailable.");
                }
                else {
                var sanity_results = $(data); //.find(":contains('Sanity Test results')").html();
                //var sanity_results = $(data).find("#sanity_table").html();

                $("#sanity_results").html(sanity_results);
                }
                $("#sanity_loader").hide();
            },
            error: function (responseData, textStatus, errorThrown) {
                $("#sanity_results").text("Data currently unavailable TEST123.");
                $("#sanity_loader").hide();
            }
        });

        ///ES Count
    $.ajax({
            type: 'GET',
            dataType: 'html',
            processData: false,
            url: "es_count.php",
            success: function (data, textStatus, jqXHR) {
               if(data.indexOf("ERROR: ") > -1){
                  $("#es_results").text("Data currently unavailable.");
                }
                else {
                var modules_results = $(data); //.find(":contains('Sanity Test results')").html();
                //var sanity_results = $(data).find("#sanity_table").html();

                $("#es_results").html(modules_results);
                }
                $("#es_loader").hide();
            },
            error: function (responseData, textStatus, errorThrown) {
                $("#es_results").text("Data currently unavailable.");
                $("#es_loader").hide();
            }
        });


    ///Database modules
    $.ajax({
            type: 'GET',
            dataType: 'html',
            processData: false,
            url: "modules.php",
            success: function (data, textStatus, jqXHR) {
               if(data.indexOf("ERROR: ") > -1){
                  $("#modules_results").text("Data currently unavailable.");
                }
                else {
                var modules_results = $(data); //.find(":contains('Sanity Test results')").html();
                //var sanity_results = $(data).find("#sanity_table").html();

                $("#modules_results").html(modules_results);
                }
                $("#modules_loader").hide();
            },
            error: function (responseData, textStatus, errorThrown) {
                $("#modules_results").text("Data currently unavailable.");
                $("#modules_loader").hide();
            }
        });

        $("input[name=sqltype]:radio, .myform").change(function() {
            $("textarea#sql").value = $('input[name=sqltype]:checked dbqueriesForm').val();

          if($('#sqlSelect').is(':checked')){
            $("textarea#sql").val('SELECT [column] FROM [schemaOwner.tablename]');
          }
          else{
            $("textarea#sql").val('DESCRIBE TABLE [schemaOwner.tablename]');
          }
        });

        $("textarea#sql").keydown(function(e) {
            var oldvalue=$(this).val();
            var field=this;
            setTimeout(function () {
                if(field.value.indexOf(sqlPrefix) !== 0) {
                    $("textarea#sql").focus();
                }
                else if(field.value.toLowerCase().indexOf('; drop ') > -1){
                  alert("Ha, you thought you're funny?");
                    $(field).val(sqlPrefix);
                    $("textarea#sql").focus();
                }
                else if(field.value.toLowerCase().indexOf('; delete ') > -1){
                  alert("No DELETE's permitted here.");
                    $(field).val(sqlPrefix);
                    $("textarea#sql").focus();
                }
                else if(field.value.toLowerCase().indexOf('; update') > -1){
                  alert("No UPDATES's permitted here.");
                    $(field).val(sqlPrefix);
                    $('textarea#sql').focus();
                }
            }, 1);
        });

        $('#clearSQL').click(function() {
          $('textarea#sql').val(sqlPrefix + ' ');
          $('textarea#sql').focus();
        });

        $('.twisties .panel-heading').click(function() {
            jQuery('div.panel-body', this.closest('.panel')).toggle(400);
        });

        $('.twisties .panel-body').delay(1000).hide(1000);


});

function showHide(a){
    var hiddenTime = document.getElementById("timeChoice");

    if (a==1){
        hiddenTime.style.display = "none";
    }
    else if ( a==2){
        hiddenTime.style.display = "inline";
    }
    else if (a==3){
        hiddenTime.style.display = "none";
    }
}

function hideRadio(value){
    var hiddenTime = document.getElementById("latest_time");
    var hiddenTimeLabel = document.getElementById("latest_time_label");
    if (value=="sugarcrm"){
        hiddenTime.style.display = "inline";
        hiddenTimeLabel.style.display = "inline";
    }
    else {
        hiddenTime.style.display = "none";
        hiddenTimeLabel.style.display = "none";
    }
}