<?php

$con = mysqli_connect('localhost','ppk','1234','ppk');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

$content_show = isset($_GET['content_show']) ? $_GET['content_show'] : 10;
$id = isset($_GET['id']) ? $_GET['id'] : 0;

//printf($content_show . "\n" . $id); //  test passing variable

$id_record = mysqli_query($con, "SELECT * FROM `w3s` WHERE `id` =" . $id .";");

$total_record = mysqli_query($con, "SELECT * FROM `w3s`");
$total_cnt = mysqli_num_rows($total_record);

//$sql = "SELECT * FROM w3s ORDER BY id DESC";
$sql = "SELECT * FROM `w3s` ORDER BY `id` DESC LIMIT 0," . $content_show;
//$sql = "SELECT COUNT(*) FROM `w3s`";

//$delete_query = "DELETE FROM w3s WHERE id="'$rows[$i]'";
//$sql = "SELECT * FROM w3s WHERE id = '".$q."'";

$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
  $Id[] = $row['id'];
  $Firstname[] = $row['Firstname'];
  $Lastname[] = $row['Lastname'];
  $Age[] = $row['Age'];
  $Hometown[] = $row['Hometown'];
  $Job[] = $row['Job'];
}

//  첫번째 객체배열[0] 에 객체에대한 기본정보
//  ( 전체레코드, /레코드 보기순으로 나눈값 전달 )

$data[0]['total_cnt'] = $total_cnt;
$data[0]['pageper_cnt'] = ceil($total_cnt/$content_show);

for ($i = 1; $i <= mysqli_num_rows($result); $i++) {

  $data[$i]['Id'] = $Id[$i - 1];
  $data[$i]['Firstname'] = $Firstname[$i - 1];
  $data[$i]['Lastname'] = $Lastname[$i - 1];
  $data[$i]['Age'] = $Age[$i - 1];
  $data[$i]['Hometown'] = $Hometown[$i - 1];
  $data[$i]['Job'] = $Job[$i - 1];
}
mysqli_free_result($result);
mysqli_close($con);

header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);
//echo json_encode($data);

?>
