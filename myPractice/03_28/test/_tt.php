<?php

$con = mysqli_connect('localhost','mjcorp','1234','test');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
//printf(mysqli_num_rows(mysqli_query($con, "SELECT * FROM `phpbbs`")) . "\n");

$content_show = isset($_GET['content_show']) ? $_GET['content_show'] : 10;
$page = isset($_GET['page']) ? $_GET['page'] : 1;

$total_cnt = mysqli_num_rows(mysqli_query($con, "SELECT * FROM `phpbbs`"));
//  객체배열 [0]에 전체 객체배열 JSON 에 대한 기본정보 [전체레코드/뷰레코드] 저장
$data[0]['total_cnt'] = $total_cnt;
$data[0]['pageper_cnt'] = ceil($total_cnt/$content_show);

// id 값이 0이 아닐시 받았을시 글 id 에 대한 instruction
if ($id = isset($_GET['id']) ? $_GET['id'] : 0) {
  //printf("ISSET = " . $id . "\n"); // if 구문 디버그 출력 확인
  $sql = "SELECT * FROM `phpbbs` WHERE `id` =" . $id;

} else {  // id 값을 받지 못했다면, 일반적인 리스트 목록 데이터 instruction
  //printf("NOT set id !\n"); // else 구문 디버그 출력 확인
  //$sql = "SELECT * FROM `phpbbs` ORDER BY `id` DESC LIMIT 0," . $content_show;
  $data[0]['page_req'] = ($page - 1)*$content_show;
  $sql = "SELECT * FROM `phpbbs` ORDER BY `id` DESC LIMIT " .
  ($page - 1)*$content_show . "," . $content_show;
}

//$sql = "SELECT COUNT(*) FROM `phpbbs`";
//$delete_query = "DELETE FROM phpbbs WHERE id="'$rows[$i]'";
//$sql = "SELECT * FROM phpbbs WHERE id = '".$q."'";

$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
  $Id[] = $row['id'];
  $Firstname[] = $row['Firstname'];
  $Lastname[] = $row['Lastname'];
  $Age[] = $row['Age'];
  $Hometown[] = $row['Hometown'];
  $Job[] = $row['Job'];
}

//객체배열 data[0] 에 기본정보 있으므로 i = 1부터 데이터 저장, [전체 레코드 행 -1]
for ($i = 0; $i <= mysqli_num_rows($result) - 1; $i++) {
  $data[$i + 1]['Id'] = $Id[$i];
  $data[$i + 1]['Firstname'] = $Firstname[$i];
  $data[$i + 1]['Lastname'] = $Lastname[$i];
  $data[$i + 1]['Age'] = $Age[$i];
  $data[$i + 1]['Hometown'] = $Hometown[$i];
  $data[$i + 1]['Job'] = $Job[$i];
}
mysqli_free_result($result);
mysqli_close($con);

header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);
//echo json_encode($data);

?>
