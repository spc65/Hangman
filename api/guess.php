<?php
  ini_set('session.use_strict_mode', 1);
  session_start();
	include 'controller.php';
  $gameid = $_GET["id"];
  $letter = $_GET["letter"];

  guess($gameid,$letter);
  echo '{"word":"'.htmlspecialchars(getWord($gameid)).'","lives":"'.htmlspecialchars(getLives($gameid)).'","did_win":"'.htmlspecialchars(didWin($gameid)).'"}';
?>
