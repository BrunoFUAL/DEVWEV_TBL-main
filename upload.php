<?php

// O que recebe o PHP?

var_dump($_FILES);

// Move os ficheiros carregados para uma diretoria

foreach ($_FILES["myFiles"]["tmp_name"] as $key => $value){
    $targetPath = "uploads/" . basename($_FILES["myFiles"]["name"][$key]);
    move_uploaded_file($value, $targetPath);
}