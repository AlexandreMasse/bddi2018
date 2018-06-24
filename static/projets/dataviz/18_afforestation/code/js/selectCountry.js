$( "#france" ).click(playFrance);
function playFrance() {
  $("li").removeClass( "active" );
   $(this).addClass( "active" );
   setDatasFrance()
}

$( "#chine" ).click(playChine);
function playChine() {
  $("li").removeClass( "active" );
   $(this).addClass( "active" );
   setDatasChine()
}

$( "#ghana" ).click(playGhana);
function playGhana() {
  $("li").removeClass( "active" );
   $(this).addClass( "active" );
   setDatasGhana()
}

$( "#espagne" ).click(playEspagne);
function playEspagne() {
  $("li").removeClass( "active" );
   $(this).addClass( "active" );
   setDatasEspagne()
}
