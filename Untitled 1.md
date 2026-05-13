# 全局隐藏版本号
server_tokens off;

# 自定义错误页面映射
map $status $status_text {
  404 'Not Found';
  500 'Internal Server Error';
  502 'Bad Gateway';
  503 'Service Unavailable';
  504 'Gateway Timeout';
  default 'Error';
}

map $http_origin $cors_origin {
  default "";
  "~^https://axahk-vtt\.ctint\.com$" $http_origin;
}
# Only add header ONCE and only when origin matches
if ($cors_origin != "") {
# This will override any other Access-Control-Allow-Origin headers
  more_set_headers "Access-Control-Allow-Origin: $cors_origin";
  add_header Access-Control-Allow-Credentials "true" always;
}

# Remove any duplicate header that might come from elsewhere
proxy_hide_header Access-Control-Allow-Origin;
  
https://ctint-cdss3-project-uat-aks.eastasia.cloudapp.azure.com/qhms2/mf-cdss/api/process-api/ctint-ms-qhms/qhms-report/wrapup-report