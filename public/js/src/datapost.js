var datapost = function(){
  var url = '/systems/'+$('#starlist').val();
  return $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      for(var key in data){
        $('#planetlist')
          .append($('<option></option>')
          .attr('value',key)
          .text(data[key].pl_hostname + " " + data[key].pl_letter));
      };
      $('#starname').append('<span class="textdata">' + data[0].pl_hostname + '</span>');
      $('#starmass').append('<span class="textdata">' + (data[0].st_mass || "N/A") + '</span>');
      $('#starsize').append('<span class="textdata">' + (data[0].st_rad || "N/A") + '</span>');
      $('#startemp').append('<span class="textdata">' + (data[0].st_teff && data[0].st_teff + "K"|| "N/A") + '</span>');
      $('#RA').append('<span class="textdata">' + data[0].ra.toFixed(2) + "º" + '</span>');
      $('#dec').append('<span class="textdata">' + data[0].dec.toFixed(2) + "º" + '</span>');
      $('#distance').append('<span class="textdata">' + (data[0].st_dist * 3.26).toFixed(2) + " light-years" + '</span>');
      $('#planetnum').append('<span class="textdata">' + data[0].pl_pnum + '</span>');
      $('#planetname').append('<span class="textdata">' + data[0].pl_hostname + " " + data[0].pl_letter + '</span>');
      $('#orbitlength').append('<span class="textdata">' + (data[0].pl_orbper && data[0].pl_orbper.toFixed(2) + " days"|| "N/A" )+ '</span>');
      $('#distancefromstar').append('<span class="textdata">' + (data[0].pl_orbsmax && data[0].pl_orbsmax.toFixed(2) + " AU"|| "N/A") + '</span>');
      $('#planettemp').append('<span class="textdata">' + (data[0].pl_eqt && data[0].pl_eqt.toFixed(2) + "K"|| "N/A") + '</span>');
      $('#planetmass').append('<span class="textdata">' + (data[0].pl_masse && data[0].pl_masse.toFixed(0)|| "N/A") + '</span>');
      $('#planetradius').append('<span class="textdata">' + (data[0].pl_rade && data[0].pl_rade.toFixed(0)|| "N/A") + '</span>');
      $('#discoverymethod').append('<span class="textdata">' + data[0].pl_discmethod + '</span>');
      $('#discoveryyear').append('<span class="textdata">' + data[0].pl_disc + '</span>');
    },
    error: function(){
      console.log('JSON not loaded successfully');
    }
  });
};

var planetDataPost = function(){
  var planetId = $('#planetlist').val();
  var url = '/systems/'+$('#starlist').val();
  return $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      $('#planetname').children().remove();
      $('#orbitlength').children().remove();
      $('#distancefromstar').children().remove();
      $('#planettemp').children().remove();
      $('#planetmass').children().remove();
      $('#planetradius').children().remove();
      $('#discoverymethod').children().remove();
      $('#discoveryyear').children().remove();
      $('#planetname').append('<span class="textdata">' + data[planetId].pl_hostname + " " + data[planetId].pl_letter + '</span>');
      $('#orbitlength').append('<span class="textdata">' + (data[planetId].pl_orbper && data[planetId].pl_orbper.toFixed(2) + " days"|| "N/A" )+ '</span>');
      $('#distancefromstar').append('<span class="textdata">' + (data[planetId].pl_orbsmax && data[planetId].pl_orbsmax.toFixed(2) + " AU"|| "N/A") + '</span>');
      $('#planettemp').append('<span class="textdata">' + (data[planetId].pl_eqt && data[planetId].pl_eqt.toFixed(2) + "K"|| "N/A") + '</span>');
      $('#planetmass').append('<span class="textdata">' + (data[planetId].pl_masse && data[planetId].pl_masse.toFixed(planetId)|| "N/A") + '</span>');
      $('#planetradius').append('<span class="textdata">' + (data[planetId].pl_rade && data[planetId].pl_rade.toFixed(planetId)|| "N/A") + '</span>');
      $('#discoverymethod').append('<span class="textdata">' + data[planetId].pl_discmethod + '</span>');
      $('#discoveryyear').append('<span class="textdata">' + data[planetId].pl_disc + '</span>');
    }
  });
};

$(document).ready(function(){
  datapost();
  $('#starlist').change(function(){
    window.exoViz.system.fetch($(this).val());
    $('#starname').children().remove();
    $('#starmass').children().remove();
    $('#starsize').children().remove();
    $('#startemp').children().remove();
    $('#RA').children().remove();
    $('#dec').children().remove();
    $('#distance').children().remove();
    $('#planetnum').children().remove();
    $('#planetname').children().remove();
    $('#orbitlength').children().remove();
    $('#distancefromstar').children().remove();
    $('#planettemp').children().remove();
    $('#planetmass').children().remove();
    $('#planetradius').children().remove();
    $('#discoverymethod').children().remove();
    $('#discoveryyear').children().remove();
    $('#planetlist').children().remove();
    datapost();
  });
  $('#planetlist').change(function(){
    planetDataPost();
  });
  $("#jquery_jplayer_1").jPlayer({
   ready: function () {
    $(this).jPlayer("setMedia", {
     mp3: "/music/10 - Friends of Friends (Ambient).mp3",
    });
    //.jPlayer("play");
   },
   swfPath: "/js",
   supplied: "mp3"
  });
});

module.exports.datapost = datapost;
